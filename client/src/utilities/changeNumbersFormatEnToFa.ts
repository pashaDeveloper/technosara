export const changeNumbersFormatEnToFa = (number: number | string) =>
  number
    .toString()
    .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(digit)]);
