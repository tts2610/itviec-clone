import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Button,
  Container,
  Navbar,
  Nav,
  Form,
  Spinner,
  NavDropdown,
} from "react-bootstrap";
import Moment from "react-moment";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
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

  const signOut = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    window.location.reload();
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
          minHeight: "250px",
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
          <Navbar.Brand href="/" style={{ minHeight: "50px" }}>
            <img src={process.env.PUBLIC_URL + "images/itviec.png"} alt="" />
          </Navbar.Brand>
          <Nav style={{ color: "white", fontWeight: "500" }}>
            <Nav.Link href="/">All Jobs</Nav.Link>
            <Nav.Link href="/">IT Companies</Nav.Link>
            <Nav.Link href="/">Blog</Nav.Link>
            {user.email !== "" ? (
              <NavDropdown title={user.email} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.2">
                  User Info
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={(e) => signOut(e)}>
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </Nav>
        </Row>
        <Row>
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
                placeholder="Keyword skill (Java,iOS...), Job Title, Company..."
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
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner className="mt-5" animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      ) : (
        <Container className="jobRows  mb-5">
          {jobList.map((job, index) => {
            return (
              <Row
                key={index}
                id="rowJob"
                className="job"
                onClick={() => {
                  dispatch({ type: "MOVETOPAGE", payload: job.id });
                  history.push(`/jobs/${job.id}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <Col sm={3}>
                  <img src={process.env.PUBLIC_URL + `${job.img}`} alt="" />
                </Col>
                <Col sm={9}>
                  <Row style={{ justifyContent: "space-between" }}>
                    <h2>{job.title}</h2>
                    {job.isHotjob && (
                      <Button variant="warning" className="mr-3">
                        Hot job
                      </Button>
                    )}
                  </Row>
                  <Row>
                    <h4 className="text-muted">${job.salary}</h4>
                  </Row>
                  <Row
                    className="desRow"
                    style={{ justifyContent: "space-between" }}
                  >
                    <ul>
                      {job.description.split(". ").map((des, index) => {
                        return <li key={index}>{des}</li>;
                      })}
                    </ul>

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
      )}
    </div>
  );
}
