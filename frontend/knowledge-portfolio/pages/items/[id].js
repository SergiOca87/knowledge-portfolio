import React from 'react';
import SingleItem from '../../components/SingleItem';
import { useRouter } from 'next/router';
import Main from '../../components/Main';
import { Container } from 'react-bootstrap';

export default function SingleItemPage() {
	const router = useRouter();
	const { id } = router.query;

	return (
		<Main>
			<Container>
				<SingleItem id={id} />
			</Container>
		</Main>
	);
}
