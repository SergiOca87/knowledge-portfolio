import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	if (req.method === 'POST') {

		const { name, icon, userId } = req.body;

		const newCategory = {
			name,
			icon,
			userId
		};

		console.log('trying to create', newCategory);

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

		// Serverside validation
		if (!req.body.name || req.body.name.trim() === '' || !req.body.userId) {
			return;
		}

		//TODO: Check if it already exists, same userId and same category name
		const { data: countData, error: countError } = await supabase
			.from('categories')
			.select('*')
			.match({ name: newCategory.name, userId: newCategory.userId });

		if (countData.length) {
			if (countError) {
				res.status(500).json({ error: 'Something went wrong' });
			} else {
				console.log('the category does exist');
				res.status(303).json({
					code: 303,
					countData,
				});
			}
		} else {
			const { data, error } = await supabase
				.from('categories')
				.insert(newCategory);
			if (error) {
				res.status(500).json({ error: 'Failed to create category' });
			} else {
				res.status(200).json({
					code: 200,
					data,
				});
			}
		}
	}
}
