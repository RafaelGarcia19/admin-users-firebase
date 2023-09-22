import { NavLink } from 'react-router-dom';
export const NotFound = () => {
	return (
		<div className='container mx-auto p-4 bg-gray-100 min-h-screen'>
			<h1 className='text-3xl font-semibold text-center mb-4'>
				404 - Página no encontrada
			</h1>
			<p className='text-lg text-center'>
				¡La página que estás buscando no existe!
			</p>
			<div className='text-center mt-4'>
				<NavLink to='/' className='text-blue-500 hover:underline'>
					Volver a la página de inicio
				</NavLink>
			</div>
		</div>
	);
};
