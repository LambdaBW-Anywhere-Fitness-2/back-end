const router = require("express").Router();
const dbClient = require("./client-model");
const checkJWT = require("../middlewares/restricted-midd");

router.get("/", checkJWT, async (req, res) => {
  try {
    const data = await dbClient.findAllClient();
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ err: "Couldn't find any client" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

router.get("/", checkJWT, async (req, res) => {
  try {
    const data = await dbClient.findAllClient();
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ err: "Couldn't find any client" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

/// didnt require JWT for  front-end usage will add later

// router.get("/class", checkJWT, async (req, res) => {
router.get("/class", async (req, res) => {
  try {
    const data = await dbClient.findAllClientClass();
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ err: "Couldn't find any class" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

module.exports = router;
