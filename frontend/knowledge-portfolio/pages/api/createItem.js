import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		console.log('on create item');
		// Extract values
		const newItem = {
			username: req.body.user,
			userAlias: req.body.userAlias,
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
			order: req.body.order,
		};

		console.log('new item', newItem);

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
		if (
			!req.body.title ||
			req.body.title.trim() === '' ||
			!req.body.user ||
			req.body.user.trim() === '' ||
			!req.body.userId
		) {
			return;
		}

		// Check if the categories field is set to Uncategorized
		if (req.body.categories === 'Uncategorized') {
			// Check if an Uncategorized category with this userId already exists
			const { data: uncategorizedData, error: uncategorizedError } =
				await supabase
					.from('categories')
					.select('*')
					.eq('name', 'Uncategorized')
					.eq('userId', req.body.userId);

			if (uncategorizedData && uncategorizedData.length > 0) {
				// If the Uncategorized category already exists, add the uncategorized category to the newItem categories
				newItem.categories = [uncategorizedData[0].id];
			} else {
				// If the Uncategorized category doesn't exist, create it and add the item to it
				const { data: newCategoryData, error: newCategoryError } =
					await supabase
						.from('categories')
						.insert([
							{
								name: 'Uncategorized',
								userId: req.body.userId,
								icon: 'FaQuestion',
							},
						])
						.select('*');

				if (newCategoryData && newCategoryData.length > 0) {
					// add the uncategorized category to the newItem categories
					newItem.categories = [newCategoryData[0].id];
				} else {
					res.status(500).json({
						error: 'Failed to create category',
					});
					return;
				}
			}
		}

		const { data: itemData, error } = await supabase
			.from('items')
			.insert(newItem)
			.select();

		// if (newItem.mainImageName) {
		// 	const { data: imageData, error: imageError } = await supabase
		// 		.from('image')
		// 		.insert({
		// 			// created_at: date,
		// 			imageName: newItem.mainImageName,
		// 			userId: mainImageName.userId,
		// 			imageUrl: newItem.mainImageUrl,
		// 			item: itemData[0].id,
		// 		})
		// 		.select();

		// 	//TODO: May not be necessary to do this relationship at the end with the imageUrl field but may be useful down the road
		// 	const { data: itemDataUpdate, error: itemDataUpdateError } =
		// 		await supabase
		// 			.from('items')
		// 			.update({
		// 				// created_at: date,
		// 				mainImageId: imageData[0].id,
		// 			})
		// 			.eq('id', itemData[0].id);
		// }

		console.log('res', res.status);

		if (error) {
			res.status(500).json({ error: 'Failed to create item' });
			console.log('error', error);
		} else {
			res.status(200).json({
				message: 'Item created successfully',
				data: itemData[0],
			});
		}
	}
}
