"use strict";

const { assert } = require("console");
var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

for (let line of poem) {
	Blockchain.blocks.push(createBlock(line));
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	const str = JSON.stringify(bl);
	const buff = Buffer.from(str);
	assert(buff instanceof Buffer);
	return crypto.createHash("sha256").update(Buffer.from(str)).digest("hex");
}

function createBlock(data) {
	const len = Blockchain.blocks.length;
	const prevBlock = Blockchain.blocks[len-1];
	const prevHash = blockHash(prevBlock);
	const timeStamp = Date.now();

	const block =  {
		index: len,
		prevHash: prevHash,
		data: data,
		timestamp: timeStamp,
	};

	block.hash = blockHash(block);
	return block;
}

function verifyBlock(bl) {
	assert(bl.index>=0);
	assert(bl.data != null);
	assert(bl.prevHash != null);

	return true;
}

function verifyChain(blockchain) {
	const blocks = blockchain.blocks;
	assert(blocks[0].hash == "000000");

	let currentBlock, previousBlock = blocks[0];
	for(let i=1; i<9; i++) {
		currentBlock = blocks[i];
		verifyBlock(currentBlock);
		assert(currentBlock.prevHash = blockHash(previousBlock))
	}
	
	return true;
}
