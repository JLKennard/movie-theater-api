const { Router } = require("express");
const router = Router();
const { User, Show } = require("../models/index");

// TODO: Do not send the password in the response.

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userAtId = await User.findByPk(id);
    res.json(userAtId);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
