# game2048

game prototype comes from here: https://play2048.co/

# development

use node version `v22.12` or newer (required by Vite 8)

```sh
yarn          # install
yarn dev      # dev server on http://localhost:3000
yarn build    # typecheck + production build into build/
yarn test     # unit tests with vitest
```

## Deploy

`.github/workflows/deploy.yml` deploys each push to `master` to one target. The
repository variable `DEPLOY_TARGET` chooses the target; leave it unset to deploy to
GitHub Pages by default.

| Value | Destination | Required configuration |
| --- | --- | --- |
| `pages` | GitHub Pages | GitHub Pages enabled for the repository |
| `cloudflare` | Cloudflare Worker `game2048` | Variable `CLOUDFLARE_ACCOUNT_ID`, secret `CLOUDFLARE_API_TOKEN` |
| `vps` | VPS | Variables `SERVER_IP`, `SSH_PORT`, secret `SSH_PRIVATE_KEY` |

To change automatic deploys, go to **Settings > Secrets and variables > Actions >
Variables**, then set `DEPLOY_TARGET` to one of the values above. In **Actions >
Deploy > Run workflow**, choose a target for a one-off deploy; this manual choice takes
precedence over `DEPLOY_TARGET`.

Cloudflare builds `build/` on the GitHub Actions runner and publishes it with Wrangler.
Keep the Cloudflare Worker disconnected from Cloudflare Builds, otherwise both systems
deploy on every push.
