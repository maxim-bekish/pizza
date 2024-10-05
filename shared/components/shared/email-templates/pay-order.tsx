interface Props {
	orderId: number;
	totalAmount: number;
	paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => (
	<div>
		<h1>Заказ #{orderId}</h1>

		<p>
			Оплатите заказ на суму <b>{totalAmount} ₽</b>. <br />
			Перейдите по <a href={paymentUrl}> по этой ссылке</a> для оплаты заказа.
		</p>
	</div>
);
