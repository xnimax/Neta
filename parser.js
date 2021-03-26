const parse = require("html-dom-parser");
function parseDom(htmlString) {
  try {
    return parse(htmlString);
  } catch (error) {
    return false;
  }
}
module.exports = parseDom;
