import CreateItem from '../components/CreateItem';
import Link from 'next/link';

export default function createItems() {
	return (
		<div>
			<h1>Add a Protfolio Item</h1>

			<p>
				If you haven't done so, before ading an item you may want to
				create a few categories for this item first, you can do so{' '}
				<Link href="add-category">here</Link>{' '}
			</p>
			<CreateItem />
		</div>
	);
}
