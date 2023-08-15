const phoneMask = (value: any) => {
  value = value.replace(/[^\d]/g, ""); //remove all non digits
  return value.replace(/(\d{1})(\d{4})(\d{4})/, "$1.$2-$3");
};

function formatarDDD(ddd: string) {
  const regex = /^(\d{2,3})$/;
  if (regex.test(ddd)) {
    return `(${ddd})`;
  }
  return ddd;
}

const phoneWithDDDMask = (value: string) => {

  // Remove todos os caracteres que não sejam dígitos
  const numeroLimpo = value.replace(/\D/g, '');

  // Aplica a regex para formatar o número com código do país, DDD e número
  const numeroFormatado = numeroLimpo.replace(
    /^(\d{2})(\d{5})(\d{4})$/,
    '($1) $2-$3'
  );

  return numeroFormatado;

};

const phoneRemoveMask = (value: string) => {
  return  value.replace(/\D/g, '');
}

export {
  phoneWithDDDMask,
  phoneMask,
  formatarDDD,
  phoneRemoveMask
}