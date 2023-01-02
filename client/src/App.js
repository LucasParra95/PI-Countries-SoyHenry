import './App.css';
<<<<<<< HEAD
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home.jsx';
import Landing from './components/Landing';
import Detail from './components/Detail';
import ActivityCreate from './components/ActivityCreate';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/home" component={Home}/>
    <Route path="/addActivity" component={ActivityCreate}/>
    <Route path="/home/:id" component={Detail}/>

        </Switch>
      </div>
    </BrowserRouter>
=======

function App() {
  return (
    <div className="App">
      <h1>Henry Countries</h1>
    </div>
>>>>>>> 28eee10edae3e070dabba76d4a5206704cfbb72c
  );
}

export default App;
