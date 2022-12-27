const myCeilFloor = (value, exp = -4, cf = 'round') => {
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[cf](value);
  }

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  return +(Math[cf](+(value.toString() + 'e' + -exp)).toString() + 'e' + exp);
}
