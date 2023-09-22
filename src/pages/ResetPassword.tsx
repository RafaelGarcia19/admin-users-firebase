import { useEffect } from 'react';
import { useAuth, useForm } from '../hooks';

type ResetFormData = {
	email: string;
};

export const ResetPassword = () => {
	const { error, handleResetPassword, clearError } = useAuth();
	const { formState, onInputChange, email, onResetForm } =
		useForm<ResetFormData>({
			email: '',
		});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleResetPassword(email);
		onResetForm();
	};

	useEffect(() => {
		clearError();
	}, [clearError, formState]);

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded shadow-md w-80'>
				<h2 className='text-2xl font-bold mb-4'>Restablecer contraseña</h2>
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
					{error}
					<button
						type='submit'
						className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300'
					>
						Restarblecer contraseña
					</button>
				</form>
			</div>
		</div>
	);
};
