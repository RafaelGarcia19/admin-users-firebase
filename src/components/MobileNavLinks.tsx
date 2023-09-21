import { NavLink } from 'react-router-dom';

export const MobileNavLinks: React.FC<{
	links: { label: string; to: string }[];
}> = ({ links }) => (
	<div className='pt-4 space-y-2'>
		{links.map((link) => (
			<li key={link.to}>
				<NavLink to={link.to} className='text-white hover:text-blue-200'>
					{link.label}
				</NavLink>
			</li>
		))}
	</div>
);
