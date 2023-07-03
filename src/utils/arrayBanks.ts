const arrBanks = [
  {
    id: "001",
    name: "Banco do Brasil",
  },
  {
    id: "003",
    name: "Banco da Amazônia",
  },
  {
    id: "004",
    name: "Banco do Nordeste",
  },
  {
    id: "021",
    name: "Banestes",
  },
  {
    id: "025",
    name: "Banco Alfa",
  },
  {
    id: "027",
    name: "Besc",
  },
  {
    id: "029",
    name: "Banerj",
  },
  {
    id: "031",
    name: "Banco Beg",
  },
  {
    id: "033",
    name: "Banco Santander Banespa",
  },
  {
    id: "036",
    name: "Banco Bem",
  },
  {
    id: "037",
    name: "Banpará",
  },
  {
    id: "038",
    name: "Banestado",
  },
  {
    id: "039",
    name: "BEP",
  },
  {
    id: "040",
    name: "Banco Cargill",
  },
  {
    id: "041",
    name: "Banrisul",
  },
  {
    id: "044",
    name: "BVA",
  },
  {
    id: "045",
    name: "Banco Opportunity",
  },
  {
    id: "047",
    name: "Banese",
  },
  {
    id: "062",
    name: "Hipercard",
  },
  {
    id: "063",
    name: "Ibibank",
  },
  {
    id: "065",
    name: "Lemon Bank",
  },
  {
    id: "066",
    name: "Banco Morgan Stanley Dean Witter",
  },
  {
    id: "069",
    name: "BPN Brasil",
  },
  {
    id: "070",
    name: "Banco de Brasília – BRB",
  },
  {
    id: "072",
    name: "Banco Rural",
  },
  {
    id: "073",
    name: "Banco Popular",
  },
  {
    id: "074",
    name: "Banco J. Safra",
  },
  {
    id: "075",
    name: "Banco CR2",
  },
  {
    id: "076",
    name: "Banco KDB",
  },
  {
    id: "096",
    name: "Banco BMF",
  },
  {
    id: "104",
    name: "Caixa Econômica Federal",
  },
  {
    id: "107",
    name: "Banco BBM",
  },
  {
    id: "116",
    name: "Banco Único",
  },
  {
    id: "151",
    name: "Nossa Caixa",
  },
  {
    id: "175",
    name: "Banco Finasa",
  },
  {
    id: "184",
    name: "Banco Itaú BBA",
  },
  {
    id: "204",
    name: "American Express Bank",
  },
  {
    id: "208",
    name: "Banco Pactual",
  },
  {
    id: "212",
    name: "Banco Matone",
  },
  {
    id: "213",
    name: "Banco Arbi",
  },
  {
    id: "214",
    name: "Banco Dibens",
  },
  {
    id: "217",
    name: "Banco Joh Deere",
  },
  {
    id: "218",
    name: "Banco Bonsucesso",
  },
  {
    id: "222",
    name: "Banco Calyon Brasil",
  },
  {
    id: "224",
    name: "Banco Fibra",
  },
  {
    id: "225",
    name: "Banco Brascan",
  },
  {
    id: "229",
    name: "Banco Cruzeiro",
  },
  {
    id: "230",
    name: "Unicard",
  },
  {
    id: "233",
    name: "Banco GE Capital",
  },
  {
    id: "237",
    name: "Bradesco",
  },
  {
    id: "241",
    name: "Banco Clássico",
  },
  {
    id: "243",
    name: "Banco Stock Máxima",
  },
  {
    id: "246",
    name: "Banco ABC Brasil",
  },
  {
    id: "248",
    name: "Banco Boavista Interatlântico",
  },
  {
    id: "249",
    name: "Investcred Unibanco",
  },
  {
    id: "250",
    name: "Banco Schahin",
  },
  {
    id: "252",
    name: "Fininvest",
  },
  {
    id: "254",
    name: "Paraná Banco",
  },
  {
    id: "263",
    name: "Banco Cacique",
  },
  {
    id: "265",
    name: "Banco Fator",
  },
  {
    id: "266",
    name: "Banco Cédula",
  },
  {
    id: "300",
    name: "Banco de la Nación Argentina",
  },
  {
    id: "318",
    name: "Banco BMG",
  },
  {
    id: "320",
    name: "Banco Industrial e Comercial",
  },
  {
    id: "356",
    name: "ABN Amro Real",
  },
  {
    id: "341",
    name: "Itau",
  },
  {
    id: "347",
    name: "Sudameris",
  },
  {
    id: "351",
    name: "Banco Santander",
  },
  {
    id: "353",
    name: "Banco Santander Brasil",
  },
  {
    id: "366",
    name: "Banco Societe Generale Brasil",
  },
  {
    id: "370",
    name: "Banco WestLB",
  },
  {
    id: "376",
    name: "JP Morgan",
  },
  {
    id: "389",
    name: "Banco Mercantil do Brasil",
  },
  {
    id: "394",
    name: "Banco Mercantil de Crédito",
  },
  {
    id: "399",
    name: "HSBC",
  },
  {
    id: "409",
    name: "Unibanco",
  },
  {
    id: "412",
    name: "Banco Capital",
  },
  {
    id: "422",
    name: "Banco Safra",
  },
  {
    id: "453",
    name: "Banco Rural",
  },
  {
    id: "456",
    name: "Banco Tokyo Mitsubishi UFJ",
  },
  {
    id: "464",
    name: "Banco Sumitomo Mitsui Brasileiro",
  },
  {
    id: "477",
    name: "Citibank",
  },
  {
    id: "479",
    name: "Itaubank (antigo Bank Boston)",
  },
  {
    id: "487",
    name: "Deutsche Bank",
  },
  {
    id: "488",
    name: "Banco Morgan Guaranty",
  },
  {
    id: "492",
    name: "Banco NMB Postbank",
  },
  {
    id: "494",
    name: "Banco la República Oriental del Uruguay",
  },
  {
    id: "495",
    name: "Banco La Provincia de Buenos Aires",
  },
  {
    id: "505",
    name: "Banco Credit Suisse",
  },
  {
    id: "600",
    name: "Banco Luso Brasileiro",
  },
  {
    id: "604",
    name: "Banco Industrial",
  },
  {
    id: "610",
    name: "Banco VR",
  },
  {
    id: "611",
    name: "Banco Paulista",
  },
  {
    id: "612",
    name: "Banco Guanabara",
  },
  {
    id: "613",
    name: "Banco Pecunia",
  },
  {
    id: "623",
    name: "Banco Panamericano",
  },
  {
    id: "626",
    name: "Banco Ficsa",
  },
  {
    id: "630",
    name: "Banco Intercap",
  },
  {
    id: "633",
    name: "Banco Rendimento",
  },
  {
    id: "634",
    name: "Banco Triângulo",
  },
  {
    id: "637",
    name: "Banco Sofisa",
  },
  {
    id: "638",
    name: "Banco Prosper",
  },
  {
    id: "643",
    name: "Banco Pine",
  },
  {
    id: "652",
    name: "Itaú Holding Financeira",
  },
  {
    id: "653",
    name: "Banco Indusval",
  },
  {
    id: "654",
    name: "Banco A.J. Renner",
  },
  {
    id: "655",
    name: "Banco Votorantim",
  },
  {
    id: "707",
    name: "Banco Daycoval",
  },
  {
    id: "719",
    name: "Banif",
  },
  {
    id: "721",
    name: "Banco Credibel",
  },
  {
    id: "734",
    name: "Banco Gerdau",
  },
  {
    id: "735",
    name: "Banco Pottencial",
  },
  {
    id: "738",
    name: "Banco Morada",
  },
  {
    id: "739",
    name: "Banco Galvão de Negócios",
  },
  {
    id: "740",
    name: "Banco Barclays",
  },
  {
    id: "741",
    name: "BRP",
  },
  {
    id: "743",
    name: "Banco Semear",
  },
  {
    id: "745",
    name: "Banco Citibank",
  },
  {
    id: "746",
    name: "Banco Modal",
  },
  {
    id: "747",
    name: "Banco Rabobank International",
  },
  {
    id: "748",
    name: "Banco Cooperativo Sicredi",
  },
  {
    id: "749",
    name: "Banco Simples",
  },
  {
    id: "751",
    name: "Dresdner Bank",
  },
  {
    id: "752",
    name: "BNP Paribas",
  },
  {
    id: "753",
    name: "Banco Comercial Uruguai",
  },
  {
    id: "755",
    name: "Banco Merrill Lynch",
  },
  {
    id: "756",
    name: "Banco Cooperativo do Brasil",
  },
  {
    id: "757",
    name: "KEB",
  },
];

export const findBank = (bankCode: string) => {
  const bank = arrBanks.find((item: any) => item.id === bankCode)
  return bank?.name
}
