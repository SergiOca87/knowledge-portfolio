import { Container } from 'react-bootstrap';
import NotLoggedIn from '../../components/auth/NotLoggedIn';
import Main from '../../components/layout/Main';
import { useUserState } from '../../context/userContext';
import { supabase } from '../../utils/supabaseClient';

function YearInReview({ items, categories }) {
	const { user } = useUserState();

	// Years present in the user items
	const yearsInUserPortfolio = [
		...new Set(
			items.map((item) => new Date(item.created_at).getFullYear())
		),
	];

	//GranParent list based on years
	const renderYearBasedList = () => {
		const yearsArray = Array.from(yearsInUserPortfolio);
		return yearsArray.map((year) => <h2>{year}</h2>);
	};

	// return (
	// 	<ul>
	// 		{items.filter(
	// 			<li>
	// 				{(item) =>
	// 					new Date(item.created_at).getFullYear() === year
	// 				}
	// 			</li>
	// 		)}
	// 	</ul>
	// );

	// console.log(RenderYearBasedList);

	//parent list inside of year based on categories

	//Child list of items inside of that category base don items

	//Iterate years set
	// for (const item of mySet1) {
	//     console.log(item);
	//   }

	return (
		<Main>
			<Container>
				{user ? renderYearBasedList() : <NotLoggedIn />}
			</Container>
		</Main>
	);
}

export default YearInReview;

// TODO: Maybe the right approach is to use serverSideProps (I tihnk it is most likely), identify the user who is making the request via a supabase function like getUser
//TODO: This is now repeated so it would make sense to put it in a utils folder(portfolioid)
export async function getStaticProps(context) {
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
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	// Get all users from supabase
	let { data, error } = await supabase.from('profiles').select('id');

	// Let Next.js know how many pages (user ids) are there
	const paths = data.map((userId) => ({
		params: {
			id: userId.id,
		},
	}));

	//TODO: If this errors we may need a "loading"
	//TODO: If this gets too slow, can switch to getserverSideProps to render on every request
	return { paths, fallback: 'blocking' };
}