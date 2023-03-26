import { Container } from 'react-bootstrap';
import NotLoggedIn from '../components/auth/NotLoggedIn';
import Main from '../components/layout/Main';
import { supabase } from '../utils/supabaseClient';
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import * as FontAwesome from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
// import { useUser } from '@supabase/auth-helpers-react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import React from 'react';
import styled from 'styled-components';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const StyledYearInReview = styled.section`
	.timeline-wrap {
		&:before {
			left: 20px;
			height: 100%;
			width: 2px;
		}
	}

	.icon {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		box-shadow: 0 0 0 2px var(--primary), inset 0 2px 0 rgba(0, 0, 0, 0.08),
			0 3px 0 4px rgba(0, 0, 0, 0.05);

		svg {
			max-height: 15px;
			margin-top: -7px;
		}
	}

	.timeline-element {
		.vertical-timeline-element-content {
			box-shadow: none;
			position: relative;
			border-radius: 4px;
			background-color: var(--black);

			&:before {
				content: '';
				background: rgb(132, 169, 140);
				background: linear-gradient(
					180deg,
					rgba(132, 169, 140, 1) 55%,
					rgba(0, 20, 20, 0.34) 100%
				);
				width: calc(100% + 2px);
				height: calc(100% + 2px);
				position: absolute;
				top: 0;
				left: 0;
				border-radius: 4px;
				z-index: -1;
				transform: translate(-1px, -1px);
				opacity: 0;
				transition: opacity 300ms;
				transition-delay: 600ms;
			}

			&.bounce-in {
				&:before {
					opacity: 1;
				}
			}
		}
	}
`;

// TODO: What about uncategorized items? Maybe that should be returned at the end on its own list?

function YearInReview({ user, items, categories }) {
	const { isLoading } = useSessionContext();

	// Extract only the year from the database column "created_at" of a given item
	const yearItemIsCreated = (item) => new Date(item.created_at).getFullYear();

	//List of items of a given year
	const itemsByYear = (items) =>
		items.filter((item) => yearItemIsCreated(item));

	// Years present in the user items
	const yearsInUserPortfolio = [
		...new Set(items.map((item) => yearItemIsCreated(item))),
	];

	//Return a list of categories
	const listCategoriesByYear = (items) => {
		const categoriesByYear = [
			...new Set(
				itemsByYear(items)
					.map((item) => item.categories)
					.filter((category) => category !== null && category.length)
					.flat()
					.sort()
					.reverse()
			),
		];

		return categoriesByYear;
	};

	// Return a list of items present on a given year within a category
	const listItemsByYearAndCategory = (items, year, category) => {
		return items.filter(
			(item) =>
				yearItemIsCreated(item) === year &&
				item.categories &&
				item.categories.includes(category)
		);
	};

	// Return a list of items present on a given year without a category
	//TODO: Maybe we should create the uncategorized or force a category
	const listItemsByYearWithoutCategory = (items, year) => {
		return itemsByYear(items).filter(
			(item) =>
				yearItemIsCreated(item) === year && item.categories === null
		);
	};

	const Icon = ({ iconName, size, color }) => {
		const icon = React.createElement(FontAwesome[iconName]);
		return <div style={{ fontSize: size, color: color }}>{icon}</div>;
	};

	const renderYearBasedList = () => {
		return yearsInUserPortfolio.map((year) => (
			<StyledYearInReview>
				<h2>{year}</h2>

				<VerticalTimeline
					layout="1-column-left"
					lineColor="var(--secondary)"
					className="timeline-wrap"
				>
					{listCategoriesByYear(items).map((categoryId) => {
						const itemsInCategory = listItemsByYearAndCategory(
							items,
							year,
							categoryId
						);

						// Exclude categories without items
						if (itemsInCategory.length === 0) {
							return null;
						}

						let IconName = '';

						const categoryIcon = categories.find(
							(categoryObj) => categoryObj.id === categoryId
						).icon;

						IconName = categoryIcon
							? React.createElement(FontAwesome[categoryIcon])
							: '';

						return (
							<VerticalTimelineElement
								className="timeline-element"
								contentStyle={{
									background: 'var(--black)',
									color: '#fff',
								}}
								contentArrowStyle={{
									borderRight: '7px solid  var(--primary)',
								}}
								iconStyle={{
									fontSize: '1rem',
									backgroundColor: 'var(--black)',
								}}
								// date={year}
								// iconStyle={{ background: experience.iconBg }}
								icon={IconName}
								iconClassName="icon"
							>
								<div>
									<h3 className="text-white text-[24px] font-bold">
										{
											categories.find(
												(categoryObj) =>
													categoryObj.id ===
													categoryId
											).name
										}
									</h3>
								</div>

								<ul>
									{listItemsByYearAndCategory(
										items,
										year,
										categoryId
									).map((item) => (
										<li>{item.title}</li>
									))}
								</ul>
							</VerticalTimelineElement>
						);
					})}
					<li>
						Uncategorized
						<ul>
							{listItemsByYearWithoutCategory(items, year).map(
								(item) => (
									<li>{item.title}</li>
								)
							)}
						</ul>
					</li>
				</VerticalTimeline>
			</StyledYearInReview>
		));
	};

	return (
		<Main>
			<Container>
				{user ? (
					isLoading ? (
						<p>Loading...</p>
					) : (
						renderYearBasedList()
					)
				) : (
					<NotLoggedIn />
				)}
				{user && !items && (
					<h2>
						PLease add some items to your portfolio first{' '}
						<Link href="/portfolio">here</Link>
					</h2>
				)}
			</Container>
		</Main>
	);
}

export default YearInReview;

// TODO: Maybe the right approach is to use serverSideProps (I tihnk it is most likely), identify the user who is making the request via a supabase function like getUser
//TODO: This is now repeated so it would make sense to put it in a utils folder(portfolioid)
export async function getServerSideProps(context) {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(context);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	const { data: items } = await supabase
		.from('items')
		.select('*')
		.eq('userId', session.user.id);

	const { data: categories } = await supabase
		.from('categories')
		.select('*')
		.eq('userId', session.user.id);

	return {
		props: {
			initialSession: session,
			user: session.user,
			items,
			categories,
		},
	};
}
// export async function getStaticPaths() {
// 	// Get all users from supabase
// 	let { data, error } = await supabase.from('profiles').select('id');

// 	// Let Next.js know how many pages (user ids) are there
// 	const paths = data.map((userId) => ({
// 		params: {
// 			id: userId.id,
// 		},
// 	}));

// 	//TODO: If this errors we may need a "loading"
// 	//TODO: If this gets too slow, can switch to getserverSideProps to render on every request
// 	return { paths, fallback: 'blocking' };
// }
