// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const ico = require('./build/ICO.json');

const provider = new HDWalletProvider(
  'sword venue alert daughter vintage universe crumble visa artist master correct correct',
  'https://rinkeby.infura.io/v3/b040a2428ea545f39456672111c886eb'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(ico.abi)
  .deploy({data: ico.evm.bytecode.object})
  .send({from: accounts[0], gas: '10000000'});

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();