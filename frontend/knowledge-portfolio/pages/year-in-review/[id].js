import { Container } from 'react-bootstrap';
import NotLoggedIn from '../../components/auth/NotLoggedIn';
import Main from '../../components/layout/Main';
import { supabase } from '../../utils/supabaseClient';
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import * as FontAwesome from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { useUser } from '@supabase/auth-helpers-react';

// TODO: What about uncategorized items? Maybe that should be returned at the end on its own list?

function YearInReview({ items, categories }) {
	const user = useUser();

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
		// Flatten, remove duplicates and return as an array
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

		// Return an Array
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

	const renderYearBasedList = () => {
		return yearsInUserPortfolio.map((year) => (
			<div>
				<h2>{year}</h2>
				<ul>
					{listCategoriesByYear(items).map((categoryId) => {
						let IconName = '';

						const categoryIcon = categories.find(
							(categoryObj) => categoryObj.id === categoryId
						).icon;

						if (categoryIcon) {
							IconName = FontAwesome[categoryIcon];
						}

						return (
							<VerticalTimelineElement
								contentStyle={{
									background: 'var(--black)',
									color: '#fff',
								}}
								contentArrowStyle={{
									borderRight: '7px solid  var(--primary)',
								}}
								// date={year}
								// iconStyle={{ background: experience.iconBg }}
								//TODO How to add <IconName/> here...
								icon={
									<svg
										stroke="currentColor"
										fill="currentColor"
										stroke-width="0"
										viewBox="0 0 448 512"
										height="1em"
										width="1em"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path>
									</svg>
								}
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
				</ul>
			</div>
		));
	};

	return (
		<Main>
			<Container>
				{user ? renderYearBasedList() : <NotLoggedIn />}
				{user && !items && (
					<h2>PLease add some items to your portfolio first</h2>
				)}
			</Container>
		</Main>
	);
}

export default YearInReview;

// TODO: Maybe the right approach is to use serverSideProps (I tihnk it is most likely), identify the user who is making the request via a supabase function like getUser
//TODO: This is now repeated so it would make sense to put it in a utils folder(portfolioid)
export async function getServerSideProps(context) {
	// Get params from URL
	const { params } = context;

	// Get User ID
	const userId = params.id;

	// Fetch items related to that ID (foreign key relationship)
	let { data: items } = await supabase
		.from('items')
		.select('*')
		.eq('userId', userId);

	// Fetch User categories
	let { data: categories } = await supabase
		.from('categories')
		.select('*')
		.eq('userId', userId);

	//TODO Revalidated or use getServerSideProps? To check on each refresh
	return {
		props: {
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
