import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth, useForm } from '../hooks';
type LoginFormData = {
	email: string;
	password: string;
};

export const LoginPage = () => {
	const { error, handleLogin, clearError } = useAuth();
	const { formState, onInputChange, email, password, onResetForm } =
		useForm<LoginFormData>({
			email: '',
			password: '',
		});
	useEffect(() => {
		clearError();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formState]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleLogin(email, password);
		onResetForm();
	};
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded shadow-md w-80'>
				<h2 className='text-2xl font-bold mb-4'>Iniciar sesión</h2>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col justify-center align-center'
				>
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

					<div className='mb-4'>
						<NavLink
							to='/reset-password'
							className='text-blue-500 hover:underline text-sm'
						>
							¿Olvidaste tu contraseña?
						</NavLink>
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
						Iniciar sesión
					</button>
				</form>
			</div>
		</div>
	);
};
