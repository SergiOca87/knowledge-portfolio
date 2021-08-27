import React from 'react';
import SingleCategory from '../../components/SingleCategory';
import { useRouter } from 'next/router';

export default function SingleCategoryPage() {
	const router = useRouter();
	const { id } = router.query;

	console.log(id);
	return (
		<div>
			<SingleCategory id={id} />
		</div>
	);
}
