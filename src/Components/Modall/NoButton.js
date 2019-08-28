import React from "react";
import Modal from "react-responsive-modal";

const NoButton = props => {
  const {open, setOpen, children} = props;

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} little={false}>
        <div className="container p-4">
          <div className="">
            <div>{children}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NoButton;
