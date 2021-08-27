import Head from 'next/head';
import Image from 'next/image';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import Link from 'next/link';
import gql from 'graphql-tag';

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 2rem;
`;

const StyledMain = styled.main`
	min-height: 100vh;
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
				<div className="container">
					<h1>Your Knowledge Portfolio</h1>
					<p>World connected image. Technological and techy feel.</p>

					<h2>What</h2>
					<p>
						A place where you can quickly share your knowledge, in a
						format of your choice.
					</p>
					<p>
						From official courses and certification to books you are
						reading or Apps/projects you are building or have built
						in an amateur or a professional environment, the content
						is up to you.
					</p>
					<h2>Why</h2>
					<p>
						In a quickly changing world where fields that require a
						higher level of specialization are more prevalent than
						ever before, education, usually, does not does not end
						in college or university. This is even more prevalent
						(prevalent or obvious) in fields where new technologies
						appear all the time, and the professional, student or
						enthuasiast has to adapt and learn new things to stay
						relevant. Probable (proof-able? Able to build something
						out of what you know) knowledge is then something that
						not always is accompanied by a traditional title but at
						the same time you should be able to show that you are
						accumulating knowledge. The internet has offered us a
						new way of approaching this kind of less-traditional
						education. We support this{' '}
						<strong>decentralized</strong> education which empowers
						professionals and students no matter their gender, race,
						sexual orientation or geographical procedence. So if you
						did anything to grow in any way professionally or
						towards your professional goal, leave your mark here and
						let the world know.
					</p>
					<p>
						Start your knowledge portfolio in under a minute{' '}
						<Link href="login">here</Link>
					</p>
				</div>
			</StyledMain>

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
		</>
	);
}
