/* eslint-disable react/react-in-jsx-scope */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
// import Form from './styles/Form';
// import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$name: String!
		$email: String!
		$publicEmail: Boolean!
		$specialization: String!
		$password: String!
	) {
		createUser(
			data: {
				name: $name
				email: $email
				publicEmail: $publicEmail
				specialization: $specialization
				password: $password
			}
		) {
			id
			name
			email
			specialization
			publicEmail
		}
	}
`;

export default function SignUp() {
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		publicEmail: true,
		specialization: '',
		password: '',
	});

	const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
		variables: inputs,
	});

	const handleChange = (e) => {
		let { value, name } = e.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const clearInputs = () => {
		setInputs({
			name: '',
			email: '',
			specialization: '',
			password: '',
		});
	};

	async function handleSubmit(e) {
		e.preventDefault(); // stop the form from submitting

		if (error) {
			toast.error(
				`Failed to create a new account. Please check the register form for errors`
			);

			clearInputs();
		}

		if (inputs.password.length < 7) {
			toast.error(`Password should be at least 8 characters long`);
			clearInputs();
		} else {
			try {
				const res = await signUp();

				res?.data?.createUser &&
					toast.success(`Account created with ${res?.data?.createUser.email} - You can
						now Log In`);

				clearInputs();
			} catch (err) {
				console.log(err);

				//TODO: THis is not always the case? Weird prisma error handling
				toast.error('Email is already in use');

				clearInputs();
			}
		}

		// resetForm();
		// Send the email and password to the graphqlAPI
	}
	// const error =
	// 	data?.authenticateUserWithPassword.__typename ===
	// 	'UserAuthenticationWithPasswordFailure'
	// 		? data?.authenticateUserWithPassword
	// 		: undefined;
	return (
		<Card
			css={css`
				margin-bottom: 3rem;
			`}
		>
			<Card.Header as="h3">Register</Card.Header>
			<Card.Body
				css={css`
					padding: 4rem 2rem;
				`}
			>
				<Form method="POST" onSubmit={handleSubmit}>
					{/* //TODO: This error should be a toast */}
					{data?.error && <p>data.error</p>}

					{/* {data?.createUser && (
					<p>
						Account created with {data.createUser.email} - You can
						now Log In.
					</p>
				)} */}
					<Form.Group className="mb-5" controlId="formEmail">
						<Form.Label htmlFor="first-name">Name</Form.Label>
						<Form.Control
							type="text"
							name="name"
							id="first-name"
							placeholder="Name"
							autoComplete="name"
							value={inputs.name}
							required
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Form.Group className="mb-5" controlId="formEmail">
						<Form.Label htmlFor="email">Email address</Form.Label>
						<Form.Control
							type="email"
							name="email"
							placeholder="Your Email Address"
							autoComplete="email"
							required
							value={inputs.email}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>

					{/* <label htmlFor="publicEmail">
					Public Email? (users/visitors can see your e-mail)
					<input
						type="checkbox"
						name="publicEmail"
						required
						value={inputs.publicEmail}
						onChange={(e) => handleChange(e)}
					/>
				</label> */}
					<Form.Group className="mb-5" controlId="password">
						<Form.Label htmlFor="password">Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							placeholder="Password"
							autoComplete="password"
							required
							value={inputs.password}
							onChange={(e) => handleChange(e)}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Register
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
