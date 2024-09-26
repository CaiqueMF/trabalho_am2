
import { auth } from './firebase'; // Adjust the import path as necessary

/** @type {import('@sveltejs/kit').Reroute} */
export function reroute({ url }) {
    const user = auth.currentUser;
    if (!user && url.pathname.startsWith('/protected'))
		return "/";
}
