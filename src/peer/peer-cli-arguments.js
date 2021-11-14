import { Command } from "commander"

const program = new Command()

program.version("0.0.1")

program.option("-s, --seeder [seeder]", "seeder address", "0.0.0.0")

program.option(
  "-c, --capabilities [capabilities...]",
  "builder capabilities",
  []
)

program.parse()

const { capabilities, seeder } = program.opts()

const [seederAddress, seederPort] = seeder.split(":")

export { capabilities, seederAddress, seederPort }
