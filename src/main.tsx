import { ThemeProvider } from "@material-tailwind/react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, CartProvider } from "./context";
import "./index.css";
import { AppRoutes } from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AuthProvider>
        <CartProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </ThemeProvider>
        </CartProvider>
    </AuthProvider>
);
