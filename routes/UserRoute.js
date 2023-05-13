const { Router } = require("express");
const router = Router();
const { User, Show } = require("../models/index");
const { or } = require("sequelize");

// TODO: More effective error handeling
// TODO: Do not send the password in the response.

// Do i need to thow an error in try block?

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

    // Thows error, res 404 and sends res message if no user at id
    if (!userAtId) {
      res.status(404).send("User not found");
    }

    // Runs if user at id found
    res.json(userAtId);
  } catch (err) {
    next(err);
  }
});

// GET all shows watched by a user (user id in req.params)
router.get("/:id/shows", async (req, res, next) => {
  try {
    const id = req.params.id;
    // include gets data from shows table that relates to user
    const user = await User.findByPk(id, { include: Show });

    // Thows error, res 404 and error message if no user
    // Do I need to thow an error if no shows, maybe has not watched shows yet?
    if (!user) {
      res.status(404).send("User not found");
    }

    // Runs if user and show found
    res.json(user.shows);
  } catch (err) {
    next(err);
  }
});

//PUT update and add a show if a user has watched it

router.put("/:id/shows/:showId", async (req, res, next) => {
  try {
    const { id, showId } = req.params;
    const user = await User.findByPk(id);
    const show = await Show.findByPk(showId);

    // Thows error, res 404 and sends res message if no user/ show found
    if (!user) {
      res.status(404).send("User not found");
    }
    if (!show) {
      res.status(404).send("Show not found");
    }

    // Runs if user and show found
    await user.addShow(show);
    res.send("Show added to user's watch list");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
