import { Counter } from "@/components";
import { useCart } from "@/context";
import { formatCurrency, getDeviceType, joinClassName } from "@/utils";
import {
    Button,
    Drawer,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

interface IImage {
    src: string;
    alt: string;
    index: number;
}

export interface IItemProps {
    id: string;
    link: string;
    title: string;
    brand: string;
    subtitle: string;
    price: number;
    discount: number;
    stock: number;
    image: IImage;
}

const Item = ({
    id,
    link,
    title,
    brand,
    subtitle,
    price,
    discount,
    stock,
    image,
}: IItemProps) => {
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    console.log(stock);
    const [amount, setAmount] = useState(() => (stock > 0 ? 1 : 0));

    const { addProduct } = useCart();

    function onCloseDrawer() {
        setOpenDrawer(false);
    }

    return (
        <>
            <div
                className={joinClassName(
                    "w-40",
                    "bg-white",
                    "rounded",
                    "p-1",
                    "flex",
                    "flex-col",
                    "gap-2",
                    "md:w-56"
                )}
            >
                <div
                    className={joinClassName(
                        "h-36",
                        "rounded",
                        "bg-white",
                        "overflow-hidden",
                        "shadow-sm",
                        "relative",
                        "md:h-40"
                    )}
                >
                    <Link to={link}>
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-contain"
                        />
                    </Link>
                    <IconButton
                        size={getDeviceType() === "mobile" ? "sm" : "md"}
                        className="absolute top-1 right-1"
                        variant="text"
                        color="deep-purple"
                    >
                        <FiHeart />
                    </IconButton>
                </div>
                <div className={joinClassName("flex flex-col gap-1 md:gap-2")}>
                    <Link to={link}>
                        <span className="line-clamp-2 text-blue-gray-900 font-semibold text-sm md:text-base">
                            {title}
                        </span>
                        <span className="line-clamp-1 text-blue-gray-400 text-xs md:text-sm">
                            {brand}
                        </span>
                    </Link>
                    <span className="line-clamp-5 text-blue-gray-600 text-xs md:text-sm">
                        {subtitle}
                    </span>
                    <div className="flex items-center justify-between md:hidden">
                        <div className="">
                            <div className="flex gap-1">
                                <span className="text-xs line-through text-blue-gray-400">
                                    R$ {formatCurrency({ price, discount })}
                                </span>
                                <span className="bg-green-500 text-xs rounded px-[1px] text-white">
                                    {discount}%
                                </span>
                            </div>
                            <div className="">
                                <span className="text-xs">R$ </span>
                                <span className="font-semibold">
                                    {formatCurrency({ price })}
                                </span>
                            </div>
                        </div>

                        <IconButton
                            className=""
                            color="deep-purple"
                            size="sm"
                            onClick={() => setOpenDrawer(true)}
                        >
                            <FiShoppingCart />
                        </IconButton>
                    </div>
                    <div className="hidden md:flex items-center justify-between flex-col gap-3">
                        <div className="flex items-center justify-between w-full">
                            <div className="">
                                <span className="">R$ </span>
                                <span className="font-semibold text-2xl">
                                    {formatCurrency({ price, discount })}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 justify-end items-end">
                                <span className="bg-green-500 rounded px-[1px] text-white w-8 h-5 text-sm">
                                    {discount}%
                                </span>
                                <span className="line-through text-blue-gray-400">
                                    R$ {formatCurrency({ price })}
                                </span>
                            </div>
                        </div>

                        <Button
                            className=""
                            color="deep-purple"
                            size="sm"
                            fullWidth
                            onClick={() => setOpenDrawer(true)}
                        >
                            Ver opções
                        </Button>
                    </div>
                </div>
            </div>
            {isOpenDrawer ? (
                <Drawer
                    open={isOpenDrawer}
                    onClose={onCloseDrawer}
                    className="p-4 flex flex-col justify-between"
                    placement={
                        getDeviceType() === "mobile" ? "bottom" : "right"
                    }
                    size={getDeviceType() === "mobile" ? 300 : 500}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray">
                            Opções
                        </Typography>
                        <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={onCloseDrawer}
                        >
                            <FiX className="h-5 w-5" />
                        </IconButton>
                    </div>
                    <div>
                        <Typography
                            color="gray"
                            className="mb-4 pr-4 font-normal"
                        >
                            "Selecione o Tamanho"
                        </Typography>
                        <div className="flex gap-2 mb-4">
                            {/* {size.map((t) => (
                                <Button key={t} size="sm" variant="outlined">
                                    <span>{t}</span>
                                </Button>
                            ))} */}
                        </div>
                    </div>
                    <div className="flex gap-2 justify-between">
                        <Counter
                            value={amount}
                            max={stock}
                            handleValue={setAmount}
                        />
                        <Button
                            className="flex gap-2 items-center justify-center"
                            onClick={() =>
                                addProduct({
                                    id,
                                    name: title,
                                    price,
                                    description: subtitle,
                                    quantity: amount,
                                    stock,
                                })
                            }
                        >
                            <span className="md:hidden">Adicionar</span>
                            <span className="hidden md:inline-block">
                                Adicionar ao carrinho
                            </span>
                            <FiShoppingCart />
                        </Button>
                    </div>
                </Drawer>
            ) : (
                <></>
            )}
        </>
    );
};

export { Item };
