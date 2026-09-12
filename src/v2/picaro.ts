import {
  Box3,
  MeshPhysicalMaterial,
  Vector2,
  Vector3,
  type Mesh,
  type MeshStandardMaterial,
  type Object3D,
} from 'three'
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js'
import { clone as cloneSkeleton } from 'three/addons/utils/SkeletonUtils.js'
import { METALS, PICARO_SRC, type Metal } from './metals'

let loading: Promise<GLTF> | null = null

function isMesh(obj: Object3D): obj is Mesh {
  return (obj as Mesh).isMesh === true
}

export function loadPicaro() {
  if (!loading) loading = new GLTFLoader().loadAsync(PICARO_SRC)
  return loading
}

export function clonePicaro(gltf: GLTF, metal: Metal) {
  const root = cloneSkeleton(gltf.scene)
  const look = METALS[metal]

  root.traverse((obj) => {
    if (!isMesh(obj)) return
    const prev = obj.material as MeshStandardMaterial
    obj.material = new MeshPhysicalMaterial({
      color: look.color,
      metalness: look.metalness,
      roughness: look.roughness,
      envMapIntensity: 1.15,
      normalMap: prev.normalMap,
      normalScale: new Vector2(0.85, 0.85),
      aoMap: prev.aoMap,
      aoMapIntensity: 0.65,
      side: prev.side,
      clearcoat: 0.12,
      clearcoatRoughness: 0.4,
    })
    obj.castShadow = false
    obj.receiveShadow = false
  })

  return root
}

export function disposePicaro(root: Object3D) {
  root.traverse((obj) => {
    if (!isMesh(obj)) return
    const material = obj.material
    if (Array.isArray(material)) material.forEach((item) => item.dispose())
    else material.dispose()
  })
}

export function framePicaro(root: Object3D) {
  root.updateWorldMatrix(true, true)
  const box = new Box3().setFromObject(root, true)
  const size = box.getSize(new Vector3())
  const center = box.getCenter(new Vector3())
  root.position.sub(center)
  return size
}
