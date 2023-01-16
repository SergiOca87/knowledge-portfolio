import router from 'next/router';
import React, { useContext, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useState } from 'react';

import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteItem({
	id,
	children,
	setHasBeenDeletedId,
	hasBeenDeletedId,
}) {
	// So that the user has to click twice to delete an Item
	const [deleteConfirm, setDeleteConfirm] = useState({
		counter: 0,
		message: 'Delete',
	});

	const handleDelete = async (e) => {
		e.preventDefault();

		setDeleteConfirm({
			counter: (deleteConfirm.counter += 1),
			message: 'Are You Sure?',
		});

		if (deleteConfirm.counter >= 2) {
			try {
				fetch('/api/deleteItem', {
					method: 'DELETE',
					body: JSON.stringify(id),
					headers: {
						'Content-Type': 'application.json',
					},
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.statusCode === 200) {
							toast.success(data.message);
							//TODO: Actually hide the item, maybe using ref?

							setHasBeenDeletedId((hasBeenDeletedId) => [
								...hasBeenDeletedId,
								id,
							]);
							return;
						}
					});
			} catch (err) {
				toast.error(err);
				console.log(err);
			}
		}
	};

	return (
		<Button variant="secondary" onClick={handleDelete}>
			{deleteConfirm.counter === 0 ? children : deleteConfirm.message}
		</Button>
	);
}
