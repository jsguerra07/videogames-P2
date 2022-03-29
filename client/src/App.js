import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import GameCreate from "./components/GameCreate";
import Detail from "./components/Detail"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = "/" component = {LandingPage}/>
          <Route path = "/Home/:id" component = {Detail}/>
          <Route path = "/Home" component = {Home}/>
          <Route path = "/game" component = {GameCreate}/>
          
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
