import React from 'react';
import styled from 'styled-components';
import * as FontAwesome from 'react-icons/fa';

const StyledIcons = styled.div`
	.icons-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.icon {
		font-size: 3rem;
		width: 5rem;
		height: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export default function CategoryIcons() {
	const iconsArr = [];

	for (let icon in FontAwesome) {
		if (icon.includes('Fa')) {
			iconsArr.push(icon);
		}
	}

	return (
		<div className="icons-wrap">
			{iconsArr.map((icon) => {
				const IconName = FontAwesome[icon];

				return (
					<div className="icon" data-name={icon} key={icon}>
						<IconName />
					</div>
				);
			})}
		</div>
	);
}
