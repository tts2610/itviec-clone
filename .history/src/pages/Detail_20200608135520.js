import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const getDetailData = async () => {
    let url = "";
    let data = await fetch(url);
    let result = await data.json();
    console.log("show result: ", result);
    console.log("detail");
  };

  useEffect(() => {
    getDetailData();
  });
  return (
    <div>
      <h1>This is detail page</h1>
      <h2>This is id {id}</h2>
    </div>
  );
}
