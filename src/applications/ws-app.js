import WS from "uWebSockets.js"

const createWsApp = (port) => {
  const app = WS.App()

  app.ws("/", {
    open: (ws) => ws.subscribe("all"),
    message: (_ws, ab) => app.publish("all", ab),
  })

  return app
}

const startWsApp = (app, port, cb) => {
  app.listen(port, cb)
}

export { createWsApp, startWsApp }
