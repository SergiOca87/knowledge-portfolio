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

//TODO: Here we need getStaticProps() and getStaticPaths() with a fallback set to true and a "notFound" fallback, apuntes

//TODO: Instead of router we use params on getStaticPaths
