// TODO: The item should be asigned directly to the logged in User
//TODO: Get the current user
//TODO: To get the current user we have to sign in first (sign in component)
import { CURRENT_USER_QUERY, useUser } from './User';
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';

const CREATE_ITEM_MUTATION = gql`
	mutation CreateItem(
		$title: String!
		$description: String
		# $category: Category
		$url: String # $user: User # $completed: Boolean
	) {
		createItem(
			data: {
				title: $title
				description: $description
				category: $category
				url: $url
				user: $user
				completed: $completed
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
		category: '',
		url: '',
		user: '',
		completed: false,
	});

	const userCategories = getCategories();

	const [createItem, { loading, error, data }] = useMutation(
		CREATE_ITEM_MUTATION,
		{
			variables: inputs,
			// Do we need to refetch?
			// refetchQueries: [{ query: ALL_ITEMS_QUERY }],
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
		let { value, name, type } = e.target;

		// use type for conditionals if we add files for example?
		type === 'checkbox'
			? (value = e.target.checked)
			: (value = e.target.value);

		setInputs({
			...inputs,
			[name]: value,
		});
	};

	// Submit current state to create a new Item
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('submit', inputs);

		try {
			const res = await createItem();
			console.log('res', res);
		} catch (err) {
			console.log(err);
		}

		// clearForm();

		//Redirect should happen here
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
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
								<option key="category.id">{category.title}</option>
							);
						})}
					</select>
				</label>
			)}
			{/* <label htmlFor="completed">
				<span>Completed?</span>
				<input
					type="checkbox"
					name="completed"
					onChange={handleChange}
				/>
			</label> */}
			<input type="submit" value="submit" />
		</form>
	);
}
