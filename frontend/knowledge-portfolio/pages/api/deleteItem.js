import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	if (req.method === 'DELETE') {
		const itemId = req.body;

		const { error } = await supabase
			.from('items')
			.delete()
			.eq('id', itemId);

		if (error) {
			console.log(error);
		} else {
			res.status(200).json({
				message: 'The item has been deleted',
				statusCode: 200,
			});
		}
	}
}
