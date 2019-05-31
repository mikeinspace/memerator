import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: null, desc: null }
  }
  
  componentDidMount() {
    const assetId = window.location.pathname;
    let self = this;
    return axios.get('https://xchain.io/api/asset' + assetId).then(function(response) {
      
      const supp = response.data.supply;
      const data = response.data.description.split(';');
      self.setState({ 
        suppl: supp,
        url: data[0].replace('imgur', 'https://i.imgur.com'),
        desc: data[1]
        

      });
    });
  }

  render() {
    return (
        
        
       
      <div className="App App-header">
        { this.state.url && 
          <div>
            <div><img src={ this.state.url } alt="meme"></img></div>
            <p>{ this.state.desc }</p>
            <p>Title: { this.state.suppl }</p>
      

      
               <p style="font-size:10px;">Create your own Cryptogoods at <a href="http://freeport.io" style="color:white;">Freeport.io</a>!</p>
      

          </div>
        }
      </div>
    );
  }
}

export default App;
