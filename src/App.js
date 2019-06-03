import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const imgurUrl = 'https://i.imgur.com';
const xChainAssetBase = 'https://xchain.io/asset/';
const xChainApiAssetBase = 'https://xchain.io/api/asset/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assetId: null,
      imgUrl: null,
      xChainUrl: null,
      desc: null,
    }

    this.captureNewAssetID = this.captureNewAssetID.bind(this);
    this.loadNewAsset = this.loadNewAsset.bind(this);
  }

  componentDidMount() {
    const assetId = window.location.pathname.substring(1);
    let self = this;
    return axios.get(xChainApiAssetBase + assetId).then(function (response) {
      const data = response.data.description.split(';');
      self.setState({
        imgUrl: data[0].replace('imgur', imgurUrl),
        xChainUrl: xChainAssetBase + assetId,
        desc: data[1]
      });
    });
  }

  captureNewAssetID(event) {
    this.setState({ assetId: event.target.value });
  }

  loadNewAsset(event) {
    window.location.assign(this.state.assetId);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid bg-dark text-white text-center">
        
        <div className="row pb-5 pt-4">
          <div className="col">
            <h1 className="display-2">Viewport.me</h1>
          </div>
        </div>
        <div id="SearchField">Freeport Asset ID: <input type="text" id="text" /> <a href="javascript:window.location.href=document.getElementById('text').value;">GO</a></div>
        {this.state.imgUrl &&
          <div>
            <img src={this.state.imgUrl} alt="meme" />
            <p>{this.state.desc}</p>
            <p class="xchainDetails">Asset Details: <a href={this.state.xChainUrl}>{this.state.xChainUrl}</a></p>
            <p class="smallNotice">Create your own Cryptogoods at <a href="http://freeport.io" target="_blank">Freeport.io</a>!</p>
          </div>
        }
      </div>
    );
  }
}

export default App;
