const scrollTo = (elID, offset = 96) => {
  if (elID) {
    globalThis.scrollTo({
      top: document.getElementById(elID).offsetTop + offset,
      behavior: 'smooth',
    });
  }
};

export default scrollTo;
