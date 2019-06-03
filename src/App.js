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
      err: false
    }
  }

  componentDidMount() {
    const assetId = window.location.pathname.substring(1);
    if (!assetId) return;
    this.setState({ assetId });
    let self = this;
    return axios.get(xChainApiAssetBase + assetId).then(function (response) {
      const data = response.data.description.split(';');
      if (data.length != 2 || !data[0].includes('imgur')) {
        self.setState({ err: true });
        return;
      }
      self.setState({
        imgUrl: data[0].replace('imgur', imgurUrl),
        xChainUrl: xChainAssetBase + assetId,
        desc: data[1]
      });
    }).catch(function () {
      self.setState({ err: true });
    });
  }

  render() {
    return (
      <div className="container-fluid d-flex flex-column bg-dark text-white text-center">
        <main className="flex-fill">
          { title() }
          { assetForm() }
          { error(this.state) }
          { assetData(this.state) }
        </main>
        <footer>
          { footer() }
        </footer>
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

function assetForm() {
  let newAssetID = null;

  function captureNewAssetID(event) {
    newAssetID = event.target.value;
  }

  function loadNewAsset(event) {
    window.location.assign(newAssetID);
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

function error(state) {
  if (!state.err) return;

  return (
    <div className="row">
      <div className="col p-3 mb-2 bg-warning text-dark">
        Freeport Asset ID <span className="font-weight-bold">{state.assetId}</span> invalid or malformed  
      </div>
    </div>
  );
}

function assetData(state) {
  if (!state.imgUrl) return;
  
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
          <span>Asset Details: </span>
          <a className="text-light" href={state.xChainUrl}>{state.xChainUrl}</a>
        </div>
      </div>
    </div>
  );
}

function footer() {
  return (
    <div className="row pb-3">
      <div className="col small">
        <span>Create your own Cryptogoods at </span>
        <a className="text-light" href="https://freeport.io" target="_blank" rel="noopener noreferrer">Freeport.io</a>
        <span>!</span>
      </div>
    </div>
  );
}

export default App;
