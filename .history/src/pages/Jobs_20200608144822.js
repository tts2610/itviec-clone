import React, { Component } from "react";
import axios from "axios";
import Row from "react-bootstrap";

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
    return (
      <div>
        {jobList.map((job, index) => {
          return <Row key={index}></Row>;
        })}
      </div>
    );
  }
}
