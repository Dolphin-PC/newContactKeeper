import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
   ADD_CONTACT,
   CLEAR_CURRNET,
   CLEAR_FILTER,
   DELETE_CONTACT,
   FILTER_CONTACTS,
   REMOVE_ALERT,
   SET_ALERT,
   SET_CURRENT,
   UPDATE_CONTACT,
} from "../types";

const ContactState = (props) => {
   const initialState = {
      contacts: [
         {
            id: 1,
            name: "Jill Johnson",
            email: "jill@gmail.com",
            phone: "111-111-111-1",
            type: "personal",
         },
         {
            id: 2,
            name: "Sara Watson",
            email: "sara@gmail.com",
            phone: "222-222-2222",
            type: "personal",
         },
         {
            id: 3,
            name: "Harry White",
            email: "harry@gmail.com",
            phone: "333-333-333-33",
            type: "professional",
         },
      ],
   };

   const [state, dispath] = useReducer(contactReducer, initialState);

   // Add Contact
   const addContact = (contact) => {
      contact.id = uuid();
      dispath({ type: ADD_CONTACT, payload: contact });
   };

   // Delete Contact
   const deleteContact = (id) => {
      dispath({ type: DELETE_CONTACT, payload: id });
   };

   // Set Current Contact

   // Clear Current Contact

   // Update Contact

   // Filter Contacts

   return (
      <ContactContext.Provider
         value={{
            contacts: state.contacts,
            addContact,
            deleteContact,
         }}
      >
         {props.children}
      </ContactContext.Provider>
   );
};

export default ContactState;
