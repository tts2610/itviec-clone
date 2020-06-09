import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Button, Container } from "react-bootstrap";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";

export default class Jobs extends Component {
  // history = useHistory();
  state = {
    jobList: [],
  };
  // jobSelect = (job) => {
  //   this.history.push(`/job/${job.id}`);
  // };
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
        <Container className="jobRows">
          {this.state.jobList.map((job, index) => {
            return (
              <Row
                key={index}
                className="mb-5 job"
                // onClick={() => this.jobSelect(job.id)}
              >
                <Col sm={3}>
                  <img src={process.env.PUBLIC_URL + `${job.img}`} alt="" />
                </Col>
                <Col sm={9}>
                  <Row style={{ justifyContent: "space-between" }}>
                    <h1>{job.title}</h1>
                    {job.isHotjob && (
                      <Button variant="warning" className="mr-3">
                        Hot job
                      </Button>
                    )}
                  </Row>
                  <Row>
                    <h2>${job.salary}</h2>
                  </Row>
                  <Row
                    className="desRow"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div>
                      <ul>
                        {job.description.split(". ").map((des, index) => {
                          return <li key={index}>{des}</li>;
                        })}
                      </ul>
                    </div>

                    <div
                      className="mr-3"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <div>{job.city}</div>
                      <div>district {job.district}</div>
                    </div>
                  </Row>
                  <Row style={{ justifyContent: "space-between" }}>
                    <div>
                      {job.tags.map((tag, index) => (
                        <Button className="ml-3" key={index} variant="danger">
                          {tag}
                        </Button>
                      ))}
                    </div>

                    <div className="mr-3">
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
