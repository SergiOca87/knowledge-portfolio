import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		// Extract values
		const newCategory = {
			name: req.body.name,
			icon: req.body.icon,
			userId: req.body.userId,
		};

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

		const { data: categoryData, error } = await supabase
			.from('categories')
			.insert(newCategory);

		if (error) {
			res.status(500).json({ error: 'Failed to create category' });
		} else {
			res.status(200).json({
				message: 'Category created successfully',
				data: categoryData[0],
			});
		}
	}
}
