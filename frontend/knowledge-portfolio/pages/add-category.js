import { Container } from 'react-bootstrap';
import CreateCategory from '../components/CreateCategory';
import Main from '../components/Main';

export default function createItems() {
	return (
		<Main>
			<Container>
				<div className="titles">
					<h1>Add a Category</h1>
					<p>
						Categories allow you to group your data and also allow
						visitors to filter your items.
					</p>
				</div>
				<div>
					<CreateCategory />
				</div>
			</Container>
		</Main>
	);
}
