/* eslint-disable react/react-in-jsx-scope */
//TODO: Look for conditionally render components and load them using lazy() and Suspense or dynamic imports.
//TODO: For the category, load user categories or create a new one (and assign it to the current user)
//TODO: Add Toast for errors
//TODO: At the moment we can connect existing categories, but may be useful to be able to create them ehre as well
import { useEffect, useState } from 'react';

import Link from 'next/link';
import useApi from '../../hooks/useApi';
import { toast } from 'react-toastify';
import { EditorState, convertFromRaw } from 'draft-js';
import 'react-toastify/dist/ReactToastify.css';
import styled, { css } from 'styled-components';
import {
	Accordion,
	Button,
	Card,
	Col,
	Form,
	Row,
} from 'react-bootstrap';

import Editor from '../Editor';
import CategoryCloudFilter from '../categories/CategoryCloudFilter';
import { useUser } from '@supabase/auth-helpers-react';

const StyledForm = styled(Form)`
	padding: 2rem;

	.tip {
		font-size: 1.4rem;
		color: rgba(255, 255, 255, 0.5);
		margin-top: 2rem;
	}

	.single-page-editor {
		color: #000;
	}

	input,
	textarea,
	select {
		height: 5rem !important;
		font-size: 1.6rem !important;
		background-color: transparent !important;
		border: 1px solid var(--primary);
		color: var(--text);

		&:placeholder-shown {
			color: #fff;
		}
	}

	select {
		option {
			color: #000 !important;
		}
	}

	textarea {
		height: 12rem !important;
	}

	.accordion {
		font-size: 1.6rem !important;
		background-color: transparent !important;
		border: 1px solid var(--primary);
		border-radius: 0.375rem;
		color: var(--text);

		.accordion-item {
			background-color: transparent !important;
		}

		button {
			height: 5rem !important;
			font-size: 1.6rem !important;
			background-color: transparent !important;
			border: none;
			color: var(--text);
		}

		&:placeholder-shown {
			color: #fff;
		}

		.accordion-body {
			background-color: #fff;
		}
	}

	label {
		font-size: 1.4rem;
		text-transform: uppercase;
		font-family: 'KumbhSans-Regular';;
		margin-bottom: 1rem;
		letter-spacing: 1px;
		color: var(--secondary);
	}
`;

const StyleEditor = styled(Editor)`
	color: #000;

	.embedded,
	.image-upload {
		display: none;
	}
`;

export default function CreateItem({ categories, itemsLength }) {
	// const { user, userCategories } = useUserState();
	const user = useUser();

	const [activeCategories, setActiveCategories] = useState([]);
	const [mainImage, setMainImage] = useState('');
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);

	const [{ data, error }, apiInteraction] = useApi();

	const [inputs, setInputs] = useState({
		title: '',
		description: '',
		status: true,
		// visibility: 'true',
		singlePageContent: '',
		mainImage: '',
		// urlTitle: '',
		// date: '',
		// url: '',
	});

	// TODO: Is this necessary?
	useEffect(() => {
		setInputs({
			...inputs,
		});
	}, [user]);

	const accordionToggleHandler = () => {
		setIsAccordionOpen(true);
	};

	// Single page content
	//Maybe we should extract this
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


	// Data changes by the useApi hook
	useEffect(() => {

		if (data) {
			toast.success(data.message)

			// Clear form on submit
			setInputs({
				title: '',
				description: '',
				singlePageContent: '',
				urlTitle: '',
				url: '',
				status: true,
			});
			setActiveCategories([]);
		}

		if (error) {
			toast.error(error);
		}

	}, [data, error]);


	const handleSubmit = async (e) => {
		e.preventDefault();

		const {
			title,
			description,
			singlePageContent,
			urlTitle,
			url,
			status,
		} = inputs;

		const newItem = {
			user: user.email,
			userAlias: user.user_metadata.name,
			title,
			description,
			categories: activeCategories.length
				? activeCategories.map((category) => category.categoryId)
				: 'Uncategorized',
			singlePageContent,
			urlTitle,
			url,
			status,
			userId: user.id,
			order: itemsLength + 1,
			mainImageName: mainImage.imageName,
			mainImageUrl: mainImage.imageUrl,
		};

		// Basic Client side validation
		if (
			!newItem.user ||
			!newItem.title ||
			newItem.title.trim() === ''
		) {
			toast.error('There was a problem creating your item');
			return;
		}

		apiInteraction('/api/createItem', 'POST', newItem);

	};

	return (
		<Card
			css={css`
				margin-bottom: 3rem;
			`}
		>
			<Card.Body
				css={css`
					padding: 2rem;
				`}
			>
				{/* TODO: Should be its own component */}
				<StyledForm method="POST" onSubmit={handleSubmit}>
					<Form.Group className="mb-5" controlId="formTitle">
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							required
							name="title"
							value={inputs.title}
							onChange={handleChange}
						/>
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
					{/* //TODO: Keep image capabilities or not */}
					{/* <UploadImageWidget setMainImage={setMainImage} /> */}
					{/* <DragDropFile setMainImage={setMainImage} /> */}
					{/* <p>{mainImage && mainImage.imageName}</p> */}
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
					<Form.Group className="mb-5" controlId="formDescription">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							name="description"
							maxLength="300"
							value={inputs.description}
							onChange={handleChange}
						/>
					</Form.Group>
					{categories.length ? (
						<Form.Group className="mb-5">
							<Form.Label>Categories</Form.Label>
							<CategoryCloudFilter
								userCategories={categories}
								activeCategories={activeCategories}
								setActiveCategories={setActiveCategories}
							/>
							<Form.Text>
								<p className="tip">
									If you need a new category you can create it{' '}
									<Link href="/add-category"> here</Link>
								</p>
							</Form.Text>
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
					) : (
						<p className="tip">
							If you need a new category you can create it{' '}
							<Link href="/add-category"> here</Link>
						</p>
					)}
					<Form.Group className="mb-5" controlId="formStatus">
						<Form.Label>Status</Form.Label>
						<Form.Select
							aria-label="Status"
							name="status"
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
					<Form.Group className="mb-5">
						<Form.Label>Single Page Content</Form.Label>
						<Accordion flush>
							<Accordion.Item eventKey="0">
								<Accordion.Header
									onClick={accordionToggleHandler}
								>
									Single Page Content
								</Accordion.Header>
								<Accordion.Body>
									{isAccordionOpen && (
										<StyleEditor
											wrapperClassName="single-page-editor-wrap"
											editorClassName="single-page-editor"
											toolbarClassName="single-page-toolbar"
											onContentStateChange={
												onContentStateChange
											}
											// toolbar={{
											// 	image: { enableUpload: true },
											// }}
											toolbar={{
												options: [
													'inline',
													'blockType',
													'fontSize',
													'list',
													'textAlign',
													'history',
												],
												inline: { inDropdown: true },
												list: { inDropdown: true },
												textAlign: { inDropdown: true },
												link: { inDropdown: true },
												history: { inDropdown: true },
												embedded: {
													className: 'embedded',
												},
												image: {
													enableUpload: false,
													className: 'image-upload',
												},
											}}
										/>
									)}
									{/* 
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
						Add
					</Button>
				</StyledForm>
			</Card.Body>
		</Card>
	);
}
