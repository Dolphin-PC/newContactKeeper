import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
   GET_CONTACTS,
   CLEAR_CONTACTS,
   ADD_CONTACT,
   CLEAR_CURRNET,
   CLEAR_FILTER,
   DELETE_CONTACT,
   FILTER_CONTACTS,
   REMOVE_ALERT,
   SET_ALERT,
   SET_CURRENT,
   UPDATE_CONTACT,
   CONTACT_ERROR,
} from "../types";

const config = {
   headers: {
      "Content-Type": "application/json",
   },
};

const ContactState = (props) => {
   const initialState = {
      contacts: null,
      current: null,
      filtered: null,
      error: null,
   };

   const [state, dispatch] = useReducer(contactReducer, initialState);

   // Get Contacts
   const getContact = async () => {
      try {
         const res = await axios.get("api/contact");

         dispatch({
            type: GET_CONTACTS,
            payload: res.data,
         });
      } catch (err) {
         dispatch({
            type: CONTACT_ERROR,
            payload: err.response.msg,
         });
      }
   };

   // Add Contact
   const addContact = async (contact) => {
      try {
         const res = await axios.post("api/contact", contact, config);

         dispatch({
            type: ADD_CONTACT,
            payload: res.data,
         });
      } catch (err) {
         dispatch({
            type: CONTACT_ERROR,
            payload: err.response.msg,
         });
      }
   };

   // Delete Contact
   const deleteContact = async (id) => {
      try {
         await axios.delete(`api/contact/${id}`);

         dispatch({ type: DELETE_CONTACT, payload: id });
      } catch (err) {
         dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
      }
   };

   // Clear Contact
   const clearContacts = () => {
      dispatch({
         type: CLEAR_CONTACTS,
      });
   };

   // Set Current Contact
   const setCurrent = (contact) => {
      dispatch({ type: SET_CURRENT, payload: contact });
   };

   // Clear Current Contact
   const clearCurrent = () => {
      dispatch({ type: CLEAR_CURRNET });
   };

   // Update Contact
   const updateContact = async (contact) => {
      try {
         const res = await axios.put(
            `api/contact/${contact._id}`,
            contact,
            config
         );

         dispatch({
            type: UPDATE_CONTACT,
            payload: res.data,
         });
      } catch (err) {
         dispatch({
            type: CONTACT_ERROR,
            payload: err.response.msg,
         });
      }
   };

   // Filter Contacts
   const filterContact = (text) => {
      dispatch({ type: FILTER_CONTACTS, payload: text });
   };

   // Clear Filter
   const clearFilter = () => {
      dispatch({ type: CLEAR_FILTER });
   };

   return (
      <ContactContext.Provider
         value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            getContact,
            clearContacts,
         }}
      >
         {props.children}
      </ContactContext.Provider>
   );
};

export default ContactState;
