import React, { useContext, useEffect, useRef } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
   const contextContact = useContext(ContactContext);
   const text = useRef("");
   const { filterContact, clearFilter, filtered } = contextContact;

   useEffect(() => {
      if (filtered === null) {
         text.current.value = "";
      }
   });
   const onChange = (e) => {
      if (text.current.value != "") {
         filterContact(e.target.value);
      } else {
         clearFilter();
      }
   };

   return (
      <form>
         <input
            ref={text}
            type="text"
            placeholder="Filter Contacts..."
            onChange={onChange}
         />
      </form>
   );
};

export default ContactFilter;
