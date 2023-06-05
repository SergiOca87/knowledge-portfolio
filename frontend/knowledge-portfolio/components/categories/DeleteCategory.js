import * as FontAwesome from 'react-icons/fa';
import { toast } from 'react-toastify';

function DeleteCategory({ categoryId }) {
	const deleteCategoryHandler = (id) => {
		const confirm = window.confirm('Are You Sure?');

		if (confirm) {
			try {
				fetch('/api/deleteCategory', {
					method: 'DELETE',
					body: JSON.stringify(id),
					headers: {
						'Content-Type': 'application-json',
					},
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.statusCode == 200) {
							toast.success(data.message);

							//TODO: Hide the category, maybe using refs?
						}
					});
			} catch (err) {
				toast.error(err);
			}
		}
	};

	return (
		<span
			className="delete-category"
			onClick={() => deleteCategoryHandler(categoryId)}
		>
			<FontAwesome.FaWindowClose />
		</span>
	);
}

export default DeleteCategory;
