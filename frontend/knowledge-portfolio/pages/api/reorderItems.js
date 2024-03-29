import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req, res) {
	if (req.method === 'PUT') {
		// const itemId = req.body.itemId;
		// const newItemOrder = req.body.newItemOrder;
		console.log('on reorder api route', req.body);

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

		const itemsToUpsert = req.body.map((item) => {
			return { id: item.id, order: item.order };
		});

		const { error } = await supabase.from('items').upsert(itemsToUpsert);

		if (error) {
			res.status(500).json({ error: 'Failed to update item order' });
		} else {
			res.status(200).json({
				message: 'The item order has been updated',
				statusCode: 200,
			});
		}

		// Edit the item order
		// const { error } = await supabase
		// 	.transaction()
		// 	.update('items', { order: newItemOrder[0] })
		// 	.eq('id', itemId)
		// 	.update('items', { order: newItemOrder[1] })
		// 	.eq('id', newItemOrder[0])
		// 	.execute();

		// if (error) {
		// 	res.status(500).json({ error: 'Failed to update item order' });
		// } else {
		// 	res.status(200).json({
		// 		message: 'The item order has been updated',
		// 		statusCode: 200,
		// 	});
		// }
	}
}
