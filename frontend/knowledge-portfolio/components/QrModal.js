import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Modal } from 'react-bootstrap';
import Link from 'next/link';

export default function QrModal({ showQrModal, setShowQrModal }) {
	const handleClose = () => {
		setShowQrModal(false);
	};

	return (
		<Modal
			show={showQrModal}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>QR Code</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					This QR Code will lead users to your{' '}
					<Link href="/">public portfolio</Link> page:
				</p>
				<QRCode value="http://facebook.github.io/react/" />
			</Modal.Body>
		</Modal>
	);
}
