import fs from "fs"
import path from "path"
import WS from "uWebSockets.js"
import {
  requestBuild,
  startAcceptingBuildRequests,
  stopAcceptingBuildRequests,
} from "./peer.js"

const htmlFilePath = path.join(process.cwd(), "public/index.html")

const createWebApp = (peer, port) => {
  const app = WS.App()

  app.ws("/*", {
    idleTimeout: 32,
    maxBackpressure: 1024,
    maxPayloadLength: 512,
    compression: WS.DEDICATED_COMPRESSOR_3KB,
    open: (socket, res) => {
      socket.subscribe("build-request/incoming")
    },
    message: (ws, ab) => app.publish("all", ab),
  })

  app.post("/build-request/start-accepting", (res) => {
    startAcceptingBuildRequests(peer, (from, data) => {
      app.publish("build-request/incoming", data, true)
    })

    res.writeStatus("200 OK").end("Started accepting build requests")
  })

  app.post("/build-request/stop-accepting", (res) => {
    stopAcceptingBuildRequests(peer)

    res.writeStatus("200 OK").end("Stopped accepting build requests")
  })

<<<<<<< HEAD
  app.get("/build-request/send", (_, res) => {
    const data = requestBuild(peer)

    res.status(200).json(data)
=======
  app.post("/build-request/send", (res) => {
    requestBuild(peer)

    res.writeStatus("200 OK").end("Build request sent")
>>>>>>> 001b7bd (remove express in favor of uwebsockets and add push to client on received build request)
  })

  app.get("/*", (res) => {
    const peerId = peer.peerId.toB58String()
    const addresses = peer.multiaddrs
      .map((ma) => `<li>${ma.toString()}/p2p/${peerId}</li>`)
      .join("\n")

    const html = fs
      .readFileSync(htmlFilePath, "utf-8")
      .replace(/{{peerID}}/g, peerId)
      .replace(/{{addresses}}/g, addresses)
      .replace(/`{{port}}`/g, port)

    res.writeStatus("200 OK").end(html)
  })

  return app
}

const startWebApp = (app, port, cb) => {
  app.listen(port, (listenSocket) => {
    if (listenSocket) {
      cb()
    }
  })
}

export { createWebApp, startWebApp }
