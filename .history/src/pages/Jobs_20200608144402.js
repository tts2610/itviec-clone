import React, { Component } from "react";
import axios from 'axios';

export default class Jobs extends Component {
  state={
    jobList:[]
  }
  componentDidMount() {
    axios.get("http://localhost:3001/jobs/")
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }
  return <div>This is job page</div>;
}
