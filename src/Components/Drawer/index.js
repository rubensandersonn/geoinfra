import React, {memo} from "react";
import Popup from "reactjs-popup";

const Drawer = memo(props => {
  let {Button, content} = props;

  console.log("Drawer:", content);

  return (
    <Popup trigger={Button} position="right center">
      <div className="container">{content()}</div>
    </Popup>
  );
});

export default Drawer;
