import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import styled, { css } from 'styled-components';
import { useQuery } from '@apollo/client';
import Main from '../components/Main';
import { Container, Button, Row, Col, Modal } from 'react-bootstrap';
import Link from 'next/link';
import Categories from '../components/Categories';
import UserCard from '../components/UserCard';
import MessageModal from '../components/MessageModal';
import UserContext from '../context/UserContext';

const CryptoCard = styled.div`
	width: 40rem;
	height: 25rem;
	border-radius: 10px;
	background-image: #a399ff;
	padding: 2rem 3rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-image: radial-gradient(
			at 18% 4%,
			hsla(262, 100%, 62%, 1) 0,
			transparent 70%
		),
		radial-gradient(at 94% 5%, hsla(223, 37%, 37%, 1) 0, transparent 100%),
		radial-gradient(at 99% 98%, hsla(38, 98%, 53%, 1) 0, transparent 100%);

	p,
	h4 {
		margin: 0;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;

		span {
			width: 5rem;
			height: 5rem;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid #fff;
			flex-shrink: 0;
		}
	}
`;

export default function web3() {
	const { user, setUser } = useContext(UserContext);

	const eligible = () => {
		// Is a user?
		// Has 5 portfolio items?
	};

	return (
		<Main>
			<Container>
				<div
					className="titles"
					css={css`
						max-width: 70.5rem;
					`}
				>
					<h1>Web3</h1>
					<p>
						"Owly or whatever this is called" web3 section is in
						alpha-testing phase. We have launched an ERC-20 token
						(contract) to be used as reward currency for those who
						add official certifications from partners on their
						portfolios.
					</p>

					<p>
						The utility of this currency will be based on deals made
						with partners, who may offer things to expand your
						knowledge even further. We want to provide a real
						incentive to learn, we believe that "Pay-To-Learn" will
						be a common paradigm as Web3 continues to be adopted by
						more users.
					</p>
				</div>

				<p>Button to connect wallet here</p>
				<p> If Metamask, show cryptocard</p>

				{user ? (
					<p>
						Are you eligible for a free OWL drop?{' '}
						<span className="secondary" onCLick={eligible}>
							{' '}
							Click Here
						</span>{' '}
						to find out
					</p>
				) : (
					<>
						<p>
							<Link href="login">Log In</Link> to find out if you
							are eligible for a free OWL airdrop.
						</p>
						<CryptoCard>
							<div className="top">
								<h4>UserName</h4>
								<span>img</span>
							</div>
							<div className="bottom">Holding: 2,000,000 OWL</div>
						</CryptoCard>
					</>
				)}
			</Container>
		</Main>
	);
}
