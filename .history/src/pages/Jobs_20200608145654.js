import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

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
        {this.state.jobList.map((job, index) => {
          return (
            <Row key={index}>
              <Col sm={2}>
                <img src={process.env.PUBLIC_URL + `${job.img}`} alt="" />
              </Col>
              <Col sm={10}>
                <Row>
                  <h1>{job.title}</h1>
                </Row>
                <Row>
                  <h2>${job.salary}</h2>
                </Row>
                <Row>
                  <ul>
                    {job.description.split(". ").map((des, index) => {
                      return <li key={index}>{des}</li>;
                    })}
                  </ul>
                </Row>
                <Row></Row>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}
