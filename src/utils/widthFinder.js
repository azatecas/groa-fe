const widthFinder = (screenWidth) => {
  if (parseInt(screenWidth) < 599) {
    return true;
  } else {
    return false;
  }
};

export default widthFinder;
