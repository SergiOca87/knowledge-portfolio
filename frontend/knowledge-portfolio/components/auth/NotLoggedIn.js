import React from 'react';
import Link from 'next/link';

export default function NotLoggedIn() {
	return (
		<h2>
			You have to log in to see this content,
			<br />
			You can log in or register <Link href="/login">here</Link>
		</h2>
	);
}
