import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import AuthContext from "../context/auth/authContext";
import ContactContext from "../context/contact/contactContext";
import { useContext } from "react";

const Navbar = ({ title, icon }) => {
   const authContext = useContext(AuthContext);
   const contactContext = useContext(ContactContext);

   const { isAuthenticated, user, logOut } = authContext;
   const { clearContacts } = contactContext;

   const AuthLink = () => {
      return (
         <Fragment>
            <li>Hello, {user && user.name}</li>
            <li>
               <a href="#!" onClick={logOut}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="hide-sm" onClick={clearContacts}>
                     Logout
                  </span>
               </a>
            </li>
         </Fragment>
      );
   };

   const GuestLink = () => {
      return (
         <Fragment>
            <li>
               <Link to="/register">Register</Link>
            </li>
            <li>
               <Link to="/login">Login</Link>
            </li>
         </Fragment>
      );
   };
   return (
      <div className="navbar bg-primary">
         <h1>
            <i className={icon} />
            &ensp;{title}
         </h1>
         <ul>{isAuthenticated ? <AuthLink /> : <GuestLink />}</ul>
      </div>
   );
};

Navbar.propTypes = {
   title: PropTypes.string.isRequired,
   icon: PropTypes.string,
};

Navbar.defaultProps = {
   title: "Contact Keeper",
   icon: "fas fa-id-card-alt",
};

export default Navbar;
