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

		const { data: itemData, error } = await supabase
			.from('items')
			.insert(newItem)
			.select();
		// Send error code otherwise

		if (newItem.mainImageName) {
			const { data: imageData, error: imageError } = await supabase
				.from('image')
				.insert({
					// created_at: date,
					imageName: newItem.mainImageName,
					userId: mainImageName.userId,
					imageUrl: newItem.mainImageUrl,
					item: itemData[0].id,
				})
				.select();

			//TODO: May not be necessary to do this relationship at the end with the imageUrl field but may be useful down the road
			const { data: itemDataUpdate, error: itemDataUpdateError } =
				await supabase
					.from('items')
					.update({
						// created_at: date,
						mainImageId: imageData[0].id,
					})
					.eq('id', itemData[0].id);
		}

		// Send ok code
	}
}
