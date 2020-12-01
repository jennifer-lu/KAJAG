import logo from './logo.svg';
import './App.css';
import Login from "./Login.js"
import Upload from "./Upload.js"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={Login} exact />
				<Route path="/upload" component={Upload} exact />
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
