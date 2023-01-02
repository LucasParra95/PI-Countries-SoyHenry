import './App.css';
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
  );
}

export default App;
