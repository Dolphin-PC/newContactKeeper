const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

// @route       POST api/user
// @desc        Register a user
// @access      Public
router.post(
   "/",
   [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
   ],
   async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      try {
         // User(mongoose Schema 에서 email을 index로 user가 있는지 찾는다.)
         let user = await User.findOne({ email });

         if (user) {
            // DB에 유저가 이미 있다면, 오류 값과 함께 메시지 전달
            return res.status(400).json({ msg: "user is already exists" });
         }

         user = new User({
            name,
            email,
            password,
         });

         // 자동으로 랜덤값 받음
         const salt = await bcrypt.genSalt(10);

         // 평문 패스워드를 해싱함
         user.password = await bcrypt.hash(password, salt);

         await user.save();

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
         res.status(500).json({ msg: "Server Error!" });
      }
   }
);

module.exports = router;
