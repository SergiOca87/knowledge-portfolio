//TODO: There's some DRY to do here, lot of repeated code.

import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import * as FontAwesome from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import SingleCategoryIcon from './SingleCategoryIcon';

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

	console.log(search.length);

	// Exclude no "Fa" icons
	for (let icon in FontAwesome) {
		if (icon.includes('Fa')) {
			iconsArr.push(icon);
		}
	}

	// Use Memo is beneficial here as changing the category name would also trigger icon filtering, which seems to cause performance issues
	const filterIcons = useMemo(
		function () {
			return iconsArr
				.filter((icon) =>
					icon.toLowerCase().includes(search.toLowerCase())
				)
				.map((icon) => {
					return (
						<SingleCategoryIcon
							icon={icon}
							selectedIcon={selectedIcon}
							key={icon}
						/>
					);
				});
		},
		[search]
	);

	return (
		<StyledIcons>
			<div className="icons-wrap">
				{search.length
					? filterIcons
					: iconsArr.map((icon) => {
						return (
							<SingleCategoryIcon
								icon={icon}
								selectedIcon={selectedIcon}
								key={icon}
							/>
						);
					})}
			</div>
		</StyledIcons>
	);
}