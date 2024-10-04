import { cn } from '@/shared/lib/utils';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui';
import { SearchInput, Container, CartButton } from './';

interface Props {
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string;
}
export const Header: React.FC<Props> = ({ hasCart = true, hasSearch = true, className }) => {
	return (
		<header className={cn('border-b', className)}>
			<Container className='flex items-center justify-between py-8'>
				{/* левая часть */}
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image src='/logo.png' alt='logo' width={35} height={35} />
						<div>
							<h1 className='text-2xl uppercase font-black '>Max Pizza</h1>
							<p className='text-sm text-gray-400 leading-3'>вкуснее уже некуда</p>
						</div>
					</div>
				</Link>

				{/* Поиск часть */}

				{hasSearch && (
					<div className='mx-10 flex-1'>
						<SearchInput />
					</div>
				)}

				{/* Правая часть */}
				<div className='flex items-center gap-1'>
					<Button variant={'outline'} className='flex items-center gap-3'>
						<User size={16} />
						Войти
					</Button>
					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
