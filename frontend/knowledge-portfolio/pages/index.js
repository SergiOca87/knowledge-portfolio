import Head from 'next/head';
import Image from 'next/image';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

import styled from 'styled-components';
import Link from 'next/link';
import gql from 'graphql-tag';
import Hero from '../components/Hero';
import { Container, Row, Col } from 'react-bootstrap';

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 2rem;
`;

const StyledMain = styled.main`
	min-height: 100vh;
	padding: 6rem 0;
	background-size: 60%;
	background-position: right;
	background-repeat: no-repeat;
	background-color: var(--primary);
	background-image: var(--primary-bg-image);
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	overflow: hidden;
	color: #fff;

	.titles {
		margin-bottom: 12rem;

		h1 {
			font-size: 6rem;
			margin-bottom: 2rem;
		}
	}

	img {
		width: 100%;
		height: auto;
	}

	.inner-grid {
		margin-bottom: 12rem;

		h2 {
			position: relative;
			padding: 1rem 2rem;
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
`;

export default function Home() {
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
				<Container>
					<div className="titles">
						<h1>Your Knowledge Portfolio</h1>
						<h2>
							<span>Share</span> Your Knowledge
						</h2>
					</div>

					<div className="inner-grid">
						<Row>
							<Col
								lg={5}
								className="d-flex flex-column justify-content-center align-items-start"
							>
								<h2>
									<span>What</span>
								</h2>
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
								<h2>
									<span>Why</span>
								</h2>
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
									support this <strong>decentralized</strong>{' '}
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
				</Container>
			</StyledMain>
		</>
	);
}
