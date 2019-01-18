const express = require("express");
const mainRouter = express.Router();
const fs = require("fs");
const pdf = require("html-pdf");
const Participant = require("../models/Participant");

mainRouter.post("/participant", function(req, res) {
  console.log(req.body);
  return res.json({ success: true });
  //   Participant.insertNewParticipant(req.body, (status, err, data) => {
  //     if (status === 200) {
  //       return res.json({ success: true, participant: data });
  //     } else {
  //       return res.json({ success: false, err: err });
  //     }
  //   });
});
mainRouter.post("/event", function(req, res) {
    console.log(req.body);
    return res.json({ success: true });
    //   Participant.insertNewParticipant(req.body, (status, err, data) => {
    //     if (status === 200) {
    //       return res.json({ success: true, participant: data });
    //     } else {
    //       return res.json({ success: false, err: err });
    //     }
    //   });
  });
module.exports = mainRouter;
