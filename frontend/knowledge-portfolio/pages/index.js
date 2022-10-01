import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { FaRegEdit } from 'react-icons/fa';
import { FaEthereum } from 'react-icons/fa';
import { FaRegShareSquare } from 'react-icons/fa';

import styled, { css } from 'styled-components';
import Link from 'next/link';
import gql from 'graphql-tag';
import Hero from '../components/layout/Hero';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

export const LOGGED_IN_USER = gql`
	query {
		authenticatedItem {
			... on User {
				id
				name
				email
				publicEmail
				options
				instagram
				youtube
				website
				received {
					id
				}
				categories {
					id
					name
					icon
				}
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
	}
`;

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 2rem;
`;

const StyledMain = styled.main`
	min-height: 100vh;
	position: relative;
	overflow: hidden;
	background-color: #f1f1f1;
	height: 100%;
	padding-bottom: 6rem;

	.titles {
		min-height: 50rem;
		position: relative;
		background-image: var(--rays);
		background-size: cover;
		background-position: center;
		padding-top: 8rem;
		overflow: hidden;

		.waves {
			position: absolute;
			bottom: 0;
			right: 0;
		}

		h1 {
			font-size: 6rem;
			margin-bottom: 2rem;
			color: var(--primary);
		}

		h2 {
			display: flex;
			align-items: center;
		}

		.title-fade {
			transition: all 300ms;

			&.in {
				opacity: 1;
				transform: translateX(0);
			}

			&.out {
				opacity: 0;
				transform: translateX(-5rem);
			}
		}
	}

	.spectrum-bg {
		min-height: 50rem;
		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}

	img {
		width: 100%;
		height: auto;
	}

	.inner-grid {
		margin-bottom: 12rem;

		h3 {
			position: relative;
			padding: 0.5rem 1.5rem;
			color: var(--primary);

			&:after {
				content: '';
				background-color: var(--secondary);
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				transform: skew(3deg, 3deg);
			}

			span {
				position: relative;
				z-index: 10;
				text-transform: uppercase;
			}
		}
	}

	strong {
		color: var(--primary);
		font-family: 'Montserrat-Medium';
		background-color: var(--secondary);
		padding: 0 3px;
	}

	.cards {
		margin-top: -7rem;

		.card {
			.card-body {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}

	.flip-card {
		background-color: transparent;
		width: 20rem;
		height: 8rem;
		perspective: 1000px;
	}

	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.6s;
		transform-style: preserve-3d;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

		&.true {
			transform: rotateX(180deg);

			h2 {
				transform: rotate(180deg);
			}
		}
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.flip-card-front {
		background-color: var(--secondary);
		display: flex;
		justify-content: center;
		align-items: center;

		h2 {
			color: #fff;
			margin: 0;
		}
	}

	.flip-card-back {
		background-color: var(--primary);
		transform: rotateY(180deg);
		display: flex;
		justify-content: center;
		align-items: center;

		h2 {
			color: #fff;
			margin: 0;
		}
	}
`;

const ChangingWord = styled.div``;

export default function Home() {
	const words = ['Share', 'Own', 'Use'];
	const [currentIndex, setCurrentIndex] = useState(0);
	const [flip, setFlip] = useState(false);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setFlip('back');
	// 	}, 3500);
	// }, []);

	useEffect(() => {
		const interval = setInterval(() => {
			//Flip the card

			flip === true ? setFlip(false) : setFlip(true);

			// Change the word that's on the current back
			currentIndex >= 2
				? setCurrentIndex(0)
				: setCurrentIndex((currentIndex) => currentIndex + 1);

			// setTimeout(() => {
			// 	setFlip('back');
			// }, 3500);

			//TODO: Wait half a second and set a fade in class here?
		}, 4000);
		return () => clearInterval(interval);
	}, [currentIndex]);

	return (
		<>
			<Head>
				<title>Your Knowledge Portfolio</title>
				<meta name="description" content="Share your knowledge" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<StyledMain>
				<Container fluid>
					<div className="titles">
						<Container>
							<Row className="align-items-center">
								<Col lg={5}>
									<>
										{/* <h2>
											<ChangingWord
												classNameName={`title-fade ${fade}`}
											>
												<span>
													{words[currentIndex]}
												</span>
											</ChangingWord>{' '}
											Your Knowledge
										</h2> */}

										<div className="flip-card">
											<div
												className={`flip-card-inner ${flip}`}
											>
												<div className="flip-card-front">
													<h2>
														<ChangingWord>
															<span>
																{
																	words[
																		currentIndex
																	]
																}
															</span>
														</ChangingWord>{' '}
													</h2>
												</div>
												<div className="flip-card-back">
													<h2>
														<ChangingWord>
															<span>
																{
																	words[
																		currentIndex
																	]
																}
															</span>
														</ChangingWord>{' '}
													</h2>
												</div>
											</div>
										</div>
										<h2
											css={css`
												font-family: 'Montserrat-Bold';
												margin: 0;
												margin-top: 2rem;
												margin-left: 2rem;
												font-size: 3.4rem;
											`}
										>
											<span className="primary d-block">
												Your&nbsp;
											</span>
											<span className="secondary d-block">
												Knowledge
											</span>
										</h2>
									</>
								</Col>

								<Col lg={7}>
									<div
										className="d-none d-lg-block"
										css={css`
											position: absolute;
											bottom: -65px;
											right: 0;
											max-width: 55rem;
											width: 100%;
											height: 100%;
										`}
									>
										<Image
											src="/images/owl.png"
											layout={'fill'}
											objectFit={'contain'}
										/>
									</div>
								</Col>
							</Row>
						</Container>
					</div>
				</Container>

				<Container className="cards">
					<Row>
						<Col lg="4">
							<Card>
								<Card.Header as="h3">Create</Card.Header>
								<Card.Body>
									<div
										className="text-center"
										css={css`
											padding: 2rem 0;
											svg {
												fill: var(--secondary);
												font-size: 8rem;
											}
										`}
									>
										<FaRegEdit />
									</div>
									<Card.Text>
										Lorem ipsum dolor sit amet, consectetuer
										adipiscing elit. Donec odio. Quisque
										volutpat mattis eros. Nullam malesuada
										erat ut turpis. Suspendisse urna nibh,
										viverra non, semper suscipit, posuere a,
										pede.
									</Card.Text>
									<div className="card-footer text-center">
										<Button variant="primary">
											Add Items
										</Button>{' '}
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col lg="4">
							<Card>
								<Card.Header as="h3">Share</Card.Header>
								<Card.Body>
									<div
										className="text-center"
										css={css`
											padding: 2rem 0;
											svg {
												fill: var(--secondary);
												font-size: 8rem;
											}
										`}
									>
										<FaRegShareSquare />
									</div>
									<Card.Text>
										Lorem ipsum dolor sit amet, consectetuer
										adipiscing elit. Donec odio. Quisque
										volutpat mattis eros. Nullam malesuada
										erat ut turpis. Suspendisse urna nibh,
										viverra non, semper suscipit, posuere a,
										pede.
									</Card.Text>
									<div className="card-footer text-center">
										<Button variant="primary">
											Public Portfolios
										</Button>{' '}
									</div>
								</Card.Body>
							</Card>
						</Col>

						<Col lg="4">
							<Card>
								<Card.Header as="h3">Earn</Card.Header>
								<Card.Body>
									<div
										className="text-center"
										css={css`
											padding: 2rem 0;
											svg {
												fill: var(--secondary);
												font-size: 8rem;
											}
										`}
									>
										<FaEthereum />
									</div>
									<Card.Text>
										Lorem ipsum dolor sit amet, consectetuer
										adipiscing elit. Donec odio. Quisque
										volutpat mattis eros. Nullam malesuada
										erat ut turpis. Suspendisse urna nibh,
										viverra non, semper suscipit, posuere a,
										pede.
									</Card.Text>
									<div className="card-footer text-center">
										<Button variant="primary">Web3</Button>{' '}
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>

				{/* <Container>
					<div className="inner-grid">
						<Row>
							<Col
								lg={5}
								className="d-flex flex-column justify-content-center align-items-start"
							>
								<h3>
									<span>What</span>
								</h3>
								<p>
									A place where you can quickly share your
									knowledge, in a format of your choice.
								</p>
								<p>
									From official courses and certification to
									books you are reading or Apps/projects you
									are building or have built in an amateur or
									a professional environment, the content is
									up to you.
								</p>
							</Col>
							<Col lg={{ span: 6, offset: 1 }}>
								<img src="/images/undraw_Updated_resume_yellow.svg" />
							</Col>
						</Row>
					</div>
					<div className="inner-grid">
						<Row>
							<Col lg={5}>
								<img src="/images/undraw_connected_world_yellow.svg" />
							</Col>
							<Col
								lg={{ span: 6, offset: 1 }}
								className="d-flex flex-column justify-content-center align-items-start"
							>
								<h3>
									<span>Why</span>
								</h3>
								<p>
									In a quickly changing world where fields
									that require a higher level of
									specialization are more prevalent than ever
									before, education, usually, does not does
									not end in college or university. This is
									even more prevalent (prevalent or obvious)
									in fields where new technologies appear all
									the time, and the professional, student or
									enthuasiast has to adapt and learn new
									things to stay relevant. Probable
									(proof-able? Able to build something out of
									what you know) knowledge is then something
									that not always is accompanied by a
									traditional title but at the same time you
									should be able to show that you are
									accumulating knowledge. The internet has
									offered us a new way of approaching this
									kind of less-traditional education. We
									support this <strong>decentralized</strong>{" "}
									education which empowers professionals and
									students no matter their gender, race,
									sexual orientation or geographical
									procedence. So if you did anything to grow
									in any way professionally or towards your
									professional goal, leave your mark here and
									let the world know.
								</p>
								<p>
									Start your knowledge portfolio in under a
									minute <Link href="login">here</Link>
								</p>
							</Col>
						</Row>
					</div>
					<div className="inner-grid">
						<Row>
							<Col
								lg={5}
								className="d-flex flex-column justify-content-center align-items-start"
							>
								<h3>
									<span>Web 3?</span>
								</h3>
								<p>
									This Web App can be used with or without Web
									3 capabilities.
								</p>
								<p>
									If you choose to explore what we offer in
									terms of web3, you can read more over{" "}
									<Link href="web3">here</Link>
								</p>
							</Col>
							<Col lg={{ span: 6, offset: 1 }}>
								<img
									src="/images/undraw_ether_re_y7ft.svg"
									css={css`
										max-height: 50rem;
									`}
								/>
							</Col>
						</Row>
					</div>
				</Container> */}
			</StyledMain>
		</>
	);
}
