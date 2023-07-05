import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './Footer';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'KumbhSans-Regular';
    src: url('/static/KumbhSans-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'KumbhSans-Bold';
    src: url('/static/KumbhSans-Bold.woff2') format('woff2');
  }

  html {
    --bg: #fff;
    --primary: #20AD96;
    --secondary: #333461;
    --grey: #FAF8F6;
    --text-color: #4A556C;
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
    font-family: 'KumbhSans-Regular', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
    font-family: 'KumbhSans-Regular', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
    line-height: initial !important;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'KumbhSans-Bold';
    margin-bottom: 1rem;
    color: var(--primary);
  }
  h1 {
    font-size: 5rem;
    font-family: 'KumbhSans-Bold';
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
    font-family: 'KumbhSans-Regular';
    color: var(--text-color);
   
  }
  a{
    color: var(--primary);
    font-family: 'KumbhSans-Regular';

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
      font-family: 'KumbhSans-Bold';
  
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
      font-family: 'KumbhSans-Bold';

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
    background-color: var(--grey);
    // background-clip: border-box;
    border-radius: 10px;
    border: 0;
    margin: 0 auto;
    color: var(--text-color);



    .card-header {
      padding: 1.2rem 1.5rem;
      letter-spacing: 1px;
      font-size: 2.2rem;
      // text-transform: uppercase;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      border-bottom: none;
    }

    .card-body {
      background-color: transparent;

      .list-group-item {
        background-color: transparent;
      }
    }

    .card-text {
      padding: 2rem;
      color: var(--text-color);;
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



export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Nav />
      <ToastContainer />
      {children}

      <Footer />
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
