import React, { useEffect } from 'react';
import Link from 'next/link';
import { useUser } from './User';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import SignOut from './SignOut';

export default function Nav() {
	const user = useUser();

	return (
		<nav>
			{user && (
				<>
					<Link href="/">Create Item</Link>
					<Link href="/">Dashboard</Link>
					<SignOut />
				</>
			)}
			{!user && <Link href="/">Sign In</Link>}
		</nav>
	);
}
