export function validadata(date: any) {
  var data = date; // pega o valor do input
  data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
  var data_array = data.split("-"); // quebra a data em array

  // para o IE onde será inserido no formato dd/MM/yyyy
  if (data_array[0].length != 4) {
    data = data_array[2] + "-" + data_array[1] + "-" + data_array[0]; // remonto a data no formato yyyy/MM/dd
  }

  // comparo as datas e calculo a idade
  var hoje = new Date();
  var nasc = new Date(data);
  var idade = hoje.getFullYear() - nasc.getFullYear();
  var m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

  if (idade < 18) {
    return false;
  }

  if (idade >= 18 && idade <= 70) {
    return true;
  }

  return false;
}
