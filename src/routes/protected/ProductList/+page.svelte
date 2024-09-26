<script>
  import { onMount } from 'svelte';
  import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
  import { db } from '../../../firebase';



  let produtos = [];

  //ao abrir a página pega todos os produtos e seus ids para uma lista de produtos
  onMount(async () => {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    produtos = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
    });
  });

  //deleta do banco o produto com um certo id, depois guarda novamente a lista de produtos numa variável
  async function detelarProduto(id) {
    await deleteDoc(doc(db, 'produtos', id));
    const querySnapshot = await getDocs(collection(db, "produtos"));
    produtos = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
    });
  }

</script>

<a class="adicionar" href="/protected/AddProduct">Adicionar Produto</a>
<div class="grid-produtos">
  {#each produtos as produto}
      <div class="card-produto">
          <h3>{produto.nome}</h3>
          <p>R${produto.preco}</p>
          <a href={`/protected/product/${produto.id}`} class="detalhes">Ver detalhes</a>
          <button on:click={() => detelarProduto(produto.id)} class="remover">Remover</button>
      </div>
  {/each}
</div>

<style>
  .adicionar {
    color: #ff007f;
    width: 200px;
    text-decoration: none;
    border-bottom: 2px dashed #ff007f;
    transition: border-bottom 0.3s, color 0.3s;
    transform: rotate(-3deg);
    margin-bottom: 30px;
  }

  .adicionar:hover {
    color: #fff;
    border-bottom: 2px double #ff007f;
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

</style>