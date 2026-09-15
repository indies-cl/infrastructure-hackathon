# Infrastructure Hackathon

Landing for the Santiago hackathon: 7–8 November 2026.

```bash
pnpm install
pnpm dev
```

Pushes to `main` lint, build, and deploy to [infra.indies.cl](https://infra.indies.cl). Pull requests only run lint and build. Local emergency deploy is still `pnpm deploy`.

## Deploy token (someone with account admin)

The GitHub Action needs a repo secret `CLOUDFLARE_API_TOKEN`. Creating that token requires Super Administrator on **Ignacioramosbernardo@gmail.com's Account** (`42b4924619f529a17513a35253e67c52` in `wrangler.jsonc`). The people currently shipping from a laptop do not have that access.

If you do:

1. Open [Account API Tokens on that account](https://dash.cloudflare.com/42b4924619f529a17513a35253e67c52/api-tokens). The name in the top-left must be Ignacioramosbernardo, not reno. Workers & Pages should list `infrastructure-hackathon`.
2. Create Token. Account tokens have no “Account resources” picker — they belong to whichever account the dashboard is on. Grant **Workers Scripts Edit**, **Workers Observability Edit**, and **Workers Routes Edit** (zone `indies.cl`).
3. From this repo: `gh secret set CLOUDFLARE_API_TOKEN` and paste the `cfat_…` value. Do not put it in git.

A token minted on reno will authenticate and still fail this deploy. Delete that one if it exists.
