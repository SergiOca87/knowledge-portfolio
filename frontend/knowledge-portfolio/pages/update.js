import React from 'react';
import UpdateItem from '../components/item/UpdateItem';
import { useRouter } from 'next/router';

export default function UpdatePage() {
	const router = useRouter();
	const { id } = router.query;

	return (
		<div>
			<UpdateItem id={id} />
		</div>
	);
}
