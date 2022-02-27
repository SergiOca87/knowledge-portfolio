import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { CSSTransition, Transition } from "react-transition-group";

import { FaRegEdit } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";

import styled, { css } from "styled-components";
import Link from "next/link";
import gql from "graphql-tag";
import Hero from "../components/Hero";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

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
				content: "";
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
		font-family: "Montserrat-Medium";
		background-color: var(--secondary);
		padding: 0 3px;
	}

	.cards {
		.card {
			margin-top: -5rem;
			position: relative;
			display: flex;
			flex-direction: column;
			min-width: 0;
			word-wrap: break-word;
			background-color: #fff;
			background-clip: border-box;
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			overflow: hidden;

			.card-header {
				background-color: var(--primary);
				color: #fff;
				padding: 2rem;
				letter-spacing: 1px;
			}

			.card-text {
				padding: 2rem;
			}

			.card-footer {
				background-color: transparent;
				padding: 3rem 0;
			}
		}
	}
`;

const ChangingWord = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 300ms;
	width: 16rem;
	margin-right: 1.3rem;
	position: relative;
	text-align: center;
	padding: 1rem 2rem;

	span {
		position: relative;
		z-index: 10;
		text-transform: uppercase;
		color: #fff;
	}

	&:after {
		content: "";
		background-color: var(--secondary);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform: skew(3deg, 3deg);
	}
`;

export default function Home() {
	const words = ["Share", "Own", "Use"];
	const [currentIndex, setCurrentIndex] = useState(0);
	const [fade, setFade] = useState("in");

	useEffect(() => {
		setTimeout(() => {
			setFade("out");
		}, 3500);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			//TODO: Set a fade out class here
			setFade("in");

			currentIndex >= 2
				? setCurrentIndex(0)
				: setCurrentIndex((currentIndex) => currentIndex + 1);

			setTimeout(() => {
				setFade("out");
			}, 3500);

			//TODO: Wait half a second and set a fade in class here?
		}, 4000);
		return () => clearInterval(interval);
	}, [currentIndex]);

	return (
		<>
			<Head>
				<title>Your Knowledge Portfolio</title>
				<meta
					name="description"
					content="Visually share your knowledge"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<StyledMain>
				<Container fluid>
					<div className="titles">
						<Container>
							<Row className="align-items-center">
								<Col lg={5}>
									<h1 class="primary">Owlit</h1>
									<h2>
										<ChangingWord
											className={`title-fade ${fade}`}
										>
											<span>{words[currentIndex]}</span>
										</ChangingWord>{" "}
										Your Knowledge
									</h2>
								</Col>

								<Col lg={7}>
									<div
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
											layout={"fill"}
											objectFit={"contain"}
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
											padding: 3rem 0;
											svg {
												fill: var(--secondary);
												font-size: 10rem;
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
										</Button>{" "}
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
											padding: 3rem 0;
											svg {
												fill: var(--secondary);
												font-size: 10rem;
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
										</Button>{" "}
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
											padding: 3rem 0;
											svg {
												fill: var(--secondary);
												font-size: 10rem;
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
										<Button variant="primary">Web3</Button>{" "}
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
