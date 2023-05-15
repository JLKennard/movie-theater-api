const { Router } = require("express");
const router = Router();
const { Show, User } = require("../models/index");

// TODO: More effective error handeling

// GET all shows
router.get("/", async (req, res, next) => {
  try {
    const show = await Show.findAll();
    res.json(show);
  } catch (err) {
    next(err);
  }
});

// GET show at ID
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const showAtId = await Show.findByPk(id);

    // Throws error passes to next
    if (!showAtId) {
      throw new Error("Show not found");
    }
    res.json(showAtId);
  } catch (err) {
    next(err);
  }
});

// GET shows of a particular genre
// Should I throw error is no genre found, maybe now show with genre yet?
router.get("/genres/:genre", async (req, res, next) => {
  try {
    const genre = req.params.genre;

    // capitalised fist letter of genre to match db
    const capitalised = genre[0].toUpperCase() + genre.slice(1);

    const showAtGenre = await Show.findAll({
      where: { genre: capitalised },
    });

    res.json(showAtGenre);
  } catch (err) {
    next(err);
  }
});

// GET shows users
// GET all users that watch show at id
router.get("/:id/users", async (req, res, next) => {
  try {
    const id = req.params.id;
    // include gets data from shows table that relates to shows
    const show = await Show.findByPk(id, { include: User });

    // Throws error passes to next
    if (!show) {
      throw new Error("Show not found");
    }

    // Runs if show found
    res.json(show.users);
  } catch (err) {
    next(err);
  }
});

// TODO
// PUT update rating of a show that has been watched
// Updates rating of show 0 - 5, how to make an average?
// Show has to have been watched, rating has to be updated

router.put("/:id/watched", async (req, res, next) => {
  const id = req.params.id;
  const showAtId = await Show.findByPk(id, { include: User });
  const currentRating = showAtId.rating;
  const userCount = showAtId.users.length;

  // Current rating * userCount = total of ratings
  // total of rating + new ratng = new total
  // userCount incremented
  // new total / userCount Math to round rating

  // Check if user has watched before rating?

  // How to track previous rating number?

  // Rating Model?

  res.json(userCount);
});

// PUT update the status of a show
// if canceled = on-going if on-going = canceled

router.put("/:id/updates", async (req, res, next) => {
  const id = req.params.id;
  const showAtId = await Show.findByPk(id);

  // Throws error passes to next
  if (!showAtId) {
    throw new Error("Show not found");
  }

  // checks if status is on-going/canclled and updates sends res
  const status = showAtId.status;
  if (status == "on-going") {
    await showAtId.update({ status: "canceled" });
    res.send("Show is now canceled");
  } else {
    await showAtId.update({ status: "on-going" });
    res.send("Show is now on-going");
  }
});

// DELETE a show
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const showAtId = await Show.findByPk(id);

  // Throws error passes to next
  if (!showAtId) {
    throw new Error("Show not found");
  }

  await showAtId.destroy();
  res.send(`${showAtId.title} has been deleted`);
});

module.exports = router;
