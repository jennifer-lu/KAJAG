import logo from './logo.svg';
import './App.css';
import Login from "./Login.js"
import NewAcc from "./NewAcc.js"
import Upload from "./Upload.js"
import ListSub from "./ListSub.js"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
require("dotenv").config();
function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={Login} exact />
				<Route path="/newacc" component={NewAcc} exact />
				<Route path="/upload" component={Upload} exact />
				<Route path="/listsub" component={ListSub} exact />
				<Redirect to="/" />
			</Switch>
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
