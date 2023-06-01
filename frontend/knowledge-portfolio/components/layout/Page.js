import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';

import bgImage from '../../public/images/noise.png';
import Image from 'next/image';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './Footer';

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
  @font-face {
    font-family: 'Montserrat-Bold';
    src: url('/static/Montserrat-Bold.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Montserrat-ExtraBold';
    src: url('/static/Montserrat-ExtraBold.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Roboto-Regular';
    src: url('/static/Roboto-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Roboto-Light';
    src: url('/static/Roboto-Light.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Roboto-Medium';
    src: url('/static/Roboto-Medium.woff2') format('woff2');
  }
  html {
    --bg: #181823;
    --primary: #84a98c;
    --secondary: #E9F8F9;
    --tertiary: #051923;
    --platinum: #e5e5e5ff;
    --black: #141422;
    --primary-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='700' preserveAspectRatio='none' viewBox='0 0 1440 700'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1626%26quot%3b)' fill='none'%3e%3crect width='1440' height='700' x='0' y='0' fill='url(%23SvgjsLinearGradient1627)'%3e%3c/rect%3e%3cpath d='M1440 0L1081.54 0L1440 118.52z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M1081.54 0L1440 118.52L1440 171.56L900.8399999999999 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M900.84 0L1440 171.56L1440 365.2L867.77 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M867.77 0L1440 365.2L1440 378.55L546.27 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 700L127.85 700L0 442.7z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 442.7L127.85 700L625.46 700L0 299.87z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 299.87L625.46 700L893.75 700L0 252.52z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 252.51999999999998L893.75 700L1065.99 700L0 87.92999999999998z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1626'%3e%3crect width='1440' height='700' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='0%25' y1='50%25' x2='100%25' y2='50%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1627'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(20%2c 33%2c 61%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
    --wave: url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%2328cfb2' fill-opacity='0.6' d='M0,224L48,229.3C96,235,192,245,288,224C384,203,480,149,576,106.7C672,64,768,32,864,64C960,96,1056,192,1152,197.3C1248,203,1344,117,1392,74.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E');
    --wave2: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3E%3Cg mask='url(&quot;%23SvgjsMask1018&quot;)' fill='none'%3E%3Cpath d='M 0,74 C 57.6,101.8 172.8,223.8 288,213 C 403.2,202.2 460.8,8.4 576,20 C 691.2,31.6 748.8,256 864,271 C 979.2,286 1036.8,104.8 1152,95 C 1267.2,85.2 1382.4,196.6 1440,222L1440 560L0 560z' fill='rgba(227, 227, 227, 1)'%3E%3C/path%3E%3Cpath d='M 0,448 C 96,436.2 288,378.4 480,389 C 672,399.6 768,509.8 960,501 C 1152,492.2 1344,376.2 1440,345L1440 560L0 560z' fill='rgba(40, 207, 178, 0.2)'%3E%3C/path%3E%3C/g%3E%3Cdefs%3E%3Cmask id='SvgjsMask1018'%3E%3Crect width='1440' height='560' fill='%23ffffff'%3E%3C/rect%3E%3C/mask%3E%3C/defs%3E%3C/svg%3E");
    --liquid: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Crect fill='%23FFFFFF' width='1600' height='800'/%3E%3Cg fill-opacity='0.08'%3E%3Cpath fill='%23d6fef7' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23acfdef' d='M1600 0H0v719.8c49-16.8 99.5-27.8 150.7-33.5c111.9-12.7 226-2.4 335.3 19.4c3.4 0.7 6.8 1.4 10.2 2c116.8 24 231.7 59 347.6 92.2H1600V0z'/%3E%3Cpath fill='%2383fce7' d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/%3E%3Cpath fill='%2359fbdf' d='M0 0v429.4c55.6-18.4 113.5-27.3 171.4-27.7c102.8-0.8 203.2 22.7 299.3 54.5c3 1 5.9 2 8.9 3c183.6 62 365.7 146.1 562.4 192.1c186.7 43.7 376.3 34.4 557.9-12.6V0H0z'/%3E%3Cpath fill='%2330FAD7' d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/%3E%3Cpath fill='%232ef1d0' d='M1600 0H0v136.3c62.3-20.9 127.7-27.5 192.2-19.2c93.6 12.1 180.5 47.7 263.3 89.6c2.6 1.3 5.1 2.6 7.7 3.9c158.4 81.1 319.7 170.9 500.3 223.2c210.5 61 430.8 49 636.6-16.6V0z'/%3E%3Cpath fill='%232de9c8' d='M454.9 86.3C600.7 177 751.6 269.3 924.1 325c208.6 67.4 431.3 60.8 637.9-5.3c12.8-4.1 25.4-8.4 38.1-12.9V0H288.1c56 21.3 108.7 50.6 159.7 82C450.2 83.4 452.5 84.9 454.9 86.3z'/%3E%3Cpath fill='%232be0c1' d='M1600 0H498c118.1 85.8 243.5 164.5 386.8 216.2c191.8 69.2 400 74.7 595 21.1c40.8-11.2 81.1-25.2 120.3-41.7V0z'/%3E%3Cpath fill='%232ad8b9' d='M1397.5 154.8c47.2-10.6 93.6-25.3 138.6-43.8c21.7-8.9 43-18.8 63.9-29.5V0H643.4c62.9 41.7 129.7 78.2 202.1 107.4C1020.4 178.1 1214.2 196.1 1397.5 154.8z'/%3E%3Cpath fill='%2328CFB2' d='M1315.3 72.4c75.3-12.6 148.9-37.1 216.8-72.4h-723C966.8 71 1144.7 101 1315.3 72.4z'/%3E%3C/g%3E%3C/svg%3E");
    
    --offWhite: #ededed;
    --maxWidth: 1400px;
    --bs: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-sizing: border-box;
    font-size: 62.5%;
  
    @media only screen and (max-width: 600px) {
      font-size: 46%;
    }

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
    color: #fff;
    font-weight: 400;
    background-color: var(--bg);
    position: relative;

  }
  a {
    text-decoration: none;
    transition: all 200ms;
  }
 
  button {
    font-family: 'Montserrat-Medium', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
    line-height: initial !important;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat-Bold';
    margin-bottom: 1rem;
    color: var(--primary);
  }
  h1 {
    font-size: 5rem;
    font-family: 'Montserrat-Bold';
    margin-bottom: 1rem;
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
    font-family: 'Montserrat-Regular';
    color: #fff;
   
  }
  a{
    color: var(--primary);
    font-family: 'Montserrat-Medium';

    &:hover {
      color: var(--secondary);
      text-decoration: none;
    }

  }
  .container-fluid {
    padding: 0;
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

  .btn {
    text-transform: uppercase;
    padding: 1.2rem 2rem;
    font-size: 1.4rem;
    border-radius: 0;
    letter-spacing: 1px;
    color: #fff;
    border: none;
   
    &-primary {
      background-color: var(--primary);
      border: 2px solid var(--primary);
      color: var(--bg);
      border-radius: 3px;
      font-family: 'Montserrat-Bold';
  
      &:hover {
        background-color: transparent;
        color: var(--primary);
        border: 2px solid var(--primary);
      }
    }

    &-outlined {
      background-color: transparent;
      border: 2px solid var(--primary);
      color: #fff;
      border-radius: 3px;
      font-family: 'Montserrat-Bold';

      &:hover {
        background-color: var(--primary);
        color: var(--black);
        border: 2px solid var(--primary);
      }
    }

    &-round {
      border-radius: 30px;
    }

    &-big {
      padding: 1.8rem 3rem;
    }

    &-small {
    
    }
  }

  label {

    span {
      display: block;
      margin-bottom: 1.5rem;
    }
  }

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: var(--black);
    // background-clip: border-box;
    border-radius: 10px;
    border: 0;
    margin: 0 auto;
    height: 100%;
    color: #fff;

    // &:before {
    //   content: "";
    //   background: rgb(132,169,140);
    //   background: linear-gradient(180deg, rgba(132,169,140,1) 55%, rgba(0,20,20,0.34) 100%);
    //   width: calc(100% + 2px);
    //   height: calc(100% + 2px);
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   border-radius: 10px;
    //   z-index: -1;
    //   transform: translate(-1px,-1px);
    // }

    .card-header {
      // background-color: var(--primary);
      // color: var(--bg);
      padding: 1.2rem 1.5rem;
      letter-spacing: 1px;
      font-size: 2.2rem;
      text-transform: uppercase;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }

    .card-body {
      background-color: transparent;

      .list-group-item {
        background-color: transparent;
      }
    }

    .card-text {
      padding: 2rem;
      color: #fff;
    }

    .card-footer {
      background-color: transparent;
      padding: 3rem 0;
    }

    svg {
      max-width: 8rem;
    }
  }

  label {
    color: var(--black);
  }

  input[type=text], input[type=email], input[type=password], input[type=url], textarea {
    height: 4rem;
    font-size: 1.8rem;
  }

  .primary {
    color: var(--primary);
  }

  .secondary {
    color: var(--secondary);
  }

  // input[type=text], input[type=email], input[type=password], input[type=url], textarea {
  //   position: relative;
  //   background-color: transparent;
  //   border: none;
  //   color: #fff;
  //   height: 5rem;
  //   border-bottom: 1px solid #fff;
  //   width: 100%;
  //   outline: none;

  //   ::placeholder {
  //     color: #fff;
  //   }
  // }

  .primary-bg {
    background-color: var(--primary);
  }
  .secondary-bg {
    background-color: var(--secondary);
  }
`;

const InnerStyles = styled.div`
	// max-width: var(--maxWidth);
	// margin: 0 auto;
	// padding: 2rem;
`;

const StyledBgImage = styled(Image)`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -1;
`;

export default function Page({ children }) {
	return (
		<div>
			<GlobalStyles />
			<Nav />
			<ToastContainer />
			<InnerStyles>
				<StyledBgImage src={bgImage} alt="" layout="fill" />
				{children}
			</InnerStyles>
			<Footer />
		</div>
	);
}

Page.propTypes = {
	children: PropTypes.any,
};
