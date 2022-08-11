export default function Modal (type, msg, closeModal) {

  return (
    <div className={classes.backdrop} onClick={closeModal}>
      <div className={classes.modal}>
        <div className={classes.close} onClick={closeModal}></div>
        <h2>MESSAGE BIEN ENVOYE</h2>
      </div>
    </div>
  );
}
