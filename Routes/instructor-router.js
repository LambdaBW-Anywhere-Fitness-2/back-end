const router = require("express").Router();
const dbInstructor = require("./instructor-model");
const checkJWT = require("../middlewares/restricted-midd");

////   returns all instructor
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

////   returns instructor by id
router.get("/:id", checkJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const [data] = await dbInstructor.findInstructorById(id);
    const classData = await dbInstructor.findInstructorClassesById(id);
    data.created_class = classData;

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ err: "Couldn't find the instructor" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

////   returns created class instructor
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

////   returns updated class by instructor
router.put("/updateclass/:id", checkJWT, async (req, res) => {
  const { id } = req.params;
  const updateclass = req.body;

  try {
    const [data] = await dbInstructor.updateclass(updateclass, id);

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ err: "Couldn't update the class" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

////   returns delete class by instructor
router.delete("/deleteclass/:id", checkJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const [data] = await dbInstructor.deleteclass(id);

    if (data) {
      res.status(200).json({ "deleted class successfully": data });
    } else {
      res.status(404).json({ err: "Couldn't delete the class" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

module.exports = router;
