const scrollTo = elID => {
  globalThis.scrollTo({
    top: document.getElementById(elID).offsetTop + 6 * 16,
    behavior: 'smooth',
  });
};

export default scrollTo;