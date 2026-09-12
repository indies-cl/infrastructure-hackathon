import { useEffect, useRef } from 'react'
import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
  type Object3D,
  type Texture,
  type Vector3,
} from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { type Metal } from './metals'
import { clonePicaro, disposePicaro, framePicaro, loadPicaro } from './picaro'

const BG = 0x181818
const FOV = 32
const TURN_SEC = 16
const PAD = 1.7
const DRAG = 0.007
const PITCH = 1.05

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function placeCamera(
  camera: PerspectiveCamera,
  size: Vector3,
  aspect: number,
) {
  const half = Math.tan((FOV * Math.PI) / 180 / 2)
  const distH = (size.y * PAD) / 2 / half
  const distW = (Math.max(size.x, size.z) * PAD) / 2 / (half * aspect)
  const dist = Math.max(distH, distW)
  camera.fov = FOV
  camera.near = dist / 40
  camera.far = dist * 20
  camera.position.set(0, size.y * 0.06, dist)
  camera.lookAt(0, 0, 0)
  camera.updateProjectionMatrix()
}

export function PicaroFigure({
  metal,
  label,
}: {
  metal: Metal
  label: string
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const mount: HTMLDivElement = host

    let dead = false
    let starting = false
    let inView = false
    let raf = 0
    let last = 0
    let renderer: WebGLRenderer | null = null
    let scene: Scene | null = null
    let camera: PerspectiveCamera | null = null
    let resize: ResizeObserver | null = null
    let root: Object3D | null = null
    let envMap: Texture | null = null
    let size: Vector3 | null = null
    let dragging = false
    let px = 0
    let py = 0

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = !!entry?.isIntersecting
        if (inView && !starting && !renderer) {
          starting = true
          void boot()
          return
        }
        if (inView) play()
        else stop()
      },
      { rootMargin: '160px', threshold: 0.05 },
    )
    io.observe(host)

    function syncSize() {
      const box = hostRef.current
      if (!renderer || !camera || !size || !box) return
      const w = box.clientWidth
      const h = box.clientHeight
      if (w < 1 || h < 1) return
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      placeCamera(camera, size, camera.aspect)
    }

    function draw() {
      if (renderer && scene && camera) renderer.render(scene, camera)
    }

    function tick(now: number) {
      raf = requestAnimationFrame(tick)
      if (!root) return
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (inView && !dragging && !reducedMotion()) {
        root.rotation.y += (dt * Math.PI * 2) / TURN_SEC
      }
      if (inView) draw()
    }

    function onPointerDown(event: PointerEvent) {
      if (event.button !== 0 || !root) return
      dragging = true
      px = event.clientX
      py = event.clientY
      mount.setPointerCapture(event.pointerId)
      mount.style.cursor = 'grabbing'
      mount.style.touchAction = 'none'
      event.preventDefault()
    }

    function onPointerMove(event: PointerEvent) {
      if (!dragging || !root) return
      const dx = event.clientX - px
      const dy = event.clientY - py
      px = event.clientX
      py = event.clientY
      root.rotation.y += dx * DRAG
      root.rotation.x = Math.min(
        PITCH,
        Math.max(-PITCH, root.rotation.x + dy * DRAG),
      )
      event.preventDefault()
      draw()
    }

    function onPointerUp(event: PointerEvent) {
      if (!dragging) return
      dragging = false
      if (mount.hasPointerCapture(event.pointerId)) {
        mount.releasePointerCapture(event.pointerId)
      }
      mount.style.cursor = 'grab'
      mount.style.touchAction = 'pan-y'
    }

    host.addEventListener('pointerdown', onPointerDown)
    host.addEventListener('pointermove', onPointerMove)
    host.addEventListener('pointerup', onPointerUp)
    host.addEventListener('pointercancel', onPointerUp)

    function play() {
      if (dead || raf || !renderer) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    function stop() {
      cancelAnimationFrame(raf)
      raf = 0
    }

    async function boot() {
      const gltf = await loadPicaro()
      if (dead || !canvas || !host) return

      renderer = new WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      })
      renderer.outputColorSpace = SRGBColorSpace
      renderer.toneMapping = ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05
      renderer.setClearColor(BG, 1)

      scene = new Scene()
      scene.background = new Color(BG)

      const pmrem = new PMREMGenerator(renderer)
      const env = new RoomEnvironment()
      envMap = pmrem.fromScene(env, 0.04).texture
      scene.environment = envMap
      env.dispose()
      pmrem.dispose()

      const key = new DirectionalLight(0xfff2dd, 1.15)
      key.position.set(2.2, 3.4, 3.6)
      const fill = new DirectionalLight(0xc5d2ff, 0.32)
      fill.position.set(-3.2, 1.2, 1.8)
      const rim = new DirectionalLight(0xffffff, 0.4)
      rim.position.set(-0.4, 2.4, -3.2)
      scene.add(key, fill, rim)

      root = clonePicaro(gltf, metal)
      size = framePicaro(root)
      scene.add(root)

      camera = new PerspectiveCamera(FOV, 1, 0.05, 80)
      syncSize()

      resize = new ResizeObserver(() => {
        syncSize()
        if (!raf) draw()
      })
      resize.observe(host)

      draw()
      if (inView) play()
    }

    return () => {
      dead = true
      stop()
      io.disconnect()
      resize?.disconnect()
      host.removeEventListener('pointerdown', onPointerDown)
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerup', onPointerUp)
      host.removeEventListener('pointercancel', onPointerUp)
      if (root) disposePicaro(root)
      envMap?.dispose()
      renderer?.dispose()
    }
  }, [metal])

  return (
    <div
      ref={hostRef}
      className="relative aspect-[4/5] w-full cursor-grab touch-pan-y bg-[#181818] select-none"
    >
      <canvas
        ref={canvasRef}
        aria-label={label}
        role="img"
        className="absolute inset-0 size-full"
      />
    </div>
  )
}
