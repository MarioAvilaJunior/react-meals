import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (): JSX.Element => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const Modal = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const portalElement = document.getElementById("overlays") as HTMLElement;
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
