import { supabase } from '../../utils/supabaseClient';

async function getProfile() {
	try {
		const user = supabase.auth.user();
		let { data, error, status } = await supabase
			.from('profiles')
			.select(`username`)
			.eq('id', user.id)
			.single();

		if (error && status !== 406) {
			throw error;
		}

		if (data) {
			setUsername(data.username);
		}
	} catch (error) {
		alert(error.message);
	}
}
