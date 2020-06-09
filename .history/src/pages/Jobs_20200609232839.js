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
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
let originalList = [];
export default function Jobs() {
  let history = useHistory();
  let query = useQuery();
  const [jobList, setJobList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));

  const handleSearch = (e) => {
    setIsLoading(true);
    let filteredJobs = [];
    if (e) {
      e.preventDefault();
      history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
    }

    if (keyword) {
      if (jobList.length === 0) {
        setJobList(originalList);
      }
      setKeyword(keyword);
      filteredJobs = originalList.filter((job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setJobList(filteredJobs);
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleOnChange = (e) => {
    if (e.target.value === "") {
      setIsLoading(true);
      if (originalList.length !== 0) {
        setJobList(originalList);
      }

      history.replace("/jobs/");
      setTimeout(() => setIsLoading(false), 1000);
    }
    setKeyword(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs`)
      .then((res) => {
        const jobs = res.data;
        originalList = jobs;
        setJobList(jobs);
        handleSearch();
      });
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div>
      <Navbar
        style={{
          height: "250px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
        }}
        variant="dark"
      >
        <Row
          className="mb-5"
          style={{
            width: "80%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Navbar.Brand href="/">
            <img
              height="50"
              src={process.env.PUBLIC_URL + "images/itviec.png"}
              alt=""
            />
          </Navbar.Brand>
          <Nav style={{ color: "white", fontWeight: "200" }}>
            <Nav.Link href="/">All Jobs</Nav.Link>
            <Nav.Link href="/">IT Companies</Nav.Link>
            <Nav.Link href="/">Blog</Nav.Link>
            <Nav.Link href="/">Sign in</Nav.Link>
          </Nav>
        </Row>
        <Row>
          {/* <Form onSubmit={handleSearch} inline>
            <FormControl
              value={keyword}
              onChange={(e) => handleOnChange(e)}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button type="submit" variant="outline-info">
              Search
            </Button>
          </Form> */}
          <Form onSubmit={handleSearch} inline>
            <div className="form-group has-search">
              <span
                className="fa fa-search form-control-feedback"
                style={{ marginTop: "2px" }}
              ></span>
              <input
                value={keyword}
                onChange={(e) => handleOnChange(e)}
                type="text"
                placeholder="Search"
                className="form-control"
              ></input>
            </div>
            <div
              className="px-3 ml-3 cityBox"
              style={{
                display: "flex",
                alignItems: "center",
                color: "#6c757d",
              }}
            >
              <i className="fal fa-map-marker-check mr-2"></i>Ho Chi Minh city
            </div>
            <Button
              className="ml-3"
              type="submit"
              variant="danger"
              style={{ height: "60px", width: "150px", fontWeight: "bolder" }}
            >
              Search
            </Button>
          </Form>
        </Row>
      </Navbar>
      <Container className="jobRows my-5">
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner animation="border" role="status">
              <span className="sr-only"></span>
            </Spinner>
          </div>
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
      </Container>
    </div>
  );
}
