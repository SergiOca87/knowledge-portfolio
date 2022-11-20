import router from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';

import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { supabase } from '../../utils/supabaseClient';

export default function DeleteItem({ id, children }) {
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
			const { error } = await supabase
				.from('items')
				.delete()
				.eq('id', id);

			if (error) {
				toast.error(error);
			} else {
				router.replace(router.asPath);
			}
		}
	};

	return (
		<Button variant="secondary" onClick={handleDelete}>
			{deleteConfirm.counter === 0 ? children : deleteConfirm.message}
		</Button>
	);
}
