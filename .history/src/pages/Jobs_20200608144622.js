import React, { Component } from "react";
import axios from "axios";

export default class Jobs extends Component {
  state = {
    jobList: [],
  };
  componentDidMount() {
    axios.get("http://localhost:3001/jobs/").then((res) => {
      const jobs = res.data;
      this.setState({ jobList: jobs });
    });
  }
  render() {
    return <div></div>;
  }
}
