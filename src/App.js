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

  render() {
    return (
      <div className="container-fluid bg-dark text-white text-center">
        { title() }
        { assetForm(this, this.state.assetId) }
        { assetData(this.state) }
        { footer() }
      </div>
    );
  }
}

function title() {
  return (
    <div className="row pb-5 pt-4">
      <div className="col">
        <h1 className="display-2">Viewport.me</h1>
      </div>
    </div>
  );
}

function assetForm(component, assetId) {
  function captureNewAssetID(event) {
    component.setState({ assetId: event.target.value });
  }

  function loadNewAsset(event) {
    window.location.assign(assetId);
    event.preventDefault();
  }

  return (
    <div className="row pb-4">
      <div className="col">
        <form className="form-inline justify-content-center" onSubmit={loadNewAsset}>
          <div className="mx-3">
            <input type="text" className="form-control" placeholder="Freeport Asset ID" onChange={captureNewAssetID} />
          </div>
          <button type="submit" className="btn btn-light">GO</button>
        </form>
      </div>
    </div>
  );
}

function assetData(state) {
  if (state.imgUrl) {
    return (
      <div>
        <div className="row pb-3">
          <div className="col">
            <img className="img-fluid shadow" src={state.imgUrl} alt="meme" />
          </div>
        </div>
        <div className="row pb-5">
          <div className="col">
            <h1 className="display-4 font-italic">{state.desc}</h1>
          </div>
        </div>
        <div className="row pb-3">
          <div className="col">
            Asset Details: <a className="text-light" href={state.xChainUrl}>{state.xChainUrl}</a>
          </div>
        </div>
      </div>
    );
  }
}

function footer() {
  return (
    <div className="row pb-3">
      <div className="col small">
        Create your own Cryptogoods at <a className="text-light" href="https://freeport.io" target="_blank" rel="noopener noreferrer">Freeport.io</a>!
      </div>
    </div>
  );
}

export default App;
