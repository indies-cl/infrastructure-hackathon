const CHARS = ' .:-=+*#%@'
const CELL = 10

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAG = `
precision mediump float;
uniform sampler2D uVideo;
uniform sampler2D uAtlas;
uniform vec2 uResolution;
uniform vec2 uVideoSize;
uniform float uChars;
uniform float uCell;

vec2 coverUV(vec2 uv) {
  float canvasAR = uResolution.x / max(uResolution.y, 1.0);
  float videoAR = uVideoSize.x / max(uVideoSize.y, 1.0);
  vec2 scale = vec2(1.0);
  if (canvasAR > videoAR) scale.y = videoAR / canvasAR;
  else scale.x = canvasAR / videoAR;
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
  vec2 cell = floor(px / uCell);
  vec2 sampleUV = coverUV((cell + 0.5) * uCell / uResolution);
  vec3 vid = texture2D(uVideo, sampleUV).rgb;
  float luma = dot(vid, vec3(0.299, 0.587, 0.114));
  float sky = smoothstep(0.04, 0.22, vid.b - max(vid.r, vid.g)) * luma;
  float subject = clamp((luma - sky * 0.88 - 0.08) / 0.72, 0.0, 1.0);
  subject = pow(subject, 0.85);
  float idx = floor(subject * (uChars - 0.001));
  vec2 local = fract(px / uCell);
  vec2 atlasUV = vec2((idx + local.x) / uChars, 1.0 - local.y);
  float glyph = texture2D(uAtlas, atlasUV).a;
  vec3 ink = vec3(0.839, 0.831, 0.816);
  vec3 purple = vec3(0.427, 0.290, 1.0);
  float red = smoothstep(0.08, 0.42, vid.r - vid.g);
  vec3 tint = mix(ink, purple, red);
  float alpha = glyph * (0.12 + subject * 0.88);
  gl_FragColor = vec4(tint * alpha, alpha);
}
`

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function makeAtlas(gl: WebGLRenderingContext) {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size * CHARS.length
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `700 ${size * 0.78}px "iA Writer Quattro", ui-monospace, monospace`
  for (let i = 0; i < CHARS.length; i++) {
    ctx.fillText(CHARS[i] ?? ' ', size * (i + 0.5), size * 0.52)
  }
  const texture = gl.createTexture()
  if (!texture) return null
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return texture
}

export function createAsciiVideo(canvas: HTMLCanvasElement, video: HTMLVideoElement) {
  const glRaw = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
  })
  if (!glRaw) return null
  const gl: WebGLRenderingContext = glRaw

  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  )
  const aPos = gl.getAttribLocation(program, 'aPos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const videoTex = gl.createTexture()
  if (!videoTex) return null
  gl.bindTexture(gl.TEXTURE_2D, videoTex)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0, 0]),
  )

  let atlas = makeAtlas(gl)
  if (!atlas) return null

  const uVideo = gl.getUniformLocation(program, 'uVideo')
  const uAtlas = gl.getUniformLocation(program, 'uAtlas')
  const uResolution = gl.getUniformLocation(program, 'uResolution')
  const uVideoSize = gl.getUniformLocation(program, 'uVideoSize')
  const uChars = gl.getUniformLocation(program, 'uChars')
  const uCell = gl.getUniformLocation(program, 'uCell')

  gl.uniform1i(uVideo, 0)
  gl.uniform1i(uAtlas, 1)
  gl.uniform1f(uChars, CHARS.length)
  gl.uniform1f(uCell, CELL)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

  function resize(width: number, height: number) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uResolution, canvas.width, canvas.height)
    gl.uniform1f(uCell, CELL * dpr)
  }

  function draw() {
    if (video.readyState >= 2) {
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, videoTex)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
      gl.uniform2f(
        uVideoSize,
        video.videoWidth || 1280,
        video.videoHeight || 720,
      )
    }
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, atlas)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  function refreshAtlas() {
    const next = makeAtlas(gl)
    if (!next) return
    gl.deleteTexture(atlas)
    atlas = next
  }

  function destroy() {
    gl.deleteProgram(program)
    gl.deleteTexture(videoTex)
    gl.deleteTexture(atlas)
    gl.deleteBuffer(buffer)
  }

  return { resize, draw, refreshAtlas, destroy }
}
