import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import Moment from "react-moment";

export default function Detail() {
  const [job, setJob] = useState();
  const { id } = useParams();
  const getDetailData = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs/${id}`)
      .then((res) => {
        const jobs = res.data;
        console.log(jobs);
        setJob(jobs);
      });
  };

  useEffect(() => {
    getDetailData();
  }, []);
  if (job != null)
    return (
      <div>
        <Container className="mt-5">
          <div className="detail-content pt-5">
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
                      <Button className="ml-3" key={index} variant="danger">
                        {tag}
                      </Button>
                    ))}
                  </div>
                </Row>
                <Row>
                  <h2>${job.salary}</h2>
                </Row>
                <Row>
                  <h2>{job.city}</h2>
                </Row>
                <Row>
                  <div className="mr-3">
                    <Moment fromNow>{job.time}</Moment>
                  </div>
                </Row>
                <Row>
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
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
          </div>
        </Container>
      </div>
    );
  else {
    return <></>;
  }
}
