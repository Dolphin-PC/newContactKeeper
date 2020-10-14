const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

const User = require("../models/User");

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get("/", auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
   }
});

// @route       POST api/auth
// @desc        AUth user & get token
// @access      Public
router.post(
   "/",
   [
      check("email", "email is required").isEmail(),
      check("password", "password is required").exists(),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      try {
         // ID Check
         const user = await User.findOne({ email });
         if (!user) {
            return res
               .status(400)
               .json({ msg: `Invalid email, not exists ${email}` });
         }

         // Password Check
         const isPasswordMatch = await bcrypt.compare(password, user.password);
         if (!isPasswordMatch) {
            return res.status(400).json({ msg: "password is not matched" });
         }

         // Issued Token
         const payload = {
            user: {
               id: user.id,
            },
         };
         jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
               expiresIn: 3600, // 60*60, 1시간
            },
            (err, token) => {
               if (err) throw err;
               res.json({ token });
            }
         );
      } catch (err) {
         console.error(err.message);
         res.status(500).json({
            msg: "Server Error",
         });
      }
   }
);

module.exports = router;
