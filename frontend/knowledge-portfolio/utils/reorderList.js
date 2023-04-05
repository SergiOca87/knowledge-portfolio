// This function is defined as a util as it has to be used client-side and server-side
export const reorderList = async (
	filteredItems,
	sourceIndex,
	destinationIndex,
	clientSide = false
) => {
	if (destinationIndex === sourceIndex) {
		return null;
	}

	const newItems = Array.from(filteredItems);
	const [moving] = newItems.splice(sourceIndex, 1);
	newItems.splice(destinationIndex, 0, moving);

	// Set the new order property of each item based on its index
	const updatedItems = newItems.map((item, index) => ({
		...item,
		order: index,
	}));

	if (clientSide) {
		const itemId = updatedItems[destinationIndex].id;
		const newItemOrder = updatedItems.map((item) => item.id);

		try {
			await fetch('/api/reorderItems', {
				method: 'PUT',
				body: JSON.stringify({
					itemId: itemId,
					newItemOrder: newItemOrder,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			console.log(error);
		}
	}

	return updatedItems;
};
