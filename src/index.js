import open from "open"
import { port } from "./lib/cli-options.js"
import { createPeer, stopPeer } from "./applications/peer.js"
import { createWebApp, startWebApp } from "./applications/web-app.js"

const peer = await createPeer()
const app = createWebApp(peer)

startWebApp(app, port, () => open(`http://localhost:${port}`))

const onProgramTerminated = async () => {
  await stopPeer(peer)

  process.exit(0)
}

process.on("SIGTERM", onProgramTerminated)
process.on("SIGINT", onProgramTerminated)
