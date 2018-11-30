const cleanString = require('./clean-string.js');
const skillLibraries = require('./skill-libraries');

const Skill = function Skill(memories) {
  this.memories = memories;
};

Skill.prototype.findInteraction = function findInteraction(string) {
  const interaction = this.matchInteraction(cleanString.clean(string), this.memories.interactions);
  if (interaction) {
    interaction.libraries.forEach(libraryName => {
      interaction.values = {};
      interaction.values[libraryName] = skillLibraries.library(libraryName).value(interaction.string)
    });
    return interaction;
  }
};

Skill.prototype.matchInteraction = function matchInteraction(string, interactions) {
  let matchingInteraction;
  interactions.forEach(interaction => {
    interaction.samples.forEach(sample => {
      const matchingText = this.replaceLibraries(string, interaction.libraries);
      if (sample == matchingText) {
        matchingInteraction = { name: interaction.name, libraries: interaction.libraries, sample, string, model: interaction.model };
      }
    });
  });
  return matchingInteraction;
};

Skill.prototype.replaceLibraries = function replaceLibraries(string, libraryNames) {
  return libraryNames.reduce((lastText, libraryName) => skillLibraries.replacePlaceholder(libraryName, lastText), string);
};

module.exports = Skill;
