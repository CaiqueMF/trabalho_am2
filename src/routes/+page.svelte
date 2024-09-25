<script>
  import { auth } from '../firebase';
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { goto } from '$app/navigation';

  let email = '';
  let senha = '';

  //faz login com os dados digitados e joga o usuário na página de lista de produtos
  async function login() {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      goto("/ProductList")
    } catch (error) {
      console.error(error);
    }
  }

</script>

{#if !auth.currentUser}
  <div class="segurar">
    <form class="login-form">
      <h2>Login</h2>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" bind:value={email} placeholder="email" required>
      <label for="password">Senha</label>
      <input type="password" id="password" name="password" bind:value={senha} placeholder="Senha" required>
      <button on:click={login} type="submit">Login</button>
    </form>
  </div>
  {:else}
  <h2>tá logado chapa</h2>
{/if}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
    border: 4px double #ff007f;
    border-radius: 10px;
    box-shadow: -5px 5px 0px #ff007f, -10px 10px 0px #000;
    transform: rotate(-2deg);
  }

  .login-form h2 {
    margin: 0;
    font-size: 28px;
    text-transform: uppercase;
    color: #ff007f;
    text-align: center;
    text-shadow: 3px 3px 0px #000;
    transform: rotate(-3deg);
  }

  .login-form label {
    font-size: 18px;
    text-transform: uppercase;
    color: #ff007f;
    transform: rotate(-1deg);
  }

  .login-form input {
    padding: 10px;
    font-size: 16px;
    border: 2px dashed #ff007f;
    background: #1a1a1a;
    color: #f5f5f5;
    box-shadow: -2px 2px 0px #000;
    outline: none;
    transition: transform 0.2s;
    transform: rotate(4deg)
  }

  .login-form input:focus {
    border-color: #ff00ff;
    transform: rotate(0deg) scale(1.02);
  }

  .login-form button {
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    background: #ff007f;
    border: 3px double #000;
    cursor: pointer;
    transition: transform 0.3s;
    box-shadow: -3px 3px 0px #000, -6px 6px 0px #ff007f;
    transform: rotate(-2deg);
  }

  .login-form button:hover {
    background: #fff;
    color: #ff007f;
    transform: rotate(-3deg) scale(1.05);
  }

</style>