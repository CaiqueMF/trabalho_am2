<script>
    import { onMount } from 'svelte';
    import { collection, getDocs, doc, deleteDoc , query} from 'firebase/firestore';
    import { auth, db } from '../../firebase';
    import MandarImagens from './MandarImagens.svelte';
  import Carrinho from './carrinho.svelte';

    //tela pra apresentar todos os produtos para o público
    let produtos = [];
    let produtosPaginados = [];
    let ordenar = "nome";
    let pagina = 1;
    let numeroMaximo = 18;
    let totalPaginas = 1;
    let carrinho = [];

    // Função para carregar os produtos e definir a quantidade total de páginas
    async function carregarProdutos() {
        const q = query(collection(db, "produtos"));
        const querySnapshot = await getDocs(q);

        produtos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        //como acabei deixando todas as caixas do banco como strings a comparação de preço precisa ser feita com funçõoes
        if (ordenar === "preco") {
        produtos = produtos.sort((a, b) => {
            const precoA = parseFloat(a.preco);
            const precoB = parseFloat(b.preco);

            //se não for número jogar pro final do array
            if (isNaN(precoA)) return 1;
            if (isNaN(precoB)) return -1;

            return precoA - precoB;
        });
        } else {
            //ordenando por nome
            produtos = produtos.sort((a, b) => {
            if (a[ordenar] < b[ordenar]) return -1;
            if (a[ordenar] > b[ordenar]) return 1;
            return 0;
            });
        }

        totalPaginas = Math.ceil(produtos.length / numeroMaximo);
        atualizarProdutosPaginados();
    }

    // Atualiza a lista de produtos que serão exibidos na página atual
    function atualizarProdutosPaginados() {
        const indexInicial = (pagina - 1) * numeroMaximo;
        const indexFinal = indexInicial + numeroMaximo;
        produtosPaginados = produtos.slice(indexInicial, indexFinal);
    }

    // Deleta um produto e recarrega a lista
    async function deletarProduto(id) {
        await deleteDoc(doc(db, 'produtos', id));
        await carregarProdutos();
    }

    // Ordena os produtos e recarrega a página
    async function sortOption(tipo) {
        ordenar = tipo;
        pagina = 1;
        await carregarProdutos();
    }

    function mudaPagina(direcao) {
        if (pagina + direcao >= 1 && pagina + direcao <= totalPaginas) {
            pagina += direcao;
            atualizarProdutosPaginados();
        }
    }

    function adicionarAoCarrinho(produto) {
    let itemExistente = carrinho.find(item => item.id === produto.id);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho = [...carrinho, { ...produto, quantidade: 1 }];
    }
    
    // Forçando a reatividade quando há atualização de quantidade
    carrinho = [...carrinho];
}
    
    onMount(async () => {
        await carregarProdutos();
    });

</script>

<div class="ordenar">
    <h2>  Ordenar por: </h2>
    <button on:click={() => { sortOption("nome") }}>Nome</button>
    <button on:click={() => { sortOption("preco") }}>Preço</button>
</div>

<div class="grid-produtos">
    {#each produtosPaginados as produto}
        <div class="card-produto">
            <div style="display: flex;">
                <div style="min-width: 50%;">
                    <h3>{produto.nome}</h3>
                    <p>R${produto.preco}</p>
                </div>
                <MandarImagens class="imagem" idImagem={produto.id}/>
            </div>
            <button on:click={() => adicionarAoCarrinho(produto)} class="comprar">Pegar emprestado</button>
            {#if auth.currentUser}
            <a href={`/protected/product/${produto.id}`} class="detalhes">Ver detalhes</a>
            <button on:click={() => deletarProduto(produto.id)} class="remover">Remover</button>    
            {/if}
        </div>
    {/each}
</div>

<Carrinho {carrinho}/>

{#if totalPaginas!=1}
<div class="paginacao">
    <button on:click={()=>{mudaPagina(-1)}} disabled={pagina === 1} class="navegacao">&larr;</button>
    <span>Página {pagina} de {totalPaginas}</span>
    <button on:click={()=>{mudaPagina(1)}} disabled={pagina === totalPaginas} class="navegacao">&rarr;</button>
</div>
{/if}


<style>
    .ordenar {
        display: flex;
        align-items: center;
    }

    .grid-produtos {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding: 20px;
        margin-bottom: 20px;
    }

    .card-produto {
        padding: 20px;
        background-color: #1a1a1a;
        border: 2px dashed #ff007f;
        box-shadow: -2px 2px 0px #000;
        transform: rotate(-3deg);
        transition: transform 0.3s;
    }

    .card-produto:hover {
        transform: rotate(0deg) scale(1.05);
    }

    .detalhes {
        color: #ff007f;
        text-decoration: none;
        border-bottom: 2px solid transparent;
        transition: border-bottom 0.3s, color 0.3s;
    }

    .detalhes:hover {
        color: #fff;
        border-bottom: 2px solid #ff007f;
    }

    .remover {
        background: #000;
        color: #ff007f;
        border: 2px dashed #ff007f;
        padding: 10px 20px;
        cursor: pointer;
        transform: rotate(-9deg);
        transition: transform 0.3s;
        font-weight: bold;
    }

    .remover:hover {
        background: #ff007f;
        color: #000;
        transform: rotate(-3deg) scale(1.05);
    }

    .paginacao {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }

    button {
        padding: 10px 20px;
        margin: 20px;
        font-size: 18px;
        font-weight: bold;
        color: #000;
        background: #ff007f;
        border: 3px double #000;
        cursor: pointer;
        transition: transform 0.3s;
        box-shadow: -3px 3px 0px #000, -6px 6px 0px #ff007f;
        transform: rotate(4deg);
    }

    button:hover:not(:disabled){
        transform: rotate(-2deg);
        background: #fff;
        color: #ff007f;
    }

    .ordenar button{
        max-height: 40px;
    }

    .navegacao:disabled {
        background-color: #555;
        cursor: not-allowed;
    }

</style>