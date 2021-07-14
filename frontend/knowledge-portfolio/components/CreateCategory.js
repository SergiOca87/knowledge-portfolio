import { CURRENT_USER_QUERY, useUser } from './User';
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';

const CREATE_CATEGORY_MUTATION = gql`
	mutation CreateCategory(
		$title: String!
		$user: User!
	) {
		createCategory(
			data: {
				title: $title
				user: $user
			}
		) {
			id
			title
		}
	}
`;

export default function CreateCategory() {
	const [inputs, setInputs] = useState({
		title: '',
		user: '',
	});

    const [createCategory, { loading, error, data }] = useMutation(
		CREATE_CATEGORY_MUTATION,
		{
			variables: inputs,
			// Do we need to refetch?
			// refetchQueries: [{ query: ALL_ITEMS_QUERY }],
		}
	);

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

        //TODO: With Authentication, add user to existing inputs
        // Add Current User
        setInputs({
			...inputs,
			user: "60aa472c93309922d83e8f92",
		});
	
		try {
			const res = await createCategory();
		} catch (err) {
			console.log(err);
		}

		// clearForm();

		//Redirect, if any, should happen here
	};

	return (
        <>
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

        <p>List of existing user categories (tag cloud)</p>
        {userCategories && (
      
                    userCategories.allCategories.map((category) => {
                        return (
                            <p key="category.id">{category.title}</p>
                        );
                    })
             
        )}
        </>
	);
}
