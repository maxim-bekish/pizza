import { Header, Container } from '@/shared/components/shared';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Pizza | Корзина',
	description: 'Вкуснее уже некуда',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='min-h-screen bg-[#f4f1ee]'>
			<Container>
				<Header hasSearch={false} hasCart={false} className='border-b-gray-200' />
				{children}
			</Container>
		</main>
	);
}
