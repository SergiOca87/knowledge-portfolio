import React from 'react';
import styled from 'styled-components';
import * as FontAwesome from 'react-icons/fa';

const StyledCategories = styled.div`
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
`;

export default function Categories({ categories }) {
	return (
		<StyledCategories>
			<p>{categories.length > 1 ? 'Categories:' : 'Category:'}</p>
			<div className="categories">
				{categories.map((category) => {
					let IconName = '';

					if (category.icon) {
						IconName = FontAwesome[category.icon];
					}
					return (
						<div>
							{IconName && (
								<span className="category">
									<IconName />
								</span>
							)}

							<span>{category.name}</span>
						</div>
					);
				})}
			</div>
		</StyledCategories>
	);
}
