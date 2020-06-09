import React, { Component, useEffect, useState } from "react";
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
  Spinner,
} from "react-bootstrap";
import Moment from "react-moment";
import { useHistory, useLocation } from "react-router-dom";
const QUERYSTR_PREFIX = "q";

export default function Jobs() {
  let history = useHistory();
  const [originalList, setoriginalList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    let filteredJobs = [];

    e.preventDefault();
    history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);

    if (keyword) {
      setoriginalList(jobList);
      filteredJobs = jobList.filter((job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
      console.log(filteredJobs);
      setJobList(filteredJobs);
    }
  };

  const handleOnChange = (e) => {
    if (e.target.value === "") {
      setJobList(originalList);
      history.replace("/jobs/");
    }
    setKeyword(e.target.value);
  };

  useEffect(() => {
    // handleSearch();
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs`)
      .then((res) => {
        const jobs = res.data;
        setJobList(jobs);
      });
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

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
          <FormControl
            value={keyword}
            onChange={(e) => handleOnChange(e)}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button variant="outline-info" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </Navbar>
      <Container className="jobRows my-5">
        {isLoading ? (
          <Spinner
            animation="border"
            role="status"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <span className="sr-only"></span>
          </Spinner>
        ) : (
          jobList.map((job, index) => {
            return (
              <Row
                key={index}
                className="mb-5 job"
                onClick={() => history.push(`/jobs/${job.id}`)}
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
          })
        )}
        }
      </Container>
    </div>
  );
}
