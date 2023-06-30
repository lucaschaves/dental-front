const Real = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
});

interface IFormatCurrency {
    price: number;
    discount?: number;
}

export const formatCurrency = (props: IFormatCurrency) => {
    const { price, discount } = props;

    if (discount) {
        const percentageDiscount = discount / 100;
        const discountPrice = price * percentageDiscount;
        return Real.format(price - discountPrice);
    }
    return Real.format(price);
};
