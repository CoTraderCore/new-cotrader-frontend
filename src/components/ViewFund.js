import React from "react";
import { useParams } from "react-router-dom";
const ViewFund = (props) => {
  const { address } = useParams();
  return <div>Address: {address}</div>;
};

export default ViewFund;
