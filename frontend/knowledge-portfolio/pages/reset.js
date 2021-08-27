import React from 'react';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';
import { useRouter } from 'next/router';

export default function ResetPage() {
	const router = useRouter();
	const token = router.query.token;

	if (!token) {
		return (
			<div>
				<p>Sorry, you must supply a reset token</p>
				<RequestReset />
			</div>
		);
	} else {
		return (
			<div>
				<p>Reset your Password</p>
				<Reset token={token} />
			</div>
		);
	}
}
