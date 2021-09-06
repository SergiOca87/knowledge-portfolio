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
		cursor: pointer;

		svg {
			transition: all 200ms;
		}

		&:hover {
			svg {
				fill: var(--secondary);
			}
		}
	}
`;

export default function CategoryIcons({ search }) {
	let iconsArr = [];

	for (let icon in FontAwesome) {
		if (icon.includes('Fa')) {
			iconsArr.push(icon);
		}
	}

	// if (search.length) {
	// 	iconsArr = iconsArr.filter((icon) =>
	// 		icon.toLowerCase().includes(search)
	// 	);
	// }

	return (
		<StyledIcons>
			<div className="icons-wrap">
				{search.length
					? iconsArr
							.filter((icon) =>
								icon
									.toLowerCase()
									.includes(search.toLowerCase())
							)
							.map((icon) => {
								const IconName = FontAwesome[icon];

								return (
									<div
										className="icon"
										data-name={icon}
										key={icon}
									>
										<IconName />
									</div>
								);
							})
					: iconsArr.map((icon) => {
							const IconName = FontAwesome[icon];

							return (
								<div
									className="icon"
									data-name={icon}
									key={icon}
								>
									<IconName />
								</div>
							);
					  })}
			</div>
		</StyledIcons>
	);
}
