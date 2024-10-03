'use client';

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { CartDrawerItem, Title } from './';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
	const [items, totalAmount, fetchCartItems, updateItemQuantity, removeCartItem] = useCartStore(
		state => [
			state.items,
			state.totalAmount,
			state.fetchCartItems,
			state.updateItemQuantity,
			state.removeCartItem,
		]
	);

	useEffect(() => {
		fetchCartItems();
	}, []);

	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className='flex flex-col justify-between pb-0 bg-[#f4f1ee]'>
				<div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
					{totalAmount > 0 && (
						<>
							<SheetHeader>
								<SheetTitle>
									В корзине <span className='font-bold'>{items.length} товара </span>
								</SheetTitle>
							</SheetHeader>
							<div className='-mx-6 mt-5 overflow-auto  flex-1'>
								{items.map(item => (
									<div key={item.id} className='mb-2'>
										<CartDrawerItem
											id={item.id}
											imageUrl={item.imageUrl}
											details={
												item.pizzaSize && item.pizzaType
													? getCartItemDetails(
															item.ingredients,
															item.pizzaType as PizzaType,
															item.pizzaSize as PizzaSize
													  )
													: ''
											}
											disabled={item.disabled}
											name={item.name}
											price={item.price}
											quantity={item.quantity}
											onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
											onClickRemove={() => removeCartItem(item.id)}
										/>
									</div>
								))}
							</div>
							<SheetFooter className='-mx-6 bg-white p-8'>
								<div className='w-full'>
									<div className='flex  mb-4'>
										<span className='flex flex-1 text-lg text-neutral-500'>
											Итог
											<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
										</span>
										<span className='text-lg font-bold'>{totalAmount} ₽</span>
									</div>
									<Link href='/cart'>
										<Button type='submit' className='w-full h-12 text-base'>
											Офромить заказ
											<ArrowRight className='w-5 ml-2' />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}

					{!totalAmount && (
						<div className='flex flex-col items-center justify-center w-72 mx-auto'>
							<Image src='/assets/images/empty-box.png' width={120} height={120} alt='Empty cart' />
							<Title size='sm' text='Корзина пустая' className='text-center font-bolt my-2' />
							<p className='text-center text-neutral-500 mb-5'>
								Добавить товар в корзину и он появится здесь
							</p>

							<SheetClose>
								<Button size='lg' className='w-56 h-12 text-base'>
									<ArrowLeft className='w-5 mr-2' />
									Вернуться назад
								</Button>
							</SheetClose>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
