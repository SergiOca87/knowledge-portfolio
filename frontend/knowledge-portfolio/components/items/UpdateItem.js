/* eslint-disable react/react-in-jsx-scope */

//TODO: For the category, load user categories or create a new one (and assign it to the current user)
//TODO: Add Toast for errors
//TODO: At the moment we can connect existing categories, but may be useful to be able to create them ehre as well
import { useEffect, useState } from 'react';
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
	Col,
	Form,
	Row,
	useAccordionButton,
} from 'react-bootstrap';

import Editor from '../Editor';
import { useUserState } from '../../context/userContext';
import { supabase } from '../../utils/supabaseClient';
import CategoryCloudFilter from '../categories/CategoryCloudFilter';
import UploadImageWidget from './UploadImageWidget';
import { useUser } from '@supabase/auth-helpers-react';

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

export default function UpdateItem({ item }) {
	// const user = useUser();
	const [activeCategories, setActiveCategories] = useState([]);
	const [mainImage, setMainImage] = useState('');

	item = item[0];

	const [inputs, setInputs] = useState({
		title: item.title,
		description: item.description,
		status: item.status,
		// visibility: 'true',
		categories: item.categories,
		singlePageContent: item.singlePageContent,
		mainImage,
		// urlTitle: '',
		// date: '',
		// url: '',
	});

	// These useEffects seem necessary as what they do require a mounted component?
	// Make sure these are necessary
	useEffect(() => {
		// setMainImage({
		// 	imageName: item.mainImageName ? item.mainImageName : '',
		// 	imageUrl: item.mainImageUrl ? item.mainImageUrl : '',
		// });

		setActiveCategories(item.categories);
	}, []);

	useEffect(() => {
		setInputs({
			...inputs,
		});
	}, []);

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

		console.log(
			'when submitting, the active categories are',
			activeCategories
		);

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

			const updatedItem = {
				userId: user.id,
				title,
				description,
				categories: activeCategories.length
					? activeCategories
					: 'Uncategorized',
				singlePageContent,
				urlTitle,
				url,
				status,
				// mainImageName: mainImage.imageName,
				// mainImageUrl: mainImage.imageUrl,
				itemId: item.id,
			};

			//TODO: Should this be handled in an API route?
			//TODO: We need some extra validation here, if API route, serverside validation:
			// if (
			// 	!email.includes('@') ||
			// 	!name ||
			// 	name.trim() === '' ||
			// 	!text ||
			// 	text.trim() === ''
			// ) {
			// 	toast.message('...');
			// 	return;
			// }
			if (!user || !title || title.trim() === '') {
				toast.message('There was a problem creating your item');
				return;
			}

			try {
				fetch('/api/updateItem', {
					method: 'PUT',
					body: JSON.stringify(updatedItem),
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

				// 	//TODO: This is not working (to clear the wysywyg), may have to reload the page on submit
				setContentState(convertFromRaw(singlePageContent));
			} catch (err) {
				toast.error(err);
			}

			// const { error } = await supabase
			// 	.from('items')
			// 	.update({
			// 		// created_at: date,
			// 		// username: user.username,
			// 		title,
			// 		// description,
			// 		// categories: activeCategories,
			// 		// singlePageContent,
			// 		// urlTitle,
			// 		// url,
			// 		// status,
			// 		// userId: user.id,
			// 		// mainImageName: mainImage.imageName,
			// 		// mainImageUrl: mainImage.imageUrl,
			// 	})
			// 	.eq('id', item.id);

			// if (error) {
			// 	toast.error(error);
			// } else {
			// 	// Clear form on submit
			// 	setInputs({
			// 		title: '',
			// 		description: '',
			// 		singlePageContent: '',
			// 		urlTitle: '',
			// 		url: '',
			// 		status: 'true',
			// 	});

			// 	setActiveCategories([]);

			// 	// 	//TODO: This is not working (to clear the wysywyg), may have to reload the page on submit
			// 	// 	// setContentState(convertFromRaw(singlePageContent));

			// 	if (mainImage) {
			// 		const { data: imageData, error: imageError } =
			// 			await supabase
			// 				.from('image')
			// 				.insert({
			// 					// created_at: date,
			// 					imageName: mainImage.imageName,
			// 					userId: user.id,
			// 					imageUrl: mainImage.imageUrl,
			// 					item: item.id,
			// 				})
			// 				.select();

			// 		//TODO: May not be necessary to do this relationship at the end with the imageUrl field but may be useful down the road
			// 		const { data: itemDataUpdate, error: itemDataUpdateError } =
			// 			await supabase
			// 				.from('items')
			// 				.update({
			// 					// created_at: date,
			// 					mainImageId: imageData[0].id,
			// 				})
			// 				.eq('id', item.id);
			// 			}
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
				<StyledForm method="PUT" onSubmit={handleSubmit}>
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

					{/* This is part of a form */}
					{/* <UploadImageWidget setMainImage={setMainImage} />
					<p>{mainImage && mainImage.imageName}</p> */}

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
					{/* {userCategories && (
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
					{/* </Form.Group> */}
					{/* )} */}

					<Form.Group className="mb-5">
						<Form.Label htmlFor="status">status</Form.Label>
						<Form.Select
							aria-label="Status"
							name="status"
							id="status"
							onChange={handleChange}
						>
							<option
								value={
									item.status === 'Finished' ? true : false
								}
							>
								Finished
							</option>
							<option
								value={
									item.status === 'Unfinished' ? true : false
								}
							>
								Unfinished
							</option>
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
					<Form.Group className="mb-5">
						<Form.Label>Single Page Content</Form.Label>
						<Accordion flush>
							<Accordion.Item eventKey="0">
								<Accordion.Header>
									Single Page Content
								</Accordion.Header>
								<Accordion.Body>
									<StyleEditor
										wrapperClassName="single-page-editor-wrap"
										editorClassName="single-page-editor"
										onContentStateChange={
											onContentStateChange
										}
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
						<Form.Text>
							<p className="tip">
								Adding single page content will enable a "More
								Details" button on your portfolio item.
							</p>
						</Form.Text>
					</Form.Group>
					<Row>
						<Col>
							<Form.Group
								className="mb-2"
								controlId="formUrlTitle"
							>
								<Form.Label>URL Title</Form.Label>
								<Form.Control
									type="text"
									name="urlTitle"
									value={inputs.urlTitle}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-5">
								<Form.Label htmlFor="url">URL</Form.Label>
								<Form.Control
									type="url"
									name="url"
									value={inputs.url}
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Text></Form.Text>
					<Button
						onClick={handleSubmit}
						value="submit"
						variant="primary"
						id="main-submit"
					>
						Update
					</Button>
				</StyledForm>
			</Card.Body>
		</Card>
	);
}
