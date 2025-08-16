import React from "react";
import { useExchangeRateGBPToIRR } from "../../hooks/useExchangeRateGBPToIRR";
import { calculateDiscountPercentage } from "../../utilities/calculateDiscountPercentage";
import { changeNumbersFormatEnToFa } from "../../utilities/changeNumbersFormatEnToFa";

interface Props {
  price: number;
  discount?: number;
  isLargeSize?: boolean;
  isInSlider?: boolean;
}

const ProductPrice: React.FC<Props> = ({
  price,
  discount,
  isLargeSize = false,
  isInSlider,
}) => {
  const irPrice = useExchangeRateGBPToIRR(price);
  const discountPrice = discount
    ? calculateDiscountPercentage(price, discount)
    : 0;
  const irDiscountPrice = useExchangeRateGBPToIRR(discountPrice);

  const textMainPriceSize = isLargeSize
    ? "text-xl md:text-3xl"
    : "text-md md:text-lg";
  const textDiscountPriceSize = isLargeSize
    ? "text-md md:text-xl"
    : "text-[12px] md:text-md";
  const justifyContent = isInSlider ? "flex-start" : "";
  const flexDirection = isInSlider ? "row" : "row-reverse";

  return (
    <div>
      <div
        className={`flex rtl:justify-end rtl:self-end ltr:self-start text-left mt-2`}
        style={{ justifyContent }}
      >
        {discount ? (
          <div className="flex items-end flex-wrap" style={{ flexDirection }}>
            <span className="flex flex-col">
              <del
                className={`text-rose-800 dark:text-rose-200 md:text-sm ${textDiscountPriceSize}`}
              >
                {irPrice}
                <sub className="ml-1 text-[10px]">تومان</sub>
              </del>
              <ins
                className={`font-bold self-end no-underline mt-1 ${textMainPriceSize}`}
              >
                {irDiscountPrice}
                <sub className="ml-1 text-[10px]">تومان</sub>
              </ins>
            </span>
            <span
              className="text-green-800 dark:text-green-200 ml-1 text-[12px] inline-block"
              style={{ direction: "ltr" }}
            >
              {discount ? `(-%${changeNumbersFormatEnToFa(discount)})` : null}
            </span>
          </div>
        ) : (
          <div>
            {isInSlider ? <div className="h-[1.4rem]"></div> : null}
            <div
              className={`flex items-center ${textMainPriceSize} font-bold no-underline`}
              style={{ flexDirection }}
            >
              <span>{irPrice}</span>
              <sub className="ml-1 text-[10px]">تومان</sub>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPrice;
