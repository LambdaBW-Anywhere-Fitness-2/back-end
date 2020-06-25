const router = require("express").Router();
const dbClient = require("./client-model");
//const dbInstructor = require("./instructor-model");
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

router.get("/class", checkJWT, async (req, res) => {
  try {
    const data = await dbClient.findAllClientClass();
    //console.log("DATA", data);
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

router.get("/:id", checkJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const [data] = await dbClient.findClientById(id);
    const classData = await dbClient.findClientClassById(id);
    data.enrolled_class = classData;

    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ err: "Couldn't find the client" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

router.post("/:id/enrollclass/:cid", checkJWT, async (req, res) => {
  const { id, cid } = req.params;

  const enrollmentinfo = { client_id: id, class_id: cid };

  if (enrollmentinfo.client_id && enrollmentinfo.class_id) {
    console.log("enrollmentinfo", enrollmentinfo);
    try {
      const [data] = await dbClient.enrollclass(enrollmentinfo);
      const classData = await dbClient.findClassById(cid);
      //console.log("enrollmentinfo2", enrollmentinfo);
      if (data) {
        res.status(200).json({ enrolledclass: classData });
      } else {
        res.status(404).json({ err: "Couldn't enroll to class" });
      }
    } catch (err) {
      res.status(500).json({ err: "Server Error", err: err });
    }
  } else {
    res.status(404).json({ err: "client_id or class_id missing" });
  }
});

router.delete("/:id/deleteclass/:cid", checkJWT, async (req, res) => {
  const { id, cid } = req.params;

  try {
    const data = await dbClient.deleteclass(id, cid);

    if (data) {
      res.status(200).json("class deleted successfully");
    } else {
      res.status(404).json({ err: "Couldn't delete the class" });
    }
  } catch (err) {
    res.status(500).json({ err: "Server Error" });
  }
});

module.exports = router;
