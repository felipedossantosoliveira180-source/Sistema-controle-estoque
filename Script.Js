// ========================================
// SISTEMA DE CONTROLE DE ESTOQUE
// Projeto Integrador - UNISA
// ========================================

// Recupera os produtos salvos no navegador
let produtos = JSON.parse(
    localStorage.getItem("produtosEstoque")
) || [];

// Elementos da página
const formulario = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");
const busca = document.getElementById("busca");

const campoId = document.getElementById("produtoId");
const campoNome = document.getElementById("nome");
const campoCodigo = document.getElementById("codigo");
const campoCategoria = document.getElementById("categoria");
const campoPreco = document.getElementById("preco");
const campoQuantidade = document.getElementById("quantidade");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const formTitle = document.getElementById("formTitle");

// Salva os dados no armazenamento local
function salvarDados() {
    localStorage.setItem(
        "produtosEstoque",
        JSON.stringify(produtos)
    );
}

// Formata valores em reais
function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Evita que textos digitados sejam interpretados como HTML
function escaparHTML(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// Atualiza os indicadores do painel
function atualizarDashboard() {
    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const estoqueBaixo = produtos.filter(
        produto => produto.quantidade > 0 &&
                   produto.quantidade <= 5
    ).length;

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("estoqueBaixo").textContent =
        estoqueBaixo;
}

// Exibe os produtos na tabela
function mostrarProdutos(filtro = "") {
    const termo = filtro.toLowerCase();

    const filtrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.codigo.toLowerCase().includes(termo)
    );

    if (filtrados.length === 0) {
        listaProdutos.innerHTML = `
            <tr>
                <td colspan="7" class="empty">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;
        atualizarDashboard();
        return;
    }

    listaProdutos.innerHTML = filtrados.map(produto => {

        let status = "Disponível";
        let classe = "status-ok";

        if (produto.quantidade === 0) {
            status = "Sem estoque";
            classe = "status-out";
        } else if (produto.quantidade <= 5) {
            status = "Estoque baixo";
            classe = "status-low";
        }

        return `
            <tr>
                <td>${escaparHTML(produto.nome)}</td>
                <td>${escaparHTML(produto.codigo)}</td>
                <td>${escaparHTML(produto.categoria)}</td>
                <td>${formatarMoeda(produto.preco)}</td>
                <td>${produto.quantidade}</td>

                <td>
                    <span class="status ${classe}">
                        ${status}
                    </span>
                </td>

                <td>
                    <div class="actions">

                        <button class="btn-edit"
                            data-acao="editar"
                            data-id="${produto.id}">
                            Editar
                        </button>

                        <button class="btn-entry"
                            data-acao="entrada"
                            data-id="${produto.id}">
                            + Entrada
                        </button>

                        <button class="btn-exit"
                            data-acao="saida"
                            data-id="${produto.id}">
                            - Saída
                        </button>

                        <button class="btn-delete"
                            data-acao="excluir"
                            data-id="${produto.id}">
                            Excluir
                        </button>

                    </div>
                </td>
            </tr>
        `;
    }).join("");

    atualizarDashboard();
}

// Cadastra ou atualiza um produto
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = campoId.value;
    const nome = campoNome.value.trim();
    const codigo = campoCodigo.value.trim();
    const categoria = campoCategoria.value;
    const preco = Number(campoPreco.value);
    const quantidade = Number(campoQuantidade.value);

    if (!nome || !codigo || !categoria ||
        !Number.isFinite(preco) || preco <= 0 ||
        !Number.isInteger(quantidade) || quantidade < 0) {

        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Verifica se o código já está cadastrado
    const codigoExiste = produtos.some(produto =>
        produto.codigo.toLowerCase() === codigo.toLowerCase() &&
        produto.id !== id
    );

    if (codigoExiste) {
        alert("Este código já está cadastrado!");
        return;
    }

    if (id) {

        const indice = produtos.findIndex(
            produto => produto.id === id
        );

        if (indice !== -1) {
            produtos[indice] = {
                id,
                nome,
                codigo,
                categoria,
                preco,
                quantidade
            };
        }

        alert("Produto atualizado com sucesso!");

    } else {

        const novoProduto = {
            id: Date.now().toString(),
            nome,
            codigo,
            categoria,
            preco,
            quantidade
        };

        produtos.push(novoProduto);

        alert("Produto cadastrado com sucesso!");
    }

    salvarDados();
    mostrarProdutos(busca.value);
    limparFormulario();
});

// Limpa o formulário
function limparFormulario() {
    formulario.reset();
    campoId.value = "";

    formTitle.textContent = "Cadastrar novo produto";
    btnSalvar.textContent = "Cadastrar produto";
    btnCancelar.hidden = true;
}

// Carrega os dados de um produto para edição
function editarProduto(id) {

    const produto = produtos.find(
        item => item.id === id
    );

    if (!produto) return;

    campoId.value = produto.id;
    campoNome.value = produto.nome;
    campoCodigo.value = produto.codigo;
    campoCategoria.value = produto.categoria;
    campoPreco.value = produto.preco;
    campoQuantidade.value = produto.quantidade;

    formTitle.textContent = "Editar produto";
    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Realiza entrada de produtos
function entradaEstoque(id) {

    const produto = produtos.find(
        item => item.id === id
    );

    if (!produto) return;

    const quantidade = Number(
        prompt("Quantas unidades deseja adicionar?")
    );

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade inteira maior que zero.");
        return;
    }

    produto.quantidade += quantidade;

    salvarDados();
    mostrarProdutos(busca.value);

    alert("Entrada realizada com sucesso!");
}

// Realiza saída de produtos
function saidaEstoque(id) {

    const produto = produtos.find(
        item => item.id === id
    );

    if (!produto) return;

    const quantidade = Number(
        prompt("Quantas unidades deseja retirar?")
    );

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade inteira maior que zero.");
        return;
    }

    if (quantidade > produto.quantidade) {
        alert("Quantidade insuficiente no estoque!");
        return;
    }

    produto.quantidade -= quantidade;

    salvarDados();
    mostrarProdutos(busca.value);

    alert("Saída realizada com sucesso!");
}

// Exclui um produto
function excluirProduto(id) {

    const produto = produtos.find(
        item => item.id === id
    );

    if (!produto) return;

    const confirmar = confirm(
        `Deseja realmente excluir o produto ${produto.nome}?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(
        item => item.id !== id
    );

    salvarDados();
    mostrarProdutos(busca.value);
    limparFormulario();

    alert("Produto excluído com sucesso!");
}

// Identifica qual botão da tabela foi clicado
listaProdutos.addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    const id = botao.dataset.id;
    const acao = botao.dataset.acao;

    if (acao === "editar") {
        editarProduto(id);
    }

    if (acao === "entrada") {
        entradaEstoque(id);
    }

    if (acao === "saida") {
        saidaEstoque(id);
    }

    if (acao === "excluir") {
        excluirProduto(id);
    }
});

// Botão para cancelar edição
btnCancelar.addEventListener("click", limparFormulario);

// Pesquisa de produtos
busca.addEventListener("input", function() {
    mostrarProdutos(busca.value);
});

// Inicializa o sistema
mostrarProdutos();