/* eslint-disable react/react-in-jsx-scope */
//TODO: The item should be asigned directly to the logged in User
//TODO: Get the current user
//TODO: For the category, load user categories or create a new one (and assign it to the current user)
//TODO: How to assign the item to a choosen category
//TODO: Add the URL field
//TODO: Add Toast for errors
//TODO: At the moment we can connect existing categories, but may be useful to be able to create them ehre as well
import { CURRENT_USER_QUERY, useUser } from './User';
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import { ALL_ITEMS_QUERY } from './ItemGrid';
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION(
		$title: String!
		$description: String
		$status: String # $categories: # $url: String # $user: User # $completed: Boolean
		$author: ID!
		$singlePage: String
		$image: String
		$category: ID
		$url: String
	) {
		createItem(
			data: {
				title: $title
				description: $description
				# category: $category
				# url: $url
				author: { connect: { id: $author } }
				status: $status
				singlePage: $singlePage
				image: $image
				# This creates a category as well
				# category: { create: { category: $category } }
				# category: { connect: { id: $category } }
				category: { connect: { id: $category } }
				url: $url
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
	const user = useUser();
	const userCategories = getCategories();

	const [inputs, setInputs] = useState({
		title: '',
		description: '',
		author: user ? user?.id : '',
		status: 'finished',
		singlePage: 'false',
		image: '',
		category: '',
		url: '',
	});

	useEffect(() => {
		setInputs({
			...inputs,
			author: user?.id,
		});
	}, [user]);

	const [createItem, { loading, error, data }] = useMutation(
		CREATE_ITEM_MUTATION,
		{
			variables: inputs,
			refetchQueries: [{ query: ALL_ITEMS_QUERY }],
		}
	);

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

		if (error) {
			console.log(error);
		} else {
			const res = await createItem();

			console.log('success', res);

			//TODO: Successfull Toast

			// Clear form on submit
			setInputs({
				title: '',
				description: '',
				status: 'finished',
				category: '',
			});
		}

		//TODO: Redirect to single item page?
		//Redirect the user
		// Router.push({
		// 	pathname: `/portfolio/${data.createItem.id}`,
		// });

		//TODO: Use React Toasts for errors
		// console.log(error);
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
				<label htmlFor="image">
					<span>Image</span>
					<input
						type="file"
						id="image"
						name="image"
						onChange={handleChange}
						accept="image/png, image/jpeg"
					/>
				</label>
				{userCategories && (
					<label htmlFor="category">
						<select name="category" onChange={handleChange}>
							{userCategories?.allCategories?.map((category) => {
								return (
									<option
										key={category.id}
										value={category.id}
									>
										{category.name}
									</option>
								);
							})}
						</select>
					</label>
				)}
				<label htmlFor="status">
					<select name="status" onChange={handleChange}>
						<option value="finished">Finished</option>
						<option value="unfinished">Unfinished</option>
					</select>
				</label>
				<p>
					If "Single Page" is enabled your portfolio items will be
					clickable and will redirect the user to a detail page with a
					more detailed view of your portfolio item.
				</p>
				<label htmlFor="singlepage">
					Single Page
					<input
						type="checkbox"
						id="singlePage"
						name="singlePage"
						value={inputs.singlePage}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="url">
					<span>URL</span>
					<input
						type="url"
						name="url"
						value={inputs.url}
						onChange={handleChange}
					/>
				</label>
				<input type="submit" value="submit" />
			</fieldset>
		</form>
	);
}
