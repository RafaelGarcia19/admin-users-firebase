import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components';
import { HomePage, LoginPage, RegisterPage, Dashboard } from '../pages';
import { PrivateRouter } from './PrivateRouter';
import { ProtectedRouter } from './ProtectedRouter';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<HomePage />} />
					<Route
						path='login'
						element={
							<ProtectedRouter>
								<LoginPage />
							</ProtectedRouter>
						}
					/>
					<Route path='register' element={<RegisterPage />} />
					<Route
						path='dashboard'
						element={
							<PrivateRouter>
								<Dashboard />
							</PrivateRouter>
						}
					/>
				</Route>
			</Routes>
		</>
	);
};
