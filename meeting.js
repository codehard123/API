const express = require("express");
const router = express.Router();
const Meeting = require("./model_meeting");
const mongoose = require("mongoose");

router.get("/:meetingId", (req, res, next) => {
  const id = req.params.meetingId;
  Meeting.findById(id)
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
  console.log("Hell");

  const id = req.query.participant;
  const start = req.query.start;
  const end = req.query.end;
  console.log(id);
  if (id == undefined) {
    Meeting.find()
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
  } else {
    Meeting.find({}, (err, foundData) => {
      var responseObject = [];
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (foundData.length != 0) {
          console.log(foundData);
          responseObject = foundData.filter(
            (item) => item.participants.indexOf(id) != -1
          );
        }
        res.status(200).json({ meeting: responseObject });
      }
    });
  }

  if (end > start) {
    Meeting.find({}, (err, foundData) => {
      var responseObject = [];
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (foundData.length != 0) {
          console.log(foundData);
          responseObject = foundData.filter((item) => {
            item.startTime >= start && item.endTime <= end;
          });
        }
        res.status(200).json({ meeting: responseObject });
      }
    });
  }
});

router.post("/", (req, res, next) => {
  const meeting = new Meeting({
    _id: new mongoose.Types.ObjectId(),
    participants: req.body.participants,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    creationTime: req.body.creationTime,
    price: req.body.price,
  });
  meeting
    .save()
    .then((result) => {
      console.log(result);
    }) //method to save data on mongose server
    .catch((err) => console.log(err));
  res.status(201).json({
    message: "Meeting created",
    createdMeeting: meeting,
  });
});
module.exports = router;
