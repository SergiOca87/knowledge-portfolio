import Link from 'next/link';
import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Main from '../components/layout/Main';
import { motion } from 'framer-motion';
import { fadeInContainer, fadeInItem } from '../utils/motion';
import originImage from '../public/images/origin.svg';
import benefitsImage from '../public/images/benefits.svg';
import Image from 'next/image';
import investImage from '../public/images/invest.svg';

const StyledContainer = styled(Container)`
	margin: 0 auto;

	.content-block {
		margin-bottom: 12rem;
	}

	.conclusion {
		max-width: 90rem;
		text-align: center;
		margin: 0 auto;
		padding: 4rem 2rem;

		p {
			margin-bottom: 4rem;
		}
	}
`;

const StyledImageWrap = styled.div`
	text-align: center;
	img {
		max-height: 40rem;
	}
`;

export default function about() {
	return (
		<Main>
			<StyledContainer>
				<div id="origin" className="content-block">
					<Row>
						<Col lg="7">
							<h2>Origin</h2>
							<p>
								The concept of a knowledge portfolio has been
								around for several decades, with various sources
								contributing to its development in books such as
								"Knowledge Management: An Introduction and
								Perspective," or the "Pragmatic Programmer"
							</p>

							<p>
								A knowledge portfolio is a collection of your
								intellectual assets, representing your learning
								journey, experiences, and expertise. It can
								encompasses a diverse range of knowledge and
								skills.
							</p>
						</Col>
						<Col lg="5">
							<motion.div
								initial={{ opacity: 0, x: '50px' }}
								whileInView={{ opacity: 1, x: '0' }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
							>
								{' '}
								<StyledImageWrap>
									<Image src={originImage} priority />
								</StyledImageWrap>
							</motion.div>
						</Col>
					</Row>
				</div>

				<div id="benefits" className="content-block">
					<Row>
						<Col lg="5">
							<motion.div
								initial={{ opacity: 0, x: '50px' }}
								whileInView={{ opacity: 1, x: '0' }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
							>
								{' '}
								<StyledImageWrap>
									<Image src={benefitsImage} priority />
								</StyledImageWrap>
							</motion.div>
						</Col>
						<Col lg="7">
							<h2>Benefits</h2>
							<p>
								It's a valuable tool for individuals and
								organizations seeking to manage their
								intellectual assets over time. By organizing and
								reflecting on their knowledge and skills.
							</p>

							<p>
								A well-managed knowledge portfolio can also help
								to demonstrate one's expertise and value to
								potential employers or clients. In today's
								rapidly changing global economy, staying
								up-to-date with the latest developments in one's
								field is essential for remaining competitive. A
								knowledge portfolio provides a structured way to
								manage and develop one's knowledge assets,
								ensuring that they stay relevant and valuable
								over time.
							</p>
						</Col>
					</Row>
				</div>

				<div id="investing" className="content-block">
					<Row>
						<Col lg="7">
							<h2>Investing</h2>
							<p>
								By investing in a knowledge portfolio,
								individuals whose main capital is knowledge
								actively nurture the habit of lifelong learning
								and personal growth. This involves proactively
								seeking learning opportunities, such as
								enrolling in courses, attending workshops, and
								engaging in reflective practice. A knowledge
								portfolio empowers knowledge workers to stay at
								the forefront of their field, continuously
								acquire new skills and knowledge, and maintain a
								competitive edge in an ever-evolving landscape.
							</p>
						</Col>
						<Col lg="5">
							<motion.div
								initial={{ opacity: 0, x: '50px' }}
								whileInView={{ opacity: 1, x: '0' }}
								viewport={{ once: true }}
								transition={{ duration: 0.5 }}
							>
								{' '}
								<StyledImageWrap>
									<Image src={investImage} priority />
								</StyledImageWrap>
							</motion.div>
						</Col>
					</Row>
				</div>

				<div className="text-center mt-lg">
					<Link href="/portfolio">
						<Button
							variant="primary btn-round btn-big"
							type="button"
						>
							Get Started
						</Button>
					</Link>
				</div>
			</StyledContainer>
		</Main>
	);
}
