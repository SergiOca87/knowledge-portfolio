import React, { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
	Container,
	Row,
	Col,
	Button,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import UserContext from '../../context/UserContext';
import { FaUser, FaPlus, FaEye, FaPencilAlt } from 'react-icons/fa';
import Link from 'next/link';
import ItemGrid from '../../components/ItemGrid';
import Main from '../../components/Main';

const StyledUserCard = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 6rem;

	.avatar {
		width: 10rem;
		height: 10rem;
		background-color: var(--tertiary);
		border-radius: 50%;
		border: 2px solid var(--secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		margin-right: 4rem;
		flex-shrink: 0;
	}
	h1 {
		font-size: 4rem;
	}
`;

const StyledGridWrap = styled.div`
	border-top: 1px solid var(--secondary);
	padding-top: 4rem;
	z-index: 10;
	position: relative;
`;

const UserControls = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	z-index: 0;
	position: relative;
	transition: all 300ms;

	div {
		&:first-child {
			button {
				border-right: 1px solid var(--secondary);
				border-left: 1px solid transparent;
			}
		}

		&:last-child {
			button {
				border-left: 1px solid var(--secondary);
				border-right: 1px solid transparent;
			}
		}
	}

	button {
		width: 7rem;
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--tertiary);
		transition: all 300ms;
		cursor: pointer;
		border-top: 5px solid transparent !important;
		border-bottom: transparent !important;
		border-left: 1px solid transparent;
		border-right: 1px solid transparent;

		svg {
			transition: all 300ms;
			margin-top: -3px;
		}

		&:hover,
		&:active,
		&:focus {
			border-top: 5px solid var(--secondary) !important;
			background-color: var(--tertiary);
			border-color: none !important;

			svg {
				stroke: var(--secondary);
				fill: var(--secondary);
			}
		}
	}
`;

export default function UserPortfolioPage() {
	const router = useRouter();
	const { id } = router.query;

	//Tooltip
	const [show, setShow] = useState(false);
	const target = useRef(null);

	const { user } = useContext(UserContext);

	return (
		<Main>
			<Container>
				<StyledUserCard>
					{/* //TODO: ADD this functionality when Cloudinary support is
					enabled in Keystone 6 */}
					{user?.image ? (
						<div
							className="avatar"
							css={`
								background-image: ${user.image};
							`}
						></div>
					) : (
						<div className="avatar">
							<FaUser />
						</div>
					)}
					<h1>Welcome to your portfolio, {user?.name}</h1>
				</StyledUserCard>
				<UserControls>
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
								<Link href={'/add-item'}>
									<FaPlus />
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
								<Link href={'/'}>
									<FaEye />
								</Link>
							</Button>
						</OverlayTrigger>
					</div>
					<div>
						<OverlayTrigger
							placement={'top'}
							overlay={
								<Tooltip id={`tooltip-top}`}>
									Edit Portfolio
								</Tooltip>
							}
						>
							<Button>
								<Link href={'/'}>
									<FaPencilAlt />
								</Link>
							</Button>
						</OverlayTrigger>
					</div>
				</UserControls>

				<StyledGridWrap>
					<ItemGrid id={user?.id} />
				</StyledGridWrap>
			</Container>
		</Main>
	);
}
