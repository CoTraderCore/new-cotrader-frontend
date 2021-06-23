import React from "react";
import { useParams } from "react-router-dom";

const ViewFund = (props) => {
  const { address } = useParams();
  
  return <div style={{color: "#14044d"}}>Address: {address}</div>;
};

export default ViewFund;
