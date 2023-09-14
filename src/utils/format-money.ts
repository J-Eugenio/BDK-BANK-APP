const formatMoney = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

const formatCurrency = (value: any) => {
  
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/[^0-9]/g, "");

  // Converte o valor para um número
  const numberValue = parseFloat(numericValue || '0') / 100; // Dividido por 100 para tratar centavos

  // Formata o valor em reais (R$) no estilo brasileiro
  const formattedValue = numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
};

const removeFormatting = (formattedValue: any) => {
  // Remove todos os caracteres não numéricos
  const numericValue = formattedValue.replace(/[^\d,]/g, '');

  // Remove a vírgula como separador de milhares
  const unformattedValue = numericValue.replace(',', '');

  return parseFloat(unformattedValue);
};


export { formatMoney, formatCurrency, removeFormatting };
