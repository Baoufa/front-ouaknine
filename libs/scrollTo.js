const scrollTo = elID => {
  globalThis.scrollTo({
    top: document.getElementById(elID).offsetTop,
    behavior: 'smooth',
  });
};

export default scrollTo;