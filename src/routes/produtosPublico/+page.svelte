<script>
    import { onMount } from 'svelte';
    import { collection, getDocs, doc, deleteDoc , query} from 'firebase/firestore';
    import { auth, db } from '../../firebase';
  import MandarImagens from './mandarImagens.svelte';

    let produtos = [];
    let produtosPaginados = [];
    let ordenar = "nome";
    let pagina = 1;
    let numeroMaximo = 18;
    let totalPaginas = 1;

    // Função para carregar os produtos e definir a quantidade total de páginas
    async function carregarProdutos() {
    const q = query(collection(db, "produtos")); // Não vamos ordenar diretamente no Firestore
    const querySnapshot = await getDocs(q);
    
    produtos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    // Se o campo de ordenação for 'preco', ordenamos manualmente, lidando com strings
    if (ordenar === "preco") {
        produtos = produtos.sort((a, b) => {
            // Tente converter ambos os preços para números
            const precoA = parseFloat(a.preco);
            const precoB = parseFloat(b.preco);

            // Se não for um número, considere-o como um valor muito alto para ficar no final
            if (isNaN(precoA)) return 1;
            if (isNaN(precoB)) return -1;

            return precoA - precoB; // Ordenação crescente
        });
    } else {
        // Se não for preco, ordena normalmente pela chave
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
        const startIndex = (pagina - 1) * numeroMaximo;
        const endIndex = startIndex + numeroMaximo;
        produtosPaginados = produtos.slice(startIndex, endIndex);
    }

    // Deleta um produto e recarrega a lista
    async function deletarProduto(id) {
        await deleteDoc(doc(db, 'produtos', id));
        await carregarProdutos();
    }

    // Ordena os produtos e recarrega a página
    async function sortOption(tipo) {
        ordenar = tipo;
        await carregarProdutos();
        pagina = 1;
        atualizarProdutosPaginados();
    }

    // Muda para a página anterior
    function paginaAnterior() {
        if (pagina > 1) {
            pagina -= 1;
            atualizarProdutosPaginados();
        }
    }

    // Muda para a próxima página
    function proximaPagina() {
        if (pagina < totalPaginas) {
            pagina += 1;
            atualizarProdutosPaginados();
        }
    }

    // Ao montar a página, carrega os produtos
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
            <h3>{produto.nome}</h3>
            <p>R${produto.preco}</p>
            <MandarImagens imageId={produto.id}/>
            {#if auth.currentUser}
            <a href={`/protected/product/${produto.id}`} class="detalhes">Ver detalhes</a>
            <button on:click={() => deletarProduto(produto.id)} class="remover">Remover</button>     
            {/if}
        </div>
        
    {/each}
</div>

<div class="paginacao">
    <button on:click={paginaAnterior} disabled={pagina === 1} class="navegacao">&larr; Anterior</button>
    <span>Página {pagina} de {totalPaginas}</span>
    <button on:click={proximaPagina} disabled={pagina === totalPaginas} class="navegacao">Próxima &rarr;</button>
</div>

<style>
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

    .navegacao {
        background-color: #ff007f;
        color: #fff;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        margin: 0 10px;
        transition: background-color 0.3s;
    }

    .navegacao:disabled {
        background-color: #555;
        cursor: not-allowed;
    }

    .navegacao:hover:not(:disabled) {
        background-color: #ff50a0;
    }
</style>
