import withMT from "@material-tailwind/react/utils/withMT";
import LineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
export default withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },

    plugins: [LineClamp],
});
