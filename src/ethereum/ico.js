import web3 from '../web3';
import newICO from './build/ICO.json';

const instance = new web3.eth.Contract(
  newICO.abi, '0x3cb155E1b35C061ce1C06832f097D8DEEeB0eE94'
  );

export default instance; 