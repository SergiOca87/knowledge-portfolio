async function updateUser() {
	try {
		const user = supabase.auth.user();
		const updates = {
			id: user.id,
			username,
			updated_at: new Date(),
		};

		let { error } = await supabase.from('profiles').upsert(updates);
		if (error) {
			throw error;
		}
	} catch (error) {
		alert(error.message);
	}
}

export default updateUser;
