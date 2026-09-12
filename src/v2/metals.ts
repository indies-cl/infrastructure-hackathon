export type Metal = 'bronze' | 'silver' | 'gold'

export const METALS: Record<
  Metal,
  { color: number; roughness: number; metalness: number }
> = {
  bronze: { color: 0xb87333, roughness: 0.38, metalness: 0.92 },
  silver: { color: 0xc5c8cc, roughness: 0.16, metalness: 1 },
  gold: { color: 0xd4af37, roughness: 0.22, metalness: 1 },
}

export const PICARO_SRC = '/models/indio-picaro.glb'
