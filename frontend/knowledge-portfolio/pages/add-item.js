import CreateItem from '../components/items/CreateItem';
import Link from 'next/link';
import Main from '../components/layout/Main';
import { Container } from 'react-bootstrap';
import { css } from 'styled-components';
import Script from 'next/script';
import UpdateItem from '../components/items/UpdateItem';
import {
	useSession,
	useSessionContext,
	useUser,
} from '@supabase/auth-helpers-react';
import NotLoggedIn from '../components/auth/NotLoggedIn';
import { supabase } from '../utils/supabaseClient';

//TODO: If user create item, else use sign in

export default function createItems({ categories }) {
	const user = useUser();
	const { session } = useSessionContext();

	return (
		<>
			<Script
				src="https://upload-widget.cloudinary.com/global/all.js"
				strategy="beforeInteractive"
			/>
			<Main>
				<Container>
					<div
						css={css`
							max-width: 80rem;
							margin: 0 auto;
						`}
					>
						{!session ? (
							<NotLoggedIn />
						) : (
							<>
								<div
									className="titles"
									css={css`
										max-width: 60rem;
										margin-bottom: 4rem;
									`}
								>
									<h1>Add a Portfolio Item</h1>
									<p>
										You can create categories for your item{' '}
										<Link href="add-category">here</Link>{' '}
									</p>
								</div>
								//TODO: Can proobably send down the tree a
								//TODO: createCategory
								<CreateItem categories={categories} />
							</>
						)}
					</div>
				</Container>
			</Main>
		</>
	);
}

export async function getServerSideProps(context) {
	// Get params from URL
	const { params } = context;

	// Get User ID
	const userId = params.id;

	let { data: categories } = await supabase
		.from('categories')
		.select('*')
		.eq('userId', userId);

	return {
		props: {
			categories,
		},
	};
}
