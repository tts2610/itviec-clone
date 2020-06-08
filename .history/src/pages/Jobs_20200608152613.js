import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Button, Container } from "react-bootstrap";

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
        <Container>
          {this.state.jobList.map((job, index) => {
            return (
              <Row key={index} className="mb-5">
                <Col sm={2}>
                  <img src={process.env.PUBLIC_URL + `${job.img}`} alt="" />
                </Col>
                <Col sm={10}>
                  <Row style={{ justifyContent: "space-between" }}>
                    <h1>{job.title}</h1>
                    <div>Hot job</div>
                  </Row>
                  <Row>
                    <h2>${job.salary}</h2>
                  </Row>
                  <Row style={{ justifyContent: "space-between" }}>
                    <ul>
                      {job.description.split(". ").map((des, index) => {
                        return (
                          <li
                            key={index}
                            style={{
                              display: "block",
                              whiteSpace: "nowrap",
                              width: "80%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {des}
                          </li>
                        );
                      })}
                    </ul>
                    <div>{job.city}</div>
                    <div>district {job.district}</div>
                  </Row>
                  <Row style={{ justifyContent: "space-between" }}>
                    {job.tags.map((tag, index) => (
                      <Button className="ml-3" key={index} variant="danger">
                        {tag}
                      </Button>
                    ))}
                    <div>{job.time}</div>
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
