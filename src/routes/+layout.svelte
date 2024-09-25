<script>
  import { page } from '$app/stores';
  import { auth } from '../firebase';

  //faz logout do usuário e joga ele na página incial
  async function deslogar() {
    try {
      await auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao desconectar: ', error);
    }
  }

</script>

<main>
  <header>
    <nav>
      <ul>
        <li aria-current={$page.url.pathname === '/' ? 'page' : undefined} class="home">
          <a href="/">Home</a>
        </li>
        <li aria-current={$page.url.pathname === '/ProductList' ? 'page' : undefined}>
          <a href="/ProductList">Lista Produtos</a>
        </li>
        <li>
          <button on:click={deslogar}>Sair</button>
        </li>
      </ul>
    </nav>
  </header>
  <slot></slot>
  <footer>
    <p>José Caique MIlitão França</p>
    <span>2024</span>
  </footer>
</main>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #f5f5f5;
    font-family: 'Special Elite', sans-serif;
    font-weight: bold;
    font-size: 35px;
    padding: 20px;
    background-image:linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) ), url('background3.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 0;
    box-sizing: border-box;
    text-shadow: 2px 2px #000;
    mix-blend-mode: multiply;
  }

  header nav ul {
    list-style: none;
    display: flex;
    gap: 20px;
    padding: 0;
    margin-bottom: 20px;
  }

  header nav ul li {
    text-transform: uppercase;
    display: inline-block;
    transition: transform 0.3s;
  }

  header nav ul li:nth-child(1) {
    transform: rotate(-4deg);
  }

  header nav ul li:nth-child(2) {
    transform: rotate(5deg);
  }

  header nav ul li:nth-child(3) {
    transform: rotate(-3deg);
  }

  header nav a {
    color: #ff007f;
    text-decoration: none;
    border-bottom: 2px dashed #ff007f;
    transition: border-bottom 0.3s, color 0.3s;
  }

  header nav a:hover {
    color: #fff;
    border-bottom: 2px double #ff007f;
  }

  button {
    background: #000;
    color: #ff007f;
    border: 3px double #ff007f;
    padding: 10px 20px;
    cursor: pointer;
    transition: transform 0.3s;
    transform: rotate(-9deg);
    box-shadow: -3px 3px 0px #ff007f, -6px 6px 0px #000;
  }

  button:hover {
    background: #ff007f;
    color: #000;
    transform: rotate(-3deg) scale(1.05);
  }

  footer {
    font-size: 14px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
    text-align: center;
    transform: rotate(1deg);
    box-shadow: -2px 2px 0px #ff007f, -4px 4px 0px #000;
    margin-top: auto;
  }

  main,
  header,
  footer {
    border: none;
    filter: contrast(1.2) brightness(0.9);
  }
</style>