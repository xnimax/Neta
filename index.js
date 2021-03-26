const getData = require("./getData");
const domParser = require("./parser");
var colors = require("colors");
const url = "https://join.dev.neta.sh/api/interview-tests/vault-of-sweets";

class Secret {
  tags = [];
  tagAndAmount = {};
  finalString = "";
  url = "";
  constructor(url) {
    this.url = url;
  }
  fetchedData = null;
  async fetch() {
    return await getData(url).then((res) => {
      return domParser(res);
    });
  }

  getTag(element) {
    element.children.forEach((el) => {
      el.name && this.tags.push(this.sanitizeString(el.name));
      if (el.children) this.getTag(el);
    });
  }

  sortArray(arr) {
    return arr.sort();
  }

  makeTagAndAmount(tagArray) {
    let current = null;
    let quantity = 0;
    tagArray.forEach((tag) => {
      if (tag) {
        if (tag === current) {
          quantity++;
        } else {
          current = tag;
          quantity = 1;
        }
        this.tagAndAmount[tag] = quantity;
      }
    });
  }

  sanitizeString(str) {
    str = str.replace("!", "");
    return str.trim();
  }

  objKeysToString(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      this.finalString += `${key}${value}`;
    });
  }

  encode64(string) {
    return Buffer.from(string).toString("base64");
  }

  async getSecret() {
    const parsed = await this.fetch();
    if (parsed) {
      parsed.forEach((element) => {
        element.name && this.tags.push(this.sanitizeString(element.name));
        if (element.children) {
          this.getTag(element);
        }
      });
      this.makeTagAndAmount(this.sortArray(this.tags));
      this.objKeysToString(this.tagAndAmount);
      console.log("Final String ".bgCyan + this.finalString.bgGreen.black);
      console.log(
        "Base64 ".bgMagenta + this.encode64(this.finalString).bgYellow.black
      );
      return this.encode64(this.finalString);
    }
  }
}

const secret = new Secret(url);
secret.getSecret();
