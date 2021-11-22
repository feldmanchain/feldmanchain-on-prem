# feldmanchain-on-prem

A (possibly temporary) on premises version of the feldmanchain

## Scope

This repository contains the initial on premises version of feldmanchain, which is not built on blockchain technology, and should be hosted in a trusted private net. There will be no consensus mechanism implemented in this version of the chain.

### The planned features of this version are

- A net of peers (project owners and builders) are able to participate in a distributed p2p net
- Project builders are able to post build requests
- The p2p net is able to match build requests with compatible builders
  - There is some simple distribution mechanic (perhaps a round-robin variant)
- Builders are able to perform builds

## Status

Work In Progress **NOT** ready for use

## Run instructions

`npm start` to run the peer
