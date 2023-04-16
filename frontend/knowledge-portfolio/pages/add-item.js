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
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

//TODO: If user create item, else use sign in

export default function createItems({ categories, items }) {
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
						<CreateItem
							categories={categories}
							itemsLength={items.length}
						/>
					</div>
				</Container>
			</Main>
		</>
	);
}

export async function getServerSideProps(context) {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(context);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	const { data: items } = await supabase
		.from('items')
		.select('*')
		.eq('userId', session.user.id);

	const { data: categories } = await supabase
		.from('categories')
		.select('*')
		.eq('userId', session.user.id);

	return {
		props: {
			categories,
			items,
		},
	};
}
