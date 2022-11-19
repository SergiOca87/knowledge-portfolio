import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Categories from '../components/categories/Categories';
import CreateCategory from '../components/categories/CreateCategory';
import Main from '../components/layout/Main';
import NotLoggedIn from '../components/auth/NotLoggedIn';
// import { getCategories } from '../components/UserCategories';
import { useUserState } from '../context/userContext';

// const StyledContainer = styled.Container`

// `
export default function createItems() {
	// const userCategories = getCategories();
	const { user, userCategories } = useUserState();

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

							{userCategories?.length ? (
								<>
									<p>Your current existing Categories:</p>
									<Categories
										title={false}
										categories={userCategories}
										background={true}
									/>
								</>
							) : (
								''
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
