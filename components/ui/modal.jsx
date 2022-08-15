import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import EmailRes from './form/email-res';

import classes from './modal.module.scss';

export default function Modal({ type, comp, closeModal, ok }) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  

  if (isBrowser) {
    return ReactDOM.createPortal(
      <>
      <div className={classes.backdrop} onClick={closeModal}>
      </div>,
      <div className={classes.modalcontainer}>
      <div className={classes.modal}>
          <XIcon className={classes.closebtn} onClick={closeModal} />
          <EmailRes ok={ok}/>
        </div>
      </div>
      </>,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
}
