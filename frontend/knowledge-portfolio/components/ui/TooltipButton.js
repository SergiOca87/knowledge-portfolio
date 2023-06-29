import Link from 'next/link';
import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

function TooltipButton({ tooltipText, link, icon }) {
	return (
		<div>
			<OverlayTrigger
				placement={'top'}
				overlay={
					<Tooltip
						id={`tooltip-top}`}
						css={css`
							position: fixed;
						`}
					>
						{tooltipText}
					</Tooltip>
				}
			>
				<Button variant="secondary">
					<Link
						href={{
							pathname: link,
						}}
					>
						<a>{icon}</a>
					</Link>
				</Button>
			</OverlayTrigger>
		</div>
	);
}

export default TooltipButton;
