/**
 * Gets 2 dates in format dd/mm/yyyy and return the lattest one
 * @param {*} data1
 * @param {*} data2
 */
export const getLattest = (data1, data2) => {
  if (!data1 || !data2) {
    return null;
  }
  const data1s = data1.split("/");
  const data2s = data2.split("/");

  // checando o ano
  if (data1s[2] > data2s[2]) {
    return data1;
  } else if (data1s[2] < data2s[2]) {
    return data2;
  } else {
    // anos iguais
    if (data1s[1] > data2s[1]) {
      return data1;
    } else if (data1s[1] < data2s[1]) {
      return data2;
    } else {
      // anos e meses iguais
      if (data1s[0] > data2s[0]) {
        return data1;
      } else if (data1s[0] < data2s[0]) {
        return data2;
      } else {
        // anos, meses e dias iguais!
        return data1;
      }
    }
  }
};

export const isFirstLattest = (date1, date2) => {
  if (!date1 || !date2) {
    return null;
  }
  if (getLattest(date1, date2) === date1) {
    return true;
  }
  return false;
};

export const isFirstWithin = (date1, datea, dateb) => {
  if (!date1 || !datea || !dateb) {
    return null;
  }
  // verificando se o dateb é depois do datea
  if (isFirstLattest(dateb, datea)) {
    let aux = datea;
    datea = dateb;
    dateb = aux;
  }
  if (
    getLattest(date1, datea) === datea ||
    getLattest(date1, dateb) === date1
  ) {
    return false;
  }
  return true;
};
