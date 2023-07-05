export function calcula_barra(linha) {
  //var linha = form.linha.value; // Linha Digitável
  let barra = linha.replace(/[^0-9]/g, "");
  //
  // CÁLCULO DO DÍGITO DE AUTO CONFERÊNCIA (DAC)   -   5ª POSIÇÃO
  if (modulo11_banco("34191000000000000001753980229122525005423000") != 1)
    alert('Função "modulo11_banco" está com erro!');
  //
  //if (barra.length == 36) barra = barra + '00000000000';
  if (barra.length < 47)
    barra = barra + "00000000000".substr(0, 47 - barra.length);
  if (barra.length != 47)
    alert("A linha do código de barras está incompleta!" + barra.length);
  //
  barra =
    barra.substr(0, 4) +
    barra.substr(32, 15) +
    barra.substr(4, 5) +
    barra.substr(10, 10) +
    barra.substr(21, 10);
  //form.barra.value = barra;
  if (
    // @ts-ignore
    modulo11_banco(String(barra).substr(0, 4) + String(barra).substr(5, 39)) !=
    String(barra).substr(4, 1)
  )
    alert(
      "Digito verificador " +
        barra.substr(4, 1) +
        ", o correto é " +
        modulo11_banco(barra.substr(0, 4) + barra.substr(5, 39)) +
        "\nO sistema não altera automaticamente o dígito correto na quinta casa!"
    );
  //if (form.barra.value != form.barra2.value) alert('Barras diferentes');
  return barra;
}



function modulo11_banco(numero) {
  numero = numero.replace(/[^0-9]/g, "");
  //debug('Barra: '+numero);
  var soma = 0;
  var peso = 2;
  var base = 9;
  var resto = 0;
  var contador = numero.length - 1;
  //debug('tamanho:'+contador);
  // var numero = "12345678909";
  for (var i = contador; i >= 0; i--) {
    //alert( peso );
    soma = soma + numero.substring(i, i + 1) * peso;
    //debug( i+': '+numero.substring(i,i+1) + ' * ' + peso + ' = ' +( numero.substring(i,i+1) * peso)+' soma='+ soma);
    if (peso < base) {
      peso++;
    } else {
      peso = 2;
    }
  }
  var digito = 11 - (soma % 11);
  //debug( '11 - ('+soma +'%11='+(soma % 11)+') = '+digito);
  if (digito > 9) digito = 0;
  /* Utilizar o dígito 1(um) sempre que o resultado do cálculo padrão for igual a 0(zero), 1(um) ou 10(dez). */
  if (digito == 0) digito = 1;
  return digito;
}
