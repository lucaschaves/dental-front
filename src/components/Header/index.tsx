import { useCart } from "@/context";
import { getApi } from "@/services";
import {
    Badge,
    Button,
    Checkbox,
    Collapse,
    Drawer,
    IconButton,
    Input,
    Navbar,
    Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

interface IHeaderProps {
    link: string;
    title: string;
}

const Header = (props: IHeaderProps) => {
    const { link, title } = props;

    const [groups, setGroups] = useState<any[]>([]);
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const { total } = useCart();

    function onCloseDrawer() {
        setOpenDrawer(false);
    }

    async function getGroups() {
        const { success, data, message } = await getApi({ url: "/groups" });
        if (success) {
            setGroups(data);
        }
    }

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );

        getGroups();
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {groups.map((group) => (
                <Typography
                    as="li"
                    variant="small"
                    className="p-1 font-normal"
                    key={group.id}
                >
                    <Link to={group.id} className="flex items-center">
                        {group.name}
                    </Link>
                </Typography>
            ))}

            <Button
                variant="gradient"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setOpenDrawer(true)}
            >
                <FiUser />
                <span>Lucas</span>
            </Button>
        </ul>
    );

    return (
        <>
            <Navbar className="border-none sticky inset-0 z-50 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-deep-purple-500 text-white">
                <div className="flex items-center justify-between gap-4 pr-2">
                    <IconButton
                        variant="text"
                        className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <FiX className="text-lg" />
                        ) : (
                            <FiMenu className="text-lg" />
                        )}
                    </IconButton>
                    <Link to={link}>
                        <span className="mr-4 cursor-pointer py-1.5">
                            {title}
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <Link to="/cart" className="hidden lg:block">
                            <Badge
                                content={total}
                                className="hidden lg:flex lg:items-center lg:justify-center"
                            >
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="hidden lg:flex lg:gap-2 lg:items-center"
                                >
                                    <FiShoppingCart />
                                    <span>Carrinho</span>
                                </Button>
                            </Badge>
                        </Link>
                        <Link to="/cart" className="lg:hidden">
                            <Badge content={total}>
                                <IconButton
                                    variant="text"
                                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent "
                                >
                                    <FiShoppingCart className="text-lg" />
                                </IconButton>
                            </Badge>
                        </Link>
                    </div>
                </div>
                <Collapse open={openNav} className="">
                    {navList}
                </Collapse>
            </Navbar>

            <Drawer
                open={isOpenDrawer}
                onClose={onCloseDrawer}
                className="p-4 flex flex-col justify-center items-center"
                placement="top"
                size={350}
            >
                <div className="flex flex-col items-center max-w-md w-full gap-1">
                    <span className="font-semibold">Faça o seu login</span>
                    <div className="flex flex-col gap-3 w-full">
                        <Input label="Email" />
                        <Input label="Senha" type="password" />
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <label
                            className="flex items-center"
                            htmlFor="show-password"
                        >
                            <Checkbox id="show-password" />
                            Mostrar senha
                        </label>
                        <Link to="/forgot">Esqueceu a senha?</Link>
                    </div>
                    <Button className="w-full">Entrar</Button>
                    <span className="text-gray-500">ou</span>
                    <Button className="w-full" variant="outlined">
                        Cadastrar-se
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

Header.displayName = "Header";

export { Header };
