// Grid Component
// Item Component

import ItemGrid from '../components/ItemGrid';
import Layout from '../components/Layout';

// allItems graphql query
// Items should be the usr items only

export default function Portfolio() {
	return (
		<Layout title="About">
			<ItemGrid />
		</Layout>
	);
}
