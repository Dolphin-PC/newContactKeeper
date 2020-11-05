import React, { Fragment } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

import { CircularProgress } from "@material-ui/core";

const Contacts = () => {
   const contactContext = useContext(ContactContext);

   const { contacts, filtered, getContact, loading } = contactContext;

   useEffect(() => {
      getContact();
   }, []);

   if (contacts !== null && contacts.length === 0 && !loading) {
      return <h4>Please Add a Contact</h4>;
   }
   return (
      <Fragment>
         {contacts !== null && !loading ? (
            <TransitionGroup>
               {filtered !== null
                  ? filtered.map((contact) => (
                       <CSSTransition
                          key={contact._id}
                          timeout={500}
                          classNames="item"
                       >
                          <ContactItem contact={contact} key={contact._id} />
                       </CSSTransition>
                    ))
                  : contacts.map((contact) => (
                       <CSSTransition
                          key={contact._id}
                          timeout={500}
                          classNames="item"
                       >
                          <ContactItem contact={contact} key={contact._id} />
                       </CSSTransition>
                    ))}
            </TransitionGroup>
         ) : (
            <CircularProgress />
         )}
      </Fragment>
   );
};

export default Contacts;
