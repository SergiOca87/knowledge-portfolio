import React, { useEffect } from 'react';
import Link from 'next/link';
import { useUser } from './User';

export default function Nav() {
	const user = useUser();

	console.log('user', user);
	return (
		<nav>
			{user && (
				<>
					<Link href="/">Create Item</Link>
					<Link href="/">Dashboard</Link>
				</>
			)}
			{!user && <Link href="/">Sign In</Link>}
		</nav>
	);
}
