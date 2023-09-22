import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';

export const NavbarLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};
