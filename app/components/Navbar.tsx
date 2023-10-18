'use client';

import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const Navbar = () => {
	const currentPath = usePathname();

	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	];

	return (
		<nav className='flex items-center h-14 border-b space-x-6 mb-5 px-5'>
			<Link href='/'>
				<AiFillBug />
			</Link>
			<ul className='flex space-x-6'>
				{links.map((link) => (
					<Link
						className={classNames({
							'text-zinc-900': link.href === currentPath,
							'text-zinc-500': link.href !== currentPath,
							'hover:text-zinc-800 transition-all': true
						})}
						key={link.href}
						href={link.href}
					>
						{link.label}
					</Link>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
