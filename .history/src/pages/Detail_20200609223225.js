import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import Moment from "react-moment";

export default function Detail() {
  const [job, setJob] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const getDetailData = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs/${id}`)
      .then((res) => {
        const jobs = res.data;
        console.log(jobs);
        setJob(jobs);
      });

    setTimeout(() => setIsLoading(false), 2000);
  };

  useEffect(() => {
    getDetailData();
  }, []);
  if (job != null) {
    if (isLoading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      );
    }
    return (
      <div>
        <Container className="mt-5">
          <div className="detail-content py-5 px-5">
            <Row>
              <Col sm={3}>
                <img src={process.env.PUBLIC_URL + `${job.img}`} alt="" />
              </Col>
              <Col sm={9}>
                <Row style={{ justifyContent: "space-between" }}>
                  <h1>{job.title}</h1>
                </Row>
                <Row style={{ justifyContent: "space-between" }}>
                  <div>
                    {job.tags.map((tag, index) => (
                      <Button className="mr-3" key={index} variant="danger">
                        {tag}
                      </Button>
                    ))}
                  </div>
                </Row>
                <Row>
                  <h6 className="text-secondary mt-3">
                    <i className="far fa-dollar-sign"></i> {job.salary}
                  </h6>
                </Row>
                <Row style={{ marginBottom: "-4px" }}>
                  <h6 className="text-secondary">
                    <i class="fal fa-map-marker-check"></i> District{" "}
                    {job.district}, {job.city} city
                  </h6>
                </Row>
                <Row className="mb-4">
                  <div style={{ color: "blue" }}>
                    <i class="fad fa-calendar"></i>{" "}
                    <Moment fromNow>
                      <h4 className="text-secondary">{job.time}</h4>
                    </Moment>
                  </div>
                </Row>
                <Row>
                  <h2>Benefits</h2>
                </Row>
                <Row
                  className="desRow"
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <ul>
                      {job.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </Row>
                <Row>
                  <h2>Description</h2>
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
                </Row>
                <Row className="mt-3">
                  <Button style={{ width: "100%" }} variant="danger">
                    Apply now
                  </Button>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  } else {
    return <></>;
  }
}
