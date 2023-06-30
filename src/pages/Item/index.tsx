import { Counter, Footer, Header } from "@/components";
import { useCart } from "@/context";
import { getApi } from "@/services";
import { formatCurrency, getDeviceType, joinClassName } from "@/utils";
import { Button, Chip, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AiOutlineBarcode } from "react-icons/ai";
import { FiCheck, FiStar, FiTruck } from "react-icons/fi";
import { MdOutlineBlock, MdOutlinePix } from "react-icons/md";
import { RiMastercardFill, RiVisaLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";

interface IImage {
    src: string;
    alt: string;
    index: number;
}

interface IProduct {
    id: string;
    title: string;
    idBrand: string;
    subtitle: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    idSubgroup: string;
    size: string[];
    details: string[];
    images: IImage[];
}

export function Item() {
    const { id } = useParams();

    const [amount, setAmount] = useState(0);
    const [product, setProduct] = useState<IProduct>({} as IProduct);
    const [imgActive, setImgActive] = useState({} as IImage);

    const { addProduct } = useCart();

    function handleAdd() {
        addProduct({
            id: product.id,
            name: product.title,
            price: product.price,
            description: product.description,
            quantity: amount,
            stock: product.stock,
        });
    }

    async function getItem() {
        const { success, data } = await getApi({
            url: `/product/${id}`,
        });
        if (success) {
            setProduct(data);
            setImgActive(data.images[0]);
            if (data.stock > 0) {
                setAmount(1);
            } else {
                setAmount(0);
            }
        }
    }

    useEffect(() => {
        getItem();
    }, []);

    if (!Object.keys(product).length) {
        return <div>Loading</div>;
    }

    return (
        <>
            <Header title="Luva de latex" link="/item" />
            <main className="max-w-[1200px] flex flex-col justify-center items-center w-full">
                <div className="flex flex-col w-full lg:flex-row">
                    <div className="flex w-full flex-col gap-2">
                        <div className="flex items-start justify-start p-1 w-full">
                            <div
                                className={joinClassName(
                                    "flex flex-col items-start justify-start gap-3 p-1 overflow-y-auto",
                                    "h-52",
                                    "w-16",
                                    "md:h-96",
                                    "md:w-28",
                                    "lg:h-[500px]"
                                )}
                            >
                                {product.images.map((v, i) => (
                                    <img
                                        key={i}
                                        className={joinClassName(
                                            "object-contain",
                                            "w-full",
                                            "h-full",
                                            "rounded-md",
                                            imgActive.index === i
                                                ? "border border-blue-500 "
                                                : ""
                                        )}
                                        onClick={() => setImgActive(v)}
                                        {...v}
                                    />
                                ))}
                            </div>
                            <div
                                className={joinClassName(
                                    "w-full flex items-center justify-center",
                                    "h-52",
                                    "md:h-96",
                                    "lg:h-[500px]"
                                )}
                            >
                                <img
                                    {...imgActive}
                                    className="object-contain w-full h-full rounded"
                                />
                            </div>
                        </div>
                        <div className="hidden lg:flex gap-2">
                            <div className="w-48 h-56 rounded border-2 p-2 overflow-hidden">
                                Item de anuncio
                            </div>
                            <div className="w-48 h-56 rounded border-2 p-2 overflow-hidden">
                                Item de anuncio
                            </div>
                            <div className="w-48 h-56 rounded border-2 p-2 overflow-hidden">
                                Item de anuncio
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 rounded-2xl p-2 bg-white shadow-inner w-full lg:max-w-lg">
                        <div
                            className={joinClassName(
                                "flex flex-col gap-2 md:gap-5"
                            )}
                        >
                            <span className="font-semibold md:text-2xl">
                                {product.title}
                            </span>
                            <span className="text-blue-gray-600 text-xs lg:text-sm line-clamp-4 lg:line-clamp-5">
                                {product.idBrand}
                            </span>
                            <div className="flex gap-1 items-center justify-between">
                                <div className="flex gap-2 items-center">
                                    <span className="text-xs lg:text-sm">
                                        R$
                                    </span>
                                    <span className="font-semibold text-2xl">
                                        {formatCurrency({
                                            price: product.price,
                                            discount: product.discount,
                                        })}
                                    </span>
                                    <span className="text-xs line-through text-blue-gray-400 lg:text-base">
                                        R${" "}
                                        {formatCurrency({
                                            price: product.price,
                                        })}
                                    </span>
                                </div>
                                <Chip
                                    value={`${product.discount}%`}
                                    color="green"
                                />
                            </div>
                            <div className="flex gap-2 items-start justify-between lg:flex-col">
                                <span className="text-blue-gray-600 text-xs lg:text-sm line-clamp-4 lg:line-clamp-5">
                                    {product.description}
                                </span>

                                <Chip
                                    size={
                                        getDeviceType() === "mobile"
                                            ? "sm"
                                            : "md"
                                    }
                                    variant="outlined"
                                    value={
                                        getDeviceType() === "mobile"
                                            ? "4.7"
                                            : "4.7 (89) avaliações"
                                    }
                                    color="blue-gray"
                                    icon={
                                        <FiStar className="fill-blue-gray-500 stroke-none" />
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xs lg:text-sm">
                                Tipo da compra
                            </span>
                            <div className="flex gap-2">
                                <Chip
                                    value="Normal"
                                    // variant="outlined"
                                    size={
                                        getDeviceType() === "mobile"
                                            ? "sm"
                                            : "md"
                                    }
                                    // color="deep-purple"
                                    color="gray"
                                    icon={<MdOutlineBlock />}
                                />
                                <Chip
                                    value="Extendida"
                                    size={
                                        getDeviceType() === "mobile"
                                            ? "sm"
                                            : "md"
                                    }
                                    color="deep-purple"
                                    icon={<FiCheck />}
                                />
                            </div>
                            <Link to="#">
                                <span className="text-blue-gray-600 text-xs lg:text-sm">
                                    Como funciona a compra extendida?
                                </span>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xs lg:text-sm">
                                Selecione o tamanho
                            </span>
                            <div className="flex gap-2">
                                {product.size.map((s) => (
                                    <IconButton
                                        variant="outlined"
                                        color="blue-gray"
                                    >
                                        <span>{s}</span>
                                    </IconButton>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xs lg:text-sm">
                                Selecione a cor
                            </span>
                            <div className="flex gap-2">
                                <IconButton color="blue">
                                    <FiCheck />
                                </IconButton>
                                <IconButton color="red">-</IconButton>
                                <IconButton color="green">-</IconButton>
                                <IconButton color="yellow">-</IconButton>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xs lg:text-sm">
                                Selecione a quantidade
                            </span>
                            <Counter
                                value={amount}
                                max={product.stock}
                                handleValue={setAmount}
                            />
                            <span className="text-blue-gray-600 text-xs line-clamp-4 lg:line-clamp-5">
                                Estoque {product.stock}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Button color="deep-purple" variant="outlined">
                                Comprar agora
                            </Button>
                            <Button color="deep-purple" onClick={handleAdd}>
                                Adicionar ao carrinho
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <FiTruck />
                                <p className="text-blue-gray-900 text-sm">
                                    <span className="text-blue-500 text-sm mr-1">
                                        Mais Speed -
                                    </span>
                                    Pontue para ganhar muitos descontos e
                                    vantagens
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <FiTruck />
                                <p className="text-blue-gray-900 text-sm">
                                    <span className="text-blue-500 text-sm mr-1">
                                        Frete Grátis -
                                    </span>
                                    Em compras acima de R$ 199. Troca Grátis.
                                    Você
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <FiTruck />
                                <p className="text-blue-gray-900 text-sm mr-1">
                                    <span className="text-blue-500 text-sm">
                                        Devolução -
                                    </span>
                                    tem 07 dias a partir da data de recebimento.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-2 bg-white w-full">
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold">
                            Meios de pagamento
                        </span>
                        <div className="grid grid-cols-4 gap-2">
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-sm">
                                    Crédito
                                </span>
                                <div className="flex gap-2">
                                    <RiVisaLine className="fill-blue-800 text-2xl" />
                                    <RiMastercardFill className="text-2xl" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-sm">
                                    Débito
                                </span>
                                <div className="flex gap-2">
                                    <RiVisaLine className="fill-blue-800 text-2xl" />
                                    <RiMastercardFill className="text-2xl" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-sm">
                                    Boleto
                                </span>
                                <div className="flex gap-2">
                                    <AiOutlineBarcode className="text-2xl" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-sm">
                                    Pix
                                </span>
                                <div className="flex gap-2">
                                    <MdOutlinePix className="fill-blue-500 text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <span className="font-semibold">Detalhes</span>
                            <ul className="text-blue-gray-900 pl-6 list-disc grid grid-cols-4">
                                {product.details.map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-semibold">Descrição</span>
                            <p className="text-blue-gray-900">
                                {product.description}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
