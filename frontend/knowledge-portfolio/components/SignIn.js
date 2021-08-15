//TODO: Add error as a Toast

import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
// import Form from './styles/Form';
// import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import React, { useEffect, useState } from 'react';
// import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					email
					name
				}
			}
			... on UserAuthenticationWithPasswordFailure {
				code
				message
			}
		}
	}
`;

export default function SignIn() {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
		variables: inputs,
		// refetch the currently logged in user
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
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
		const res = await signin();
		console.log(res);

		console.log(res.data.authenticateUserWithPassword);
		// resetForm

		setInputs({
			email: '',
			password: '',
		});

		//TODO: Redirect user to portfolio or User Dashboard
	}
	const error =
		data?.authenticateUserWithPassword.__typename ===
		'UserAuthenticationWithPasswordFailure'
			? data?.authenticateUserWithPassword
			: undefined;

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<h2>Sign Into Your Account</h2>
			{error && <p>{error}</p>}
			<fieldset>
				<label htmlFor="email">
					Email
					<input
						type="email"
						name="email"
						placeholder="Your Email Address"
						autoComplete="email"
						value={inputs.email}
						onChange={(e) => handleChange(e)}
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
						onChange={(e) => handleChange(e)}
					/>
				</label>
				<button type="submit">Sign In!</button>
			</fieldset>
		</form>
	);
}
