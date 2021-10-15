# Tezos Merkletree

Merkletree implementation that matches Tezos onChain hashing.

This module uses `packDataBytes` from `@taquito/michel-codec` to create byte representations of data that matches Tezos onChain representation.

The current use-case is so we can create a merkleproof in Javascript that can be passed to and verified by a Tezos smart contract.

For TezID we use this to enable set membership verification in zero knowledge onChain.

Heavily inspired https://github.com/binded/merkletree.

enjoy. 
