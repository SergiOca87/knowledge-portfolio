import React from 'react';
import SingleItem from '../../components/SingleItem';
import { useRouter } from 'next/router';

export default function SingleItemPage() {
	const router = useRouter();
	const { id } = router.query;

	console.log(id);
	return (
		<div>
			<SingleItem id={id} />
		</div>
	);
}
