const { get } = require("axios");
async function getData(url, data) {
  return await get(url, {
    ...data,
  })
    .then((response) => {
      if (!response || !response.data) return false;
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}
module.exports = getData;
