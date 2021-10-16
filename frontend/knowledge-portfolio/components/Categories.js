import React from 'react';
import { Button } from 'react-bootstrap';
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

const categoriesTitle = (categories) => {
	if (categories.length === 0) {
		return;
	} else if (categories.length > 1) {
		return <p>Categories:</p>;
	} else {
		return <p>Category:</p>;
	}
};

export default function Categories({
	categories,
	asButtons = false,
	activeCategories,
}) {
	return (
		<StyledCategories>
			{categoriesTitle(categories)}
			<div className="categories">
				{asButtons && (
					<Button
						size="sm"
						className={
							activeCategories.includes('All') ? 'active' : ''
						}
						data-category="All"
					>
						<span>All</span>
					</Button>
				)}

				{categories?.map((category) => {
					let IconName = '';

					if (category.icon) {
						IconName = FontAwesome[category.icon];
					}
					return asButtons ? (
						<Button
							size="sm"
							key={category.id}
							data-category={`${category.name}`}
							className={
								activeCategories.includes(category.name)
									? 'active'
									: ''
							}
						>
							{IconName && (
								<span className="category">
									<IconName />
								</span>
							)}

							<span>{category.name}</span>
						</Button>
					) : (
						<div key={category.id}>
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
