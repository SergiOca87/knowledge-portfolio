import React from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import Link from 'next/link';

const StyledGrid = styled.div`
	display: flex;
	gap: 2rem;
`;

export default function login() {
	return (
		<div className="container">
			<StyledGrid>
				<div>
					<h2>Sign In</h2>
					<SignIn />
					<p>
						<Link href="/forgot-password">
							Forgot your password?
						</Link>
					</p>
				</div>

				<div>
					<h2>Register</h2>
					<SignUp />
				</div>
			</StyledGrid>

			{/* <RequestReset /> */}
		</div>
	);
}
