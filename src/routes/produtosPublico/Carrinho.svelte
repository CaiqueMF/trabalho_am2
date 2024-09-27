<script>

    export let carrinho = [];

    let total =0 
    let mostrarCarrinho = false;

    function calcular(){
        total = carrinho.reduce((sum, produto) => {
        const precoNumerico = parseFloat(produto.preco);
        // Se não for um número, considerar 0 como preço
        return sum + (isNaN(precoNumerico) ? 0 : precoNumerico * produto.quantidade);
    }, 0);
    }

    $: carrinho, calcular()
    function toggleCarrinho() {
        mostrarCarrinho = !mostrarCarrinho;
        calcular()
    }
</script>



{#if mostrarCarrinho}
    <div class="carrinho-painel">
        <div class="titulo">
            <h3>Carrinho de Favores</h3>
            <button class="fechar" on:click={toggleCarrinho}>X</button>
        </div>
        <ul>
            {#each carrinho as produto}
                <li>{produto.nome} - R${produto.preco} x {produto.quantidade}</li>
            {/each}
        </ul>
        <p>tá devendo uns: R${total.toFixed(2)}</p>
    </div>
{:else}
<button class="carrinho-icon" on:click={toggleCarrinho}>
    <img src="/images/paper-ball.png" alt="carrinho ">
</button>
{/if}

<style>
    .carrinho-icon {
        position: absolute;
        top: 120px;
        right: 60px;
        cursor: pointer;
        z-index: 1000;
        background-color: transparent;
        border: none;
    }
    .carrinho-icon img {
        width: 150px;
        height: auto;
    }

    .carrinho-painel {
        position: absolute;
        top: 60px;
        right: 20px;
        padding: 40px;
        max-width: 300px;
        font-size: 30px;
        z-index: 1000;
        background-image:url('images/open-paper.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
    }
    .titulo {
        display: flex;
        justify-content:space-between;
        align-items:center;
    }
    .fechar {
        height: 60px;
        width: 80px;
        font-size: 16px;
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
    .fechar:hover{
        transform: rotate(-2deg);
        cursor: pointer;
        background: #fff;
        color: #ff007f;
    }
</style>
