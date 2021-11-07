import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Link from 'next/link';
import UserContext from '../context/UserContext';
import gql from 'graphql-tag';
import { createHttpLink, useMutation } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CREATE_MESSAGE_MUTATION = gql`
	mutation CREATE_MESSAGE_MUTATION(
		$text: String!
		$sender: ID!
		$receiver: ID!
	) {
		createMessage(
			data: {
				text: $text
				sender: { connect: { id: $sender } }
				receiver: { connect: { id: $receiver } }
			}
		) {
			id
		}
	}
`;

export default function MessageModal({
	showMessageModal,
	setShowMessageModal,
	receiverId,
	senderId,
}) {
	const { user } = useContext(UserContext);

	const [inputs, setInputs] = useState({
		text: '',
		sender: '',
		receiver: '',
	});

	useEffect(() => {
		setInputs({
			text: '',
			sender: senderId,
			receiver: receiverId,
		});
	}, [senderId, receiverId]);

	const [createMessage, { loading, error, data }] = useMutation(
		CREATE_MESSAGE_MUTATION,
		{
			variables: inputs,
		}
	);

	const handleChange = (e) => {
		setInputs({
			...inputs,
			text: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (error) {
			toast.error(error);
		} else {
			const res = await createMessage();

			res?.data?.createMessage && toast.success('Message has been sent!');

			// Clear form on submit
			setInputs({
				...inputs,
				text: '',
			});

			setShowMessageModal(false);
		}
	};

	const handleClose = () => {
		setShowMessageModal(false);
	};

	return (
		<Modal
			show={showMessageModal}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Send Message</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<fieldset
					disabled={!showMessageModal}
					aria-busy={!showMessageModal}
				>
					<div className="input-wrap text">
						<label htmlFor="message">
							<span>Message</span>
							<textarea
								type="text"
								name="message"
								value={inputs.text}
								onChange={handleChange}
							/>
						</label>
					</div>
					<Button onClick={handleSubmit}>Send</Button>
				</fieldset>
			</Modal.Body>
		</Modal>
	);
}
