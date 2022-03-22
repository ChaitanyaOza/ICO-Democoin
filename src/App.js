import React, { Component } from 'react';
import './CSS/App.css';
//import Button from '@material-ui/core/Button';
import Start from './components/Start';
import About from './components/About';
import Whitepaper from './components/Whitepaper';
import Roadmap from './components/Roadmap';
import Contribute from './components/Contribute';
import Team from './components/Team';
//import scrollToComponent from 'react-scroll-to-component';
import web3 from './web3';
import ico from './ethereum/ico'



class App extends Component {

state = {
  myBalance: '',
  myEther: '',
  myAddress: ''
}


async componentDidMount(){

try{
  let accounts = await web3.eth.getAccounts();

  let myBalance = await ico.methods.myBalance().call({from:accounts[0]});
  myBalance = web3.utils.fromWei(myBalance, 'ether');

  let myBalanceEther = await web3.eth.getBalance(accounts[0]);
  myBalanceEther = web3.utils.fromWei(myBalanceEther, 'ether');
  let myEther = myBalanceEther;
  
  let myAddress = await ico.methods.myAddress().call({from:accounts[0]});
  this.setState({myBalance, myEther, myAddress});
}catch(err){
  console.log("Metamask isn't installed");
}
  
}


  render() {

    console.log(web3.version);
    return (
      <div>
        <nav>

          <a href="/" class="titleICO">
            <i class="material-icons">group_work</i>
            <div>DEMOICO</div>
          </a>

           
          {this.state.myBalance}
          <div class="rightNav">
            <i class="material-icons">account_box</i>

            <div class="myAccountBox">
              <div class="address">{"Address: " + this.state.myAddress}</div>
              <div class="eth">{"My Ether: " + this.state.myEther}</div>
              <div class="dctoken">{"My DC: " + this.state.myBalance}</div>
            </div>
          </div>

        </nav>

        <div id="startDiv"> <Start/> </div>
        <div ref={(section) => { this.About = section; }}><About/></div>
        <div ref={(section) => { this.Whitepaper = section; }}> <Whitepaper/> </div>
        <div ref={(section) => { this.Roadmap = section; }}> <Roadmap/> </div>
        <div ref={(section) => { this.Contribute = section; }}> <Contribute/> </div>
        <div ref={(section) => { this.Team = section; }}> <Team/> </div>

      </div>
    );
  }
}

export default App;
