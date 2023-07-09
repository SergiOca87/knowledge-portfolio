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
	// -webkit-box-shadow: 62px 66px 138px -53px rgba(132, 169, 140, 0.75);
	// -moz-box-shadow: 62px 66px 138px -53px rgba(132, 169, 140, 0.75);
	// box-shadow: 62px 66px 138px -53px rgba(132, 169, 140, 0.75);

	button[type='submit'] {
		max-width: 16rem;
		margin: 0 auto;
		color: var(--black);
		padding: 1.8rem 3rem;
		border-radius: 30px;
		font-family: 'KumbhSans-Regular';;
		text-transform: uppercase;
		font-size: 1.4rem;
		border: 2px solid var(--primary);

		&:hover {
			background-color: transparent;
			color: var(--primary);
		}
	}

	label {
		text-transform: uppercase;
	}

	input {
		height: 5rem !important;

		&[type='email'],
		&[type='password'] {
			margin-bottom: 1.5rem !important;
		}
	}
`;

//TODO: Change styles: https://supabase.com/docs/guides/auth/auth-helpers/auth-ui

export default function SignInUp({ serverUser, session }) {
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
								defaultButtonBackground: 'var(--black)',
								defaultButtonBackgroundHover: 'transparent',
								defaultButtonBorder: 'var(--primary)',
								defaultButtonText: 'var(--text-color)',
								inputBorder: 'var(--primary)',
								inputText: '#fff',
								dividerBackground: 'var(--primary)',
								inputLabelText: 'var(--secondary)',
								labelBottomMargin: '10px',
							},
							fontSizes: {
								baseBodySize: '13px',
								baseInputSize: '16px',
								baseLabelSize: '14px',
								baseButtonSize: '14px',
							},
							// fonts: {
							// 	bodyFontFamily: `Montserrat-Regular`,
							// 	buttonFontFamily: `Montserrat-Regular`,
							// 	inputFontFamily: `Montserrat-Regular`,
							// 	labelFontFamily: 'KumbhSans-Regular',
							// },
						},
					},
				}}
				// theme="dark"
				providers={['google', 'github']}
			/>
		</StyledCard>
	);

	return <App />;
}
