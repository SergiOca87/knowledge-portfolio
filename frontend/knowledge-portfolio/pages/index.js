import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { FaRegEdit } from 'react-icons/fa';
import { FaRegLightbulb } from 'react-icons/fa';
import { FaRegShareSquare } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { BsShare } from 'react-icons/bs';

import styled, { css } from 'styled-components';
import Link from 'next/link';
import Hero from '../components/layout/Hero';
import Tilt from 'react-tilt';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { supabase } from '../utils/supabaseClient';

import introImage from '../public/images/intro.svg';
import AnimateWrapper from '../components/layout/AnimateWrapper';
import { motion } from 'framer-motion';
import { fadeInContainer, fadeInItem } from '../utils/motion';
// import { useUser } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 2rem;
`;

const StyledMain = styled.main`
	min-height: 100vh;
	position: relative;
	overflow: hidden;
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
			margin-top: 6rem;
		}

		h2 {
			display: flex;
			align-items: center;
		}

		p {
			margin-bottom: 3rem;
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
		font-family: 'KumbhSans-Bold';
		background-color: var(--secondary);
		padding: 0 3px;
	}

	.cards {
		margin-top: -4rem;

		
	}

	
`;

const StyledImageWrap = styled.div`
	text-align: center;
	img {
		max-height: 60rem;
	}
`;

const StyledCard = styled(Card)`
	text-align: center;
	padding-bottom: 4rem;
	height: 100%;

	.card-body {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.separator {
		display: block;
		width: 5rem;
		height: 5px;
		background: var(--primary);
		margin: 2rem 0px 1rem 0;
	}
`;

export default function Home() {
	const router = useRouter();

	return (
		<>
			<StyledMain>
				<Container fluid>
					<div className="titles">
						<Container>
							<Row className="">
								<Col lg={6}>
									<>
										<h1>
											Your Knowledge <br></br>
											<span className="secondary ">
												Portfolio
											</span>
										</h1>

										<p>
											Invest in Yourself, Showcase Your Growth
										</p>

										<Link href="/portfolio">
											<Button
												variant="primary btn-round btn-big"
												type="button"
											>
												Get Started for Free
											</Button>
										</Link>
										{/* <h2
											css={css`
												font-family: 'KumbhSans-Regular';;
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
										</h2> */}
									</>
								</Col>

								<Col lg={6}>
									<motion.div
										initial={{ opacity: 0, x: '50px' }}
										whileInView={{ opacity: 1, x: '0' }}
										viewport={{ once: true }}
										transition={{ duration: 0.5 }}
									>
										{' '}
										<StyledImageWrap>
											<Image src={introImage} priority />
										</StyledImageWrap>
									</motion.div>
								</Col>
							</Row>
						</Container>
					</div>
				</Container>

				<motion.section
					variants={fadeInContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="cards"
				>
					<Container>
						<Row>
							<Col lg="4">
								<motion.div
									variants={fadeInItem}
									transition={{ duration: 0.5 }}
									css={css`
										height: 100%;
									`}
								>
									<StyledCard>
										<Card.Header as="h3">What</Card.Header>
										<Card.Body>
											<div
												className="text-center"
												css={css`
													padding: 3rem 0 2rem 0;
													svg {
														fill: var(--secondary);
														font-size: 6rem;
													}
												`}
											>
												<FaRegLightbulb />
											</div>
											<span className="separator"></span>
											<Card.Text>
												Perspective on the concept of a
												knowledge portfolio.
											</Card.Text>
											<Link href="/about/#origin">
												<Button
													variant="primary"
													type="button"
												>
													Learn More
												</Button>
											</Link>
										</Card.Body>
									</StyledCard>
								</motion.div>
							</Col>

							<Col lg="4">
								<motion.div
									variants={fadeInItem}
									transition={{ duration: 0.5 }}
									css={css`
										height: 100%;
									`}
								>
									<StyledCard>
										<Card.Header as="h3">
											Benefits
										</Card.Header>
										<Card.Body>
											<div
												className="text-center"
												css={css`
													padding: 3rem 0 2rem 0;
													svg {
														fill: var(--secondary);
														font-size: 7rem;
													}
												`}
											>
												<BiEdit />
											</div>
											<span className="separator"></span>
											<Card.Text>
												Explore the many benefits of
												creating and maintaining a
												knowledge portfolio.
											</Card.Text>

											<Link href="/about/#benefits">
												<Button
													variant="primary"
													type="button"
												>
													Learn More
												</Button>
											</Link>
										</Card.Body>
									</StyledCard>
								</motion.div>
							</Col>

							<Col lg="4">
								<motion.div
									variants={fadeInItem}
									transition={{ duration: 0.5 }}
									css={css`
										height: 100%;
									`}
								>
									<StyledCard>
										<Card.Header as="h3">
											Investing
										</Card.Header>
										<Card.Body>
											<div
												className="text-center"
												css={css`
													padding: 3rem 0 2rem 0;
													svg {
														fill: var(--secondary);
														font-size: 6rem;
													}
												`}
											>
												<BsShare />
											</div>
											<span className="separator"></span>
											<Card.Text>
												Practical advice on how and why
												to create and maintain a
												knowledge portfolio.
											</Card.Text>
											<Link href="/about/#investing">
												<Button
													variant="primary"
													type="button"
												>
													Learn More
												</Button>
											</Link>
										</Card.Body>
									</StyledCard>
								</motion.div>
							</Col>
						</Row>
					</Container>
				</motion.section>

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
// export async function getServerSideProps(context) {
// 	// Create authenticated Supabase Client
// 	const supabase = createServerSupabaseClient(context);
// 	// Check if we have a session
// 	const {
// 		data: { session },
// 	} = await supabase.auth.getSession();

// 	// if (!session)
// 	// 	return {
// 	// 		redirect: {
// 	// 			destination: '/',
// 	// 			permanent: false,
// 	// 		},
// 	// 	};

// 	return {
// 		props: {
// 			initialSession: session,
// 			user: session.user,
// 		},
// 	};
// }
