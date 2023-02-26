import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
	padding: 4rem;
	background-color: var(--black);
`;

export default function Footer() {
	return <StyledFooter className="padding"></StyledFooter>;
}
