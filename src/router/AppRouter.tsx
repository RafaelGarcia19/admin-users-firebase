import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../components';
import {
	HomePage,
	LoginPage,
	RegisterPage,
	Dashboard,
	ResetPassword,
} from '../pages';
import { PrivateGuard, ProtectedGuard } from './guards';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<HomePage />} />
					<Route
						path='login'
						element={
							<ProtectedGuard>
								<LoginPage />
							</ProtectedGuard>
						}
					/>
					<Route
						path='register'
						element={
							<ProtectedGuard>
								<RegisterPage />
							</ProtectedGuard>
						}
					/>
					<Route
						path='reset-password'
						element={
							<ProtectedGuard>
								<ResetPassword />
							</ProtectedGuard>
						}
					/>
					<Route
						path='dashboard'
						element={
							<PrivateGuard>
								<Dashboard />
							</PrivateGuard>
						}
					/>
				</Route>
			</Routes>
		</>
	);
};
