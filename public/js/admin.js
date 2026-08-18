/* ============================================================================
   OS Track - admin.js
   Aula 3: JavaScript no navegador

   Este arquivo faz o painel deixar de ser estatico. Ate a aula 2 os cartoes de
   ordem estavam escritos a mao dentro do admin.html. A partir de agora eles
   somem do HTML e passam a ser gerados por este codigo, a partir de um array.

   O array abaixo e a lista de ordens. Na aula 4 ele sai daqui e passa a vir do
   seu proprio servidor pela rede. Por enquanto ele mora aqui dentro mesmo.

   Este arquivo ja vem pronto e funcionando. Sua tarefa hoje e substituir o
   arquivo no projeto, testar no navegador e subir com um commit. O professor
   explica cada parte no quadro.
   ========================================================================== */


/* ----------------------------------------------------------------------------
   1. OS DADOS

   Um array e uma lista. Cada item da lista e um objeto, e cada objeto e uma
   ordem de servico com seus campos. Repare que os nomes dos campos sao os
   mesmos do modelo de dados do projeto: codigo, cliente, produto, status.
   O mesmo desenho que voce montou no formulario da aula 2 esta aqui em forma
   de dado.
   ---------------------------------------------------------------------------- */

const ordens = [
  {
    codigo: "OS-2026-0001",
    status: "em-analise",
    statusTexto: "em análise",
    titulo: "Notebook Dell Inspiron 15",
    cliente: "Marina Souza",
    defeito: "Liga, mostra a logomarca e desliga sozinho depois de poucos segundos.",
    tipo: "notebook",
  },
  {
    codigo: "OS-2026-0002",
    status: "recebido",
    statusTexto: "recebido",
    titulo: "Celular Samsung Galaxy A54",
    cliente: "Carlos Andrade",
    defeito: "Tela trincada no canto inferior e toque falhando na parte de baixo.",
    tipo: "celular",
  },
  {
    codigo: "OS-2026-0003",
    status: "pronto",
    statusTexto: "pronto",
    titulo: "Impressora HP LaserJet",
    cliente: "Papelaria Central",
    defeito: "Puxa varias folhas de uma vez e amassa o papel na entrada.",
    tipo: "impressora",
  },
  {
    codigo: "OS-2026-0004",
    status: "orcado",
    statusTexto: "orçado",
    titulo: "Desktop montado",
    cliente: "Joana Ribeiro",
    defeito: "Nao da video na tela. Ja foi testado outro monitor e o problema continua.",
    tipo: "desktop",
  },
];


/* ----------------------------------------------------------------------------
   2. AS REFERENCIAS AOS ELEMENTOS DA TELA

   Antes de mexer em qualquer coisa na pagina, o JavaScript precisa segurar uma
   referencia ao elemento. querySelector procura pelo seletor de CSS e devolve
   o primeiro elemento que encontrar. Classe usa ponto, id usa cerquilha, igual
   no CSS.
   ---------------------------------------------------------------------------- */

const grade = document.querySelector(".grade-ordens");
const formFiltros = document.querySelector(".barra-filtros");
const filtroStatus = document.querySelector("#filtro-status");


/* ----------------------------------------------------------------------------
   3. A FUNCAO QUE MONTA UM CARTAO

   Esta funcao recebe uma ordem e devolve um pedaco de HTML em texto. O acento
   de crase abre uma template literal, que e um texto onde da para encaixar
   valores no meio usando ${ }. A estrutura aqui dentro e igual a do cartao que
   estava no admin.html na aula 2: cartao-topo, cartao-codigo, a etiqueta, o
   titulo, o cliente e o defeito.

   Repare que ${ordem.titulo} le o campo titulo do objeto, e ${ordem.cliente}
   le o campo cliente. Onde na aula 2 o texto era fixo, agora entra o valor da
   ordem.
   ---------------------------------------------------------------------------- */

function montarCartao(ordem) {
  return `
    <article class="cartao-ordem">
      <div class="cartao-topo">
        <span class="cartao-codigo">${ordem.codigo}</span>
        <span class="etiqueta etiqueta-${ordem.status}">${ordem.statusTexto}</span>
      </div>
      <h2 class="cartao-titulo">${ordem.titulo}</h2>
      <p class="cartao-cliente">${ordem.cliente}</p>
      <p class="cartao-defeito">${ordem.defeito}</p>
    </article>
  `;
}


/* ----------------------------------------------------------------------------
   4. A FUNCAO QUE DESENHA A LISTA NA TELA

   Esta funcao recebe uma lista de ordens, monta o HTML de cada uma e joga tudo
   dentro da grade de uma vez so. innerHTML e o conteudo em HTML de um elemento:
   ler devolve o que esta dentro, escrever troca o que esta dentro.

   Se a lista chegar vazia, mostra uma mensagem no lugar dos cartoes e para. O
   return interrompe a funcao ali, sem tentar desenhar cartoes que nao existem.

   O laco for-of percorre a lista, uma ordem por vez. A cada volta, montarCartao
   devolve o HTML daquela ordem, e o += acrescenta esse cartao ao que ja existe.
   No fim, grade.innerHTML = html e a linha que muda a tela.
   ---------------------------------------------------------------------------- */

function desenharOrdens(lista) {

  if (lista.length === 0) {
    grade.innerHTML = `<p class="aviso-vazio">Nenhuma ordem encontrada.</p>`;
    return;
  }

  let html = "";

  for (const ordem of lista) {
    html += montarCartao(ordem);
  }

  grade.innerHTML = html;
}


/* ----------------------------------------------------------------------------
   5. O FILTRO POR STATUS

   Quando o tecnico escolhe um status e envia o formulario, a lista precisa
   mostrar so as ordens daquele status. addEventListener liga uma funcao a um
   evento. Aqui o evento e o submit do formulario.

   event.preventDefault() impede o comportamento padrao do formulario, que seria
   recarregar a pagina inteira. Sem essa linha a tela pisca e o filtro se perde.

   filter percorre o array e devolve uma lista nova, so com os itens que passam
   no teste ordem.status === escolhido. Se o campo esta em Todos, o valor e
   vazio, e a lista mostrada e o array inteiro.
   ---------------------------------------------------------------------------- */

formFiltros.addEventListener("submit", function (event) {
  event.preventDefault();

  const escolhido = filtroStatus.value;

  let listaFiltrada;

  if (escolhido === "") {
    listaFiltrada = ordens;
  } else {
    listaFiltrada = ordens.filter(function (ordem) {
      return ordem.status === escolhido;
    });
  }

  desenharOrdens(listaFiltrada);
});


/* ----------------------------------------------------------------------------
   6. A PRIMEIRA PINTURA DA TELA

   Nada acima desenha nada sozinho. As funcoes so foram definidas. Esta ultima
   linha chama desenharOrdens com a lista completa, e e o que faz a tela abrir
   ja preenchida com as quatro ordens.
   ---------------------------------------------------------------------------- */

desenharOrdens(ordens);
