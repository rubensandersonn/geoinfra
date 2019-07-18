import React, {useState} from "react";
import Modal from "react-responsive-modal";

const Modall = props => {
  const {buttonValue, content} = props;
  const [open, setOpen] = useState(false);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={onOpenModal}>{buttonValue}</button>
      <Modal open={open} onClose={onCloseModal} little={false}>
        <div className="container mt-4 p-4">
          <div className="mt-4 pt-4">{content()}</div>
        </div>
      </Modal>
    </div>
  );
};

export default Modall;
