//TODO: Figure out the categories

import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import { useState } from 'react';
import gql from 'graphql-tag';

const SINGLE_ITEM_QUERY = gql`
	query SINGLE_ITEM_QUERY($id: ID!) {
		Item(where: { id: $id }) {
			title
			description
			status
			categories {
				id
				name
			}
		}
	}
`;

const UPDATE_ITEM_MUTATION = gql`
	mutation UPDATE_ITEM_MUTATION(
		$id: ID!
		$title: String
		$description: String
		$status: String
	) {
		updateItem(
			id: $id
			data: { title: $title, status: $status, description: $description }
		) {
			id
			title
		}
	}
`;

export default function UpdateItem({ id }) {
	const [inputs, setInputs] = useState({
		title: '',
		description: '',
		status: '',
	});

	const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
		variables: {
			id,
		},
	});

	const [
		updateItem,
		{ data: updateData, loading: updateLoading, error: updateError },
	] = useMutation(UPDATE_ITEM_MUTATION, {
		variables: {
			id,
			title: inputs.title,
			status: inputs.status,
			description: inputs.description,
		},
	});

	useEffect(() => {
		setInputs({
			title: data?.Item.title,
			description: data?.Item.description,
			status: data?.Item.status,
		});
	}, [data]);

	//TODO: Maybe we need to import the Apollo query like ALL_ITEMS_QUERY?
	const userCategories = getCategories();

	const handleChange = (e) => {
		let { value, name } = e.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};

	// Submit current state to create a new Item
	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await updateItem().catch(console.error);

		//TODO: Do we need to redirect? Decide what's the best user experience here

		//TODO: Maybe use a succesful toast
		//Redirect the user
		// Router.push({
		// 	pathname: `/portfolio/${data.updateItem.id}`,
		// });

		//TODO: Use React Toasts for errors
		//Redirect should happen here
	};

	if (loading) return <p>Loading...</p>;

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<fieldset disabled={updateLoading} aria-busy={updateLoading}>
				<label htmlFor="title">
					<span>Title</span>
					<input
						required
						type="text"
						name="title"
						value={inputs.title}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="description">
					<span>Description</span>
					<textarea
						name="description"
						value={inputs.description}
						onChange={handleChange}
					/>
				</label>

				{userCategories && (
					<label htmlFor="category">
						<select name="category">
							{userCategories.allCategories.map((category) => {
								return (
									<option key="category.id">
										{category.title}
									</option>
								);
							})}
						</select>
					</label>
				)}

				<label htmlFor="status">
					<select
						name="status"
						value={inputs.status}
						onChange={handleChange}
					>
						<option value="finished">Finished</option>
						<option value="unfinished">Unfinished</option>
					</select>
				</label>
				<input type="submit" value="Update" />
			</fieldset>
		</form>
	);
}
