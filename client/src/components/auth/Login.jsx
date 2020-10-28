import React, { useContext, useEffect } from "react";
import { useState } from "react";

import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
   const alertContext = useContext(AlertContext);
   const authContext = useContext(AuthContext);

   const { setAlert } = alertContext;
   const { logIn, error, clearErrors, isAuthenticated } = authContext;

   useEffect(() => {
      if (isAuthenticated) {
         props.history.push("/");
      }
      if (error) {
         setAlert(error, "danger");
         clearErrors();
      }
   }, [props.history, isAuthenticated, error]);

   const [user, setUser] = useState({
      email: "",
      password: "",
   });

   const { email, password } = user;

   const onChange = (e) => {
      setUser({
         ...user,
         [e.target.name]: e.target.value,
      });
   };
   const onSubmit = (e) => {
      e.preventDefault();
      if (email === "" || password === "") {
         setAlert("Please insert email and password", "danger");
      } else {
         logIn({
            email,
            password,
         });
      }
   };

   return (
      <div className="form-container">
         <h1>
            Contact Keeper <span className="text-primary">Login</span>
         </h1>
         <form onSubmit={onSubmit}>
            <div className="form-group">
               <label htmlFor="name">Email Address</label>
               <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
               />
            </div>
            <div className="form-group">
               <label htmlFor="name">Password</label>
               <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
               />
            </div>

            <input
               type="submit"
               value="Login"
               className="btn btn-primary btn-block"
               onClick={onSubmit}
            />
         </form>
      </div>
   );
};

export default Login;
