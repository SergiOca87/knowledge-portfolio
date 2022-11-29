import CreateItem from '../components/items/CreateItem';
import Link from 'next/link';
import Main from '../components/layout/Main';
import { Container } from 'react-bootstrap';
import { css } from 'styled-components';
import Script from 'next/script';

//TODO: If user create item, else use sign in

export default function createItems() {
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
								If you haven't done so, before ading an item you
								may want to create a few categories for this
								item first, you can do so{' '}
								<Link href="add-category">here</Link>{' '}
							</p>
						</div>

						<CreateItem />
					</div>
				</Container>
			</Main>
		</>
	);
}
