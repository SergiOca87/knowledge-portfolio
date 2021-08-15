//TODO: The item should be asigned directly to the logged in User
//TODO: Get the current user
//TODO: To get the current user we have to sign in first (sign in component)
//TODO: How to assign the item to a choosen category
//TODO: Add the URL field
//TODO: Add Toast for errors
import { CURRENT_USER_QUERY } from './User';
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import { ALL_ITEMS_QUERY } from './ItemGrid';
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION(
		$title: String!
		$description: String
		$status: String # $categories: # $url: String # $user: User # $completed: Boolean
		$category: String
	) {
		createItem(
			data: {
				title: $title
				description: $description
				# category: $category
				# url: $url
				# user: $user
				status: $status
				# This creates a category as well
				category: { create: { category: $category } }
			}
		) {
			# Do we need to return more things?
			id
			title
			# description
		}
	}
`;

export default function CreateItem() {
	const [inputs, setInputs] = useState({
		title: '',
		description: '',
		// category: '',
		// url: '',
		// user: '',
		status: '',
		category: '',
	});

	//TODO: Maybe we need to import the Apollo query like ALL_ITEMS_QUERY?
	const userCategories = getCategories();

	const [createItem, { loading, error, data }] = useMutation(
		CREATE_ITEM_MUTATION,
		{
			variables: inputs,
			refetchQueries: [{ query: ALL_ITEMS_QUERY }],
		}
	);

	// const clearForm = () => {
	// 	const blankState = Object.fromEntries(
	// 		Object.entries(inputs).map(([key, value]) => [key, ''])
	// 	);
	// 	setInputs(blankState);
	// };

	// Handle changes on form inputs
	// Adds changes to state
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
		console.log('submit', inputs);

		//TODO: Can use try/catch?
		try {
			await createItem();

			// Clear form on submit
			setInputs({
				title: '',
				description: '',
				// category: '',
				// url: '',
				// user: '',
				status: '',
				category: '',
			});

			//TODO: Do we need to redirect? Decide what's the best user experience here
			//Redirect the user
			Router.push({
				pathname: `/portfolio/${data.createItem.id}`,
			});
		} catch (err) {
			//TODO: Use React Toasts for errors
			console.log(error);
		}

		//Redirect should happen here
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<fieldset disabled={loading} aria-busy={loading}>
				<label htmlFor="title">
					<span>Title</span>
					<input
						required
						type="text"
						name="title"
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="description">
					<span>Description</span>
					<textarea name="description" onChange={handleChange} />
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
					<select name="status" onChange={handleChange}>
						<option value="finished">Finished</option>
						<option value="unfinished">Finished</option>
					</select>
				</label>
				<input type="submit" value="submit" />
			</fieldset>
		</form>
	);
}
