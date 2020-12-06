import logo from './logo.svg';
import './index.css';
import Login from "./Login.js"
import NewAcc from "./NewAcc.js"
import Upload from "./Upload.js"
import ListSub from "./ListSub.js"
import UploadTwo from "./UploadTwo.js"
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
require("dotenv").config();
function App() {
	return (
		<BrowserRouter>

			<div class="top">
		    <div class="bar white card" id="navigation">
		      <a href="/" class="bar-item button wide">TexScan</a>
		      <div class="right">
		        <a href="/login" class="bar-item button">LOGIN</a>
						<a href="/newacc" class="bar-item button">SIGN UP</a>
		        <a href="/upload" class="bar-item button">UPLOAD</a>
		        <a href="/uploadtwo" class="bar-item button">UPLOADTWO</a>
		        <a href="/listsub" class="bar-item button">LIST SUB</a>
		      </div>
		    </div>
          <Switch>
						<Route path="/login" component={Login} exact />
						<Route path="/newacc" component={NewAcc} exact />
						<Route path="/upload" component={Upload} exact />
						<Route path="/uploadtwo" component={UploadTwo} exact />
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
