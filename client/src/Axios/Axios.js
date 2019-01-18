import axios from "axios";

export function addParitcipant(name, institution, contact, email, level, cb) {
  axios
    .post("/main/participant", {
      name: name,
      institution: institution,
      contact: contact,
      email: email,
      level: level
    })
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      let error = {
        msg: "Internal Server Error"
      };
      cb(error, null);
    });
}

export function addEvents(individualEvents, teamEvents, cb) {
  axios
    .post("/main/event", {
      teamEvents: teamEvents,
      individualEvents: individualEvents
    })
    .then(res => {
      cb(null, res.data);
    })
    .catch(err => {
      let error = {
        msg: "Internal Server Error"
      };
      cb(error, null);
    });
}
