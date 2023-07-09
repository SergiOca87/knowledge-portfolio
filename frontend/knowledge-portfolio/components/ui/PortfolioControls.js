import Link from 'next/link';
import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
	FaEye,
	FaFileDownload,
	FaPlus,
	FaFolder,
	FaQrcode,
} from 'react-icons/fa';
import styled from 'styled-components';
import TooltipButton from './TooltipButton';

const StyledPortfolioControls = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	z-index: 0;
	position: relative;
	transition: all 300ms;

	div {
		&:first-child {
			button {
				border-left: 1px solid var(--primary);
			}
		}
	}

	button {
		width: 7rem;
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		transition: all 300ms;
		cursor: pointer;
		padding: 0;
		border-bottom: transparent !important;
		border-right: 1px solid var(--primary);
		border-top: 4px solid var(--primary);
		border-radius: 0;
		margin-left -1px;
		color: #fff;
		z-index: 10;

		svg {
			transition: all 300ms;
			margin-top: -3px;
		}

		a {
			display: flex;
			width: 100%;
			height: 100%;
			align-items: center;
			justify-content: center;
		}

		&:hover,
		&:active,
		&:focus {
			border-bottom: transparent !important;
			border-right: 1px solid var(--secondary);
			border-top: 4px solid var(--secondary);
			background-color: var(--secondary);

			svg {
				stroke: #fff;
				fill: #fff;
			}
		}
	}
`;
//TODO: Maybe Download as PDF is not needed
function PortfolioControls({ user }) {
	return (
		<StyledPortfolioControls>
			<TooltipButton
				tooltipText="Add New Portfolio Item"
				link={`/add-item`}
				icon={<FaPlus />}
			/>
			<TooltipButton
				tooltipText="Add Or Edit Categories"
				link={`/add-category`}
				icon={<FaFolder />}
			/>
			<TooltipButton
				tooltipText="Toggle Public View"
				link={`/public-portfolio/${user.id}`}
				icon={<FaEye />}
			/>

			{/* <TooltipButton
				tooltipText="Download as a PDF"
				link={`/public-portfolio/${user.id}`}
				icon={<FaFileDownload />}
			/> */}
			<TooltipButton
				tooltipText="Generate QR Code"
				link=""
				icon={<FaQrcode />}
			/>
			{/* <OverlayTrigger
				placement={'top'}
				overlay={<Tooltip id="tooltip-top">Generate QR Code</Tooltip>}
			>
				<Button
					onClick={() =>
						showQrModal
							? setShowQrModal(false)
							: setShowQrModal(true)
					}
				>
				
					<FaQrcode />
				</Button>
			</OverlayTrigger> */}
		</StyledPortfolioControls>
	);
}

export default PortfolioControls;
