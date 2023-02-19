import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	if (req.method === 'PUT') {
		// Serverside validation

		console.log('we made it to the api route?');
		if (
			!req.body.title ||
			req.body.title.trim() === '' ||
			!req.body.userId
		) {
			console.log('server side validation failed');
			return;
		}

		console.log('update', req.body.title);

		const { error } = await supabase
			.from('items')
			.update({
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
			})
			//TODO Probably need to provide this, what is item.id here?
			.eq('id', req.body.itemId);
		// Send error code otherwise

		if (req.body.mainImageName) {
			const { data: imageData, error: imageError } = await supabase
				.from('image')
				.insert({
					// created_at: date,
					imageName: req.body.mainImageName,
					userId: req.body.userId,
					imageUrl: req.body.mainImageUrl,
					item: req.body.itemId,
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
					.eq('id', req.body.itemId);
		}

		// Send ok code
	}
}
