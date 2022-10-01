//TODO: There's some DRY to do here, lot of repeated code.

import React from 'react';
import styled from 'styled-components';
import * as FontAwesome from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
			fill: var(--secondary);
		}

		&:hover,
		&.active {
			svg {
				fill: var(--primary);
			}
		}
	}
`;

export default function CategoryIcons({ search, selectedIcon }) {
	let iconsArr = [];

	console.log('inside icons component', selectedIcon);

	// Exclude no "Fa" icons
	for (let icon in FontAwesome) {
		if (icon.includes('Fa')) {
			iconsArr.push(icon);
		}
	}

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
									<OverlayTrigger
										placement={'top'}
										overlay={
											<Tooltip id={`tooltip-top}`}>
												{icon.substring(2)}
											</Tooltip>
										}
									>
										<div
											className={`icon ${
												icon === selectedIcon
													? 'active'
													: ''
											}`}
											data-name={icon}
											key={icon}
										>
											<IconName />
										</div>
									</OverlayTrigger>
								);
							})
					: iconsArr.map((icon) => {
							const IconName = FontAwesome[icon];

							return (
								<OverlayTrigger
									placement={'top'}
									overlay={
										<Tooltip id={`tooltip-top}`}>
											{icon.substring(2)}
										</Tooltip>
									}
								>
									<div
										className={`icon ${
											icon === selectedIcon
												? 'active'
												: ''
										}`}
										data-name={icon}
										key={icon}
									>
										<IconName />
									</div>
								</OverlayTrigger>
							);
					  })}
			</div>
		</StyledIcons>
	);
}
