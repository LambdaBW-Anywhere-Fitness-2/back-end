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
} = require("../middlewares/checkInfo-midd.js");
const { findInstructorByEmail } = require("../Routes/instructor-model");

///client sign up
router.post("/signup/client", (req, res) => {
  const clientInfo = req.body;

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
///client & instructor sign in and return JWT
router.post("/signin", async (req, res) => {
  const Info = req.body;
  let clientInfo;
  let instructorInfo;
  if (infoIsValidClientSignin(Info)) {
    try {
      [clientInfo] = await dbClient.findClientByEmail(Info.email);
      [instructorInfo] = await dbInstructor.findInstructorByEmail(Info.email);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Server Error Try Again Later", error: err });
    }

    if (clientInfo) {
      if (Info && bcryptjs.compareSync(Info.password, clientInfo.password)) {
        const token = generateToken(clientInfo);
        res.status(200).json({
          message: "Login Successful",
          client_id: clientInfo.id,
          role_id: 1,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else if (instructorInfo) {
      if (
        Info &&
        bcryptjs.compareSync(Info.password, instructorInfo.password)
      ) {
        const token = generateToken(instructorInfo);
        res.status(200).json({
          message: "Login Successful",
          instructor_id: instructorInfo.id,
          role_id: 123,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  } else {
    res.status(404).json({
      message: "please provide email and password (String) ",
    });
  }
});

// --------- INSTRUCTOR---------////

router.post("/signup/instructor", (req, res) => {
  const instructorInfo = req.body;

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

function generateToken(info) {
  const payload = {
    subject: info.id,
    email: info.email,
    role_id: info.role_id,
  };

  const options = {
    expiresIn: "4h",
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
