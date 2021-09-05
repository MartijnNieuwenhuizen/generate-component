module.exports = (myStr) =>
  myStr.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
