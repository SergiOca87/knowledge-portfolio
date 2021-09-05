/* eslint-disable react/react-in-jsx-scope */

//TODO: For the category, load user categories or create a new one (and assign it to the current user)
//TODO: How to assign the item to a choosen category
//TODO: Add Toast for errors
//TODO: At the moment we can connect existing categories, but may be useful to be able to create them ehre as well
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import Link from 'next/link';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useContext, useEffect, useState } from 'react';
import { USER_ITEMS_QUERY } from './ItemGrid';
import Router from 'next/router';
import UserContext from '../context/UserContext';
import styled, { css } from 'styled-components';
import { Button } from 'react-bootstrap';

const StyledForm = styled.form`
	max-width: 70rem;
	margin: 4rem auto;
	padding: 2rem;
	background-color: var(--tertiary);

	.tip {
		font-size: 1.4rem;
	}
`;

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
	const { user } = useContext(UserContext);
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
			refetchQueries: [
				{ query: USER_ITEMS_QUERY, variables: { id: user?.id } },
			],
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
		<StyledForm method="POST" onSubmit={handleSubmit}>
			<fieldset disabled={loading} aria-busy={loading}>
				<div className="input-wrap text">
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
				</div>
				<div className="input-wrap text">
					<label htmlFor="description">
						<span>Description</span>
						<textarea
							name="description"
							maxLength="300"
							value={inputs.description}
							onChange={handleChange}
						/>
					</label>
				</div>
				<div className="input-wrap">
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
				</div>
				<div className="input-wrap">
					{userCategories && (
						<label htmlFor="category">
							<span>Category</span>
							<p className="tip">
								If you need a new category you can create it{' '}
								<Link href="/create-category"> here</Link>
							</p>
							<select name="category" onChange={handleChange}>
								<option value="Uncategorized">
									Uncategorized
								</option>
								{userCategories?.allCategories?.map(
									(category) => {
										return (
											<option
												key={category.id}
												value={category.id}
											>
												{category.name}
											</option>
										);
									}
								)}
							</select>
						</label>
					)}
				</div>
				<div className="input-wrap">
					<label htmlFor="status">
						<span>Status</span>
						<select name="status" onChange={handleChange}>
							<option value="finished">Finished</option>
							<option value="unfinished">Unfinished</option>
						</select>
					</label>
				</div>
				<div className="input-wrap">
					<label htmlFor="singlePage">
						<span>Single Page</span>
						<p className="tip">
							If "Single Page" is enabled your portfolio items
							will be clickable and will redirect the user to a
							detail page with a more detailed view of your
							portfolio item.
						</p>
						<div className="d-flex align-center">
							<span
								css={css`
									margin: 0;
									font-size: 1.4rem;
									margin-right: 1.5rem;
								`}
							>
								Enable
							</span>
							<input
								type="checkbox"
								id="singlePage"
								name="singlePage"
								value={inputs.singlePage}
								onChange={handleChange}
							/>
						</div>
					</label>
				</div>
				<div className="input-wrap text">
					<label htmlFor="url">
						<span>URL</span>
						<input
							type="url"
							name="url"
							value={inputs.url}
							onChange={handleChange}
						/>
					</label>
				</div>
				<Button
					type="submit"
					value="submit"
					variant="transparent-secondary"
				>
					Add
				</Button>
			</fieldset>
		</StyledForm>
	);
}
