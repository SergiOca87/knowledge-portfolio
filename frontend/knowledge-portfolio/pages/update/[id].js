import React from 'react';
import UpdateItem from '../../components/items/UpdateItem';
import { supabase } from '../../utils/supabaseClient';

export default function UpdatePage({ item }) {
	return (
		<div>
			<UpdateItem item={item} />
		</div>
	);
}

export async function getStaticProps(context) {
	const { params } = context;

	const itemId = params.id;

	let { data: item } = await supabase
		.from('items')
		.select('*')
		.eq('id', itemId);

	return {
		props: {
			item,
		},
	};
}

export async function getStaticPaths() {
	// Get all users from supabase
	let { data, error } = await supabase.from('items').select('id');

	console.log('data', data);

	// Let Next.js know how many pages (user ids) are there
	const paths = data.map((itemId) => ({
		params: {
			id: itemId.id.toString(),
		},
	}));

	return { paths, fallback: false };
}
