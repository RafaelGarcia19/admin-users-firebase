import { NavLink } from 'react-router-dom';
export const NavLinks: React.FC<{ links: { label: string; to: string }[] }> = ({
	links,
}) => (
	<ul className='flex space-x-4'>
		{links.map((link) => (
			<li key={link.to}>
				<NavLink to={link.to} className='text-white hover:text-blue-200'>
					{link.label}
				</NavLink>
			</li>
		))}
	</ul>
);
