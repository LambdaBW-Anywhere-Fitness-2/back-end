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

/// didnt require JWT for  front-end usage will add later
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  try {
    const [data] = await dbInstructor.findInstructorById(id);
    const classData = await dbInstructor.findInstructorClassesById(id);
    data.created_class = classData;
    // console.log(classData);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ err: "Couldn't find the instructor" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

router.post("/createclass", checkJWT, async (req, res) => {
  const nwclass = req.body;

  try {
    const data = await dbInstructor.createclass(nwclass);
    if (data.length > 0) {
      res.status(200).json(nwclass);
    } else {
      res.status(404).json({ err: "Couldn't create the class!" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

module.exports = router;
