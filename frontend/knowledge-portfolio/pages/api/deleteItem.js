import { supabase } from '../../utils/supabaseClient';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req, res) {
	if (req.method === 'DELETE') {
		const itemId = req.body;

		// Auth protected API route
		const supabase = createServerSupabaseClient({
			req,
			res,
		});

		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			res.status(401).json({ message: 'Authentication required' });
			return;
		}

		const { error } = await supabase
			.from('items')
			.delete()
			.eq('id', itemId);

		if (error) {
			res.status(500).json({ error: 'Failed to delete item' });
		} else {
			res.status(200).json({
				message: 'The item has been deleted',
				statusCode: 200,
			});
		}
	}
}
