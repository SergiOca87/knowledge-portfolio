import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		// Extract values
		const newCategory = {
			name: req.body.name,
			icon: req.body.icon,
			userId: req.body.userId,
		};

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
