import { createHash } from 'crypto'
import { packDataBytes, unpackDataBytes, packData } from '@taquito/michel-codec'
import merkletree, { verifyProof } from './merkletree/index.js'

const pack = s => packDataBytes({ "string": s }).bytes

const hash = s => {
  const hash = createHash('sha256').update(pack(s),'hex').digest('hex')
  return hash
}
const hashNoPack = s => {
  const hash = createHash('sha256').update(s,'hex').digest('hex')
  return hash
}

const secret = 'd46d90b0d61169445d4504e88c5d637'
const data = ['no','en','fr','dk','es'].map(d => hash(d+secret))
const tree = merkletree(data)

const root = tree.root()
const userdata = 'no'
const useraddr = 'tz1'
const chainhash = hash(hash(userdata+secret)+useraddr) 
const leafmatch = data.filter(d => hash(d+useraddr) == chainhash)[0]

const proof = tree.proof(leafmatch)

console.log(root)
console.log(leafmatch)
console.log(proof)
//console.log(hash('a'))
//console.log(hash('b'))
//console.log(hashNoPack(hash('a')+hash('b')))
const verified = verifyProof(leafmatch, root, proof)
console.log(verified)
