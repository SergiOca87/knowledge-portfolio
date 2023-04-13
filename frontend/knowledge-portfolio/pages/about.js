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
								contributing to its development. While Karl Wiig
								is widely credited with introducing the term
								"knowledge portfolio" in his 1997 book,
								"Knowledge Management: An Introduction and
								Perspective," there are other references to the
								idea of managing knowledge as a portfolio that
								predate Wiig's work. For example, in "The
								Pragmatic Programmer" book published in 1999,
								authors Andrew Hunt and David Thomas discuss the
								concept of a "skills portfolio" as a way for
								software developers to manage and enhance their
								professional skills over time. While they did
								not use the term "knowledge portfolio"
								explicitly, the idea of tracking and reflecting
								on one's experience, knowledge, and
								accomplishments shares similarities with the
								concept of a knowledge portfolio.
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
								A knowledge portfolio is a valuable tool for
								individuals and organizations seeking to manage
								their intellectual assets over time. By
								organizing and reflecting on their knowledge and
								skills, individuals and organizations can
								identify gaps in their knowledge and prioritize
								areas for learning and development. A
								well-managed knowledge portfolio can also help
								to demonstrate one's expertise and value to
								potential employers or clients. In today's
								rapidly changing global economy, staying
								up-to-date with the latest developments in one's
								field is essential for remaining competitive. A
								knowledge portfolio provides a structured way to
								manage and develop one's knowledge assets,
								ensuring that they stay relevant and valuable
								over time. By investing in a knowledge
								portfolio, individuals and organizations can
								enhance their problem-solving abilities, make
								better decisions, and create new opportunities
								for growth and success.
							</p>
						</Col>
					</Row>
				</div>

				<div id="investing" className="content-block">
					<Row>
						<Col lg="7">
							<h2>Investing</h2>
							<p>
								Investing in a knowledge portfolio requires a
								commitment to ongoing learning and development.
								This may involve taking courses, attending
								conferences and workshops, reading books and
								articles, participating in professional
								networks, and engaging in reflective practice.
								By investing in their knowledge portfolio,
								individuals and organizations can stay
								up-to-date with the latest developments in their
								field, acquire new skills and knowledge, and
								remain competitive in a constantly evolving
								business environment. Maintaining a knowledge
								portfolio also requires regular reflection and
								self-assessment. Individuals and organizations
								should periodically review their portfolio to
								assess their strengths and weaknesses and
								identify areas for improvement. By setting goals
								and tracking progress over time, they can ensure
								that their knowledge portfolio continues to
								evolve and remain relevant.
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

				<Card className="conclusion">
					<p>
						In conclusion, the idea of managing knowledge as an
						asset has been around for many years and has been
						described in various forms by different authors. Today,
						a knowledge portfolio is a valuable tool for individuals
						and organizations seeking to manage their intellectual
						assets in a constantly changing global economy. By
						investing in ongoing learning and development and
						regularly reflecting on their knowledge and skills, they
						can stay ahead of the curve and create new opportunities
						for growth and success.
					</p>

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
				</Card>
			</StyledContainer>
		</Main>
	);
}
