const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const dbClient = require("../Routes/client-model");
const dbInstructor = require("../Routes/instructor-model");
const jwt = require("jsonwebtoken");
const secret = require("../config/secretKey.js");
const {
  infoIsValidClient,
  infoIsValidClientSignin,
  infoIsValidInstructor,
  infoIsValidInstructorSignin,
} = require("../middlewares/checkInfo-midd.js");
const { findInstructorByEmail } = require("../Routes/instructor-model");

router.post("/signup/client", (req, res) => {
  const clientInfo = req.body;
  //console.log(clientInfo);
  if (infoIsValidClient(clientInfo)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(clientInfo.password, rounds);
    clientInfo.password = hash;
    dbClient
      .addClient(clientInfo)
      .then(() => {
        res.status(201).json(clientInfo);
      })
      .catch((err) => {
        res.status(500).json({ err: "Server Error", err: err });
      });
  } else {
    res.status(404).json({
      message: "please provide name ,email and password (String) ",
    });
  }
});

router.post("/signin/client", (req, res) => {
  const clientInfo = req.body;
  //console.log(clientInfo);
  if (infoIsValidClientSignin(clientInfo)) {
    dbClient
      .findClientByEmail(clientInfo.email)
      .then(([found]) => {
        //   console.log(found, found.password, clientInfo.password);
        if (
          clientInfo &&
          bcryptjs.compareSync(clientInfo.password, found.password)
        ) {
          const token = generateToken(found);
          res.status(200).json({ message: "Login Successful", token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Server Error Try Again Later", error: err });
      });
  } else {
    res.status(404).json({
      message: "please provide email and password (String) ",
    });
  }
});

// --------- INSTRUCTOR---------////

router.post("/signup/instructor", (req, res) => {
  const instructorInfo = req.body;
  //console.log(clientInfo);
  if (infoIsValidInstructor(instructorInfo)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(instructorInfo.password, rounds);
    instructorInfo.password = hash;
    dbInstructor
      .addInstructor(instructorInfo)
      .then(() => {
        res.status(201).json(instructorInfo);
      })
      .catch((err) => {
        res.status(500).json({ err: "Server Error", err: err });
      });
  } else {
    res.status(404).json({
      message: "please provide valid name ,email, password  , role_id  ",
    });
  }
});

router.post("/signin/instructor", (req, res) => {
  const instructorInfo = req.body;
  //console.log(clientInfo);
  if (infoIsValidInstructorSignin(instructorInfo)) {
    dbInstructor;
    findInstructorByEmail(instructorInfo.email)
      .then(([found]) => {
        // console.log(found, found.password, instructorInfo.password);
        if (
          instructorInfo &&
          bcryptjs.compareSync(instructorInfo.password, found.password)
        ) {
          const token = generateToken(found);
          res.status(200).json({ message: "Login Successful", token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Server Error Try Again Later", error: err });
      });
  } else {
    res.status(404).json({
      message: "please provide valid email and password (String) ",
    });
  }
});

function generateToken(info) {
  const payload = {
    subject: info.id,
    email: info.email,
    role_id: info.role_id,
  };

  const options = {
    expiresIn: "2h",
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
