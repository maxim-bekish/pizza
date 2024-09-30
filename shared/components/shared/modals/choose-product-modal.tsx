'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm, ChooseProductForm } from '../';

interface Props {
	product: ProductWithRelations;
	className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const isPizzaForm = Boolean(product.items[0].pizzaType);

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
      aria-describedby="dialog-description"
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
					/>
				) : (
					<ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
				)}
			</DialogContent>
		</Dialog>
	);
};
