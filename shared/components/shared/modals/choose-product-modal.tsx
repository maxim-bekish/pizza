'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm, ChooseProductForm } from '../';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstItem = product.items[0];
	const isPizzaForm = Boolean(firstItem.pizzaType);
	const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading]);


	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id;

			await addCartItem({
				productItemId: itemId,
				ingredients,
			});

			toast.success(`${product.name} добавлена в корзину`);
			router.back();
		} catch (error) {
			toast.error('Не удалось добавить товар в корзину');
			console.log(error);
		}
	};

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				aria-describedby='dialog-description'
				className={cn('p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
				<VisuallyHidden>
					<DialogTitle>Выбор продукта</DialogTitle>
				</VisuallyHidden>
				{isPizzaForm ? (
					<ChoosePizzaForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						items={product.items}
						onSubmit={onSubmit}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						onSubmit={onSubmit}
						price={firstItem.price}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
