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

export default (state, action) => {
   switch (action.type) {
      case ADD_CONTACT:
         return {
            ...state,
            contacts: [...state.contacts, action.payload],
         };
      case DELETE_CONTACT:
         return {
            ...state,
            contacts: state.contacts.filter(
               (contact) => contact.id !== action.payload
            ),
         };
      default:
         return state;
   }
};
