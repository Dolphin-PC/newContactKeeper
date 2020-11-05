const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

// Connect MongoDataBase
connectDB();

app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
   // Set static folder
   app.use(express.static("client/build"));

   app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
   );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
