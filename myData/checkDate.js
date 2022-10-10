function check(value) {
  const days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const YMD = value.split("-");
  const y = parseInt(YMD[0], 10);
  const m = parseInt(YMD[1], 10);
  const d = parseInt(YMD[2], 10);
  if (m > 12 || m < 1) {
    return false;
  }
  if((y % 4 === 0 && y % 100 !== 0)||(y % 400 === 0)) {
      days[2] = 29;
  }
  if (d > days[m]) {
    return false;
  }
  return true
}

export const checkDate = (value) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return !!value && regex.test(value) && check(value)
}