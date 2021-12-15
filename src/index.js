import open from "open"
import { port } from "./lib/cli-options.js"
import { createPeer, stopPeer } from "./applications/peer.js"
import { createWebApp, startWebApp } from "./applications/web-app.js"
import { createWsApp, startWsApp } from "./applications/ws-app.js"

const peer = await createPeer()

const wsApp = createWsApp()
startWsApp(wsApp, port + 1, (_t) => {})

const webApp = createWebApp(peer, wsApp)
startWebApp(webApp, port, () => open(`http://localhost:${port}`))

const onProgramTerminated = async () => {
  await stopPeer(peer)

  process.exit(0)
}

process.on("SIGTERM", onProgramTerminated)
process.on("SIGINT", onProgramTerminated)
