import React from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  return (
    <div>
      <h1>This is detail page</h1>
      <h2>This is id {id}</h2>
    </div>
  );
}
