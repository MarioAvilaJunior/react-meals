import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = ({ onClick }: { onClick: () => void }): JSX.Element => {
  return <div className={classes.backdrop} onClick={onClick} />;
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

interface IModalProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Modal = ({ children, onClick }: IModalProps): JSX.Element => {
  const portalElement = document.getElementById("overlays") as HTMLElement;
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={onClick} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
