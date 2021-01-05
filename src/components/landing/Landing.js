import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 useHistory 
} from 'react-router-dom';
import Registration from './registration/Registration';
import Login from './login/Login';
import Main from './Main';
import Home from '../home/Home';
import Meets from '../meets/Meets';
import Marketplace from '../marketplace/Marketplace';
import Liked from '../likes/Liked';
import Profile from '../profile/Profile';
import Settings from '../settings/Settings';


const Verify = () => {
  const [n, setN] = useState(0)
  let history = useHistory()
  return ( <><input type="number" maxLength="4" value={n} onChange={e=>setN(e.target.value)}/>
          <button onClick={() => {
            fetch('/api/verify?pin='+n, {method:"POST"})
              .then(() => history.push('/home'))
              .catch(console.log)
          }}>check</button></>
           )

}

const Landing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/verify">
          <Verify />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/meets">
          <Meets />
        </Route>
        <Route path="/marketplace">
          <Marketplace />
        </Route>
        <Route path="/likes">
          <Liked />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </Router>
  );
};

export default Landing;
