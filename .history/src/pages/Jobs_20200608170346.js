import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Button, Container } from "react-bootstrap";
import Moment from "react-moment";

export default class Jobs extends Component {
  state = {
    jobList: [],
  };
  componentDidMount() {
    console.log(`${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs`);
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs`)
      .then((res) => {
        const jobs = res.data;
        this.setState({ jobList: jobs });
      });
  }
  render() {
    return (
      <div>
        <Container>
          {this.state.jobList.map((job, index) => {
            return (
              <Row key={index} className="mb-5">
                <Col sm={2}>
                  <img src={process.env.PUBLIC_URL + `${job.img}`} alt="" />
                </Col>
                <Col sm={10}>
                  <Row style={{ justifyContent: "space-evenly" }}>
                    <h1>{job.title}</h1>
                    <div>Hot job</div>
                  </Row>
                  <Row>
                    <h2>${job.salary}</h2>
                  </Row>
                  <Row
                    className="desRow"
                    style={{ justifyContent: "space-evenly" }}
                  >
                    <div>
                      <ul>
                        {job.description.split(". ").map((des, index) => {
                          return <li key={index}>{des}</li>;
                        })}
                      </ul>
                    </div>

                    <div>
                      <div>{job.city}</div>
                      <div>district {job.district}</div>
                    </div>
                  </Row>
                  <Row style={{ justifyContent: "space-evenly" }}>
                    <div>
                      {job.tags.map((tag, index) => (
                        <Button className="ml-3" key={index} variant="danger">
                          {tag}
                        </Button>
                      ))}
                    </div>

                    <div>
                      <Moment fromNow>{job.time}</Moment>
                    </div>
                  </Row>
                </Col>
              </Row>
            );
          })}
        </Container>
      </div>
    );
  }
}
