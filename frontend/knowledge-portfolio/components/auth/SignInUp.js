import { supabase } from '../../utils/supabaseClient';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import React from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCard = styled(Card)`
	padding: 4rem;
	max-width: 50rem;
	margin: 0 auto !important;

	button[type='submit'] {
		max-width: 16rem;
		margin: 0 auto;
		color: var(--black);
		padding: 1.8rem 3rem;
		border-radius: 30px;
		font-family: 'Montserrat-Bold';
		text-transform: uppercase;
		font-size: 1.4rem;
		border: 2px solid var(--primary);

		&:hover {
			background-color: transparent;
			color: var(--primary);
		}
	}
`;

//TODO: Change styles: https://supabase.com/docs/guides/auth/auth-helpers/auth-ui

export default function SignInUp() {
	const App = () => (
		<StyledCard>
			<Auth
				supabaseClient={supabase}
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: 'var(--primary)',
								brandAccent: 'none',
							},
						},
					},
				}}
				theme="dark"
				providers={['google', 'github']}
			/>
		</StyledCard>
	);

	return <App />;
}
