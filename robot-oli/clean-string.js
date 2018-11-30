const normalize = require('normalize-strings');
const normalizeSpace = require('normalize-space');

const CleanString = function CleanString() {
  this.clean = function clean(string) {
    let transformedString = string.toLowerCase();
    transformedString = this.removeMentions(transformedString);
    transformedString = this.removeJunkChars(transformedString);
    transformedString = this.removeEmojiStrings(transformedString);
    return normalizeSpace(transformedString);
  }

  this.removeMentions = function removeMentions(text) {
    return text.replace(/\<@.*?\>/g, '').trim();
  };

  this.removeJunkChars = function removeJunkChars(text) {
    return normalize(text.replace(/\?|¿/g, '').trim());
  };

  this.removeEmojiStrings = function removeEmojiStrings(text) {
    return text.replace(/:.*?:/g, '').trim();
  };
};

 module.exports = new CleanString();
