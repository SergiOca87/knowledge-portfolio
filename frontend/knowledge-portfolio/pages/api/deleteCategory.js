import { supabase } from '../../utils/supabaseClient';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req, res) {
	if (req.method === 'DELETE') {
		const categoryId = req.body;

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
			.from('categories')
			.delete()
			.eq('id', categoryId);

		// TODO: Look for this category on items and deelte it
		const { data: items } = await supabase
			.from('items')
			.select('*')
			.eq('userId', session.user.id);

		const newItemsWithFilteredCategories = items.map((item) => ({
			...item,
			categories: item.categories.filter(
				(itemCategory) => itemCategory != categoryId
			),
		}));

		const { error: itemsError } = await supabase
			.from('items')
			.upsert(newItemsWithFilteredCategories);

		if (error) {
			res.status(500).json({ error: 'Failed to delete category' });
		} else {
			res.status(200).json({
				message: 'The category has been deleted',
				statusCode: 200,
			});
		}
	}
}
