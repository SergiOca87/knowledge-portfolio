import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
// import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	if (req.method === 'PUT') {
		const itemId = req.body.itemId;
		const newItemOrder = req.body.newItemOrder;

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

		// Edit the item order
		//TODO: The problem is that we actually need to update 2 items...
		const { error } = await supabase
			.from('items')
			.update({ order: newItemOrder })
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
