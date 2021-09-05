import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
// import { useUser } from './User';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import SignOut from './SignOut';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import UserContext from '../context/UserContext';

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 2rem 2rem;
	width: 100%;
	background-color: var(--tertiary);

	a {
		color: #fff;
	}
`;

export default function Nav() {
	// const user = useUser();
	const { user, setUser } = useContext(UserContext);

	return (
		<StyledNav>
			<Container>
				<div className="d-flex justify-content-end">
					{user ? (
						<>
							<Link href="/add-item">Create Item</Link>
							<Link href="/">Dashboard</Link>
							<SignOut />
						</>
					) : (
						<Link href="/login">Sign In</Link>
					)}
				</div>
			</Container>
		</StyledNav>
	);
}
