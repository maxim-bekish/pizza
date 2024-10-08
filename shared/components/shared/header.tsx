'use client';

import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput, Container, CartButton, ProfileButton, AuthModal } from './';
import { useSearchParams,useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string;
}
export const Header: React.FC<Props> = ({ hasCart = true, hasSearch = true, className }) => {
	const router = useRouter();
	const [openAuthModal, setOpenAuthModal] = useState(false);

	const searchParams = useSearchParams();
	useEffect(() => {
		let toastMessage = '';

		if (searchParams.has('paid')) {
			toastMessage = 'Заказ оплачен! Информация отправлена на почту';
		}
		if (searchParams.has('verified')) {
			toastMessage = 'Почта успешно подтверждена';
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/');
				toast.success(toastMessage, {
					duration: 3000,
				});
			}, 1000);
		}
	}, []);

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
				<div className='flex items-center gap-3'>
					<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
