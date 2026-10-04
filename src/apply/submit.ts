import type { Member } from './model'

export type Team = { members: Member[] }

/**
 * Frontend only for now. This is the single seam to swap for the Convex
 * mutation: it should store the team, then email every member that we'll be
 * in touch with details and the decision. Throw to show the retry message.
 */
export async function submitTeam(team: Team): Promise<void> {
  void team
  await new Promise((resolve) => setTimeout(resolve, 700))
}
