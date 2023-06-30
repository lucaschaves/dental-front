import { joinClassName } from "@/utils";
import { ButtonGroup, IconButton, Input } from "@material-tailwind/react";
import { Dispatch, useCallback } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface ICounterProps {
    value: number;
    max: number;
    handleValue: Dispatch<React.SetStateAction<number>>;
}

const Counter = (props: ICounterProps) => {
    const { value, max, handleValue } = props;

    const handleMin = useCallback(() => {
        handleValue((prev) => (value > 1 ? prev - 1 : prev));
    }, [handleValue, value]);

    const handleMax = useCallback(() => {
        handleValue((prev) => (value < max ? prev + 1 : prev));
    }, [handleValue, max, value]);

    return (
        <ButtonGroup
            color={value === max ? "red" : "blue-gray"}
            variant="outlined"
        >
            <IconButton
                size="sm"
                color="blue"
                className={joinClassName(
                    "rounded",
                    "rounded-r-none",
                    "border-blue-gray-100"
                )}
                onClick={handleMin}
            >
                <FiMinus />
            </IconButton>
            <Input
                type="number"
                placeholder="1"
                value={value}
                onChange={(e) => handleValue(e.target.valueAsNumber)}
                className={joinClassName(
                    "rounded-none",
                    "text-center",
                    value === max ? "!border-red-500" : "!border-blue-gray-100",
                    "focus:!border-blue-500 "
                )}
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
                containerProps={{
                    className: "!min-w-0 !w-[60px]",
                }}
                inputMode="numeric"
            />
            <IconButton
                size="sm"
                color="blue"
                className={joinClassName(
                    "rounded",
                    "rounded-l-none",
                    "border-blue-gray-100"
                )}
                onClick={handleMax}
            >
                <FiPlus />
            </IconButton>
        </ButtonGroup>
    );
};

Counter.displayName = "Counter";

export { Counter };
