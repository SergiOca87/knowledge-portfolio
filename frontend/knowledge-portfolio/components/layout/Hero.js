import React from 'react';
import styled from 'styled-components';

const StyledHero = styled.section`
	h1 {
		color: #fff;
		font-size: 6rem;
		letter-spacing: 2px;
	}
`;

export default function Hero({ children }) {
	return <StyledHero>{children}</StyledHero>;
}
