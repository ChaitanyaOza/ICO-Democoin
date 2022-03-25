import web3 from '../web3';
import ICO from './build/ICO.json';

const instance = new web3.eth.Contract(
  ICO.abi, '0x1D656815D2C11b82FC9E7F28f25fFa79EDBCA403'
);

export default instance; 