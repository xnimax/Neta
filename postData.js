const axios = require("axios");
async function postData(url, data, token, header) {
  let config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      ...header,
    },
  };
  return await axios
    .post(url, data, config)
    .then((response) => {
      console.log(responses);
      return response.data && response.data;
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}
module.exports = postData;
