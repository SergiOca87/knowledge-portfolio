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
		<form method="POST" onSubmit={handleSubmit}>
			<h2>Register</h2>
			{/* //TODO: This error should be a toast */}
			{data?.error && <p>data.error</p>}
			<fieldset>
				{/* {data?.createUser && (
					<p>
						Account created with {data.createUser.email} - You can
						now Log In.
					</p>
				)} */}
				<label htmlFor="name">
					Your Name
					<input
						type="name"
						name="name"
						placeholder="Your Name"
						autoComplete="name"
						value={inputs.name}
						required
						onChange={(e) => handleChange(e)}
					/>
				</label>
				<label htmlFor="email">
					Email
					<input
						type="email"
						name="email"
						placeholder="Your Email Address"
						autoComplete="email"
						required
						value={inputs.email}
						onChange={(e) => handleChange(e)}
					/>
				</label>
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
				<label htmlFor="password">
					Password
					<input
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="password"
						required
						value={inputs.password}
						onChange={(e) => handleChange(e)}
					/>
				</label>
				<button type="submit">Sign In!</button>
			</fieldset>
		</form>
	);
}
