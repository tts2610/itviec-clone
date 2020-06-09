import React, { Component, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Button,
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
let history = useHistory();

const QUERYSTR_PREFIX = "q";

export default function Jobs() {
  handleSearch = (e) => {
    let filteredJobs = this.state.jobList;
    if (e) {
      e.preventDefault();
      history.push(
        `/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(this.state.keyword)}`
      );
    }
    if (this.state.keyword) {
      alert(this.state.keyword);
      filteredJobs = this.state.jobList.filter((job) =>
        job.title.toLowerCase().includes(this.state.keyword.toLowerCase())
      );
    }
    this.setState({ jobList: filteredJobs });
  };
  state = {
    jobList: [],
    keyword: "",
  };
  const jobSelect = (job) => {
    history.push(`/job/${job.id}`);
  };
  useEffect(() => {
    this.handleSearch();
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs`)
      .then((res) => {
        const jobs = res.data;
        this.setState({ jobList: jobs });
      });
    history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      );
      console.log(`The last navigation action was ${action}`);
    });
  });

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info" onClick={this.handleSearch}>
            Search
          </Button>
        </Form>
      </Navbar>
      <Container className="jobRows my-5">
        {this.state.jobList.map((job, index) => {
          return (
            <Row
              key={index}
              className="mb-5 job"
              onClick={() => jobSelect(job)}
              style={{ cursor: "pointer" }}
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
