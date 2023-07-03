export const phoneMask = (value: any) => {
  if (value.length > 11) {
    value = value.replace(/[^\d]/g, ""); //remove all non digits
    return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
  } else {
    value = value.replace(/[^\d]/g, ""); //remove all non digits
    return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
  }
};
