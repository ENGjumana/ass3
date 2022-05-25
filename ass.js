// genesis.js

const GENESIS_DATA = {

    timestamp: Date.now(),
    lastHash: 'hash code For example: 64b7edc786326651e031a4d12d9838d279571946d8c9a5d448c70db94b0e143f ',
    hash: 'Hash Code same as above',
    data: 'Himanshu'
    };
    module.exports = { GENESIS_DATA };
    // block.js

const { GENESIS_DATA } = require('./genesis.js');

class Block {

constructor({timestamp, lastHash, hash, data}) {
this.timestamp = timestamp;
this.lastHash = lastHash;
this.hash = hash;
this.data = data;
}
static genesis() {
return new this(GENESIS_DATA);
}

}
module.exports = Block;


// hashPrevious.js

const crypto = require('crypto');

const hashPrevious =(...inputs) => {

const hash = crypto.createHash('sha256');
hash.update(inputs.sort().join(' '));
return hash.digest('hex');
}
module.exports = hashPrevious;

 // block.js

const { GENESIS_DATA } = require('./genesis.js');
const hashPrevious = require('./hashPrevious');

class Block {

constructor({timestamp, lastHash, hash, data}) {
this.timestamp = timestamp;
this.lastHash = lastHash; this.hash = hash;
this.data = data;
}
static genesis() {
return new this(GENESIS_DATA);
}
static mineBlock({lastBlock, data}) {
const timestamp = Date.now();
const lastHash = lastBlock.hash;
return new this({
timestamp,
lastHash,
data,
hash: hashPrevious(timestamp, lastHash, data) }); } }

module.exports = Block;

// blockchain.js

const Block = require('./block');

class Blockchain {

constructor() {
this.chain = [Block.genesis()];
}
addBlock({ data }) {
const newBlock = Block.mineBlock({
lastBlock: this.chain[this.chain.length-1],
data
});
this.chain.push(newBlock); } }

module.exports = Blockchain;

// server.js

const Blockchain = require('./blockchain');

const Block = require('./block');

const blockchain = new Blockchain();

for(let i=0; i<5; i++) {
const newData = 'krunal'+i;
blockchain.addBlock({data: newData});
}

console.log(blockchain);