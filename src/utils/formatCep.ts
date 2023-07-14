export function formatCEP(cep:string) {
  const regex = /^(\d{5})[-]?(\d{3})$/;
  if (regex.test(cep)) {
    return cep.replace(regex, '$1-$2');
  }
  return cep;
}