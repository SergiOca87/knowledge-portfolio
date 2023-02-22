import Link from 'next/link';
import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaEye, FaFileDownload, FaPlus, FaQrcode } from 'react-icons/fa';
import styled from 'styled-components';

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
				border-left: 1px solid var(--secondary);
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
				stroke: var(--black);
				fill: var(--black);
			}
		}
	}
`;

function PortfolioControls({ user }) {
	return (
		<StyledPortfolioControls>
			<div>
				<OverlayTrigger
					placement={'top'}
					overlay={
						<Tooltip id={`tooltip-top}`}>
							Add New Portfolio Item
						</Tooltip>
					}
				>
					<Button>
						<Link href={'/add-item'} className="link">
							<a>
								<FaPlus />
							</a>
						</Link>
					</Button>
				</OverlayTrigger>
			</div>
			<div>
				<OverlayTrigger
					placement={'top'}
					overlay={
						<Tooltip id={`tooltip-top}`}>
							Toggle Public View
						</Tooltip>
					}
				>
					<Button>
						<Link href={`/public-portfolio/${user.id}`}>
							<a>
								<FaEye />
							</a>
						</Link>
					</Button>
				</OverlayTrigger>
			</div>
			<div>
				{/* <Link href={'/'}>
        <PortfolioEdit
            placement={'end'}
            // setOpenModal={setOpenModal}
            // openModal={openModal}
        />
    </Link> */}
			</div>
			<div>
				<OverlayTrigger
					placement={'top'}
					overlay={
						<Tooltip id="tooltip-top">Download as a PDF</Tooltip>
					}
				>
					<Button>
						<Link href={'/'}>
							<a>
								<FaFileDownload />
							</a>
						</Link>
					</Button>
				</OverlayTrigger>
			</div>
			<div>
				<OverlayTrigger
					placement={'top'}
					overlay={
						<Tooltip id="tooltip-top">Generate QR Code</Tooltip>
					}
				>
					<Button
						onClick={() =>
							showQrModal
								? setShowQrModal(false)
								: setShowQrModal(true)
						}
					>
						{/* <Link
                href={`/qr/${id}`}
                query={`${router.pathname}`}
            > */}
						<FaQrcode />
						{/* </Link> */}
					</Button>
				</OverlayTrigger>
			</div>
		</StyledPortfolioControls>
	);
}

export default PortfolioControls;
