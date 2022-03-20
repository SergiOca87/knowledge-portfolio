import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Categories from '../components/Categories';
import CreateCategory from '../components/CreateCategory';
import Main from '../components/Main';
import { getCategories } from '../components/UserCategories';
import UserContext from '../context/UserContext';

// const StyledContainer = styled.Container`

// `
export default function createItems() {
	const { user } = useContext(UserContext);
	const userCategories = getCategories();

	return (
		<Main>
			<Container>
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
							Categories allow you to group your data and allow
							visitors to filter your items.
						</p>
					</div>

					<CreateCategory />

					{user && userCategories && (
						<Categories
							categories={userCategories?.allCategories}
						/>
					)}
				</div>
			</Container>
		</Main>
	);
}
