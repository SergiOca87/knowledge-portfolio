import { supabase } from '../../utils/supabaseClient';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req, res) {
	if (req.method === 'PUT') {
		console.log('on API, item to update', req.body);
		// Serverside validation

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

		if (
			!req.body.title ||
			req.body.title.trim() === '' ||
			!req.body.userId
		) {
			console.log('server side validation failed');
			return;
		}

		const { data, error } = await supabase
			.from('items')
			.update({
				title: req.body.title,
				description: req.body.description,
				categories: req.body.categories,
				singlePageContent: req.body.singlePageContent,
				urlTitle: req.body.urlTitle,
				url: req.body.url,
				status: req.body.status === 'true' ? true : false,
				userId: req.body.userId,
				mainImageName: req.body.mainImageName,
				mainImageUrl: req.body.mainImageUrl,
			})
			//TODO Probably need to provide this, what is item.id here?
			.eq('id', req.body.itemId);

		if (error) {
			res.status(400).json({ error: 'Failed to update item' });
		} else {
			res.status(200).json({
				message: 'Item updated successfully',
			});
		}
	}
}
