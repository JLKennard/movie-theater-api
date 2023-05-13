const { Router } = require("express");
const router = Router();
const { User, Show } = require("../models/index");

// TODO: More effective error handeling
// TODO: Do not send the password in the response.

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// GET one user
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userAtId = await User.findByPk(id);
    res.json(userAtId);
  } catch (err) {
    next(err);
  }
});

// GET all shows watched by a user (user id in req.params)
router.get("/:id/shows", async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await User.findByPk(id, { include: Show });
    res.json(user.shows);
  } catch (err) {
    next(err);
  }
});

//PUT update and add a show if a user has watched it

// Add next / error handeling

router.put("/:id/shows/:showId", async (req, res) => {
  const { id, showId } = req.params;
  const user = await User.findByPk(id);
  const show = await Show.findByPk(showId);
  await user.addShow(show);
  res.send("Show added to user's watch list");
});

module.exports = router;
