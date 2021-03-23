import React from "react";
import moment from "moment";

export default function FormatJoinedTime(joinedOn) {
  if (joinedOn) {
    return moment(joinedOn).format("MMM D, YYYY");
  }
}
