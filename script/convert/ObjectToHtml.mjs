function transformarTextoEmHtml(texto) {
  const palavras = texto.split(/\s+/); // Dividir o texto em palavras (usando expressão regular para separar por espaços em branco)
  const palavraHtml = palavras.map(palavra => {
      const span = document.createElement('span') // Criar um elemento <p>
      span.textContent = palavra; // Adicionar a palavra como conteúdo do elemento <p>
      span.className = 'hover:text-red-600'
      return span;
  });
  return palavraHtml; // Retornar a lista de elementos <p>
}

function atualizarLegendas(legendasFormatadas,tempoAtual) {
  // Encontra a legenda correspondente ao tempo atual
  const legendaAtual = legendasFormatadas?.find(legenda => tempoAtual >= legenda.inicio && tempoAtual < legenda.fim);
  if (legendaAtual) {
     return {__html: transformarTextoEmHtml(legendaAtual.texto).map(paragrafo => paragrafo.outerHTML).join(' ')}
  } else {
     return {__html:''};
  }
}

export { atualizarLegendas };