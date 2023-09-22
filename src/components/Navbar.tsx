import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import { NavLinks, MobileNavLinks } from '.';
import { useAuth } from '../hooks';

export const Navbar: React.FC = () => {
	const [showMenu, setShowMenu] = useState(false);
	const { authState } = useContext(AuthContext);
	const { handleLogout } = useAuth();
	const { loggedIn, name } = authState;

	const navigate = useNavigate();
	const toggleMenu = () => {
		setShowMenu(!showMenu);
	};

	const links = [
		{ label: 'Inicio', to: '/' },
		{ label: 'Log in', to: '/login' },
		{ label: 'Registrarse', to: '/register' },
	];

	const handleLogoutButton = () => {
		handleLogout();
		navigate('/');
	};

	const authenticatedLinks = [{ label: 'Dashboard', to: '/dashboard' }];

	return (
		<nav className='bg-gray-800 p-4'>
			<div className='container mx-auto'>
				<div className='flex items-center justify-between'>
					<div className='text-white font-bold text-xl'>i-Strategies</div>

					<div className='lg:hidden'>
						<button
							onClick={toggleMenu}
							className='navbar-burger flex items-center text-white p-3 focus:outline-none'
						>
							<svg
								className='w-6 h-6'
								fill='none'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								{showMenu ? (
									<path
										fill='#fff'
										d='M12 21l-1.41-1.41L16.17 12H4v-1h12.17l-5.58-5.59L12 3l8 8-8 8z'
									/>
								) : (
									<path fill='#fff' d='M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' />
								)}
							</svg>
						</button>
					</div>

					<ul
						className={`hidden lg:flex space-x-4 ${showMenu ? 'hidden' : ''}`}
					>
						{loggedIn ? (
							<>
								<li>
									<div className='text-white'>{name}</div>
								</li>
								<NavLinks links={authenticatedLinks} />
								<li>
									<a
										onClick={handleLogoutButton}
										className='text-white hover:text-blue-200 cursor-pointer'
									>
										Logout
									</a>
								</li>
							</>
						) : (
							<NavLinks links={links} />
						)}
					</ul>
				</div>

				{showMenu && (
					<div className='lg:hidden'>
						<ul className='text-white'>
							<MobileNavLinks links={loggedIn ? authenticatedLinks : links} />
							{loggedIn && (
								<li>
									<a
										onClick={handleLogoutButton}
										className='text-white hover:text-blue-200 cursor-pointer'
									>
										Logout
									</a>
								</li>
							)}
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
};
