function spendTime (milliseconds) {
  if (!milliseconds) return
  if (milliseconds < 60000) return 'less then a minute'
  if (milliseconds < 3.6e+6) return `${Math.round(milliseconds / 60000)} minutes`
  if (milliseconds < 8.64e+7) return `${Math.round(milliseconds / 3.6e+6)} hours`
  return `${Math.round(milliseconds / 8.64e+7)} days`
}

module.exports = { spendTime }
