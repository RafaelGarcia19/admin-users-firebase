import { useNavigate, useParams } from 'react-router-dom';
import { useAuth, useForm } from '../hooks';
import { useEffect, useCallback, useState } from 'react';

type User = {
	uid: string;
	name: string;
	email: string;
};

export const EditUser = () => {
	const { userid = '' } = useParams<{ userid?: string }>();
	const { getUser, handleEditUser } = useAuth();
	const navigator = useNavigate();
	const [isFormVisible, setIsFormVisible] = useState(false);

	const { name, email, onInputChange, setFormState, onResetForm } = useForm({
		uid: '',
		name: '',
		email: '',
	});

	const getUserData = useCallback(async () => {
		const userData = await getUser(userid);

		if (!userData) {
			navigator('/dashboard/');
		}
		setFormState(userData as User);
		setIsFormVisible(true);
	}, [userid]);

	useEffect(() => {
		getUserData();
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleEditUser(userid, name, email);
		onResetForm();
	};

	if (!isFormVisible) {
		return <div>Cargando...</div>;
	}
	return (
		<div className='flex justify-center items-center h-full'>
			<div className='bg-white p-4 rounded-lg shadow-lg w-full'>
				<h2 className='text-2xl font-bold mb-4'>Editar Usuario</h2>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label className='block text-gray-600 font-bold'>Nombre</label>
						<input
							type='text'
							name='name'
							value={name}
							onChange={onInputChange}
							className='w-full border rounded-md p-2'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-600 font-bold'>
							Correo Electrónico
						</label>
						<input
							type='email'
							name='email'
							value={email}
							onChange={onInputChange}
							className='w-full border rounded-md p-2'
						/>
					</div>
					<div className='flex justify-end'>
						<button
							type='submit'
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
						>
							Guardar
						</button>
						<button
							className='bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded'
							onClick={() => {
								// Agrega la lógica para cancelar la edición o redirigir según tus necesidades
							}}
						>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
