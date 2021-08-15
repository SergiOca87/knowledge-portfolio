//TODO: Figure out the categories

import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import { useState } from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { ALL_ITEMS_QUERY } from './ItemGrid';

const DELETE_ITEM_MUTATION = gql`
	mutation DELETE_ITEM_MUTATION($id: ID!) {
		deleteItem(id: $id) {
			id
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
		refetchQueries: [{ query: ALL_ITEMS_QUERY }],
	});

	const handleDelete = async (e) => {
		e.preventDefault();

		setDeleteConfirm({
			counter: (deleteConfirm.counter += 1),
			message: 'Are You Sure?',
		});

		if (deleteConfirm.counter >= 2) {
			deleteItem();
		}
	};

	return (
		<button onClick={handleDelete} disabled={loading}>
			{deleteConfirm.counter === 0 ? children : deleteConfirm.message}
		</button>
	);
}
