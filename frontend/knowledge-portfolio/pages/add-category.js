import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Categories from '../components/categories/Categories';
import CreateCategory from '../components/categories/CreateCategory';
import Main from '../components/layout/Main';
import NotLoggedIn from '../components/auth/NotLoggedIn';
// import { getCategories } from '../components/UserCategories';
// import { useUserState } from '../context/userContext';
import { useUser } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

// const StyledContainer = styled.Container`

// `
export default function createCategory({ user, categories }) {
	// const userCategories = getCategories();

	return (
		<Main>
			<Container>
				{user ? (
					<div
						css={css`
							max-width: 80rem;
							margin: 0rem auto;
						`}
					>
						<div
							className="titles"
							css={css`
								max-width: 60rem;
								margin-bottom: 4rem;
							`}
						>
							<h1>Add a Category</h1>
							<p>
								Categories allow you to group your data and
								allow visitors to filter your items.
							</p>

							{categories && (
								<>
									<p>Your current existing Categories:</p>
									<Categories
										title={false}
										categories={categories}
										background={true}
										editMode={true}
									/>
								</>
							)}
						</div>

						<CreateCategory />
					</div>
				) : (
					<NotLoggedIn />
				)}
			</Container>
		</Main>
	);
}

export async function getServerSideProps(context) {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(context);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session)
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};

	const { data: categories } = await supabase
		.from('categories')
		.select('*')
		.eq('userId', session.user.id);

	return {
		props: {
			initialSession: session,
			user: session.user,
			categories,
		},
	};
}
