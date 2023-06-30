import { Cart, Home, Item, NotFound, PaymentSuccess } from "@/pages";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
