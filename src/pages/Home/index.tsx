import { Footer, Header, Item } from "@/components";
import { getApi } from "@/services";
import { Avatar, Carousel, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FiChevronRight, FiMapPin, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export function Home() {
    const [products, setProducts] = useState([]);

    async function getProducts() {
        const { success, data } = await getApi({
            url: "/products",
            config: {
                params: {
                    short: true,
                },
            },
        });
        if (success) {
            setProducts(data);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);
    console.log(products);

    return (
        <>
            <Header title="Dental Store" link="/" />
            <main className="max-w-[1200px] flex flex-col justify-center items-center w-full">
                <div className="p-3 w-full">
                    <Input
                        placeholder="Buscar produtos, marcas e muito mais.."
                        variant="static"
                        color="purple"
                        icon={<FiSearch />}
                    />
                </div>
                <div className="w-full flex items-center justify-between p-3 py-2">
                    <div className="flex items-center justify-start gap-1 text-xs">
                        <FiMapPin className="text-deep-purple-500" />
                        <span className="text-blue-gray-300">Enviar para </span>
                        <span className="">Florianópolis, 88036002</span>
                    </div>
                    <FiChevronRight />
                </div>
                <div className="w-full flex items-center justify-between gap-3 p-3 overflow-y-hidden overflow-x-auto">
                    {[
                        {
                            src: "https://cdn.dentalspeed.com/home/jun-23/home/quick-filter/12-06/desktop-home-quick-filter-semana-higiene-oral.png",
                            alt: "Higiene",
                        },
                        {
                            src: "https://cdn.dentalspeed.com/home/jun-23/home/quick-filter/home-quick-filter-junho-23-dentistica-e-estetica.png",
                            alt: "Dentística",
                        },
                        {
                            src: "https://cdn.dentalspeed.com/magento/home/quick-filter/banner-quick-filter-descartaveis-mai-23.png",
                            alt: "Descatáveis",
                        },
                        {
                            src: "https://cdn.dentalspeed.com/home/jun-23/home/quick-filter/06-06/desktop-home-quick-filter-ortodontia-DS.png",
                            alt: "Ortodontia",
                        },
                        {
                            src: "https://cdn.dentalspeed.com/home/jun-23/home/quick-filter/12-06/desktop-home-quick-filter-semana-higiene-oral.png",
                            alt: "Higiene",
                        },
                        {
                            src: "https://cdn.dentalspeed.com/home/jun-23/home/quick-filter/home-quick-filter-junho-23-dentistica-e-estetica.png",
                            alt: "Dentística",
                        },
                        {
                            src: "https://cdn.dentalspeed.com/magento/home/quick-filter/banner-quick-filter-descartaveis-mai-23.png",
                            alt: "Descatáveis",
                        },
                        {
                            src: "https://cdn.dentalspeed.com/home/jun-23/home/quick-filter/06-06/desktop-home-quick-filter-ortodontia-DS.png",
                            alt: "Ortodontia",
                        },
                    ].map((v, i) => (
                        <Link
                            to="/"
                            key={i}
                            className="flex flex-col items-center gap-1 min-w-max"
                        >
                            <Avatar {...v} size="xl" />
                            <span className="text-xs text-blue-gray-500">
                                {v.alt}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="p-3 w-full">
                    <Carousel
                        navigation={({
                            setActiveIndex,
                            activeIndex,
                            length,
                        }) => (
                            <div className="absolute bottom-4 left-2/4 z-20 flex -translate-x-2/4 gap-2">
                                {new Array(length).fill("").map((_, i) => (
                                    <span
                                        key={i}
                                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                            activeIndex === i
                                                ? "bg-white w-8"
                                                : "bg-white/50 w-4"
                                        }`}
                                        onClick={() => setActiveIndex(i)}
                                    />
                                ))}
                            </div>
                        )}
                        autoplay
                        autoplayDelay={3500}
                        loop
                        className="rounded-xl"
                    >
                        <img
                            src="https://cdn.dentalspeed.com/home/jun-23/brindes/06-06/desktop-home-grid-brindes-semana-2-DS.png"
                            alt="Teste"
                            width={375}
                            height={200}
                        />
                        <img
                            src="https://cdn.dentalspeed.com/home/jun-23/home/grid/desk-home-grid-jun-23-kits-economicos.png"
                            alt="Teste"
                            width={375}
                            height={200}
                        />
                        <img
                            src="https://cdn.dentalspeed.com/home/mai-23/grid/grid-mai-23-novidades.png"
                            alt="Teste"
                            width={375}
                            height={200}
                        />
                    </Carousel>
                </div>
                <div className="bg-white p-3 py-5  grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full ">
                    {products.map((product: any, i) => (
                        <Item
                            key={i}
                            link={`/item/${product.id}`}
                            {...product}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
}
