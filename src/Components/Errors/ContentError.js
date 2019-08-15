import React from "react";

// import { Container } from './styles';

export default function ContentError(props) {
  const {msg} = props;
  return (
    <div>
      <img src={require("../../utils/images/alert.png")} />
      {msg}
    </div>
  );
}
