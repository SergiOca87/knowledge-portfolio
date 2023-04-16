import React from 'react';
import SingleItem from '../../components/items/SingleItem';
import { useRouter } from 'next/router';
import Main from '../../components/layout/Main';
import { Container } from 'react-bootstrap';
import { supabase } from '../../utils/supabaseClient';

export default function SingleItemPage({ item }) {
	return (
		<Main>
			<Container>
				<SingleItem item={item} />
			</Container>
		</Main>
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

	// Let Next.js know how many pages (user ids) are there
	const paths = data.map((itemId) => ({
		params: {
			id: itemId.id.toString(),
		},
	}));

	return { paths, fallback: false };
}

//TODO: Here we need getStaticProps() and getStaticPaths() with a fallback set to true and a "notFound" fallback, apuntes

//TODO: Instead of router we use params on getStaticPaths
