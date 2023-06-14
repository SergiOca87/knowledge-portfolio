import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteItem({
	id,
	children,
	setHasBeenDeletedId,
	hasBeenDeletedId,
}) {
	const handleDelete = async (e) => {
		e.preventDefault();

		const confirm = window.confirm('Are You Sure?');

		if (confirm) {
			try {
				fetch('/api/deleteItem', {
					method: 'DELETE',
					body: JSON.stringify(id),
					headers: {
						'Content-Type': 'application.json',
					},
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.statusCode === 200) {
							toast.success(data.message);
							//TODO: Actually hide the item, maybe using ref?

							setHasBeenDeletedId(() => [
								...hasBeenDeletedId,
								id,
							]);
							return;
						}
					});
			} catch (err) {
				toast.error(err);
				console.log(err);
			}
		}
	};

	return <span onClick={handleDelete}>{children}</span>;
}
