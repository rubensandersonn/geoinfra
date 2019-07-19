export function validateNumber(ns) {
  const r = /^\d*$/.test(ns);
  console.log("val number:", r);
  return r;
}

export function validateDate(dt) {
  const r = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(
    dt
  );
  console.log("val date:", r);
  return r;
}

export function validateAdress(address) {
  return true;
}

export default function validateAll(number, date) {
  return validateNumber(number) && validateDate(date);
}
