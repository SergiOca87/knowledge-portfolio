import React, { useEffect } from 'react';
import Link from 'next/link';
import { useUser } from './User';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import SignOut from './SignOut';
import styled from 'styled-components';

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 3rem 0;
	width: 100%;
`;

export default function Nav() {
	const user = useUser();

	return (
		<div className="container">
			<StyledNav>
				{user && (
					<>
						<Link href="/add-item">Create Item</Link>
						<Link href="/">Dashboard</Link>
						<SignOut />
					</>
				)}
				{!user && <Link href="/login">Sign In</Link>}
			</StyledNav>
		</div>
	);
}
