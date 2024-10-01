import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { Ingredient } from '@prisma/client';

export const getCartItemDetails = (
	pizzaType: PizzaType,
	pizzaSize: PizzaSize,
	ingredients: Ingredient[]
) => {
	const details = [];
	if (pizzaType && pizzaType) {
		const typeName = mapPizzaType[pizzaType];
		details.push(`${typeName}  ${pizzaSize} см`);
	}
	if (ingredients) {
		details.push(...ingredients.map(ingredient => ingredient.name));
	}
	return details.join(', ');
};
