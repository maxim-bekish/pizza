import { Controller, useFormContext } from 'react-hook-form';
import { WhiteBlock, AddressInput, ErrorText } from '../';
import { FormTextarea, FormInput } from '../form';

interface Props {
	className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext();

	return (
		<WhiteBlock title='3. Адрес доставки' className={className}>
			<div className='flex flex-col gap-5'>
				<Controller
					control={control}
					name='address'
					render={({ field, fieldState }) => (
						<div className='search-custom-input'>
							<AddressInput onChange={field.onChange} />
							{fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
						</div>
					)}
				/>
				<FormTextarea name='comment' className='text-base' placeholder='Комментария к заказу' />
			</div>
		</WhiteBlock>
	);
};
