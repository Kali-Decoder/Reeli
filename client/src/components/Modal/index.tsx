import React from 'react';
import styled from 'styled-components';

const ModalStyled = styled.div`
  position: absolute;
  top: 0;
  right: 0px; /* Adjust this based on your layout */
  width: 300px;
  height: 100%;
  background: #333;
  color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transition: right 0.3s ease;
  z-index: 1000;

  &.open {
    right: 0;
  }

  .modal-content {
    padding: 2rem;
    h3 {
      margin-bottom: 1rem;
    }
    button {
      margin-top: 1rem;
      background: #555;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      &:hover {
        background: #777;
      }
    }
  }
`;

const Modal = ({ title, content, onClose, isOpen }) => (
  <ModalStyled className={isOpen ? 'open' : ''}>
    <div className="modal-content">
      <h3>{title}</h3>
      {content}
      <button onClick={onClose}>Close</button>
    </div>
  </ModalStyled>
);

export default Modal;
