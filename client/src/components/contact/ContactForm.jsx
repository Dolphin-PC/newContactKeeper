import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
   const contactContext = useContext(ContactContext);

   const [contact, setContact] = useState({
      name: "",
      email: "",
      phone: "",
      type: "personal",
   });
   const {
      addContact,
      current,
      clearCurrent,
      updateContact,
      getContact,
   } = contactContext;

   useEffect(() => {
      if (current !== null) {
         setContact(current);
      } else {
         setContact({
            name: "",
            email: "",
            phone: "",
            type: "personal",
         });
      }
   }, [current, contactContext]);

   const { name, email, phone, type } = contact;

   const onChange = (e) =>
      setContact({ ...contact, [e.target.name]: e.target.value });

   const onSubmit = (e) => {
      e.preventDefault();
      if (current !== null) {
         updateContact(contact);
         clearCurrent();
      } else {
         addContact(contact);
      }
   };
   return (
      <form onSubmit={onSubmit}>
         <h2 className="text-primary">
            {current ? "Update Contact" : "Add Contact"}
         </h2>
         <input
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={onChange}
         />
         <input
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={onChange}
         />
         <input
            type="text"
            placeholder="phone"
            name="phone"
            value={phone}
            onChange={onChange}
         />
         <h5>Contact Type</h5>
         <input
            type="radio"
            name="type"
            value="personal"
            checked={type === "personal"}
            onChange={onChange}
         />{" "}
         Personal
         <input
            type="radio"
            name="type"
            value="professional"
            checked={type === "professional"}
            onChange={onChange}
         />{" "}
         Professional
         {current ? (
            <div>
               <button
                  className="btn btn-block btn-light"
                  onClick={clearCurrent}
               >
                  Clear
               </button>
            </div>
         ) : (
            ""
         )}
         <div>
            <input
               type="submit"
               value={current ? "Update Contact" : "Add Contact"}
               className="btn btn-primary btn-block"
            />
         </div>
      </form>
   );
};

export default ContactForm;
