import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const { data, error } = await supabase.auth.getUser();

		return response.status(200).json(data);
	}
}
