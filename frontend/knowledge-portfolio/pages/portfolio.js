// Grid Component
// Item Component

import ItemGrid from '../components/layout/ItemGrid';
import Layout from '../components/layout/Layout';

// allItems graphql query
// Items should be the usr items only

export default function Portfolio() {
	return (
		<Layout title="About">
			<ItemGrid />
		</Layout>
	);
}
