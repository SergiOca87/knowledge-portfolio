import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { USER_CATEGORIES_QUERY, getCategories } from '../user/UserCategories';
import { LOGGED_IN_USER } from '../user/User';
import { useState } from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';

import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const DELETE_ITEM_MUTATION = gql`
	mutation DELETE_ITEM_MUTATION($id: ID!) {
		deleteItem(where: { id: $id }) {
			id
			title
		}
	}
`;

export default function DeleteItem({ id, children }) {
	// So that the user has to click twice to delete an Item
	const [deleteConfirm, setDeleteConfirm] = useState({
		counter: 0,
		message: 'Delete',
	});
	// Submit current state to create a new Item
	const [deleteItem, { loading, error }] = useMutation(DELETE_ITEM_MUTATION, {
		variables: {
			id,
		},

		refetchQueries: [{ query: LOGGED_IN_USER }],
	});

	const handleDelete = async (e) => {
		e.preventDefault();

		setDeleteConfirm({
			counter: (deleteConfirm.counter += 1),
			message: 'Are You Sure?',
		});

		if (error) {
			toast.error(error);
		} else if (deleteConfirm.counter >= 2) {
			const res = await deleteItem();

			res?.data?.deleteItem &&
				toast.success(`${res.data.deleteItem.title} has been deleted`);
		}
	};

	return (
		<Button variant="secondary" onClick={handleDelete} disabled={loading}>
			{deleteConfirm.counter === 0 ? children : deleteConfirm.message}
		</Button>
	);
}
