import React from 'react';
import QRCode from 'qrcode.react';
import Main from '../../components/Main';
import { Container, Modal } from 'react-bootstrap';
import router, { useRouter } from 'next/router';
import Link from 'next/link';

//TODO: Change URL to the public portfolio

export default function UserQR() {
	const router = useRouter();

	console.log(router.query);
	return (
		<Main>
			<Container>
				<p>
					This QR Code will lead users to your{' '}
					<Link href="/">public portfolio</Link> page:
				</p>
				<QRCode value="http://facebook.github.io/react/" />
			</Container>
		</Main>
	);
}
