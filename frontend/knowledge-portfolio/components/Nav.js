import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
// import { useUser } from './User';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import SignOut from './SignOut';
import styled, { css } from 'styled-components';
import { Container } from 'react-bootstrap';

// import { LOGGED_IN_USER } from './User';
import {
	FaEnvelope,
	FaMailBulk,
	FaRegEnvelope,
	FaRegEnvelopeOpen,
	FaUser,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useUserState } from '../context/userContext';

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem 2rem;
	width: 100%;
	gap: 5rem;
	background-color: #fff;

	h1 {
		margin: 0;
		font-size: 5.5rem;
		font-family: 'Montserrat-ExtraBold';
	}

	a {
		display: flex;
		align-items: center;
		text-transform: uppercase;
		font-family: 'Montserrat-Bold';
		color: var(--primary);
		text-decoration: none;
		font-size: 1.5rem;

		&:hover,
		&.active {
			color: var(--secondary);
			text-decoration: none;
		}
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
	const { user, setUser } = useUserState();
	// const { data } = useQuery(LOGGED_IN_USER);

	const router = useRouter();

	console.log('in nav...', user);

	//TODO: Follow this pattern everywhere. May need to useeffect and set the user anyways so that this is more reactive?
	// const user = data?.authenticatedItem;

	return (
		<div>
			<Container>
				<StyledNav>
					<div>
						<h1 className="primary">
							Owl
							<span className="secondary">it</span>
						</h1>
					</div>

					<div
						className="d-flex align-items-center justify-between"
						css={css`
							gap: 3rem;
						`}
					>
						<Link href={`/public_profiles`}>
							<a
								className={
									router.pathname == '/public_profiles'
										? 'active'
										: ''
								}
							>
								Public Portfolios
							</a>
						</Link>
						<Link href={`/web3`}>
							<a
								className={
									router.pathname == '/web3' ? 'active' : ''
								}
							>
								Web3
							</a>
						</Link>
						{user ? (
							<>
								<Link href={`/portfolio/${user.id}`}>
									<a
										className={
											router.pathname.includes(
												'/portfolio/'
											)
												? 'active'
												: ''
										}
									>
										Portfolio
									</a>
								</Link>
								<Link href={`/user/${user.id}`}>
									<FaUser />
								</Link>
								<Link href={`/mail/${user.id}`}>
									<StyledMail>
										{user?.received?.length > 0 ? (
											<>
												<FaRegEnvelopeOpen />
												<span>
													{user.received.length}
												</span>
											</>
										) : (
											<FaRegEnvelope />
										)}
									</StyledMail>
								</Link>
								<SignOut />
							</>
						) : (
							<Link href="/login">Sign In</Link>
						)}
					</div>
				</StyledNav>
			</Container>
		</div>
	);
}
