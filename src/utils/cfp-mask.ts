export const cpfMask = (value: any) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const cnpjMask = (value: any) => {
  const format = value.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
  return format;
};

export const cpfMaskRemove = (value: any) => {
  return value.replace(".", "").replace(".", "").replace("-", "");
};

export const validCPF = (inputCPF: any) => {
  const regex = /[0-9]{3}\.[\d*]{3}\.[\d*]{3}[-]?[0-9]{2}/;
  return inputCPF.match(regex);
};

export const formatRG = (rg: string) => {
  if (rg.length === 9) {
    rg = rg.replace(/\D/g, "");
    rg = rg.replace(/(\d{3})(\d{3})(\d{3})$/, "$1.$2.$3");

    return rg;
  } else {
    rg = rg.replace(/\D/g, ""); //Substituí o que não é dígito por "", /g é [Global][1]
    rg = rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{1})$/, "$1.$2.$3-$4$5");
    return rg;
  }
};

export default function validCPFForReal(campo: any) {
  if (campo.length > 0) {
    const cpf = campo.replace(/\.|-/g, "");
    if (
      validaNumerosRepetidos(cpf) ||
      validaPrimeiroDigito(cpf) ||
      validaSegundoDigito(cpf)
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return;
  }
}

function validaNumerosRepetidos(cpf: any) {
  const numerosRepetidos = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ];
  return numerosRepetidos.includes(cpf);
}

function validaPrimeiroDigito(cpf: any) {
  let soma = 0;
  let multiplicador = 10;

  for (let tamanho = 0; tamanho < 9; tamanho++) {
    soma += cpf[tamanho] * multiplicador;
    multiplicador--;
  }

  soma = (soma * 10) % 11;

  if (soma == 10 || soma == 11) {
    soma = 0;
  }

  return soma != cpf[9];
}

function validaSegundoDigito(cpf: any) {
  let soma = 0;
  let multiplicador = 11;

  for (let tamanho = 0; tamanho < 10; tamanho++) {
    soma += cpf[tamanho] * multiplicador;
    multiplicador--;
  }

  soma = (soma * 10) % 11;

  if (soma == 10 || soma == 11) {
    soma = 0;
  }

  return soma != cpf[10];
}
