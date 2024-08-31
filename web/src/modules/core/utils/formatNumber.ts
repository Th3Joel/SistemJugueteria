export const formatNumber = (number: string, decimals = 2) => {
  const nume = parseFloat(number);
    const formateador = new Intl.NumberFormat('es-NI', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      const num = formateador.format(nume);
    return num == "NaN" ? "" : num;
};