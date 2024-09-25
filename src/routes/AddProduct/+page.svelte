<script>
  import { collection, addDoc } from 'firebase/firestore';
  import { db,auth } from '../../firebase';
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';

  //comportamento padrão de redirecionamento de usuário caso não esteja logado
  onMount(() => {
    if (!auth.currentUser) {
      goto("/");
    }
  });

  let nome = '';
  let descricao = '';
  let preco = '';

  //joga no banco um novo produto com as caracteristicas digitadas
  async function adicionarProduto() {
    try {
      await addDoc(collection(db, 'produtos'), {
        nome, descricao, preco
      });
      goto("/ProductList")
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="segurar">
  <div class="card">
    <input type="text" bind:value={nome} placeholder="Nome" />
    <input type="text" bind:value={descricao} placeholder="Descrição" />
    <input type="text" bind:value={preco} placeholder="Preço" />
    <button on:click={adicionarProduto}>Cadastrar Produto</button>
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