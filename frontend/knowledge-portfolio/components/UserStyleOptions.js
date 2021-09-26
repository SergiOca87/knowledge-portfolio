import React from 'react';
import styled, { css } from 'styled-components';

export default function UserStyleOptions({ user, children }) {
	const userStyles = `
	${
		user?.options?.options?.mode === 'dark' &&
		`
--primary: ${user?.options?.options?.darkPalette.primary};
--secondary: ${user?.options?.options?.darkPalette.secondary};
--tertiary: ${user?.options?.options?.darkPalette.tertiary};
`
	}

	${
		user?.options?.options?.mode === 'light' &&
		`
--primary: ${user?.options?.options?.lightPalette.primary};
--secondary: ${user?.options?.options?.lightPalette.secondary};
--tertiary: ${user?.options?.options?.lightPalette.tertiary};
`
	}

p {
		font-family: ${user?.options?.options?.fontFamily}-Regular;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	.btn {
		font-family: ${user?.options?.options?.fontFamily}-Medium !important;
	}

	${
		user?.options?.options?.roundEdges &&
		`
		div{
			border-radius: 8px;
		}
	`
	}
`;
	return (
		<>
			{user && <div css={user.options ? userStyles : ''}>{children}</div>}
		</>
	);
}
