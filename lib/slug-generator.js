const slugify = require('slugify');

const SlugGenerator = function(collection, prop) {
  this.collection = collection;
  this.prop = prop;
}

SlugGenerator.prototype = {
  createSlug(string, id) {
    const newSlug = slugify(string).toLowerCase();
    return new Promise((resolve, reject) => {
      this.searchForDuplicates(newSlug, id).then(found => {
        if (found) {
          this.generateSlugVersion(newSlug).then(newSlug => {
            resolve(newSlug);
          }).catch(err => reject(err));
        } else {
          resolve(newSlug);
        }
      }).catch(err => reject(err));
    });
  },

  searchForDuplicates(slug, id) { 
    return new Promise((resolve, reject) => {
      this.collection.findOne({ [`${this.prop}`]: slug }).exec((err, item) => {
        if (err) {
          reject(err);
        } else if (item) {
          if (id && item._id == id) {
            resolve(false);
          } else {
            resolve(true);
          }
        } else {
          resolve(false);
        }
      });
    });
  },

  generateSlugVersion(slug) {
    return new Promise((resolve, reject) => {
      const regex = new RegExp(`^${slug}(\-\\d*)?$`);
      this.collection.find({ [`${this.prop}`]: regex }).exec((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve(`${slug}-${items.length + 1}`);
        }
      });
    });
  }
};

module.exports = SlugGenerator;
