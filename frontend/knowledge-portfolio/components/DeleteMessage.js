import { useState } from 'react';

import { Button } from 'react-bootstrap';

export default function DeleteMessage({ id, children }) {
	// So that the user has to click twice to delete an Item
	const [deleteConfirm, setDeleteConfirm] = useState({
		counter: 0,
		message: 'Delete',
	});

	const handleDelete = async (e) => {
		e.preventDefault();

		setDeleteConfirm((prevData) => ({
			counter: (prevData.counter += 1),
			message: 'Are You Sure?',
		}));

		if (deleteConfirm.counter >= 2) {
			deleteMessage();

			setDeleteConfirm({
				counter: 0,
				message: 'Delete?',
			});
		}
	};

	return (
		<Button variant="secondary" onClick={handleDelete} disabled={loading}>
			{deleteConfirm.counter === 0 ? children : deleteConfirm.message}
		</Button>
	);
}
