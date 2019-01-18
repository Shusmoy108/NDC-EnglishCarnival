const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const ParticipantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userid: {
    type: Number,
    required: true,
    unique: true
  },
  institution: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  individualEvent: {
    type: Array
  },
  teamEvent: {
    type: Array
  }
});

ParticipantSchema.statics.insertNewParticipant = (data, cb) => {
  // const { errors, isValid } = mugStockValidators.mugStockInput(data);

  Participant.findOne({ email: data.email }, (err, participant) => {
    if (!participant) {
      const newParticipant = new Participant({
        name: data.name,
        contact: data.contact,
        institution: data.institution,
        email: data.email,
        level: data.level
      });
      newParticipant
        .save()
        .then(participant => {
          return cb(200, null, participant);
        })
        .catch(err => {
          return cb(500, { msg: "Internal server Error" }, null);
          // //console.log(err);
        });
    } else {
      return cb(
        400,
        { msg: "Participant Already Exists"},
        null
      );
    }
  });
};
module.exports = mongoose.model("Participant", ParticipantSchema);
