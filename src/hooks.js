
import { auth } from './firebase';

//redireciona o usuário para o login caso tente acessar uma rota protejida sem estar logado
export function reroute({ url }) {
    const user = auth.currentUser;
    if (!user && url.pathname.startsWith('/protected'))
		return "/";
}
