import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default async function handler(req, res) {
	if (req.method === 'POST') {
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

		const { data, error } = await supabase
			.from('categories')
			.select('*')
			.eq('userId', req.body);

		if (error) {
			console.log(error);
			res.status(500).json({
				error: 'Failed to retrieve user categories',
			});
		} else {
			res.status(200).json({
				data,
			});
		}

		// Send ok code
	}
}
