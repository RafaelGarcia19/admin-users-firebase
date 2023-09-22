import { useNavigate } from 'react-router-dom';
import { useAuth, useForm } from '../hooks';

export const AddUser = () => {
	const { handleAddUser, error } = useAuth();
	const navigate = useNavigate();

	const { formState, onInputChange, onResetForm } = useForm({
		name: '',
		email: '',
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await handleAddUser(formState);
		onResetForm();
		if (!error) navigate('/dashboard');
	};

	const { name, email } = formState;

	return (
		<div className='flex justify-center items-center h-full'>
			<div className='bg-white p-4 rounded-lg shadow-lg w-full'>
				<h2 className='text-2xl font-bold mb-4'>Agregar Nuevo Usuario</h2>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label className='block text-gray-600 font-bold'>Nombre</label>
						<input
							type='text'
							name='name'
							value={name}
							onChange={onInputChange}
							className='w-full border rounded-md p-2'
							required
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
							required
						/>
					</div>
					{error && <div className='text-red-500'>{error}</div>}
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
								// Agrega la lógica para cancelar la creación o redirigir según tus necesidades
								navigate('/dashboard');
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
