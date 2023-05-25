import { useEffect, useState } from 'react';
import { useUserState } from '../../context/userContext';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button, Form } from 'react-bootstrap';
import { supabase } from '../../utils/supabaseClient';

function updateUser() {
	const user = useUser();
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	// If there is a logged in user, set the e-mail
	useEffect(() => {
		if (user) {
			setInputs({ email: user.username, password: '' });
		}
	}, [user]);

	const handleChange = (e) => {
		let { value, name, selectedOptions } = e.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const handleSubmit = async () => {

		//TODO: API
		try {
			const { data, error } = await supabase.auth.updateUser(inputs);
			if (error) {
				throw error;
			}
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<FloatingLabel controlId="floatingInput" label="Email">
					<Form.Control
						type="email"
						name="email"
						onChange={handleChange}
						value={inputs.email}
						placeholder="Update your e-mail"
					/>
				</FloatingLabel>
				<FloatingLabel controlId="floatingInput" label="Password">
					<Form.Control
						type="password"
						name="password"
						onChange={handleChange}
						value={inputs.password}
						placeholder="Update your password"
					/>
				</FloatingLabel>
				<Button
					onClick={handleSubmit}
					value="submit"
					variant="primary"
					id="main-submit"
				>
					Update
				</Button>
			</form>
		</>
	);
}

export default updateUser;
