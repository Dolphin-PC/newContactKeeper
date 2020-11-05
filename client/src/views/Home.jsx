import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Contacts from "../components/contact/Contacts";
import ContactForm from "../components/contact/ContactForm";
import ContactFilter from "../context/contact/ContactFilter";
import { useContext } from "react";
import AuthContext from "../context/auth/authContext";

const Home = (props) => {
   const authContext = useContext(AuthContext);

   const { isAuthenticated } = authContext;

   useEffect(() => {
      authContext.loadUser();
   }, []);

   useEffect(() => {
      if (!isAuthenticated) {
         props.history.push("/login");
      }
   }, [props.history, isAuthenticated]);

   return (
      <div className="grid-2">
         <div>
            <ContactForm />
         </div>
         <div>
            <ContactFilter />
            <Contacts />
         </div>
      </div>
   );
};

Home.propTypes = {};

export default Home;
