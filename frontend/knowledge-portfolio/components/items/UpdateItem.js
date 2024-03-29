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
	Container,
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
import Main from '../layout/Main';
import useApi from '../../hooks/useApi';

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
`;

export default function UpdateItem({ item, categories }) {
	const [activeCategories, setActiveCategories] = useState([]);
	const [userCategories, setUserCategories] = useState([]);
	const user = useUser();
	const [{ data, error }, apiInteraction] = useApi();


	useEffect(() => {

		//TODO: UseApi hook?
		if (user) {
			fetch('/api/userCategories', {
				method: 'POST',
				headers: {
					'Content-Type': 'application.json',
				},
				body: user.id,
			})
				.then((response) => response.json())
				.then((data) => setUserCategories(data.data))
				.catch((error) => toast.error(error));
		}
	}, [user]);

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

	const selected = item.status === true ? true : false;

	// TODO: Make sure these are necessary
	useEffect(() => {
		// setMainImage({
		// 	imageName: item.mainImageName ? item.mainImageName : '',
		// 	imageUrl: item.mainImageUrl ? item.mainImageUrl : '',
		// });

		setActiveCategories(item.categories);
	}, []);

	//TODO: Is this necessary?
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
				status: 'true',
			});

			setActiveCategories([]);
		}

		if (error) {
			toast.error(error);
		}

	}, [data, error]);

	//https://nextjs.org/learn/basics/api-routes/api-routes-details
	const handleSubmit = async (e) => {
		e.preventDefault();

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

			if (!user || !title || title.trim() === '') {
				toast.message('There was a problem creating your item');
				return;
			}

			apiInteraction('/api/updateItem', 'PUT', updatedItem);
		}
	};

	return (
		<Main>
			<Container>
				<div
					css={css`
						max-width: 80rem;
						margin: 0 auto;
					`}
				>
					<div
						className="titles"
						css={css`
							max-width: 60rem;
							margin-bottom: 4rem;
						`}
					>
						<h1>Edit Your Item</h1>
					</div>
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
									<FloatingLabel
										controlId="floatingInput"
										label="Title"
									>
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
										<Form.Label>Categories</Form.Label>
										<CategoryCloudFilter
											userCategories={userCategories}
											activeCategories={activeCategories}
											setActiveCategories={
												setActiveCategories
											}
										/>
										<Form.Text>
											<p className="tip">
												If you need a new category you
												can create it{' '}
												<Link href="/add-category">
													here
												</Link>
											</p>
										</Form.Text>

									</Form.Group>
								)}

								<Form.Group className="mb-5">
									<Form.Label htmlFor="status">
										status
									</Form.Label>
									<Form.Select
										aria-label="Status"
										name="status"
										id="status"
										onChange={handleChange}
									>
										<option
											value={true}
											selected={selected}
										>
											Finished
										</option>
										<option
											value={false}
											selected={!selected}
										>
											Unfinished
										</option>
									</Form.Select>
								</Form.Group>

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
														image: {
															enableUpload: true,
														},
													}}
												/>

											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
									<Form.Text>
										<p className="tip">
											Adding single page content will
											enable a "More Details" button on
											your portfolio item.
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
											<Form.Label htmlFor="url">
												URL
											</Form.Label>
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
				</div>
			</Container>
		</Main>
	);
}
