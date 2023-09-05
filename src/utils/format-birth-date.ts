export function formatBirthDate(input: any) {
  // Remove qualquer caractere não numérico da entrada
  const cleanedInput = input.replace(/\D/g, '');

  // Verifica o tamanho da entrada para aplicar a máscara correta
  if (cleanedInput.length <= 2) {
    // Para os dois primeiros dígitos, coloque-os como dia
    return cleanedInput;
  } else if (cleanedInput.length <= 4) {
    // Para os próximos dois dígitos, coloque-os como mês com uma barra
    return `${cleanedInput.slice(0, 2)}/${cleanedInput.slice(2)}`;
  } else {
    // Para os demais dígitos, coloque-os como ano com a máscara completa
    return `${cleanedInput.slice(0, 2)}/${cleanedInput.slice(2, 4)}/${cleanedInput.slice(4, 8)}`;
  }
}





