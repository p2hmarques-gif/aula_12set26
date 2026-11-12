# Explorador Pokémon

Projeto acadêmico desenvolvido com HTML, CSS e JavaScript puro para consultar e apresentar informações da PokéAPI.

O código possui comentários que explicam a estrutura da página, a estilização e a lógica de consulta.

## Funcionalidades

- Busca por nome em inglês ou número na Pokédex.
- Exemplos clicáveis: Pikachu, Bulbasaur e Charizard.
- Exibição de nome, número, imagem e tipos.
- Exibição de altura, peso, experiência base e ordem na API.
- Lista de habilidades com indicação de habilidade oculta.
- Apresentação de seis estatísticas base com barras.
- Mensagens de carregamento, sucesso e erro.
- Tempo limite de 15 segundos por consulta.
- Layout adaptável a computadores, tablets e celulares.

## Tecnologias utilizadas

| Tecnologia | Finalidade |
| --- | --- |
| HTML5 | Estrutura e organização do conteúdo. |
| CSS3 | Cores, fontes, espaçamentos e layout responsivo. |
| JavaScript | Interação, consulta à API e atualização dos dados. |
| PokéAPI | Fornecimento das informações e imagens. |

Não é necessário instalar bibliotecas.

## Organização dos arquivos

Mantenha os quatro arquivos na mesma pasta:

| Arquivo | Responsabilidade |
| --- | --- |
| index.html | Estrutura da página, formulário e espaços dos resultados. |
| style.css | Aparência e adaptação do layout às telas. |
| script.js | Validação, consulta à API e exibição das informações. |
| README.md | Documentação e instruções do projeto. |

Os nomes dos arquivos precisam corresponder às referências do HTML:

```html
<link rel="stylesheet" href="style.css">
<script src="script.js" defer></script>
```

O atributo `defer` faz o JavaScript executar após a leitura do HTML.

## Como executar

### Pré-requisitos

- Navegador moderno com suporte a JavaScript.
- Conexão com a internet para consultar a PokéAPI.
- Arquivos do projeto salvos na mesma pasta.

### Execução rápida

1. Abra a pasta do projeto no VS Code ou em qualquer editor de texto.
2. Verifique se os arquivos `index.html`, `style.css` e `script.js` estão na mesma pasta.
3. Abra `index.html` em um navegador atualizado, ou use a extensão **Live Server** do VS Code.
4. Digite o nome em inglês ou o número de um Pokémon.
5. Clique em **Buscar Pokémon** ou pressione **Enter**.

### Fluxo de uso

- A página carrega um painel inicial com dicas e botões de exemplo.
- Ao enviar a busca, o script consulta a PokéAPI e exibe os dados do Pokémon.
- O resultado inclui imagem, tipos, atributos e estatísticas base.
- Se a busca falhar, a interface mostra mensagens claras de erro ou ausência de conteúdo.

Também é possível executar o projeto pela extensão Live Server do VS Code, caso esteja instalada.

## Exemplos de pesquisa

| Entrada | Pokémon |
| --- | --- |
| 1 | Bulbasaur |
| 6 | Charizard |
| 25 | Pikachu |
| pikachu | Pikachu |
| mr-mime | Mr. Mime |

Os nomes são convertidos para letras minúsculas antes da consulta.

Nomes compostos devem seguir o formato da API, como `mr-mime`.

## Informações exibidas

### Identificação

- Nome.
- Número na Pokédex.
- Imagem.
- Tipos, com tradução para português quando disponível.

### Características

- Altura em metros.
- Peso em quilogramas.
- Experiência base.
- Ordem na API.

### Habilidades

O site apresenta os nomes das habilidades e identifica aquelas marcadas como ocultas pela API.

Os nomes das habilidades permanecem em inglês, com espaços no lugar dos hífens.

### Estatísticas base

- Pontos de vida — HP.
- Ataque.
- Defesa.
- Ataque especial.
- Defesa especial.
- Velocidade.

## Como interpretar os dados

### Altura e peso

A API fornece a altura em decímetros e o peso em hectogramas.

O JavaScript divide os dois valores por 10 para apresentar:

- Altura em metros.
- Peso em quilogramas.

### Experiência base

É um dado da espécie fornecido pela API. Não representa o nível atual do Pokémon.

### Ordem na API

É um campo de organização fornecido pela API. Não representa uma classificação de força.

### Estatísticas e barras

Os números apresentados são os atributos base da espécie. Os atributos finais de um indivíduo podem variar no jogo.

As barras usam o maior atributo do Pokémon consultado como referência visual. Os números não são porcentagens.

Não compare o comprimento das barras entre pesquisas diferentes, pois a escala é recalculada a cada consulta.

## Layout e responsividade

No computador, a busca ocupa a coluna esquerda, enquanto a imagem, as características e as estatísticas ficam na coluna direita.

O layout aproveita a largura e a altura disponíveis da janela. As fontes e a imagem foram ampliadas para melhorar a leitura, e o painel inicial ocupa o espaço reservado aos resultados.

Em notebooks com menor altura, os espaçamentos são reduzidos automaticamente.

Em tablets e celulares, o conteúdo é reorganizado para manter a leitura e o uso dos controles.

Dependendo da resolução, do zoom e do conteúdo apresentado, a página permite rolagem para evitar cortes nas informações.

## Orientações na interface

A página utiliza textos curtos para explicar o uso sem sobrecarregar a apresentação:

- Exemplo de preenchimento no campo de busca.
- Orientação para usar nomes em inglês ou números.
- Botões com sugestões de Pokémon.
- Identificação de habilidades ocultas.
- Explicação da escala das estatísticas.
- Mensagens de carregamento, conclusão e falha.

## Funcionamento do JavaScript

### 1. Seleção dos elementos

`document.getElementById()` localiza os elementos do HTML que serão utilizados pelo código.

### 2. Envio do formulário

`addEventListener()` identifica o envio do formulário.

`preventDefault()` impede que a página recarregue.

### 3. Validação

O código remove espaços nas extremidades, converte o texto para minúsculas e verifica se a entrada corresponde a um nome ou número válido.

### 4. Consulta à API

`fetch()` solicita os dados do Pokémon.

Exemplo:

```javascript
const resposta = await fetch(
    "https://pokeapi.co/api/v2/pokemon/25"
);
```

`await` aguarda a conclusão de uma operação assíncrona dentro da função.

### 5. Conversão da resposta

`resposta.json()` converte o JSON recebido em um objeto JavaScript:

```javascript
const pokemon = await resposta.json();
```

### 6. Apresentação dos dados

A função `mostrarPokemon()` preenche os campos da página.

O código utiliza:

- `textContent` para inserir textos.
- `createElement()` para criar elementos.
- `append()` para adicionar elementos.
- `replaceChildren()` para remover os dados da consulta anterior.
- `hidden` para controlar a exibição dos painéis.

### 7. Tratamento de erros

O bloco `try` executa a consulta.

O bloco `catch` apresenta mensagens para situações como:

- Pokémon não encontrado.
- Falha de conexão.
- Serviço indisponível.
- Tempo limite excedido.

### 8. Finalização

O bloco `finally` encerra o temporizador e libera o botão para uma nova consulta.

### 9. Exemplos clicáveis

Os botões com `data-pokemon` preenchem o campo e utilizam `requestSubmit()` para enviar o formulário, reutilizando a lógica da busca.

## Imagens

O site tenta carregar a ilustração oficial do Pokémon.

Se esse endereço não estiver disponível nos dados, utiliza o sprite tradicional.

Caso não exista imagem ou seu carregamento falhe, apresenta a mensagem **Imagem indisponível**.

## Acessibilidade

O projeto inclui:

- Idioma da página definido como português do Brasil.
- Rótulo associado ao campo de busca.
- Envio do formulário pela tecla Enter.
- Destaque de foco para navegação por teclado.
- Texto alternativo na imagem.
- Mensagens de status anunciáveis por leitores de tela.
- Rótulos acessíveis nas barras de estatísticas.
- Rolagem disponível quando necessária para preservar o conteúdo.

## Personalização

### Alterar as cores

Edite as variáveis no início de `style.css`:

```css
:root {
    --fundo: #f5f6f8;
    --texto: #202936;
    --suave: #616c7c;
    --vermelho: #bd303c;
    --borda: #e1e5eb;
}
```

### Alterar textos

Edite os títulos, orientações e descrições em `index.html`.

### Alterar traduções

Edite os objetos `tiposEmPortugues` e `nomesEstatisticas` em `script.js`.

### Ajustar o layout

Edite as regras de espaçamento, fontes e colunas em `style.css`.

As regras `@media` controlam as adaptações para diferentes tamanhos de janela.

## Verificação manual

| Teste | Resultado esperado |
| --- | --- |
| Buscar `25` | Exibir Pikachu com seus dados. |
| Buscar `bulbasaur` | Exibir Bulbasaur e seus tipos. |
| Buscar `PIKACHU` | Converter a entrada e consultar normalmente. |
| Clicar em Charizard | Preencher o campo e executar a busca. |
| Buscar um nome inexistente | Apresentar mensagem de Pokémon não encontrado. |
| Enviar somente espaços | Apresentar orientação de preenchimento. |
| Realizar buscas consecutivas | Substituir os dados anteriores. |
| Navegar com Tab e Enter | Permitir utilizar o formulário pelo teclado. |
| Reduzir a largura da janela | Reorganizar o layout sem cortar o conteúdo. |
| Aumentar o zoom | Permitir rolagem quando necessária. |
| Consultar sem conexão, sem resposta disponível em cache | Apresentar mensagem de conexão ou tempo limite. |

Esta lista descreve verificações que podem ser realizadas no navegador; não representa testes automatizados.

## Solução de problemas

### A aparência não foi aplicada

Confira se o arquivo se chama `style.css` e está na mesma pasta de `index.html`.

Verifique esta referência no HTML:

```html
<link rel="stylesheet" href="style.css">
```

### O botão não executa a consulta

Confira se o arquivo se chama `script.js` e está na mesma pasta de `index.html`.

Verifique esta referência no HTML:

```html
<script src="script.js" defer></script>
```

Verifique também a conexão com a internet e possíveis erros no console do navegador.

### As alterações não aparecem

Salve todos os arquivos e atualize o navegador com **Ctrl + F5**.

### O Pokémon não foi encontrado

Confira o nome em inglês ou tente pesquisar pelo número na Pokédex.

### A página apresenta rolagem no computador

A quantidade de espaço disponível depende da resolução, da altura da janela e do zoom.

O layout reduz espaçamentos em telas mais baixas, mas mantém a rolagem quando necessária para não esconder informações.

## Limitações

- Requer conexão com a internet.
- Depende da disponibilidade da PokéAPI e das imagens.
- Não possui login ou banco de dados.
- Não salva histórico persistente de consultas.
- Não apresenta cadeia de evolução.
- Não apresenta descrições detalhadas das habilidades.
- Não calcula atributos individuais de um Pokémon no jogo.

## Créditos

Dados e imagens fornecidos pela [PokéAPI](https://pokeapi.co/).

Documentação: [PokéAPI — Pokémon](https://pokeapi.co/docs/v2#pokemon).

Projeto desenvolvido para fins educacionais, sem vínculo oficial com Pokémon.