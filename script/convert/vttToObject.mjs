import fs from 'fs-extra'

function vttParaSegundos(tempoVTT) {
  const partes = tempoVTT.split(':');
  let minutos, segundos, milissegundos, segundosPartes;

  if (partes.length === 3) {
      // Se houver horas presentes
      minutos = parseInt(partes[1], 10);
      segundosPartes = partes[2].split('.');
      segundos = parseInt(segundosPartes[0], 10);
      milissegundos = parseInt(segundosPartes[1], 10);
  } else if (partes.length === 2) {
      // Se não houver horas presentes
      minutos = parseInt(partes[0], 10);
      segundosPartes = partes[1].split('.');
      segundos = parseInt(segundosPartes[0], 10);
      milissegundos = parseInt(segundosPartes[1], 10);
  } else {
      // Formato inválido
      throw new Error('Formato de tempo VTT inválido');
  }

  // Calcular o tempo total em segundos
  const tempoEmSegundos = minutos * 60 + segundos + milissegundos / 1000;

  return tempoEmSegundos;
}

function analisarLegendasLegendas(legendas) {
    const linhas = legendas.split('\n');
    const legendasFormatadas = [];

    for (let i = 0; i < linhas.length; i += 3) {
        const inicioFim = linhas[i].split(' --> ');
        const inicio = vttParaSegundos(inicioFim[0]);
        const fim = vttParaSegundos(inicioFim[1]);
        const texto = linhas[i + 1];

        const legenda = {
            inicio: inicio,
            fim: fim,
            texto: texto.trim() 
        };

        legendasFormatadas.push(legenda);
    }
    return legendasFormatadas;
}

async function vttToObject (vttPath) {
    console.log('vttPath')
  const data = await fs.readFile(vttPath)
  const text = data.toString().replace('WEBVTT', '').trim();
  const legendasFormatadas = analisarLegendasLegendas(text);
//   atualizarLegendas(legendasFormatadas)
  return legendasFormatadas;
}

 export { vttToObject };
// function transformarTextoEmParagrafos(texto) {
//     const palavras = texto.split(/\s+/); // Dividir o texto em palavras (usando expressão regular para separar por espaços em branco)
//     const paragrafos = palavras.map(palavra => {
//         const span = document.createElement('span') // Criar um elemento <p>
//         span.textContent = palavra; // Adicionar a palavra como conteúdo do elemento <p>
//         return span;
//     });
//     return paragrafos; // Retornar a lista de elementos <p>
// }