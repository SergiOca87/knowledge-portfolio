import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat-Regular';
    src: url('/static/Montserrat-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Montserrat-Light';
    src: url('/static/Montserrat-Light.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Montserrat-Medium';
    src: url('/static/Montserrat-Medium.woff2') format('woff2');
  }
  html {
    --black: #242424;
    --primary: #14213dff;
    --secondary: #fca311ff;
    --tertiary: #2b3952;
    --platinum: #e5e5e5ff;
    --primary-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='700' preserveAspectRatio='none' viewBox='0 0 1440 700'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1626%26quot%3b)' fill='none'%3e%3crect width='1440' height='700' x='0' y='0' fill='url(%23SvgjsLinearGradient1627)'%3e%3c/rect%3e%3cpath d='M1440 0L1081.54 0L1440 118.52z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M1081.54 0L1440 118.52L1440 171.56L900.8399999999999 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M900.84 0L1440 171.56L1440 365.2L867.77 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M867.77 0L1440 365.2L1440 378.55L546.27 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 700L127.85 700L0 442.7z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 442.7L127.85 700L625.46 700L0 299.87z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 299.87L625.46 700L893.75 700L0 252.52z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 252.51999999999998L893.75 700L1065.99 700L0 87.92999999999998z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1626'%3e%3crect width='1440' height='700' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='0%25' y1='50%25' x2='100%25' y2='50%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1627'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(20%2c 33%2c 61%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
    --offWhite: #ededed;
    --maxWidth: 1400px;
    --bs: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Montserrat-Regular', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.8rem;
    line-height:1.2;
    color: var(--black);
  }
  a {
    text-decoration: none;
    transition: all 200ms;
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    font-family: 'Montserrat-Medium', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat-Medium';
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 6rem;
  }
  h2 {
    font-size: 4rem;
  }
  h3 {
    font-size: 3.2rem;
  }
  p {
    font-size: 1.8rem;
    line-height: 1.4;
    margin-bottom: 2rem;
    font-family: 'Montserrat-Light';

    a {
      color: var(--secondary);
      font-family: 'Montserrat-Medium';

      &:hover {
        color: #fff;
      }

    }
  }
  .white {
    color: #fff;
  }
  .padding-2 {
    padding: 2rem 0;
  }
  .padding-4 {
    padding: 4rem 0;
  }
  .padding-6 {
    padding: 6rem: 0;
  }
`;

const InnerStyles = styled.div`
	// max-width: var(--maxWidth);
	// margin: 0 auto;
	// padding: 2rem;
`;

export default function Page({ children }) {
	return (
		<div>
			<GlobalStyles />
			<Nav />
			<InnerStyles>{children}</InnerStyles>
		</div>
	);
}

Page.propTypes = {
	children: PropTypes.any,
};
