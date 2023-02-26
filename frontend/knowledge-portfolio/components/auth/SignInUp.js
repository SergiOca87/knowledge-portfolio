import { supabase } from '../../utils/supabaseClient';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import React from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

import { useSpring, animated } from '@react-spring/web';

const StyledCard = styled(Card)`
	padding: 4rem;
	max-width: 50rem;
	margin: 0 auto !important;
	// -webkit-box-shadow: 62px 66px 138px -53px rgba(132, 169, 140, 0.75);
	// -moz-box-shadow: 62px 66px 138px -53px rgba(132, 169, 140, 0.75);
	// box-shadow: 62px 66px 138px -53px rgba(132, 169, 140, 0.75);

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

export default function SignInUp({ serverUser, session }) {
	const springs = useSpring({
		from: { y: 50, opacity: 0 },
		to: { y: 0, opacity: 1 },
		delay: 300,
		duration: 1000,
	});

	const App = () => (
		<animated.div style={{ ...springs }}>
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
		</animated.div>
	);

	return <App />;
}
