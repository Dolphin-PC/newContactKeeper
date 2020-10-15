import React from "react";
import PropTypes from "prop-types";
import Contacts from "../components/contact/Contacts";
import ContactForm from "../components/contact/ContactForm";
import ContactFilter from "../context/contact/ContactFilter";

const Home = (props) => {
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
