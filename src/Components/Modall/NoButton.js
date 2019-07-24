import React, {useState, useEffect} from "react";
import Modal from "react-responsive-modal";

const NoButton = props => {
  const {open, setOpen, content} = props;

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  /**
   * Recebe um json e mostra os valores em divs
   * @param {*} value
   */
  const pretifyWindow = value => {
    const mapp = Object.keys(value).map(key => {
      if (!key.match(/id|x|y/gm)) {
        return (
          <div key className="">
            <span style={{fontWeight: "bold"}}>
              {key.replace(/_/gm, " ")}
            </span>
            {": "}
            {key === "em_operacao"
              ? value[key]
                ? "SIM"
                : "NÃO"
              : value[key]}
          </div>
        );
      }
      return null;
    });

    return mapp;
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} little={false}>
        <div className="container mt-4 p-4">
          <div className="mt-4 pt-4">
            <>
              <div>{content()}</div>
            </>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NoButton;
