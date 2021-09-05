/* eslint-disable react/react-in-jsx-scope */
// import { CURRENT_USER_QUERY, useUser } from './User';
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const CREATE_CATEGORY_MUTATION = gql`
	mutation CREATE_CATEGORY_MUTATION($name: String!, $author: ID!) {
		createCategory(
			data: { name: $name, author: { connect: { id: $author } } }
		) {
			id
			name
		}
	}
`;

export default function CreateCategory() {
	// const user = useUser();
	const userCategories = getCategories();

	const [inputs, setInputs] = useState({
		name: '',
		author: user ? user : '',
	});

	useEffect(() => {
		setInputs({
			...inputs,
			author: user?.id,
		});
	}, [user]);

	console.log('inputs', inputs);

	const [createCategory, { loading, error, data }] = useMutation(
		CREATE_CATEGORY_MUTATION,
		{
			variables: inputs,
			refetchQueries: [{ query: USER_CATEGORIES_QUERY }],
		}
	);

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

		const res = await createCategory();
		console.log(res);

		// Clear Form
		setInputs({
			name: '',
			author: user ? user : '',
		});
	};

	return (
		<>
			<form method="POST" onSubmit={handleSubmit}>
				<label htmlFor="title">
					<span>Title</span>
					<input
						required
						type="text"
						name="name"
						onChange={handleChange}
					/>
				</label>

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

			<p>Existing Categories: </p>
			{userCategories &&
				userCategories?.allCategories?.map((category) => {
					return (
						<p key={category.id}>
							<Link href={`/categories/${category.id}`}>
								{category.name}
							</Link>
						</p>
					);
				})}
		</>
	);
}
