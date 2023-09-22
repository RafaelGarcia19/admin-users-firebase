import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout, NavbarLayout } from '../layouts';
import {
	HomePage,
	LoginPage,
	RegisterPage,
	ResetPassword,
	ViewUsers,
} from '../pages';
import { NotFound } from '../pages/NotFound';
import { PrivateGuard, ProtectedGuard } from './guards';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<NavbarLayout />}>
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
				</Route>
				<Route
					path='/dashboard/*'
					element={
						<PrivateGuard>
							<DashboardLayout />
						</PrivateGuard>
					}
				>
					<Route index element={<ViewUsers />} />
					<Route path='add-user' element={<div>Add User</div>} />
					<Route path='edit-user' element={<div>Edit User</div>} />
					<Route path='delete-user' element={<div>Delete User</div>} />
					<Route path='*' element={<Navigate to='/dashboard/' />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	);
};
