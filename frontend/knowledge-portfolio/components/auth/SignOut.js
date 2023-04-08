import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function SignOut() {
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			fetch('/api/logout', {
				method: 'GET',
				headers: {
					'Content-Type': 'application.json',
				},
			})
				.then((response) => response.json())
				.then((data) =>
					data.status === 200
						? router.reload(window.location.pathname)
						: null
				);
		} catch (err) {
			toast.error(err);
		}
	};

	return (
		<Button variant="primary" type="button" onClick={handleSignOut}>
			Sign Out
		</Button>
	);
}
