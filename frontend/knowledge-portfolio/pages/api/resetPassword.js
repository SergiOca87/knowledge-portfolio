import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req, res) {
	if (req.method === 'GET') {
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

		console.log(session);

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
