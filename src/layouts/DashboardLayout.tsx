import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Navbar } from '../components';

const secctionsLinks = [
	{ label: 'Ver usuarios', to: '/dashboard/' },
	{ label: 'Agregar usuario', to: '/dashboard/add-user' },
];

export const DashboardLayout = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	return (
		<>
			<Navbar />
			<div className='container mx-auto bg-gray-100 min-h-screen'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-2 p-4'>
					{showSidebar && (
						<div className='md:col-span-1 bg-white  p-4 shadow-md'>
							<h2 className='text-lg font-semibold mb-4 text-gray-600'>
								Navegacion
							</h2>
							<ul>
								{secctionsLinks.map((link) => (
									<li key={link.to}>
										<NavLink
											to={link.to}
											className={({ isActive }) => {
												return `hover:text-gray-400 ${
													isActive ? 'text-gray-600' : 'text-gray-800'
												}  `;
											}}
										>
											{link.label}
										</NavLink>
									</li>
								))}
							</ul>
						</div>
					)}

					<div className='md:col-span-3 bg-white p-4 shadow-md'>
						<button onClick={toggleSidebar} className='md:hidden'>
							{showSidebar ? 'Ocultar Navegacion' : 'Mostrar Navegacion'}
						</button>
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
};
