import { ConvexHttpClient } from 'convex/browser'
import { anyApi } from 'convex/server'
import type { Member } from './model'

export type Team = { members: Member[] }

/**
 * Saves the team in Convex when `VITE_CONVEX_URL` was set at build time.
 * Without that URL this still resolves, so the form can ship before the
 * deployment exists. Throws after a real save fails so the review step
 * shows the retry message.
 */
export async function submitTeam(team: Team): Promise<void> {
  const url = import.meta.env.VITE_CONVEX_URL
  if (typeof url !== 'string' || url.length === 0) {
    void team
    await new Promise((resolve) => setTimeout(resolve, 700))
    return
  }
  const convex = new ConvexHttpClient(url)
  await convex.mutation(anyApi.applications.submit, { members: team.members })
}
