import React, { Component } from "react";
import Header from "./Header/Header";
import UserInput from "./Input/UserInput";
import { withStyles } from "@material-ui/core/styles";
import { addParitcipant, addEvents } from "../Axios/Axios";
import { FormHelperText } from "@material-ui/core";
import EventInput from "./Input/EventInput";
const styles = theme => ({
  border: {
    width: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    margin: "2% 10%",
    borderBottom: "ridge"
  }
});

class LandingPage extends Component {
  state = {
    tabname: "Participant Registration",
    glberr: "",
    tabs: 0,
    participant: {}
  };
  addParticipant = data => {
    addParitcipant(
      data.name,
      data.institution,
      data.contact,
      data.email,
      data.level,
      (err, data) => {
        console.log(data);
        if (data && data.success) {
          this.setState(
            {
              tabname: "Event Registration",
              glberr: "",
              participant: data.participant
            },
            () => {
              this.setState({ tabs: 1 });
            }
          );
        } else {
          this.setState({ glberr: "Internal Server Error" });
        }
      }
    );
  };
  addEvents = (individualEvents, teamEvents, id) => {
    addEvents(
      individualEvents,
      teamEvents,
      id,
      this.state.participant,
      (err, data) => {
        if (data.success) {
          this.setState({
            tabname: "Event Registration Completed",
            glberr: "",
            tabs: -1
          });
        } else {
          this.setState({ glberr: err.msg });
        }
      }
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <div className={classes.border}>
          <div style={{ margin: "1% 5%" }}>{this.state.tabname}</div>
        </div>
        {this.state.tabs === 0 && (
          <UserInput
            addParitcipant={this.addParticipant}
            glberr={this.state.glberr}
          />
        )}
        {this.state.tabs === 1 && (
          <EventInput
            addEvents={this.addEvents}
            glberr={this.state.glberr}
            participant={this.state.participant}
          />
        )}
        {this.state.tabs === -1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <FormHelperText
              id="component-error-text"
              style={{ color: "green", fontSize: 30 }}
            >
              Your Registration is completed successfully. Your admit card will
              be sent to your mail very soon.
            </FormHelperText>
          </div>
        )}

        <div className={classes.border} />
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
