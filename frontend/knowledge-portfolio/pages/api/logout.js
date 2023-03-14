import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const { error } = await supabase.auth.signOut();
	}
}
