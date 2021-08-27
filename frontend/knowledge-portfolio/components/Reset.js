/* eslint-disable react/react-in-jsx-scope */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
// import Form from './styles/Form';
// import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
// import Error from './ErrorMessage';
import styled from 'styled-components';
import { useState } from 'react';

const RESET_MUTATION = gql`
	mutation RESET_MUTATION(
		$email: String!
		$token: String!
		$password: String!
	) {
		redeemUserPasswordResetToken(
			email: $email
			token: $token
			password: $password
		) {
			message
			code
		}
	}
`;

export default function Reset({ token }) {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
		token: token,
	});

	const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
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
		const res = await reset();
		console.log(res);
		// resetForm();
		// Send the email and password to the graphqlAPI
	}
	const successError = data?.redeemUserPasswordResetToken?.code
		? data?.redeemUserPasswordResetToken
		: undefined;

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<h2>Reset Your Password</h2>
			<fieldset>
				{data?.redeemUserPasswordResetToken === null && (
					<p>Success! You can now use your new password.</p>
				)}

				{/* //TODO: Pass the error to a Toast! */}
				{console.log(error || successError)}
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
					New Password
					<input
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="password"
						value={inputs.password}
						onChange={(e) => handleChange(e)}
					/>
				</label>

				<button type="submit">Request Reset</button>
			</fieldset>
		</form>
	);
}
