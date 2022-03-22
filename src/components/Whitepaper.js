import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

class Whitepaper extends Component {

  render() {
    return(
      <div>
        <div class="whitepaper">
          <Button size="large" variant="contained" color="primary">
            <i class="material-icons">file_copy</i> <i>WHITEPAPER</i>
          </Button>
        </div>
      </div>

    );
  }
}

export default Whitepaper; 
