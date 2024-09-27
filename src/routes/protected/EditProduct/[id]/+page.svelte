<script>
  import { doc, updateDoc, getDoc } from 'firebase/firestore';
  import { page } from '$app/stores';
  import { db } from '../../../../firebase';
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';
  import MandarImagens from '../../../produtosPublico/mandarImagens.svelte';
  


  let nome = '';
  let descricao = '';
  let preco = '';
  let idProduto;
  let produto = {};
  $: idProduto = $page.params.id;
  
  //ao abrir a página pega os dados referentes ao produto do id da página
  onMount(async () => {
    idProduto = $page.params.id;
    const docRef = doc(db, 'produtos', idProduto);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      produto = docSnap.data();
    }
    nome = produto.nome
    descricao = produto.descricao
    preco = produto.preco
  });

  //atualiza os dados do produto e joga o usuário na página de lista
  async function atualizarProduto() {
    const docRef = doc(db, 'produtos', idProduto);
    await updateDoc(docRef, {
      nome, descricao, preco
    });
    goto("/protected/ProductList")
  }

</script>

<div class="segurar">
  <div class="card">
    <input type="text" bind:value={nome} placeholder={produto.nome} />
    <input type="text" bind:value={descricao} placeholder={produto.descricao} />
    <input type="text" bind:value={preco} placeholder={produto.preco} />
    <MandarImagens idImagem={idProduto}/>
    <button on:click={atualizarProduto}>Atualizar Produto</button>
  </div>
</div>
   
<style>

  .segurar {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }

  input {
    font-family: 'Special Elite', sans-serif;
    font-size: 20px;
    padding: 10px;
    margin: 10px 0;
    width: calc(100% - 22px);
    background: rgba(255, 255, 255, 0.1);
    color: #f5f5f5;
    border: 2px dashed #ff007f;
    border-radius: 5px;
    transition: border-color 0.3s, background 0.3s;
  }

  input:focus {
    border-color: #fff;
    background: rgba(255, 255, 255, 0.2);
    outline: none;
  }

  button {
    font-family: 'Special Elite', sans-serif;
    font-size: 20px;
    background: #ff007f;
    color: #fff;
    border: 2px dashed #ff007f;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
    position: relative;
    overflow: hidden;
  }

  button:hover {
    background: #fff;
    color: #ff007f;
    transform: scale(1.05);
  }

  .card {
    padding: 20px;
    background-color: #1a1a1a;
    border: 2px double #ff007f;
    box-shadow: -2px 2px 0px #000;
    transform: rotate(-1deg);
    transition: transform 0.3s;
    width: 30%;
  }

  .card:hover {
      transform: rotate(0deg) scale(1.05);
  }

</style>