import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { CartStateItem } from './get-cart-details';

/**
 * Given the ingredients, pizzaType and pizzaSize of a cart item,
 * returns a string describing the item details, e.g. "Тонкое 30 см,
 * Грибы,  салат".
 */
export const getCartItemDetails = (
	ingredients: CartStateItem['ingredients'],
	pizzaType?: PizzaType,
	pizzaSize?: PizzaSize
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
