//TODO: Figure out the categories

import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import { CURRENT_USER_QUERY, useUser } from './User';
import { useState } from 'react';
import gql from 'graphql-tag';
import Router from 'next/router';
import { USER_ITEMS_QUERY } from './ItemGrid';
import UserContext from '../context/UserContext';
import { Button } from 'react-bootstrap';

const DELETE_ITEM_MUTATION = gql`
	mutation DELETE_ITEM_MUTATION($id: ID!) {
		deleteItem(id: $id) {
			id
		}
	}
`;

export default function DeleteItem({ id, children }) {
	const { user } = useContext(UserContext);
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

		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	const handleDelete = async (e) => {
		e.preventDefault();

		setDeleteConfirm({
			counter: (deleteConfirm.counter += 1),
			message: 'Are You Sure?',
		});

		if (deleteConfirm.counter >= 2) {
			deleteItem();
			'deleted', user.id;
		}
	};

	return (
		<Button variant="secondary" onClick={handleDelete} disabled={loading}>
			{deleteConfirm.counter === 0 ? children : deleteConfirm.message}
		</Button>
	);
}
