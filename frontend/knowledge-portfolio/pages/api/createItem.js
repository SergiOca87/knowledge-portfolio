import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		// Extract values
		const newItem = {
			username: req.body.user,
			title: req.body.title,
			description: req.body.description,
			categories: req.body.activeCategories,
			singlePageContent: req.body.singlePageContent,
			urlTitle: req.body.urlTitle,
			url: req.body.url,
			status: req.body.status,
			userId: req.body.userId,
			mainImageName: req.body.mainImageName,
			mainImageUrl: req.body.mainImageUrl,
		};

		// Serverside validation
		if (
			!title ||
			title.trim() === '' ||
			!userName ||
			userName.trim() === '' ||
			!userId
		) {
			return;
		}

		// await supabase, etc.
		const { data, error } = await supabase
			.from('items')
			.insert(newItem)
			.select();

		console.log('api create item', data);

		// Send error code otherwise

		// Send ok code
	}
}
