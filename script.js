/* ==========================================
   1. SELEÇÃO DOS ELEMENTOS DO HTML
   ========================================== */

/*
    const declara uma variável cuja referência não será reatribuída.

    document representa o documento HTML carregado no navegador.

    getElementById("identificador") localiza o elemento que possui
    aquele ID. Não usamos # aqui: ele pertence ao seletor CSS.
*/
const formulario = document.getElementById("formPoke");
const campo = document.getElementById("idPoke");
const botao = document.getElementById("buscar");
const mensagem = document.getElementById("msg");
const resultado = document.getElementById("resultado");
const inicio = document.getElementById("inicio");

/* ==========================================
   2. DICIONÁRIOS DE TRADUÇÃO
   ========================================== */

/*
    Um objeto reúne pares de chave e valor.

    Exemplo:
    A chave "fire" possui o valor "Fogo".

    Isso permite transformar o nome recebido da API
    no texto que será apresentado na página.
*/
const tiposEmPortugues = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    electric: "Elétrico",
    grass: "Planta",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Veneno",
    ground: "Terra",
    flying: "Voador",
    psychic: "Psíquico",
    bug: "Inseto",
    rock: "Pedra",
    ghost: "Fantasma",
    dragon: "Dragão",
    dark: "Sombrio",
    steel: "Aço",
    fairy: "Fada"
};

/*
    Chaves com hífen precisam estar entre aspas
    quando escritas desta forma em um objeto.
*/
const nomesEstatisticas = {
    hp: "Pontos de vida (HP)",
    attack: "Ataque",
    defense: "Defesa",
    "special-attack": "Ataque especial",
    "special-defense": "Defesa especial",
    speed: "Velocidade"
};

/* ==========================================
   3. FUNÇÃO PARA PREENCHER TEXTOS
   ========================================== */

/*
    function declara uma função: um bloco de código reutilizável.

    id e valor são parâmetros.
    Eles recebem os dados informados ao chamar a função.

    Exemplo:
    preencher("pesoPoke", "6 kg");
*/
function preencher(id, valor) {
    /*
        textContent altera o texto dentro do elemento.
        O conteúdo é tratado como texto, sem interpretar tags HTML.
    */
    document.getElementById(id).textContent = valor;
}

/* ==========================================
   4. EXIBIÇÃO DOS DADOS DO POKÉMON
   ========================================== */

/*
    pokemon é o objeto recebido da API.
    A função lê suas propriedades e atualiza a página.
*/
function mostrarPokemon(pokemon) {
    /*
        O ponto acessa uma propriedade do objeto.
        pokemon.name contém o nome.

        replaceAll("-", " ") troca todos os hífens por espaços.
        Isso muda apenas a apresentação do nome.
    */
    preencher(
        "nomePokemon",
        pokemon.name.replaceAll("-", " ")
    );

    /*
        String() converte o número em texto.
        padStart(3, "0") completa o início até chegar a 3 caracteres.

        Exemplos:
        1   → "001"
        25  → "025"
        150 → "150"

        As crases criam uma template literal.
        ${expressao} insere o resultado da expressão dentro do texto.
    */
    preencher(
        "numeroPoke",
        `POKÉDEX #${String(pokemon.id).padStart(3, "0")}`
    );

    /*
        height vem em decímetros.
        A divisão por 10 converte o valor para metros.

        toLocaleString("pt-BR") formata o número no padrão brasileiro.
        Exemplo: 0.4 passa a ser apresentado como 0,4.
    */
    preencher(
        "alturaPoke",
        `${(pokemon.height / 10).toLocaleString("pt-BR")} m`
    );

    /*
        weight vem em hectogramas.
        A divisão por 10 converte o valor para quilogramas.
    */
    preencher(
        "pesoPoke",
        `${(pokemon.weight / 10).toLocaleString("pt-BR")} kg`
    );

    /*
        ?? é o operador de coalescência nula.
        Usa o texto alternativo apenas se o valor for null ou undefined.
        Se a experiência for 0, esse zero será preservado.
    */
    preencher(
        "basePoke",
        pokemon.base_experience ?? "Não informada"
    );

    /*
        O operador ternário possui esta estrutura:
        condição ? valorSeVerdadeiro : valorSeFalso

        Aqui, mostramos a ordem somente quando ela é maior que zero.
    */
    preencher(
        "ordemPoke",
        pokemon.order > 0 ? pokemon.order : "Não informada"
    );

    /* ======================================
       4.1. CARREGAMENTO DA IMAGEM
       ====================================== */

    const imagem = document.getElementById("imgPoke");
    const avisoImagem = document.getElementById("semImagem");

    /*
        ?. é o encadeamento opcional.
        Evita erro ao acessar uma propriedade de um valor ausente.

        ["official-artwork"] usa colchetes porque a chave contém hífen.

        || escolhe o segundo endereço quando o primeiro é ausente
        ou possui outro valor considerado falso, como uma string vazia.
    */
    const endereco =
        pokemon.sprites.other?.["official-artwork"]?.front_default
        || pokemon.sprites.front_default;

    /*
        hidden é uma propriedade booleana:
        true oculta; false permite exibir.

        Boolean(endereco) converte o endereço em true ou false.
        Um endereço preenchido resulta em true.
    */
    imagem.hidden = true;
    avisoImagem.hidden = Boolean(endereco);

    /*
        onload recebe uma função que será executada
        quando a imagem terminar de carregar.
    */
    imagem.onload = function () {
        imagem.hidden = false;
    };

    /*
        onerror recebe uma função executada
        se o carregamento da imagem falhar.
    */
    imagem.onerror = function () {
        imagem.hidden = true;
        avisoImagem.hidden = false;
    };

    /*
        if executa o bloco quando a condição é verdadeira.
        else executa o bloco alternativo.
    */
    if (endereco) {
        imagem.alt = `Ilustração de ${pokemon.name}`;

        /* Atribuir src inicia o carregamento da imagem. */
        imagem.src = endereco;
    } else {
        /* Remove um endereço anterior, caso ele exista. */
        imagem.removeAttribute("src");
    }

    /* ======================================
       4.2. TIPOS DO POKÉMON
       ====================================== */

    const tipos = document.getElementById("tipos");

    /*
        replaceChildren() sem argumentos remove todos os filhos.
        Assim, os tipos da busca anterior não ficam acumulados.
    */
    tipos.replaceChildren();

    /*
        pokemon.types é um array: uma lista de itens.

        forEach percorre essa lista.
        A função passada será executada uma vez para cada item.

        Essa função passada como argumento também é chamada de callback.
    */
    pokemon.types.forEach(function (item) {
        /*
            createElement cria um elemento HTML em memória.
            Ele ainda não aparece na página neste momento.
        */
        const etiqueta = document.createElement("span");

        /* className define a classe CSS do elemento. */
        etiqueta.className = "tipo";

        /*
            Os colchetes consultam o objeto de traduções
            usando uma chave obtida dinamicamente.

            Se não houver tradução, || mantém o nome da API.
        */
        etiqueta.textContent =
            tiposEmPortugues[item.type.name] || item.type.name;

        /* append adiciona o elemento ao final do contêiner. */
        tipos.append(etiqueta);
    });

    /* ======================================
       4.3. HABILIDADES
       ====================================== */

    const habilidades = document.getElementById("habilidades");

    habilidades.replaceChildren();

    pokemon.abilities.forEach(function (item) {
        /* Cada habilidade será um item li dentro da lista ul. */
        const habilidade = document.createElement("li");

        habilidade.textContent =
            item.ability.name.replaceAll("-", " ");

        /*
            is_hidden é um booleano fornecido pela API.
            Quando for true, adicionamos a identificação de habilidade oculta.
        */
        if (item.is_hidden) {
            const detalhe = document.createElement("small");

            detalhe.textContent = "Habilidade oculta";

            habilidade.append(detalhe);
        }

        habilidades.append(habilidade);
    });

    /* ======================================
       4.4. ESTATÍSTICAS E BARRAS
       ====================================== */

    const estatisticas = document.getElementById("stats");

    estatisticas.replaceChildren();

    /*
        map percorre a lista e cria uma nova lista de resultados.
        Aqui, extraímos somente os valores base de cada atributo.

        ... é a sintaxe de espalhamento.
        Ela transforma os itens da lista em argumentos de Math.max().

        Math.max() retorna o maior número recebido.
        O argumento 1 garante uma escala mínima maior que zero.
    */
    const escala = Math.max(
        1,
        ...pokemon.stats.map(function (item) {
            return item.base_stat;
        })
    );

    pokemon.stats.forEach(function (item) {
        /* Cria a estrutura de uma estatística. */
        const bloco = document.createElement("div");
        const titulo = document.createElement("div");
        const nome = document.createElement("span");
        const valor = document.createElement("strong");
        const barra = document.createElement("progress");

        titulo.className = "stat-titulo";

        nome.textContent =
            nomesEstatisticas[item.stat.name] || item.stat.name;

        valor.textContent = item.base_stat;

        /*
            max define o valor correspondente à barra completa.
            value define quanto da barra será preenchido.

            Esta barra representa um atributo base,
            não o progresso de uma tarefa.
        */
        barra.max = escala;
        barra.value = item.base_stat;

        /*
            setAttribute define um atributo HTML.
            Estes atributos descrevem a barra para leitores de tela.
        */
        barra.setAttribute("aria-label", nome.textContent);

        barra.setAttribute(
            "aria-valuetext",
            `${item.base_stat} pontos base`
        );

        /*
            Monta os elementos do mais interno para o mais externo:
            nome e valor → título
            título e barra → bloco
            bloco → área de estatísticas
        */
        titulo.append(nome, valor);
        bloco.append(titulo, barra);
        estatisticas.append(bloco);
    });
}

/* ==========================================
   5. ENVIO DO FORMULÁRIO E CONSULTA À API
   ========================================== */

/*
    addEventListener registra uma função para responder a um evento.

    "submit" é o evento de envio do formulário.
    Ele ocorre ao clicar no botão ou pressionar Enter no campo.

    async permite usar await dentro desta função.
    evento contém informações sobre o evento ocorrido.
*/
formulario.addEventListener("submit", async function (evento) {
    /* Impede o comportamento padrão de recarregar a página. */
    evento.preventDefault();

    /*
        disabled indica se o botão está desabilitado.
        return encerra a função antes de iniciar outra consulta.
    */
    if (botao.disabled) {
        return;
    }

    /*
        value contém o texto digitado.
        trim() remove espaços no começo e no final.
        toLowerCase() converte as letras para minúsculas.
    */
    const busca = campo.value.trim().toLowerCase();

    /*
        Esta expressão regular valida o formato da entrada.

        ^ e $ exigem que o texto inteiro corresponda ao padrão.
        | significa "ou".
        [1-9] exige um primeiro dígito entre 1 e 9.
        \d* permite zero ou mais dígitos depois dele.
        [a-z]+ exige uma ou mais letras.
        (?:...) agrupa partes do padrão sem guardar uma captura.
        A parte final permite nomes com hífen, como mr-mime.

        O formato é validado aqui.
        A existência do Pokémon será verificada pela API.
    */
    const formatoValido =
        /^(?:[1-9]\d*|[a-z]+(?:-[a-z0-9]+)*)$/;

    /*
        test() retorna true se o texto corresponder ao padrão.
        ! inverte esse resultado.
        Assim, este bloco executa quando a entrada é inválida.
    */
    if (!formatoValido.test(busca)) {
        mensagem.textContent =
            "Digite um nome em inglês ou um número inteiro maior que zero.";

        return;
    }

    /* Indica que há uma consulta em andamento. */
    botao.disabled = true;
    botao.textContent = "Buscando…";

    mensagem.textContent =
        "Consultando os dados do Pokémon…";

    /* Esconde os painéis anteriores durante o carregamento. */
    resultado.hidden = true;
    inicio.hidden = true;

    /*
        new cria uma instância de uma classe.
        AbortController permite cancelar operações que recebam seu sinal.
    */
    const controle = new AbortController();

    /*
        setTimeout agenda uma função para depois do intervalo informado.
        15000 milissegundos equivalem a 15 segundos.

        Se a operação ainda estiver em andamento, abort() solicita
        seu cancelamento.

        tempoLimite guarda o identificador usado para cancelar o timer.
    */
    const tempoLimite = setTimeout(function () {
        controle.abort();
    }, 15000);

    /*
        try contém as operações que podem falhar.
        Se ocorrer uma exceção, a execução passa para catch.
    */
    try {
        /*
            fetch inicia uma requisição HTTP.

            Uma API é uma interface que permite consultar
            dados ou funcionalidades de outro sistema.

            encodeURIComponent prepara a entrada para compor a URL.

            await aguarda a conclusão da Promise retornada por fetch,
            sem bloquear toda a interação do navegador.

            signal conecta a requisição ao AbortController.
        */
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(busca)}`,
            {
                signal: controle.signal
            }
        );

        /*
            status contém o código HTTP da resposta.
            === compara valor e tipo, sem conversão automática.

            404 significa que o recurso não foi encontrado.
            fetch não lança erro automaticamente apenas por receber 404.
        */
        if (resposta.status === 404) {
            /*
                throw lança uma exceção.
                Error cria um objeto de erro com uma mensagem.
                Essa mensagem será usada pelo bloco catch.
            */
            throw new Error(
                "Pokémon não encontrado. Confira o nome ou tente outro número."
            );
        }

        /*
            ok é true para códigos HTTP de 200 a 299.
            !resposta.ok identifica outras respostas de erro.
        */
        if (!resposta.ok) {
            throw new Error(
                "O serviço está indisponível. Tente novamente em instantes."
            );
        }

        /*
            JSON é um formato textual de troca de dados.

            json() lê o corpo da resposta e o converte
            em um valor JavaScript — neste caso, um objeto.

            Essa leitura também é assíncrona, por isso usamos await.
        */
        const pokemon = await resposta.json();

        /* Chama a função que preenche a página com o objeto recebido. */
        mostrarPokemon(pokemon);

        resultado.hidden = false;

        mensagem.textContent =
            "Busca concluída. Explore os detalhes abaixo.";
    } catch (erro) {
        /*
            catch recebe o erro ocorrido dentro do try.
            Exibimos novamente o painel inicial e uma orientação.
        */
        inicio.hidden = false;

        if (erro.name === "AbortError") {
            /* Erro esperado quando o tempo limite cancela a operação. */
            mensagem.textContent =
                "A consulta demorou demais. Tente novamente.";
        } else if (erro instanceof TypeError) {
            /*
                instanceof verifica se o objeto pertence a uma classe.
                Falhas de rede do fetch normalmente geram TypeError.
            */
            mensagem.textContent =
                "Não foi possível conectar. Verifique sua internet e tente novamente.";
        } else {
            /* message contém o texto associado ao objeto de erro. */
            mensagem.textContent = erro.message;
        }
    } finally {
        /*
            finally executa tanto no sucesso quanto no erro.
            É o lugar de restaurar a interface e fazer a limpeza.
        */

        /* Cancela o temporizador caso ele ainda não tenha disparado. */
        clearTimeout(tempoLimite);

        /* Permite uma nova consulta. */
        botao.disabled = false;
        botao.textContent = "Buscar Pokémon →";
    }
});

/* ==========================================
   6. BOTÕES DE EXEMPLO
   ========================================== */

/*
    querySelectorAll recebe um seletor CSS e retorna
    uma coleção com os elementos correspondentes.

    [data-pokemon] seleciona todos os elementos
    que possuem esse atributo.

    forEach registra um evento em cada botão encontrado.
*/
document.querySelectorAll("[data-pokemon]").forEach(function (exemplo) {
    exemplo.addEventListener("click", function () {
        /* Não inicia outra consulta enquanto houver uma em andamento. */
        if (botao.disabled) {
            return;
        }

        /*
            dataset permite acessar os atributos data-*.

            data-pokemon="25" pode ser lido como:
            exemplo.dataset.pokemon
        */
        campo.value = exemplo.dataset.pokemon;

        /*
            requestSubmit() solicita o envio do formulário.
            Respeita a validação HTML e dispara o evento submit.

            Assim, os exemplos reutilizam a mesma lógica de busca.
        */
        formulario.requestSubmit();
    });
});