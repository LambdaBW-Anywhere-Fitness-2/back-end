const router = require("express").Router();
const dbInstructor = require("./instructor-model");
const checkJWT = require("../middlewares/restricted-midd");

router.get("/", checkJWT, async (req, res) => {
  try {
    const data = await dbInstructor.findAllInstructor();
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ err: "Couldn't find any instructor" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

module.exports = router;
