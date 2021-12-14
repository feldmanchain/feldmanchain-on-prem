import fs from "fs"
import path from "path"
import express from "express"
import {
  startAcceptingBuildRequests,
  stopAcceptingBuildRequests,
  requestBuild,
} from "./peer.js"

const app = express()

// TODO(Alan): Add proper HTTP methods, Authentication etc

const createWebApp = (peer) => {
  app.get("/build-request/start-accepting", (_, res) => {
    startAcceptingBuildRequests(peer)

    res.status(200).send("Started accepting build requests")
  })

  app.get("/build-request/stop-accepting", (_, res) => {
    stopAcceptingBuildRequests(peer)

    res.status(200).send("Stopped accepting build requests")
  })

  app.get("/build-request/send", (_, res) => {
    requestBuild(peer)

    res.status(200).send("Build request sent")
  })

  const htmlFilepath = path.join(process.cwd(), "public/index.html")

  app.get("/", (_, res) => {
    const peerId = peer.peerId.toB58String()
    const addresses = peer.multiaddrs
      .map((ma) => `<li>${ma.toString()}/p2p/${peerId}</li>`)
      .join("\n")

    const html = fs
      .readFileSync(htmlFilepath, "utf-8")
      .replace(/{{peerID}}/g, peerId)
      .replace(/{{addresses}}/g, addresses)

    return res.status(200).send(html)
  })

  return app
}

const startWebApp = (app, port, cb) => {
  app.listen(port, cb)
}

export { createWebApp, startWebApp }
