const moment = require('moment');

module.exports = {
  libraries: [
    {
      name: 'date',
      samples: [
        { regExp: /(manana|tomorrow)/, value: 1, relative: true },
        { regExp: /(ahora|hoy|today|now)/, value: 0, relative: true },
        { regExp: /(ayer|yesterday)/, value: -1, relative: true },
        { regExp: /(anterior|pasado|last|previous|prior)\s(domingo|sunday)/, value: 0, includeToday: false, past: true },
        { regExp: /(anterior|pasado|last|previous|prior)\s(lunes|monday)/, value: 1, includeToday: false, past: true },
        { regExp: /(anterior|pasado|last|previous|prior)\s(martes|tuesday)/, value: 2, includeToday: false, past: true },
        { regExp: /(anterior|pasado|last|previous|prior)\s(miercoles|wednesday)/, value: 3, includeToday: false, past: true },
        { regExp: /(anterior|pasado|last|previous|prior)\s(jueves|thursday)/, value: 4, includeToday: false, past: true },
        { regExp: /(anterior|pasado|last|previous|prior)\s(viernes|friday)/, value: 5, includeToday: false, past: true },
        { regExp: /(anterior|pasado|last|previous|prior)\s(sabado|saturday)/, value: 6, includeToday: false, past: true },
        { regExp: /(domingo|sunday)\s(anterior|pasado)/, value: 0, includeToday: false, past: true },
        { regExp: /(lunes|monday)\s(anterior|pasado)/, value: 1, includeToday: false, past: true },
        { regExp: /(martes|tuesday)\s(anterior|pasado)/, value: 2, includeToday: false, past: true },
        { regExp: /(miercoles|wednesday)\s(anterior|pasado)/, value: 3, includeToday: false, past: true },
        { regExp: /(jueves|thursday)\s(anterior|pasado)/, value: 4, includeToday: false, past: true },
        { regExp: /(viernes|friday)\s(anterior|pasado)/, value: 5, includeToday: false, past: true },
        { regExp: /(sabado|saturday)\s(anterior|pasado)/, value: 6, includeToday: false, past: true },
        { regExp: /(siguiente|next)\s(domingo|sunday)/, value: 0, includeToday: false },
        { regExp: /(siguiente|next)\s(lunes|monday)/, value: 1, includeToday: false },
        { regExp: /(siguiente|next)\s(martes|tuesday)/, value: 2, includeToday: false },
        { regExp: /(siguiente|next)\s(miercoles|wednesday)/, value: 3, includeToday: false },
        { regExp: /(siguiente|next)\s(jueves|thursday)/, value: 4, includeToday: false },
        { regExp: /(siguiente|next)\s(viernes|friday)/, value: 5, includeToday: false },
        { regExp: /(siguiente|next)\s(sabado|saturday)/, value: 6, includeToday: false },
        { regExp: /(domingo|sunday)\s(siguiente)/, value: 0, includeToday: false },
        { regExp: /(lunes|monday)\s(siguiente)/, value: 1, includeToday: false },
        { regExp: /(martes|tuesday)\s(siguiente)/, value: 2, includeToday: false },
        { regExp: /(miercoles|wednesday)\s(siguiente)/, value: 3, includeToday: false },
        { regExp: /(jueves|thursday)\s(siguiente)/, value: 4, includeToday: false },
        { regExp: /(viernes|friday)\s(siguiente)/, value: 5, includeToday: false },
        { regExp: /(sabado|saturday)\s(siguiente)/, value: 6, includeToday: false },
        { regExp: /(domingo|sunday)/, value: 0 },
        { regExp: /(lunes|monday)/, value: 1 },
        { regExp: /(martes|tuesday)/, value: 2 },
        { regExp: /(miercoles|wednesday)/, value: 3 },
        { regExp: /(jueves|thursday)/, value: 4 },
        { regExp: /(viernes|friday)/, value: 5 },
        { regExp: /(sabado|saturday)/, value: 6 },
      ],
      value(string) {
        const match = this.samples.find(sample => string.search(sample.regExp) !== -1);
        return this.calcDate(match);
      },
      getDateString(date) {
        return date.toDate().toISOString().replace(/T.*/, 'T00:00:00.000Z');
      },
      calcDate(sample) {
        if (!sample) return this.getDateString(moment());

        const { relative, value, includeToday, past } = sample;
        let date = moment();
        if (relative) {
          date = moment().add(value, 'days');
        } else if (past) {
          if (includeToday === false && value >= moment().day()) {
            date = moment().add(-1, 'week').day(value);
          } else if (includeToday !== false && value > moment().day()) {
            date = moment().add(-1, 'week').day(value);
          } else {
            date = moment().day(value);
          }
        } else {
          if (includeToday === false) {
            if (moment().isoWeekday() === value) {
              date = moment().add(1, 'week').isoWeekday(value);
            } else {
              date = moment().isoWeekday(value);
            }
          } else {
            date = moment().isoWeekday(value);
          }
        }
        return this.getDateString(date);
      }
    }
  ],
  library(libraryName) {
    return this.libraries.find(library => library.name === libraryName);
  },
  replacePlaceholder(libraryName, string) {
    let replacedString;
    for (let sample of this.library(libraryName).samples) {
      replacedString = string.replace(sample.regExp, `#{${libraryName}}`);
      if (replacedString !== string) break;
    }
    return replacedString;
  }
};
