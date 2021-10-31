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
import Router from 'next/router';
import UserContext from '../context/UserContext';
import { EditorState, convertFromRaw } from 'draft-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled, { css } from 'styled-components';
import { Accordion, Button, useAccordionButton } from 'react-bootstrap';

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
		$categories: [CategoryWhereUniqueInput]
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
	const { user } = useContext(UserContext);
	const userCategories = getCategories();

	console.log('current user', user);

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
			refetchQueries: [{ query: CURRENT_USER_QUERY }],
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
					<label htmlFor="date">
						<span>Date</span>
						<input
							type="date"
							name="date"
							value={inputs.date}
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
						<label htmlFor="categories">
							<span>Categories</span>
							<p className="tip">
								If you need a new category you can create it{' '}
								<Link href="/create-category"> here</Link>
							</p>
							<select
								name="categories"
								multiple={true}
								onChange={handleChange}
							>
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
								Adding single page content will enable a "More
								Details" buttonon your portfolio item. This
								button will redirect the user to a page with the
								content that you add here. Use this feature if
								you need to create a detailed view of your item
								with long text, images or video.
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
					where you can show more of your portfolio item. URL Title is
					the clickable text that the user will see.
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
			</fieldset>
		</StyledForm>
	);
}
