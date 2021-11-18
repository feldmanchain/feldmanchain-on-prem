# feldmanchain-on-prem

A (possibly temporary) on premises version of the feldmanchain

## Disclaimer

_OBS!! This version of the feldmanchain is **not** decentralized, it's **not** a blockchain and **not** intended for public or (yet) in production use. This is a repository for testing out ideas, and to be used as a test network for the builder software._

## Scope

This repository will contain the initial on-prem version of the feldmanchain, which is not built on blockchain technology, and should be hosted in a trusted private net. There will be no consensus mechanism implemented in this version of the chain.

### The planned features of this version are

- A net of peers (project owners and builders) should be able to participate in a distributed p2p net
- Project builders should be able to request a build
- The p2p net should be able to match projects with compatible builders
  - There should be some simple distribution mechanics (perhaps some version of round-robin)
- Builders should be able to perform builds

## Run instructions

- to run a seeder: `npm start:seeder`
- to run a peer: `npm start:peer -- -c {capabilities} -s {seeder address}`
