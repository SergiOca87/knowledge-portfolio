/* eslint-disable react/react-in-jsx-scope */

//TODO: For the category, load user categories or create a new one (and assign it to the current user)
//TODO: How to assign the item to a choosen category
//TODO: Add Toast for errors
//TODO: At the moment we can connect existing categories, but may be useful to be able to create them ehre as well
//TODO: Refetch the logged in user (the only poissible user that should be able to create items)
import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import Link from 'next/link';
// import { USER_ITEMS_QUERY } from './ItemGrid';
import { CURRENT_USER_QUERY } from '../components/User';
import { LOGGED_IN_USER } from './User';
import Router from 'next/router';
import UserContext from '../context/UserContext';
import { EditorState, convertFromRaw } from 'draft-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled, { css } from 'styled-components';
import {
	Accordion,
	Button,
	Card,
	Form,
	useAccordionButton,
} from 'react-bootstrap';

import Editor from './Editor';

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
		$status: String
		$author: ID!
		$visibility: String
		$singlePageContent: JSON
		$image: String
		$categories: [CategoryWhereUniqueInput!]
		$date: String
		$urlTitle: String
		$url: String
	) {
		createItem(
			data: {
				title: $title
				description: $description
				author: { connect: { id: $author } }
				status: $status
				visibility: $visibility
				singlePageContent: $singlePageContent
				image: $image
				# categories: { connect: { id: $categories } }
				date: $date
				categories: { connect: $categories }
				urlTitle: $urlTitle
				url: $url
			}
		) {
			# Do we need to return more things?
			id
			title
			categories {
				name
				id
				icon
			}
			# description
		}
	}
`;

export default function CreateItem() {
	// const { user } = useContext(UserContext);
	const {
		loading: userLoading,
		error: userError,
		data: userData,
	} = useQuery(LOGGED_IN_USER);

	const user = userData?.authenticatedItem;
	const userCategories = user?.categories;

	console.log('logged in user...', userCategories);
	// const userCategories = data.categories;

	const [inputs, setInputs] = useState({
		title: '',
		description: '',
		author: user ? user?.id : '',
		status: 'finished',
		visibility: 'true',
		singlePageContent: '',
		image: '',
		categories: [],
		urlTitle: '',
		date: '',
		url: '',
	});

	useEffect(() => {
		setInputs({
			...inputs,
			author: user?.id,
		});
	}, [user]);

	const content = {
		entityMap: {},
		blocks: [
			{
				key: '637gr',
				text: 'Initialized from content state.',
				type: 'unstyled',
				depth: 0,
				inlineStyleRanges: [],
				entityRanges: [],
				data: {},
			},
		],
	};

	//WYSYWYG State
	const [contentState, setContentState] = useState(convertFromRaw(content));

	const onContentStateChange = (contentState) => {
		setContentState(contentState);
		setInputs({
			...inputs,
			singlePageContent: JSON.stringify(contentState, null, 4),
		});
	};
	//////////////////////////////////////////////////////////

	const [createItem, { loading, error, data }] = useMutation(
		CREATE_ITEM_MUTATION,
		{
			variables: inputs,
			refetchQueries: [{ query: LOGGED_IN_USER }],
		}
	);

	// Adds changes to state
	const handleChange = (e) => {
		let { value, name, selectedOptions } = e.target;

		if (name === 'categories') {
			let values = Array.from(selectedOptions).map((option) => {
				return { id: option.value };
			});

			setInputs({
				...inputs,
				categories: [...values],
			});
		} else {
			setInputs({
				...inputs,
				[name]: value,
			});
		}
	};

	//Single Page Details Drawer
	//TODO: We can get rid of this or customize
	function CustomToggle({ children, eventKey }) {
		const decoratedOnClick = useAccordionButton(
			eventKey,
			() => 'totally custom!'
		);

		return (
			<button
				type="button"
				style={{ backgroundColor: 'pink' }}
				onClick={decoratedOnClick}
			>
				{children}
			</button>
		);
	}

	// Submit current state to create a new Item
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (error) {
			toast.error(error);
		} else {
			const res = await createItem();

			res?.data?.createItem &&
				toast.success(`${res.data.createItem.title} has been created`);

			// Clear form on submit
			setInputs({
				title: '',
				description: '',
				status: 'finished',
				categories: [],
			});
		}

		//TODO: Use React Toasts for errors
		// (error);
		//Redirect should happen here
	};

	return (
		<Card
			css={css`
				margin-bottom: 3rem;
			`}
		>
			<Card.Body
				css={css`
					padding: 4rem 2rem;
				`}
			>
				<Form method="POST" onSubmit={handleSubmit}>
					//TODO: This or toast?
					{error && <p>{error.message}</p>}
					<Form.Group className="mb-5">
						<Form.Label htmlFor="title">Title</Form.Label>
						<Form.Control
							type="text"
							name="title"
							id="title"
							required
							value={inputs.title}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-5">
						<Form.Label htmlFor="date">Date</Form.Label>
						<Form.Control
							type="date"
							name="date"
							id="date"
							value={inputs.date}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-5">
						<Form.Label htmlFor="description">
							Description
						</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							name="description"
							id="description"
							maxLength="300"
							value={inputs.description}
							onChange={handleChange}
						/>
					</Form.Group>
					//TODO: Cloudinary Images
					{/* <div className="input-wrap">
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
					</div> */}
					{userCategories && (
						<Form.Group className="mb-5">
							<Form.Label htmlFor="category">Category</Form.Label>
							<p className="tip">
								If you need a new category you can create it{' '}
								<Link href="/create-category"> here</Link>
							</p>
							<Form.Select
								aria-label="Categories"
								name="categories"
								id="category"
								onChange={handleChange}
							>
								<option value="Uncategorized">
									Uncategorized
								</option>
								{userCategories?.map((category) => {
									return (
										<option
											key={category.id}
											value={category.id}
										>
											{category.name}
										</option>
									);
								})}
							</Form.Select>
						</Form.Group>
					)}
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
						<label htmlFor="visibility">
							<span>Visibility (public or private)</span>
							<select name="visibility" onChange={handleChange}>
								<option value="true">Public</option>
								<option value="false">Private</option>
							</select>
						</label>
					</div>
					<Accordion>
						<div
							className="input-wrap"
							onClick={() => {
								('open drawer');
							}}
						>
							<label>
								<span>Single Page Content</span>
								<p className="tip">
									Adding single page content will enable a
									"More Details" buttonon your portfolio item.
									This button will redirect the user to a page
									with the content that you add here. Use this
									feature if you need to create a detailed
									view of your item with long text, images or
									video.
								</p>
								<div className="d-flex align-center">
									<span
										css={css`
											margin: 0;
											font-size: 1.4rem;
											margin-right: 1.5rem;
										`}
									>
										Add
									</span>
									<CustomToggle eventKey="0">
										<input
											type="checkbox"
											id="singlePage"
											name="singlePage"
											value={inputs.singlePage}
											onChange={handleChange}
										/>
									</CustomToggle>
								</div>
							</label>
						</div>

						<Accordion.Collapse eventKey="0">
							<>
								<Editor
									// editorState={editorState}
									onContentStateChange={onContentStateChange}
								/>
								<textarea
									disabled
									value={inputs.singlePageContent}
								/>
							</>
						</Accordion.Collapse>
					</Accordion>
					<p className="tip">
						Use the URL field to direct the user to an external URL
						where you can show more of your portfolio item. URL
						Title is the clickable text that the user will see.
					</p>
					<div className="flex-fields">
						<div className="input-wrap text">
							<label htmlFor="url">
								<span>URL Title</span>
								<input
									type="text"
									name="urlTitle"
									value={inputs.urlTitle}
									onChange={handleChange}
								/>
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
					</div>
					<Button
						type="submit"
						value="submit"
						variant="transparent-secondary"
					>
						Add
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
