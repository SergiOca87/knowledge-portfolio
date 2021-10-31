import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
// import { useUser } from './User';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import SignOut from './SignOut';
import styled, { css } from 'styled-components';
import { Container } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import {
	FaEnvelope,
	FaMailBulk,
	FaRegEnvelope,
	FaRegEnvelopeOpen,
	FaUser,
} from 'react-icons/fa';

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 2rem 2rem;
	width: 100%;
	gap: 2rem;
	background-color: var(--tertiary);

	a {
		color: #fff;
		display: block;
	}
`;

const StyledMail = styled.div`
	position: relative;

	span {
		position: absolute;
		bottom: -10px;
		right: -10px;
		background-color: #000;
		display: flex;
		align-items: center;
		justify-content: center;

		padding: 2px;
		border-radius: 50%;
		width: 17px;
		height: 17px;
		font-size: 10px;
	}
`;

export default function Nav() {
	// const user = useUser();
	const { user, setUser } = useContext(UserContext);

	return (
		<div
			css={css`
				background-color: var(--tertiary);
			`}
		>
			<Container>
				<StyledNav className="d-flex justify-content-end">
					<Link href={`/public_profiles`}>Public Portfolios</Link>
					{user ? (
						<>
							<Link href={`/portfolio/${user.id}`}>
								Portfolio
							</Link>
							<Link href={`/user/${user.id}`}>
								<FaUser />
							</Link>
							<Link href={`/mail/${user.id}`}>
								{user.received.length > 0 && (
									<StyledMail>
										<FaRegEnvelopeOpen />
										<span>{user.received.length}</span>
									</StyledMail>
								)}
							</Link>
							<SignOut />
						</>
					) : (
						<Link href="/login">Sign In</Link>
					)}
				</StyledNav>
			</Container>
		</div>
	);
}
