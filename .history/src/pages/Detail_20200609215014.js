import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import Moment from "react-moment";

export default function Detail() {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const getDetailData = async () => {
    // let url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs/${id}`;
    // let data = await fetch(url);
    // let result = await data.json();
    // console.log("show result: ", result);
    // console.log("detail");
    // setJob(result);

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
  });
  return (
    <div>
      <Container>
        <h1>This is detail page</h1>
        <h2>This is id {id}</h2>

        <div className="detail-content">
          {/* <Row>
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
          </Row> */}
        </div>
      </Container>
    </div>
  );
}
