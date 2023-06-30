import { ReactNode, createContext, useContext, useState } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    stock: number;
}

type CartContextData = {
    total: number;
    products: Array<Product>;
    addProduct: (product: Product) => void;
    removeProduct: (product: Product) => void;
    getSumProducs: () => number;
};

const CartContext = createContext<CartContextData>({} as CartContextData);

type Props = {
    children: ReactNode;
};

export function CartProvider({ children }: Props) {
    const [products, setProducts] = useState<Product[]>([]);

    function addProduct(prod: Product) {
        setProducts((prev) => [...prev, prod]);
    }

    function removeProduct(prod: Product) {
        setProducts((prev) => prev.filter((p) => p.id !== prod.id));
    }

    function getSumProducs() {
        let totalPrice = 0;
        products.forEach((prod) => {
            totalPrice += prod.price * prod.quantity;
        });
        console.log("get", products);
        console.log("totalPrice", totalPrice);
        return totalPrice;
    }

    return (
        <CartContext.Provider
            value={{
                addProduct,
                removeProduct,
                products,
                total: products.length,
                getSumProducs,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
