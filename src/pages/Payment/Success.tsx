import { Footer, Header } from "@/components";

export function PaymentSuccess() {
    return (
        <>
            <Header title="Dental Store" link="/" />
            <main className="max-w-[1200px] flex flex-col justify-center items-center w-full">
                <div>Success</div>
            </main>
            <Footer />
        </>
    );
}
