import { Container } from 'react-bootstrap';
import CreateCategory from '../components/CreateCategory';
import Main from '../components/Main';

export default function createItems() {
	return (
		<Main>
			<Container>
				<div className="titles">
					<h1>Add a Category</h1>
				</div>
				<div>
					<CreateCategory />
				</div>
			</Container>
		</Main>
	);
}
