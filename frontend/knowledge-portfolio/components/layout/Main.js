import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
	min-height: 100vh;
	padding: 6rem 0;
	background-size: 60%;
	background-position: right;
	background-repeat: no-repeat;
	background-color: #fff;
	background-image: var(--rays);
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	overflow: hidden;
	color: #fff;

	.noise-overlay {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		background-image: url("/images/noise.png");
		width: 100%;
		height: 100%;
		opacity: 0.1;
	}

	.children-wrap {
		position: relative;
		z-index: 10;
	}
`;

export default function Main({ children }) {
	return (
		<StyledMain>
			<div className="noise-overlay"> </div>
			<div className="children-wrap">{children}</div>
		</StyledMain>
	);
}
