/* eslint-disable react/react-in-jsx-scope */

//TODO: For the category, load user categories or create a new one (and assign it to the current user)
//TODO: How to assign the item to a choosen category
//TODO: Add Toast for errors
//TODO: At the moment we can connect existing categories, but may be useful to be able to create them ehre as well
//TODO: Refetch the logged in user (the only poissible user that should be able to create items)
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import Categories from '../categories/Categories';
import { EditorState, convertFromRaw } from 'draft-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FloatingLabel from 'react-bootstrap/FloatingLabel';

import styled, { css } from 'styled-components';
import {
	Accordion,
	Button,
	Card,
	Form,
	useAccordionButton,
} from 'react-bootstrap';

import Editor from '../Editor';
import { useUserState } from '../../context/userContext';
// import { supabase } from '../../utils/supabaseClient';
import CategoryCloudFilter from '../categories/CategoryCloudFilter';
import DragDropFile from '../DragDropFile';
import UploadImageWidget from './UploadImageWidget';

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

const StyleEditor = styled(Editor)`
	color: #000;
`;

export default function CreateItem() {
	const { user, userCategories } = useUserState();
	const [activeCategories, setActiveCategories] = useState([]);
	const [mainImage, setMainImage] = useState('');

	const [inputs, setInputs] = useState({
		title: '',
		description: '',
		// status: 'finished',
		// visibility: 'true',
		singlePageContent: '',
		mainImage: '',
		// urlTitle: '',
		// date: '',
		// url: '',
	});

	useEffect(() => {
		setInputs({
			...inputs,
		});
	}, [user]);

	// Single page content
	//TODO: Maybe we should extract this
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

	const [contentState, setContentState] = useState(convertFromRaw(content));

	//WYSYWYG State
	const onContentStateChange = (contentState) => {
		setContentState(contentState);
		setInputs({
			...inputs,
			singlePageContent: JSON.stringify(contentState, null, 4),
		});
	};

	// Add input changes to state
	const handleChange = (e) => {
		let { value, name, selectedOptions } = e.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};

	// Submit current state to create a new Item

	//https://nextjs.org/learn/basics/api-routes/api-routes-details
	const handleSubmit = async (e) => {
		e.preventDefault();

		// This is to prevent cloudinary form to submit the item
		if (e.target.id !== 'main-submit') {
			return;
		} else {
			const {
				title,
				description,
				singlePageContent,
				urlTitle,
				url,
				status,
			} = inputs;

			const newItem = {
				user: user.username,
				title,
				description,
				categories: activeCategories,
				singlePageContent,
				urlTitle,
				url,
				status,
				userId: user.id,
				mainImageName: mainImage.imageName,
				mainImageUrl: mainImage.imageUrl,
			};

			//TODO: Should this be handled in an API route?
			//TODO: We need some extra validation here, if API route, serverside validation:
			if (!user || !title || title.trim() === '') {
				toast.message('There was a problem creating your item');
				return;
			}

			// const { data: itemData, error } = await supabase
			// 	.from('items')
			// 	.insert({
			// 		// created_at: date,
			// 		username: user.username,
			// 		title,
			// 		description,
			// 		categories: activeCategories,
			// 		singlePageContent,
			// 		urlTitle,
			// 		url,
			// 		status,
			// 		userId: user.id,
			// 		mainImageName: mainImage.imageName,
			// 		mainImageUrl: mainImage.imageUrl,
			// 	})
			// 	.select();

			try {
				fetch('api/createItem', {
					method: 'POST',
					body: JSON.stringify(newItem),
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then((response) => response.json())
					.then((data) => console.log(data));

				// Clear form on submit
				setInputs({
					title: '',
					description: '',
					singlePageContent: '',
					urlTitle: '',
					url: '',
					status: 'true',
				});

				setActiveCategories([]);

				//TODO: This is not working (to clear the wysywyg), may have to reload the page on submit
				setContentState(convertFromRaw(singlePageContent));
			} catch (err) {
				toast.error(err);
			}
		}
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
				{/* TODO: Should be its own component */}
				<StyledForm method="POST" onSubmit={handleSubmit}>
					<Form.Group className="mb-5">
						<FloatingLabel controlId="floatingInput" label="Title">
							<Form.Control
								type="text"
								name="title"
								id="title"
								placeholder="Title"
								required
								value={inputs.title}
								onChange={handleChange}
							/>
						</FloatingLabel>
					</Form.Group>

					{/* <Form.Group className="mb-5">
						<Form.Label htmlFor="title">Main Image</Form.Label>
						<Form.Control
							type="file"
							name="mainImage"
							id="mainImage"
							value={inputs.mainImage}
							onChange={handleChange}
						/>
					</Form.Group> */}

					<UploadImageWidget setMainImage={setMainImage} />
					{/* <DragDropFile setMainImage={setMainImage} /> */}
					<p>{mainImage && mainImage.imageName}</p>

					{/* <Form.Group className="mb-5">
						<Form.Label htmlFor="date">Date</Form.Label>
						<Form.Control
							type="date"
							name="date"
							id="date"
							value={inputs.date}
							onChange={handleChange}
						/>
					</Form.Group>
						*/}
					<Form.Group className="mb-5">
						<FloatingLabel
							controlId="floatingInput"
							label="Description"
						>
							<Form.Control
								as="textarea"
								rows={3}
								name="description"
								placeholder="Description"
								id="description"
								maxLength="300"
								value={inputs.description}
								onChange={handleChange}
							/>
						</FloatingLabel>
					</Form.Group>
					{userCategories && (
						<Form.Group className="mb-5">
							<Form.Label htmlFor="category">Category</Form.Label>
							<p className="tip">
								If you need a new category you can create it{' '}
								<Link href="/add-category"> here</Link>
							</p>

							<CategoryCloudFilter
								activeCategories={activeCategories}
								setActiveCategories={setActiveCategories}
							/>
							{/* <Categories
								title={false}
								categories={userCategories}
								background={true}
								asButtons={true}
							/> */}

							{/* <Form.Select
								aria-label="Categories"
								name="categories"
								id="category"
								multiple
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
							</Form.Select> */}
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
							<option value={true}>Finished</option>
							<option value={false}>Unfinished</option>
						</Form.Select>
					</Form.Group>
					{/* <Form.Group className="mb-5">
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
					</Form.Group> */}
					<label>
						<p className="tip">
							Adding single page content will enable a "More
							Details" button on your portfolio item. This button
							will redirect the user to a page with the content
							that you add on the WYSYWYG below. Use this feature
							if you need to create a detailed view of your item
							with a longer description text, images or video.
						</p>
					</label>
					<Accordion>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								Single Page Content
							</Accordion.Header>
							<Accordion.Body>
								<StyleEditor
									wrapperClassName="single-page-editor-wrap"
									editorClassName="single-page-editor"
									onContentStateChange={onContentStateChange}
									toolbar={{
										image: { enableUpload: true },
									}}
								/>
								{/* <textarea
									value={inputs.singlePageContent}
									css={css`
										display: none;
									`}
								/> */}
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

					<Button
						onClick={handleSubmit}
						value="submit"
						variant="primary"
						id="main-submit"
					>
						Add
					</Button>
				</StyledForm>
			</Card.Body>
		</Card>
	);
}
