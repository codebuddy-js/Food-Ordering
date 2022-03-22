import React, { Fragment } from 'react'
import reactDom from 'react-dom';

import classes from "./Modal.module.css";

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHide}/>;
};

const ModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const portalElement = document.getElementById("overlay");

const Modal = (props) => {
  return (
      <Fragment>
          {reactDom.createPortal(<BackDrop onHide={props.onHide}/>, portalElement)}
          {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </Fragment>
  );
};

export default Modal;
