import logo from './logo.svg';
import './index.css';
import Login from "./Login.js"
import NewAcc from "./NewAcc.js"
import Upload from "./Upload.js"
import ListSub from "./ListSub.js"
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
require("dotenv").config();
function App() {
	return (
		<BrowserRouter>
			<div class="w3-top">
		    <div class="w3-bar w3-white w3-card" id="myNavbar">
		      <a href="/" class="w3-bar-item w3-button w3-wide"><b>TexScan</b></a>
		      <div class="w3-right w3-hide-small">
		        <a href="/login" class="w3-bar-item w3-button">LOGIN</a>
						<a href="/newacc" class="w3-bar-item w3-button">SIGN UP</a>
		        <a href="/upload" class="w3-bar-item w3-button">UPLOAD</a>
		        <a href="/listsub" class="w3-bar-item w3-button">LIST SUB</a>
		      </div>
		    </div>
          <Switch>
						<Route path="/login" component={Login} exact />
						<Route path="/newacc" component={NewAcc} exact />
						<Route path="/upload" component={Upload} exact />
						<Route path="/listsub" component={ListSub} exact />
						<Redirect to="/" />
          </Switch>
        </div>
		</BrowserRouter>
	);
  /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
}


export default App;
