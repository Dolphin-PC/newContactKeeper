const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Contact = require("../models/Contact");

// @route       GET api/contact
// @desc        Get all users contacts
// @access      Private
router.get("/", auth, async (req, res) => {
   try {
      const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
      res.json(contacts);
   } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
   }
});

// @route       POST api/contact
// @desc        Add new contact
// @access      Private
router.post("/", [auth, [check("name", "name is required").not().isEmpty()]], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const { name, email, phone, type } = req.body;

   try {
      const newContact = new Contact({
         name,
         email,
         phone,
         type,
         user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
   } catch (err) {
      console.error(err.message);
      res.json(500).send("Server Error");
   }
});

// @route       PUT api/contact/:id
// @desc        Update contact
// @access      Private
router.put("/:id", auth, async (req, res) => {
   try {
      let currentContact = await Contact.findById(req.params.id);

      if (!currentContact) {
         return res.status(404).json({ msg: "Contact not found" });
      }
      if (currentContact.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: "Auth Denied" });
      }

      const { name, email, phone, type } = req.body;

      const ContactField = {};
      if (name) ContactField.name = name;
      if (email) ContactField.email = email;
      if (phone) ContactField.phone = phone;
      if (type) ContactField.type = type;

      currentContact = await Contact.findOneAndUpdate(req.params.id, { $set: ContactField }, { new: true });

      res.json(ContactField);
   } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
   }
});

// @route       DELETE api/contact/:id
// @desc        Delete Contact
// @access      Private
router.delete("/:id", auth, async (req, res) => {
   try {
      let contact = await Contact.findById(req.params.id);

      if (!contact) {
         return res.status(404).json({ msg: "Contact not found" });
      }
      if (contact.user.toString() !== req.user.id) {
         return res.status(401).json({ msg: "Auth Denied" });
      }
      await Contact.findOneAndRemove(req.params.id);

      res.json({ msg: "Contact Remove" });
   } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
   }
});

module.exports = router;
