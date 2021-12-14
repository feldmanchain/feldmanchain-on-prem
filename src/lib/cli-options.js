/*
  NOTE(Alan):

  Commander effectively turns the program into a cli.
  
  Every option registered below can be passed when running the script,
  and will be added to the program.opts() accordingly. It also makes it
  possible to run `node {script} -h` to see available options.
*/

import { Command } from "commander"

const program = new Command()

program
  .version("0.0.1")
  .option("-p, --port <number>", "Port", 3000)
  .option("-q, --quiet <string>", "Disable logging")
  .option("-c, --capabilities [string...]", "Capabilities", [])
  .option("-n, --peer-name <string>", "The peerId filename", undefined)

program.parse()

const opts = program.opts()

const { capabilities, peerName, quiet, port: portString } = opts

const port = Number(portString)

export { capabilities, peerName, quiet, port }
