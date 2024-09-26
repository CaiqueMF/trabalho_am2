<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { doc, getDoc} from 'firebase/firestore';
  import { db } from '../../../../firebase';
  import MandarImagens from '../../../produtosPublico/mandarImagens.svelte';

  let produto = {};
  let idProduto;
  $: idProduto = $page.params.id;

  //ao abrir a página pega os dados referentes ao produto presente no id
  onMount(async () => {
    idProduto = $page.params.id;
    const docRef = doc(db, 'produtos', idProduto);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      produto = docSnap.data();
    }
  });

</script>

<div class="segurar">
  <div class="card-produto">
    <h1>{produto.nome}</h1>
    <p>{produto.descricao}</p>
    <p>Preço: {produto.preco}</p>
    <MandarImagens imageId={idProduto}/>
    <a href={`/protected/EditProduct/${idProduto}`} class="link-editar">Editar</a>
  </div>
</div>
  
<style>

  .segurar {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }

  .card-produto {
    background: rgba(0, 0, 0, 0.9);
    color: #f5f5f5;
    border: 2px dashed #ff007f;
    border-radius: 8px;
    padding: 20px;
    margin: 15px;
    margin-bottom: 30px;
    width: 30%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s;
  }

  .card-produto:hover {
    transform: scale(1.05);
  }

  .card-produto h1 {
    font-family: 'Special Elite', sans-serif;
    font-size: 28px;
    margin: 0;
    text-shadow: 2px 2px #000;
  }

  .card-produto p {
    font-family: 'Special Elite', sans-serif;
    font-size: 18px;
    margin: 5px 0;
  }

  .link-editar {
    display: inline-block;
    margin-top: 10px;
    color: #ff007f;
    text-decoration: none;
    border: 2px dashed #ff007f;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background 0.3s, color 0.3s;
  }

  .link-editar:hover {
    background: #ff007f;
    color: #000;
  }

</style>