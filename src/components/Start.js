import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { Player, BigPlayButton, ControlBar } from 'video-react';
//import App from '../App';

import web3 from '../web3';
import ico from '../ethereum/ico';

class Start extends Component {

state = {
  contributers: '',
  totalSupply: '',
  days:'',
  hours:'',
  minutes:'',
  seconds:''
}


async componentDidMount(){
  let contributers = await ico.methods.allContributers().call();
  let totalSupply = await ico.methods.totalSupply().call();
  totalSupply = web3.utils.fromWei(totalSupply, 'ether');

  let icoEndTime = await ico.methods.icoEnds().call();
  let timeNow = Math.round((new Date()).getTime() / 1000);
  let timeLeft = icoEndTime - timeNow;

  let date = new Date(timeLeft*1000);

  let days = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  this.setState({contributers, totalSupply, days, hours, minutes, seconds})
}

render() {
    return (
      <div>

        <div class="container">
          <div class="containerMiddle">
            <div class="header1">#ICO Landing page for your cryptocurrency project</div>
            <div class="flex">
              <div class="textArea">
                <div>Decentralized Demo Platform for ICO Developers, Advisors, Crypto-Experts
                     and Investors. </div>
                <div class="buttonContainer">
                  <div> <Button variant="contained" color="primary"> SIGN UP TO JOIN </Button> </div>
                </div>
              </div>

              <div class="movieContainer">
                <Player poster="https://blog.sodio.tech/wp-content/uploads/2018/03/ethex-is-decentralized2x.1551cb1c.png" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" >
                  <BigPlayButton position="center" />
                   <ControlBar autoHide={false} disableCompletely={true} />
                </Player>
              </div>
            </div>

            <div class="tokenSaleContainer flex">
              <div class="tokenSaleLeftSide">
                <div class="flex space-between">
                  <div class="tokensSold">Total-Supply</div>
                  <div class="contributors">Contributers:<b> {this.state.contributers}</b></div>
                </div>
                <div class="totalSuppy"> {this.state.totalSupply}<b> DC</b></div>
                <div ><Button variant="contained" color="primary">BUY TOKENS | 25% Bonus</Button></div>
              </div>

              <div class="tokenSaleRightSide">
                <div class="titleTokenSale">TOKEN SALE IS LIVE</div>
                <div class="tokenSaleEnds"> TOKEN SALE ENDs IN </div>
                <div class="time flex space-around">
                  <div>
                    <div class="headerTime">{this.state.days}</div>
                    <div>Days</div>
                  </div>
                  <div>
                    <div class="headerTime" >{this.state.hours}</div>
                    <div>Hours</div>
                  </div>
                  <div>
                    <div class="headerTime" >{this.state.minutes}</div>
                    <div>Min</div>
                  </div>
                  <div>
                    <div class="headerTime" >{this.state.seconds}</div>
                    <div>Sec</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Icons space-around flex">
          <i class="fab fa-bitcoin"></i>
          <i class="fab fa-facebook-f"></i>
          <i class="fab fa-telegram-plane"></i>
          <i class="fab fa-twitter"></i>
          <i class="fab fa-reddit-alien"></i>
        </div>

      </div>

    );
  }

}

export default Start;