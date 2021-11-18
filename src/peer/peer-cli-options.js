/*
  NOTE(Alan):

  Commander effectively turns the program into a cli
  
  Every option registered below can be passed when running the script,
  and will be added to the program.opts() accordingly

  It also makes it possible to run `node {script} -h` to see available options,
  which is really nice
*/

import { Command } from "commander"

const program = new Command()

program.version("0.0.1")

program.option("-s, --seeder [seeder]", "seeder address", "0.0.0.0:41234")

program.option(
  "-c, --capabilities [capabilities...]",
  "builder capabilities",
  ["nodejs"]
)

program.parse()

const { capabilities, seeder } = program.opts()

const [seederAddress, seederPort] = seeder.split(":")

export { capabilities, seederAddress, seederPort }
