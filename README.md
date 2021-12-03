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

1. `npm run start:client` _runs the client peer_
1. `npm run start:builder` _runs the builder peer_

Peers will look for a peer id in the `peer-ids` folder and use the first one it finds. If it does not find one, one will be created and then used for the current and future runs. Optionally, you can provide a `-n` argument like:

```properties
npm run start:client -- -n alan
npm run start:builder -- -n smithee
```

which will make the program look for (and if it doesn't exist, create) a peer id file with the given name. This functionality allows for persistent peer ids across runs, and makes it possible to test with multiple peers with different ids.

### Available flags

- `-c, --capabilities`, the capabilities of the a builder peer (`nodejs`, `c#`, etc)
- `-n, --peer-name`, name of the file containing the cryptographic key of the peer id
- `-q, --quiet`, disable logging
