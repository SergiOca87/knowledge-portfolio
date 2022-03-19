/* eslint-disable react/react-in-jsx-scope */
// import { CURRENT_USER_QUERY, useUser } from './User';
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import styled from 'styled-components';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/fa';
import CategoryIcons from './CategoryIcons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LOGGED_IN_USER } from './User';
import { useRouter } from 'next/router';

const StyledForm = styled.form`
	max-width: 70rem;
	margin: 4rem auto;
	padding: 2rem;
	background-color: var(--tertiary);

	.tip {
		font-size: 1.4rem;
	}

	.icons-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.icon {
		font-size: 3rem;
		width: 5rem;
		height: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const CREATE_CATEGORY_MUTATION = gql`
	mutation CREATE_CATEGORY_MUTATION(
		$name: String!
		$author: ID!
		$icon: String
	) {
		createCategory(
			data: {
				name: $name
				author: { connect: { id: $author } }
				icon: $icon
			}
		) {
			id
			name
			icon
			author
		}
	}
`;

export default function CreateCategory() {
	//TODO: Get user from actual keystone context
	// const { user } = useContext(UserContext);
	// const userCategories = getCategories();
	const {
		loading: userLoading,
		error: userError,
		data: userData,
	} = useQuery(LOGGED_IN_USER);

	const user = userData?.authenticatedItem;

	console.log('user', user);

	const [iconSearch, setIconSearch] = useState('');
	const router = useRouter();

	const [inputs, setInputs] = useState({
		name: '',
		author: user ? user.id : '',
		icon: '',
	});

	useEffect(() => {
		setInputs({
			...inputs,
			author: user?.id,
		});
	}, [user]);

	const [createCategory, { loading, error, data }] = useMutation(
		CREATE_CATEGORY_MUTATION,
		{
			variables: inputs,

			refetchQueries: [{ query: LOGGED_IN_USER }],
		}
	);

	const handleChange = (e) => {
		let { value, name } = e.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const handleIconClick = (e) => {
		const iconName = e.target.closest('DIV').dataset.name;

		// If the icon is already selected, remove it, else add it
		if (inputs.icon === iconName) {
			setInputs({
				...inputs,
				icon: '',
			});
		} else {
			setInputs({
				...inputs,
				icon: iconName,
			});
		}
	};

	const handleIconSearch = (e) => {
		setIconSearch(e.target.value);
	};

	// Submit current state to create a new Item
	const handleSubmit = async (e) => {
		e.preventDefault();

		//TODO: Success or error? Add toasts

		if (error) {
			toast.error(error.message);
		} else {
			const res = await createCategory().catch((err) => toast.error(err));

			setInputs({
				name: '',
				icon: '',
			});

			toast.success(`Category created, reloading page...`);

			// setTimeout(() => {
			// 	router.reload(window.location.pathname);
			// }, 3000);
		}
	};

	return (
		<>
			<ToastContainer />
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
						<Form.Group className="mb-5">
							<Form.Label htmlFor="email">
								Category Name
							</Form.Label>
							<Form.Control
								type="text"
								name="name"
								id="name"
								value={inputs.name}
								required
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group className="mb-5">
							<Form.Label htmlFor="icon">
								Search for an Icon
							</Form.Label>
							<Form.Control
								type="text"
								value={iconSearch}
								name="icon"
								id="icon"
								onChange={(e) => setIconSearch(e.target.value)}
							/>
						</Form.Group>
						<Container>
							<div onClick={handleIconClick}>
								<CategoryIcons
									search={iconSearch}
									selectedIcon={inputs.icon}
								/>
							</div>
						</Container>

						{/* <label htmlFor="completed">
				<span>Completed?</span>
				<input
					type="checkbox"
					name="completed"
					onChange={handleChange}
				/>
			</label> */}
						<Button
							variant="primary"
							type="submit"
							value="submit"
							className="mt-5"
						>
							Create Category
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
}
