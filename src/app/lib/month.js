class Month {
  constructor({ year, month, locale }) {
    this.year = year
    this.month = month > 11 ? 11 : month < 0 ? 0 : month
    this.locale = locale || 'en-US'
    this.setMonthDays()
  }

  setMonthDays() {
    this.days = []
    let currentDay = new Date(this.year, this.month, 1),
        sameMonth = true,
        week= 0
    while (sameMonth) {
      const weekday = currentDay.getDay(),
            day = currentDay.getDate()
      this.days.push({
        day,
        weekday,
        workday: this.isWorkingday(weekday),
        name: this.dayName(currentDay),
        week,
        date: new Date(currentDay)
      })
      if (weekday === 6) { week++ }
      currentDay.setDate(day + 1)
      sameMonth = (currentDay.getMonth() === this.month)
    }
  }

  dayName(date) {
    return date.toLocaleDateString(this.locale, { weekday: 'long' })
  }

  isWorkingday(weekday) {
    return weekday > 0 && weekday < 6
  }

  workingDays() {
    return this.days.filter(day => day.workday)
  }

  weeks(onlyWorkDays = false) {
    const weeks = []
    this.days.forEach(day => {
      if (typeof weeks[day.week] === 'undefined') {
        weeks[day.week] = []
      }
      if (onlyWorkDays && !day.workday) {
        return
      }
      weeks[day.week].push(day)
    })
    return weeks
  }

  toString() {
    const date = new Date(this.year, this.month - 1, 1)
    return date.toLocaleDateString(this.locale, {
      year: 'numeric',
      month: 'long'
    })
  }
}

export default Month
