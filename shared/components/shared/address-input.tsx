'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
	onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			inputProps={{
				placeholder: 'Введите адрес доставки',
				className:
					'h-12 w-full border border-input rounded-lg outline-none py-2 px-3   placeholder:text-muted-foreground',
			}}
			highlightClassName='bg-black font-extrabold'
			minChars={2}
			token='3e73aea0f8e4893cb762750ad7e7aba08f5015f5'
			onChange={data => onChange?.(data?.value)}
		/>
	);
};
