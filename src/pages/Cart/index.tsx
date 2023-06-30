import { Counter, Footer, Header } from "@/components";
import { useCart } from "@/context";
import { formatCurrency } from "@/utils";
import { Button, IconButton } from "@material-tailwind/react";
import { FiTrash } from "react-icons/fi";

export function Cart() {
    const { products, total, getSumProducs } = useCart();

    const frete = 20.3;

    const makePayment = async () => {};

    console.log("products", products);

    const sumProducts = getSumProducs();

    return (
        <>
            <Header title="Carrinho" link="/" />
            <main className="max-w-[1200px] flex flex-col justify-center items-center w-full">
                <div className="p-2 flex flex-col relative w-full">
                    <div className="flex flex-col w-full shadow p-2">
                        <span>Produtos ({total})</span>
                        <div className="flex flex-col divide-y w-full gap-2">
                            {products.map((product, i) => (
                                <div
                                    key={product.id}
                                    className="flex flex-col w-full gap-2"
                                >
                                    <div className="flex w-full items-center justify-start gap-2">
                                        <img
                                            src={
                                                "https://cdn.dentalspeed.com/produtos/210/produto-luva-de-latex-procedimento-supermax.jpg"
                                            }
                                            alt="luva"
                                            width={50}
                                            height={50}
                                            className=""
                                        />
                                        <div className="flex flex-col">
                                            <span className="">
                                                {product.name}
                                            </span>
                                            <span className="text-blue-gray-500 text-sm">
                                                Tamanho: P
                                            </span>
                                            <span className="font-semibold">
                                                R${" "}
                                                {formatCurrency({
                                                    price: product.price,
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Counter
                                            value={product.quantity}
                                            max={2}
                                            handleValue={() => ({})}
                                        />
                                        <IconButton variant="text">
                                            <FiTrash />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sticky bottom-0 left-0 w-full shadow-inner flex flex-col gap-2 bg-white z-10 p-2">
                        <div className="w-full flex items-center justify-between">
                            <span className="text-sm">Produtos ({total})</span>
                            <span className="text-sm">
                                R$ {formatCurrency({ price: sumProducts })}
                            </span>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <span className="text-sm">Frete</span>
                            <span className="text-sm">
                                R$ {formatCurrency({ price: frete })}
                            </span>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <span className="text-sm font-semibold">Total</span>
                            <span className="text-sm font-semibold">
                                R${" "}
                                {formatCurrency({
                                    price: frete + sumProducts,
                                })}
                            </span>
                        </div>
                        <Button onClick={makePayment} color="deep-purple">
                            Fechar pedido
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
