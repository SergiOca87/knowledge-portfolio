import Head from 'next/head';
import Image from 'next/image';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import gql from 'graphql-tag';

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-gap: 2rem;
`;

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Knowledge Portfolio</title>
				<meta
					name="description"
					content="A place to visually share your knowledge"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to your Knowledge Portfolio
				</h1>
				<p>First time visitor? Read our manifesto.</p>

				<StyledGrid>
					<div className={styles.grid}>
						<a className={styles.card}>
							<h2>Sign In</h2>
							<SignIn />
						</a>
					</div>

					<div className={styles.grid}>
						<a className={styles.card}>
							<h2>Register</h2>
							<SignUp />
						</a>
					</div>
				</StyledGrid>

				<p>Temporary item grid</p>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							width={72}
							height={16}
						/>
					</span>
				</a>
			</footer>
		</div>
	);
}
