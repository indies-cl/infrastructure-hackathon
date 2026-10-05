# Save registrations in Convex

The form sends a team through `submitTeam` in `src/apply/submit.ts`. That calls the `applications.submit` mutation in `convex/applications.ts`.

The mutation stores one `applications` row for the team and one `members` row per person. Same email, or same GitHub when they gave one, is rejected. There is no public query for these rows. Read them in the Convex dashboard, on the Data page.

Until `VITE_CONVEX_URL` is present at build time, submit waits and then succeeds without saving. The live site keeps accepting the form. Saving starts after the steps below, once the site is built again with the URL set.

## Local

This repository is linked to the Convex project `vicente-matus/infra-futuro-velum-indies` and its personal development deployment `greedy-gecko-110`. The Convex CLI writes `.env.local` in the repo root when you select that deployment; the file is gitignored.

```bash
pnpm exec convex deployment select greedy-gecko-110
pnpm exec convex dev --once
```

Run `pnpm exec convex dev` instead of `--once` to keep functions in sync while editing. The selected deployment uses:

```bash
CONVEX_DEPLOYMENT=dev:greedy-gecko-110
VITE_CONVEX_URL=https://greedy-gecko-110.convex.cloud
```

For a different development deployment, create `.env.local` in the repo root with its name and URL:

```bash
CONVEX_DEPLOYMENT=dev:your-deployment-name
VITE_CONVEX_URL=https://your-deployment-name.convex.cloud
```

`your-deployment-name` is the dev deployment name from the Convex dashboard (Settings on that deployment). It is the subdomain of the URL. For a deployment named `happy-animal-123`:

```bash
CONVEX_DEPLOYMENT=dev:happy-animal-123
VITE_CONVEX_URL=https://happy-animal-123.convex.cloud
```

If you do not have a project yet, this writes the file for you:

```bash
pnpm exec convex dev
```

Log in with GitHub when it asks, and create the project. Leave that command running while you work. It uploads `convex/` and generates `convex/_generated`. Commit `convex/_generated` after it appears. `pnpm build` typechecks the functions from those files.

Then, in another terminal:

```bash
pnpm dev
```

Submit a team at `/apply` and confirm the rows in the dashboard.

To upload functions without the browser login, add a dev deploy key to `.env.local` as `CONVEX_DEPLOY_KEY`. Create it in the dashboard under deploy keys. Keep that value out of git and out of chat.

## Production

Pushes to `main` build the site and deploy it to Cloudflare. Vite bakes `VITE_CONVEX_URL` in at build time, so the GitHub build has to learn the production URL.

1. In the Convex dashboard, create a deploy key for the production deployment.
2. Save it as the GitHub secret `CONVEX_DEPLOY_KEY`.
3. In `.github/workflows/ci.yml`, build with:

```bash
pnpm exec convex deploy --cmd 'pnpm build'
```

That pushes `convex/` to production, sets `VITE_CONVEX_URL` for the build, then the existing Wrangler step can publish `dist`.

The form does not email anyone yet.
