const { Router } = require("express");
const router = Router();
const { User, Show } = require("../models/index");
const { or } = require("sequelize");

// TODO: More effective error handeling
// TODO: Do not send the password in the response.

// GET all users
// Should I thow an error id no users found, there may not be any users yet.
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET one user
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userAtId = await User.findByPk(id);

    // Throws error passes to next
    if (!userAtId) {
      throw new Error("User not found");
    }

    // Runs if user at id found
    res.json(userAtId);
  } catch (err) {
    next(err);
  }
});

// GET all shows watched by a user
router.get("/:id/shows", async (req, res, next) => {
  try {
    const id = req.params.id;
    // include gets data from shows table that relates to user
    const user = await User.findByPk(id, { include: Show });

    // Throws error passes to next
    // Do I need to thow an error if no shows, maybe has not watched shows yet?
    if (!user) {
      throw new Error("User not found");
    }

    // Runs if user and show found
    res.json(user.shows);
  } catch (err) {
    next(err);
  }
});

//PUT adds a show to a user if they have watched it
router.put("/:id/shows/:showId", async (req, res, next) => {
  try {
    const { id, showId } = req.params;
    const user = await User.findByPk(id);
    const show = await Show.findByPk(showId);

    // Throws error passes to next
    if (!user) {
      throw new Error("User not found");
    }
    if (!show) {
      throw new Error("Show not found");
    }

    // Runs if user and show found
    await user.addShow(show);
    res.send("Show added to user's watch list");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
