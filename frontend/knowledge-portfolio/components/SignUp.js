import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
// import Form from './styles/Form';
// import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
// import Error from './ErrorMessage';
import styled from 'styled-components';
import { useState } from 'react';

const SIGNUP_MUTATION = gql`
	mutation SIGNIN_MUTATION(
		$name: String!
		$email: String!
		$password: String!
	) {
		createUser(data: { name: $name, email: $email, password: $password }) {
			id
			name
			email
		}
	}
`;

export default function SignUp() {
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
		variables: inputs,
	});

	const handleChange = (e) => {
		let { value, name } = e.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};

	async function handleSubmit(e) {
		e.preventDefault(); // stop the form from submitting
		console.log(inputs);
		const res = await signUp();
		console.log(res);
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
			<h2>Register an Account</h2>
			{data?.error && <p>data.error</p>}
			<fieldset>
				{data?.createUser && (
					<p>
						Account created with {data.createUser.email} - You can
						now Log In.
					</p>
				)}
				<label htmlFor="name">
					Your Name
					<input
						type="name"
						name="name"
						placeholder="Your Name"
						autoComplete="name"
						value={inputs.name}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="email">
					Email
					<input
						type="email"
						name="email"
						placeholder="Your Email Address"
						autoComplete="email"
						value={inputs.email}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="password">
					Password
					<input
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="password"
						value={inputs.password}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Sign In!</button>
			</fieldset>
		</form>
	);
}
