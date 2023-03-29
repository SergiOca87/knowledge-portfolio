import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		// Extract values
		const newItem = {
			username: req.body.user,
			title: req.body.title,
			description: req.body.description,
			categories: req.body.categories,
			singlePageContent: req.body.singlePageContent,
			urlTitle: req.body.urlTitle,
			url: req.body.url,
			status: req.body.status,
			userId: req.body.userId,
			mainImageName: req.body.mainImageName,
			mainImageUrl: req.body.mainImageUrl,
		};

		// Auth protected API route
		const supabase = createServerSupabaseClient(context);

		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			res.status(401).json({ message: 'Authentication required' });
			return;
		}

		// Serverside validation
		if (
			!req.body.title ||
			req.body.title.trim() === '' ||
			!req.body.user ||
			req.body.user.trim() === '' ||
			!req.body.userId
		) {
			return;
		}

		const { data: itemData, error } = await supabase
			.from('items')
			.insert(newItem)
			.select();

		console.log('serveside itemData', itemData);

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

		if (error) {
			res.status(500).json({ error: 'Failed to create item' });
		} else {
			res.status(200).json({
				message: 'Item created successfully',
				data: itemData[0],
			});
		}
	}
}
