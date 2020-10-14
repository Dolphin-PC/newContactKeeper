import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import About from "./views/About";

import ContactState from "./context/contact/ContactState";

function App() {
   return (
      <ContactState>
         <BrowserRouter>
            <Navbar />
            <div className="container">
               <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/About" component={About} />
               </Switch>
            </div>
         </BrowserRouter>
      </ContactState>
   );
}

export default App;
