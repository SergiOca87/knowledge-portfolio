import styled, { createGlobalStyle, css } from 'styled-components';
// import Header from './Header';
import Head from 'next/head';
import Nav from './Nav';

const GlobalStyles = createGlobalStyle`

    html {
		box-sizing: border-box;
		font-size: 62.5%;

		body {
			font-size: 1.8rem;
			
		}

        p {
            font-size: 1.8rem;
	
        } 

		.container {
			max-width: 1400px;
			margin: 0 auto;
			padding: 0 2rem;
			width: 100%;
		}
       
    }
 
`;

const StyledWrapper = styled.div`
	max-width: 120rem;
	margin: 0 auto;
	padding: 0 2rem;
`;

export default function Layout({ title, keywords, description, children }) {
	return (
		<>
			<Head>
				<title>Owlit | {title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			{/* <Header/> */}
			<GlobalStyles />
			<Nav />
			<main
				css={css`
					padding-bottom: 6rem;
				`}
			>
				<StyledWrapper>{children}</StyledWrapper>
			</main>
		</>
	);
}

// Layout.defaultProps = {
//     title:
//     description:
// }
