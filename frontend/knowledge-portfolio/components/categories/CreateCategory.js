/* eslint-disable react/react-in-jsx-scope */
// import { CURRENT_USER_QUERY, useUser } from './User';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import styled from 'styled-components';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/fa';
import CategoryIcons from './CategoryIcons';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { supabase } from '../../utils/supabaseClient';
import { useUser } from '@supabase/auth-helpers-react';

const StyledForm = styled(Form)`
	padding: 2rem;

	input {
		height: 5rem !important;
		font-size: 1.6rem !important;
		background-color: transparent !important;
		border: 1px solid var(--primary);
		color: #fff !important;

		&:placeholder-shown {
			color: #fff;
		}
	}

	label {
		font-size: 1.4rem;
		text-transform: uppercase;
		font-family: 'Montserrat-Bold';
		margin-bottom: 1rem;
		letter-spacing: 1px;
		color: var(--secondary);
	}
`;

export default function CreateCategory(userCategories) {
	const user = useUser();
	const [iconSearch, setIconSearch] = useState('');
	const router = useRouter();

	const [inputs, setInputs] = useState({
		name: '',
		icon: '',
	});

	useEffect(() => {
		setInputs({
			...inputs,
		});
	}, [user]);

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

		const { name, icon } = inputs;

		const newCategory = { name, icon, userId: user.id };

		if (
			!newCategory.userId ||
			!newCategory.name ||
			newCategory.name.trim() === ''
		) {
			toast.error('There was a problem creating your category');
			return;
		}

		if (
			//TODO: We are here
			userCategories.filter(
				(category) => category.name.toLowerCase() === name.toLowerCase()
			).length > 0
		) {
			toast.error(`The category ${name} already exists`);
		} else {
			try {
				fetch('api/createCategory', {
					method: 'POST',
					body: JSON.stringify(newCategory),
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then((response) => response.json())
					.then((data) => {
						toast.success(`Category created, reloading page...`);

						// Clear form on submit
						setInputs({
							name: '',
							icon: '',
						});

						setTimeout(() => {
							router.reload(window.location.pathname);
						}, 3000);
					})
					.catch((error) => toast.error(error));
			} catch (err) {
				toast.error;
			}

			// const { error } = await supabase.from('categories').insert({
			// 	name,
			// 	icon,
			// 	userId: user.id,
			// });

			// if (error) {
			// 	toast.error(error);
			// } else {
			// 	setInputs({
			// 		name: '',
			// 		icon: '',
			// 	});
			// }
		}
	};

	return (
		<>
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
					<StyledForm method="POST" onSubmit={handleSubmit}>
						<Form.Group className="mb-5" controlId="categoryName">
							<Form.Label>Category Name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								value={inputs.name}
								required
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group className="mb-5" controlId="categoryIcon">
							<Form.Label>Search for an Icon</Form.Label>
							<Form.Control
								type="text"
								value={iconSearch}
								name="icon"
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
					</StyledForm>
				</Card.Body>
			</Card>
		</>
	);
}
