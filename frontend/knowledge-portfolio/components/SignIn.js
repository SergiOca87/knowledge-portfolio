//TODO: Add error as a Toast
//TODO: Non-breaking error handling

import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
// import Form from './styles/Form';
// import useForm from '../lib/useForm';
import React, { useContext, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { LOGGED_IN_USER } from './User';
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
	// const { user, setUser } = useContext(UserContext);
	const router = useRouter();

	// Check if there is a user or not
	const { loading, error, data } = useQuery(LOGGED_IN_USER);

	if (loading) {
		return <p>Loading...</p>;
	}

	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const [
		signin,
		{ data: signInData, loading: signInLoading, error: signInError },
	] = useMutation(SIGNIN_MUTATION, {
		variables: inputs,
		refetchQueries: LOGGED_IN_USER,
	});

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

			if (
				res.data.authenticateUserWithPassword.message ===
				'Authentication failed.'
			) {
				toast.error(res.data.authenticateUserWithPassword.message);
			} else if (
				res.data.authenticateUserWithPassword.__typename ===
				'UserAuthenticationWithPasswordSuccess'
			) {
				// setUser(res?.data?.authenticateUserWithPassword.item);

				// toast.success('');

				//TODO: Why doesn't this work as using the URL directly?
				if (res.data) {
					router.push(
						`/portfolio/${res?.data?.authenticateUserWithPassword.item.id} `
					),
						null,
						{ shallow: false };
				}
			}
		}
	}

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
