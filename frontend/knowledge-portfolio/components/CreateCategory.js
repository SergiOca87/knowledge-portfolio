/* eslint-disable react/react-in-jsx-scope */
// import { CURRENT_USER_QUERY, useUser } from './User';
import { USER_CATEGORIES_QUERY, getCategories } from './UserCategories';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import styled from 'styled-components';
import { Col, Container, Row } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/fa';
import CategoryIcons from './CategoryIcons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
		}
	}
`;

export default function CreateCategory() {
	const { user } = useContext(UserContext);
	const userCategories = getCategories();
	const [iconSearch, setIconSearch] = useState('');

	const [inputs, setInputs] = useState({
		name: '',
		author: user ? user : '',
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

			//TODO: THis need the ID!
			refetchQueries: [
				{ query: USER_CATEGORIES_QUERY, variables: { id: user?.id } },
			],
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
				author: user ? user : '',
				icon: '',
			});

			res?.data?.createCategory &&
				toast.success(
					`Created the ${res.data.createCategory.name} category`
				);
		}
	};

	return (
		<>
			<ToastContainer />
			<StyledForm method="POST" onSubmit={handleSubmit}>
				<fieldset disabled={loading} aria-busy={loading}>
					<div className="input-wrap text">
						<label htmlFor="title">
							<span>Category Name</span>
							<input
								required
								type="text"
								name="name"
								value={inputs.name}
								required
								onChange={handleChange}
							/>
						</label>
					</div>
					<div className="input-wrap text">
						<Container>
							<div className="icons-top-bar">
								<p>Add an Icon</p>
								<input
									type="text"
									value={iconSearch}
									placeholder="Search Icon"
									onChange={(e) =>
										setIconSearch(e.target.value)
									}
								/>
							</div>
							<div onClick={handleIconClick}>
								<CategoryIcons
									search={iconSearch}
									selectedIcon={inputs.icon}
								/>
							</div>
						</Container>
					</div>

					{/* <label htmlFor="completed">
				<span>Completed?</span>
				<input
					type="checkbox"
					name="completed"
					onChange={handleChange}
				/>
			</label> */}
					<input type="submit" value="submit" />
				</fieldset>
			</StyledForm>

			{userCategories && <p>Existing Categories: </p>}
			{userCategories?.allCategories?.map((category) => {
				return (
					<p key={category.id}>
						<Link href={`/categories/${category.id}`}>
							{category.name}
						</Link>
					</p>
				);
			})}
		</>
	);
}
