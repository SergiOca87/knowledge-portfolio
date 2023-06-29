import React, { memo } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/fa';

function SingleCategoryIcon({ icon, selectedIcon }) {
	const IconName = FontAwesome[icon];

	console.log('category icon render');
	return (
		<OverlayTrigger
			placement={'top'}
			overlay={
				<Tooltip
					id={`tooltip-top}`}
					css={css`
						position: fixed;
					`}
				>
					{icon}
				</Tooltip>
			}
		>
			<div
				className={`icon ${icon === selectedIcon ? 'active' : ''}`}
				data-name={icon}
				key={icon}
			>
				<IconName />
			</div>
		</OverlayTrigger>
	);
}

export default memo(SingleCategoryIcon);
