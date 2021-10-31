import { useQuery } from '@apollo/client';
import React from 'react';
import styled, { css } from 'styled-components';
import { FaEnvelope, FaLinkedin, FaUser } from 'react-icons/fa';

//TODO: The user card needs to have the buttons to follow/unfollow.
//TODO: Just pass the user Object? So no need to query again?
//TODO: BONUS -  The usr card need to  have the button to send a message.

const StyledUserCard = styled.div`
	width: 100%;
	flex: 1;
	background-color: var(--tertiary);
	display: flex;
	flex-direction: column;
	border: 1px solid var(--tertiary);

	.title {
		padding: 2rem;
		text-align: center;
		background-color: var(--tertiary);
		border-bottom: 1px solid var(--secondary);

		h4 {
			margin: 0;
			color: var(--primary);
			color: #fff;
			font-family: 'Montserrat-Medium';
			font-size: 2.2rem;
		}

		p {
			margin-bottom: 0;
		}
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		padding: 2rem;
		margin-top: auto;
		background-color: var(--primary);

		.btn {
			margin-right: 0.5rem;
		}
	}

	.details {
		padding: 2rem;

		.separator {
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 2rem 0;
			align-items: flex-start;

			&:not(:last-child) {
				border-bottom: 1px solid rgba(255, 255, 255, 0.1);
			}

			h5 {
				text-transform: uppercase;
				letter-spacing: 1px;
				margin-bottom: 0.5rem;
				color: var(--secondary);
			}

			p {
				margin: 0;
				padding-left: 2rem;
			}
		}

		.categories {
			display: flex;
			flex-wrap: wrap;
			margin-top: 0.5rem;
			padding-left: 2rem;

			.category {
				font-size: 1.8rem;
				margin-right: 1rem;
			}

			div {
				display: flex;
				align-items: center;
				border: 1px solid var(--secondary);
				font-size: 1.2rem;
				text-transform: uppercase;
				padding: 0.8rem 1.5rem;
				letter-spacing: 1px;
				font-family: 'Montserrat-Medium';
				margin-right: 0.5rem;
			}
		}
	}
`;

export default function UserCard({ user }) {
	// const { data, error, loading } = useQuery(SINGLE_USER_QUERY, {
	// 	variables: {
	// 		id: userId,
	// 	},
	// });

	// const user = data.User;
	console.log('user card', user);
	return (
		<StyledUserCard>
			<div className="title">
				{user?.options?.userImage &&
					(data.user.image ? (
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
					))}
				<div>User Image</div>
				<h3>{user.name}</h3>
				<p>
					{user.publicEmail && (
						<a href={`mailto:${user.email}`}>
							<FaEnvelope />
						</a>
					)}
					{user.linkedin && (
						<a href={user.linkedin} target="_blank">
							<FaLinkedin />
						</a>
					)}
					{user.instagram && (
						<a href={user.instagram} target="_blank">
							<FaInstagram />
						</a>
					)}
					{user.youtube && (
						<a href={user.youtube} target="_blank">
							<FaLinkedin />
						</a>
					)}
					//TODO: Replace this icon
					{user.website && (
						<a href={user.website} target="_blank">
							<FaUser />
						</a>
					)}
				</p>
			</div>
		</StyledUserCard>
	);
}
