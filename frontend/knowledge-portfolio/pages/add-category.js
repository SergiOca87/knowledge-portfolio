import { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Categories from '../components/Categories';
import CreateCategory from '../components/CreateCategory';
import Main from '../components/Main';
import { getCategories } from '../components/UserCategories';
import UserContext from '../context/UserContext';

export default function createItems() {
	const { user } = useContext(UserContext);
	const userCategories = getCategories();

	return (
		<Main>
			<Container>
				<div className="titles">
					<h1>Add a Category</h1>
					<p>
						Categories allow you to group your data and allow
						visitors to filter your items.
					</p>
				</div>
				<Row>
					<Col lg={7}>
						<CreateCategory />
					</Col>

					{user && userCategories && (
						<Col lg={4}>
							<Categories
								categories={userCategories?.allCategories}
							/>
						</Col>
					)}
				</Row>
			</Container>
		</Main>
	);
}
