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

const StyledForm = styled(Form)`
	max-width: 70rem;
	margin: 4rem auto;
	padding: 2rem;

	.tip {
		font-size: 1.4rem;
	}

	.single-page-editor {
		color: #000;
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
	//
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
	// function CustomToggle({ children, eventKey }) {
	// 	const decoratedOnClick = useAccordionButton(
	// 		eventKey,
	// 		() => 'totally custom!'
	// 	);

	// 	return <div onClick={decoratedOnClick}>{children}</div>;
	// }

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
				<StyledForm method="POST" onSubmit={handleSubmit}>
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
								<Link href="/add-category"> here</Link>
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
					<Form.Group className="mb-5">
						<Form.Label htmlFor="status">status</Form.Label>
						<Form.Select
							aria-label="Status"
							name="status"
							id="status"
							onChange={handleChange}
						>
							<option value="finished">Finished</option>
							<option value="unfinished">Unfinished</option>
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-5">
						<Form.Label htmlFor="status">
							Visibility (public or private)
						</Form.Label>
						<Form.Select
							aria-label="Visibility"
							name="visibility"
							id="visibility"
							onChange={handleChange}
						>
							<option value="true">Public</option>
							<option value="false">Private</option>
						</Form.Select>
					</Form.Group>
					<label>
						<p className="tip">
							Adding single page content will enable a "More
							Details" button on your portfolio item. This button
							will redirect the user to a page with the content
							that you add on the WYSYWYG below. Use this feature
							if you need to create a detailed view of your item
							with a longer description text, images or video.
						</p>
						{/* <div className="d-flex align-center">
							<CustomToggle>
								<Form.Check
									type="switch"
									label="Single Page Content"
									id="singlePage"
									name="singlePage"

									// value={inputs.singlePage}
									// onChange={handleChange}
								/>
							</CustomToggle>
						</div> */}
					</label>
					<Accordion>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								Single Page Content
							</Accordion.Header>
							<Accordion.Body>
								<Editor
									// editorState={editorState}
									editorClassName="single-page-editor"
									onContentStateChange={onContentStateChange}
								/>
								<textarea
									value={inputs.singlePageContent}
									css={css`
										display: none;
									`}
								/>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
					<Form.Group className="mb-5">
						<p className="tip">
							Use the URL field to direct the user to an external
							URL where you can show more of your portfolio item.
							URL Title is the clickable text that the user will
							see.
						</p>
						<Form.Label htmlFor="urlTitle">URL Title</Form.Label>
						<Form.Control
							type="text"
							name="urlTitle"
							id="title"
							value={inputs.urlTitle}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-5">
						<Form.Label htmlFor="url">URL</Form.Label>
						<Form.Control
							type="url"
							name="url"
							id="url"
							value={inputs.url}
							onChange={handleChange}
						/>
					</Form.Group>
					<Button type="submit" value="submit" variant="primary">
						Add
					</Button>
				</StyledForm>
			</Card.Body>
		</Card>
	);
}
