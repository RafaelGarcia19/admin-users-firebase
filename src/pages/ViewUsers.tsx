import { useEffect, useState } from 'react';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';

type User = {
	uid: string;
	name: string;
	email: string;
};

export const ViewUsers = () => {
	const { getUsers, handleDeleteUser, error } = useAuth();
	const navigate = useNavigate();

	const [users, setUsers] = useState<User[]>([]);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
	const [userToDelete, setUserToDelete] = useState<User | null>(null); // Estado para almacenar el usuario que se va a eliminar
	const getUsersData = async () => {
		const usersData = await getUsers();
		setUsers(usersData);
	};
	useEffect(() => {
		getUsersData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleEdit = (user: User) => {
		navigate(`/dashboard/edit-user/${user.uid}`);
	};

	const handleDelete = (user: User) => {
		setUserToDelete(user);
		setIsDeleteModalOpen(true);
	};

	const confirmDelete = () => {
		if (userToDelete) {
			handleDeleteUser(userToDelete.uid);
			getUsersData();
		}
		setIsDeleteModalOpen(false);
		if (!error) navigate('/dashboard');
	};

	const cancelDelete = () => {
		setUserToDelete(null);
		setIsDeleteModalOpen(false);
	};

	return (
		<div className='flex justify-center items-center h-full flex-col'>
			<div className='overflow-x-auto'>
				<table className='min-w-full border-collapse table-auto'>
					<thead>
						<tr>
							<th className='px-4 py-2 bg-gray-800 text-white'>Nombre</th>
							<th className='px-4 py-2 bg-gray-800 text-white'>Email</th>
							<th className='px-4 py-2 bg-gray-800 text-white'>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.uid}>
								<td className='border px-4 py-2'>{user.name}</td>
								<td className='border px-4 py-2'>{user.email}</td>
								<td className='border px-4 py-2'>
									<button
										className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2'
										onClick={() => handleEdit(user)}
									>
										Editar
									</button>
									<button
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
										onClick={() => handleDelete(user)}
									>
										Eliminar
									</button>
									{/* Agrega más acciones según tus necesidades */}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{error && (
				<div className='text-red-500 text-sm mb-4 flex flex-col justify-center align-center'>
					{error}
				</div>
			)}
			{/* Modal de confirmación de eliminación */}
			{isDeleteModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50'>
					<div className='bg-white p-4 rounded-lg shadow-lg'>
						<p>¿Seguro que deseas eliminar a {userToDelete?.name}?</p>
						<div className='flex justify-end mt-4'>
							<button
								className='bg-red-500 text-white px-4 py-2 rounded mr-2'
								onClick={confirmDelete}
							>
								Eliminar
							</button>
							<button
								className='bg-gray-300 text-gray-700 px-4 py-2 rounded'
								onClick={cancelDelete}
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
