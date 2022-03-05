//TODO: Add error as a Toast
//TODO: Non-breaking error handling

import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
// import Form from './styles/Form';
// import useForm from '../lib/useForm';
import React, { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import UserContext from '../context/UserContext';
import { CURRENT_USER_QUERY } from './User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Form } from 'react-bootstrap';
import Link from 'next/link';
// import { CURRENT_USER_QUERY } from './User';

// import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					name
					email
					options
					items {
						id
						title
						description
						status
						singlePageContent
						categories {
							id
							name
							icon
						}
					}
				}
			}
			... on UserAuthenticationWithPasswordFailure {
				code
				message
			}
		}
	}
`;

// const CURRENT_USER_QUERY = gql`
// 	query {
// 		authenticatedItem {
// 			... on User {
// 				id
// 				name
// 				email
// 				options
// 				items
// 			}
// 		}
// 	}
// `;

export default function SignIn() {
	const { user, setUser } = useContext(UserContext);

	// If there is a logged in user, redirect to its page:
	useEffect(() => {
		if (user) {
			Router.push({
				pathname: `/portfolio/${user.id}`,
			});
		}
	}, [user]);
	//////////////////////////////////////////////////

	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const [signin, { data: signInData, loading, error }] = useMutation(
		SIGNIN_MUTATION,
		{
			variables: inputs,
			refetchQueries: [{ query: CURRENT_USER_QUERY }],
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
		e.preventDefault();

		if (error) {
			toast.error(error.message);
		} else {
			const res = await signin();

			setInputs({
				email: '',
				password: '',
			});

			if (res.data.authenticateUserWithPassword.code === 'FAILURE') {
				toast.error(res.data.authenticateUserWithPassword.message);
			} else {
				setUser(res?.signInData?.authenticateUserWithPassword.item);
			}
		}
	}
	// const error =
	// 	data?.authenticateUserWithPassword.__typename ===
	// 	'UserAuthenticationWithPasswordFailure'
	// 		? data?.authenticateUserWithPassword
	// 		: undefined;

	return (
		<>
			<Card
				css={css`
					margin-bottom: 3rem;
				`}
			>
				<Card.Header as="h3">Sign In</Card.Header>
				<Card.Body
					css={css`
						padding: 4rem 2rem;
					`}
				>
					<Form method="POST" onSubmit={handleSubmit}>
						{error && <p>{error.message}</p>}

						<Form.Group className="mb-5" controlId="formEmail">
							<Form.Label htmlFor="email">
								Email address
							</Form.Label>
							<Form.Control
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								value={inputs.email}
								onChange={(e) => handleChange(e)}
							/>
						</Form.Group>
						<Form.Group className="mb-5" controlId="password">
							<Form.Label htmlFor="password">Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								id="pasword"
								autoComplete="password"
								value={inputs.password}
								onChange={(e) => handleChange(e)}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Sign In
						</Button>
					</Form>

					<div
						css={css`
							margin-top: 3rem;
						`}
					>
						<Link href="/forgot-password" className="link">
							Forgot your password?
						</Link>
					</div>
				</Card.Body>
			</Card>
		</>
	);
}
