const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const userroutes = require("./routes/user.routes");
const eventroutes = require("./routes/event.routes.js");
const paymnetroutes = require("./routes/payment.routes.js");
const participanteroutes = require("./routes/participate.routes.js");
const volunteerroutes = require("./routes/volunteer.routes.js");
const indexroutes = require("./routes/index.routes");
const ConnectTODB = require("./config/db.ts");
const cookieparser = require("cookie-parser");

dotenv.config();
ConnectTODB();

app.set("view engine", "ejs");
app.use(
  cors({
    origin: ["https://easeevents-cb281.web.app", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.static("public"));
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/", indexroutes);
app.use("/user", userroutes);
app.use("/payment", paymnetroutes);
app.use("/event", eventroutes);
app.use("/participant", participanteroutes);
app.use("/volunteer", volunteerroutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
