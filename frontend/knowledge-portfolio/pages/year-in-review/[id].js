import { Container } from 'react-bootstrap';
import NotLoggedIn from '../../components/auth/NotLoggedIn';
import Main from '../../components/layout/Main';
import { useUserState } from '../../context/userContext';
import { supabase } from '../../utils/supabaseClient';
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';

import 'react-vertical-timeline-component/style.min.css';

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

	//Return a list of categories present on a given year
	const listCategoriesByYear = (items, year) => {
		// Flatten, remove duplicates and return as an array
		const categoriesByYear = [
			...new Set(
				itemsByYear(items)
					.map((item) => item.categories)
					.filter((category) => category !== null && category.length)
					.flat()
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
	const listItemsByYearWithoutCategory = (items, year) => {
		console.log(items);
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
					{listCategoriesByYear(items, year).map((categoryId) => {
						return (
							<>
								<li>
									{
										categories.find(
											(categoryObj) =>
												categoryObj.id === categoryId
										).name
									}

									<ul>
										{listItemsByYearAndCategory(
											items,
											year,
											categoryId
										).map((item) => (
											<li>{item.title}</li>
										))}
									</ul>
								</li>
							</>
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
