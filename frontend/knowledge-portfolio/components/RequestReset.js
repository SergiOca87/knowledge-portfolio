/* eslint-disable react/react-in-jsx-scope */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
// import Form from './styles/Form';
// import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
// import Error from './ErrorMessage';
import styled from 'styled-components';
import { useState } from 'react';

const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($email: String!) {
		sendUserPasswordResetLink(email: $email) {
			message
			code
		}
	}
`;

export default function RequestReset() {
	const [inputs, setInputs] = useState({
		email: '',
	});

	const [signUp, { data, loading, error }] = useMutation(
		REQUEST_RESET_MUTATION,
		{
			variables: inputs,
		}
	);

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
			<h2>Request Password Reset</h2>
			{/* //TODO: This error should be a toast */}
			{data?.error && <p>data.error</p>}
			<fieldset>
				{data?.sendUserPasswordResetLink === null && (
					<p>Success! Check your email for a link.</p>
				)}
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

				<button type="submit">Request Reset</button>
			</fieldset>
		</form>
	);
}
