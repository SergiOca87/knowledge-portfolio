import CreateItem from '../components/CreateItem';
import Link from 'next/link';
import Main from '../components/Main';
import { Container } from 'react-bootstrap';
import { css } from 'styled-components';

export default function createItems() {
	return (
		<Main>
			<Container>
				<div className="titles">
					<h1>Add a Portfolio Item</h1>
					<p
						css={css`
							max-width: 60rem;
						`}
					>
						If you haven't done so, before ading an item you may
						want to create a few categories for this item first, you
						can do so <Link href="add-category">here</Link>{' '}
					</p>
				</div>
				<CreateItem />
			</Container>
		</Main>
	);
}
