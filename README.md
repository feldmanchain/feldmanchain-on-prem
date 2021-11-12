# feldmanchain-on-prem

A (possibly temporary) on premise version of the feldmanchain

## Scope

This repository will contain the intial on-prem version of the feldmanchain, which is not built on blockchain technology, and should be hosted in a trusted private net. There will be no consensus mechanism implemented in this version of the chain.

### The planned features of this version are

* A net of peers (project owners and builders) should be able to participate in a distributed p2p net
* Project builders should be able to request a build
* The p2p net should be able to match projects with compatible builders
    - There should be some simple distribution mechanics (perhaps some version of round-robin)
* Builders should be able to perform builds
