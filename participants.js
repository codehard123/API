const express = require("express");
const router = express.Router();
const Participant = require("./model_participants");
const mongoose = require("mongoose");

router.get("/:participantId", (req, res, next) => {
  const id = req.params.participantId;
  Participant.findById(id)
    .exec()
    .then((doc) => {
      console.log("From Database", doc);

      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  console.log(id);
});

router.get("/", (req, res, next) => {
  Participant.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const participant = new Participant({
    pid: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    rsvp: req.body.rsvp,
  });
  participant
    .save()
    .then((result) => {
      console.log(result);
    }) //method to save data on mongose server
    .catch((err) => console.log(err));
  res.status(201).json({
    message: "Participant created",
    createdParticipant: participant,
  });
});

module.exports = router;
