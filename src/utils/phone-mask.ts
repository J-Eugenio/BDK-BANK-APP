export const phoneMask = (value: any) => {
  if (value.length > 11) {
    value = value.replace(/[^\d]/g, ""); //remove all non digits
    return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
  } else {
    value = value.replace(/[^\d]/g, ""); //remove all non digits
    return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
  }
};

export function formatarDDD(ddd: string) {
  const regex = /^(\d{2,3})$/;
  if (regex.test(ddd)) {
    return `(${ddd})`;
  }
  return ddd;
}
