import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import About from "./views/About";

import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/Alerts";

import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
   setAuthToken(localStorage.token);
}

function App() {
   return (
      <AuthState>
         <ContactState>
            <AlertState>
               <BrowserRouter>
                  <Navbar />
                  <div className="container">
                     <Alerts />
                     <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/About" component={About} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                     </Switch>
                  </div>
               </BrowserRouter>
            </AlertState>
         </ContactState>
      </AuthState>
   );
}

export default App;
