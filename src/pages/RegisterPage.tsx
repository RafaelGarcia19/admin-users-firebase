import { useEffect } from 'react';
import { useAuth, useForm } from '../hooks';
type LoginFormData = {
	name: string;
	email: string;
	password: string;
};

export const RegisterPage = () => {
	const { formState, onInputChange, email, password, name, onResetForm } =
		useForm<LoginFormData>({
			name: '',
			email: '',
			password: '',
		});

	const { handleRegister, clearError, error } = useAuth();

	useEffect(() => {
		clearError();
	}, [clearError, formState]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleRegister(email, password, name);
		onResetForm();
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded shadow-md w-80'>
				<h2 className='text-2xl font-bold mb-4'>Registrarse</h2>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col justify-center align-center'
				>
					<div className='mb-4 flex flex-col justify-center align-center'>
						<label htmlFor='email' className='block text-gray-600'>
							Nombre
						</label>
						<input
							type='text'
							name='name'
							value={name}
							onInput={onInputChange}
							className='w-full p-2 border rounded'
							required
						/>
					</div>
					<div className='mb-4 flex flex-col justify-center align-center'>
						<label htmlFor='email' className='block text-gray-600'>
							Correo electrónico
						</label>
						<input
							type='email'
							name='email'
							value={email}
							onInput={onInputChange}
							className='w-full p-2 border rounded'
							required
						/>
					</div>
					<div className='mb-4 flex flex-col justify-center align-center'>
						<label htmlFor='password' className='block text-gray-600'>
							Contraseña
						</label>
						<input
							type='password'
							name='password'
							onChange={onInputChange}
							value={password}
							className='w-full p-2 border rounded'
							required
						/>
					</div>
					{error && (
						<div className='text-red-500 text-sm mb-4 flex flex-col justify-center align-center'>
							{error}
						</div>
					)}
					<button
						type='submit'
						className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300'
					>
						Registrarse
					</button>
				</form>
			</div>
		</div>
	);
};
