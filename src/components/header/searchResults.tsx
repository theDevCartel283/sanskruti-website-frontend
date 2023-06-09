import { FC, HTMLAttributes } from "react";
import { ProductType } from "./header";
import { cn } from "@/utils/lib";
import Link from "next/link";
import Image from "next/image";

interface Props extends HTMLAttributes<HTMLDivElement> {
  searchResults: ProductType[];
}
const SearchResults: FC<Props> = ({ searchResults, className, ...props }) => {
  return (
    <div
      className={cn(
        "fixed top-[68px] grid max-h-[30rem] w-full bg-white max-md:top-28 md:right-[3vw] md:max-w-[39rem] md:grid-cols-2",
        className
      )}
      {...props}
    >
      {searchResults.length !== 0 ? (
        <>
          {searchResults.map((product) => (
            <Link
              key={product.slug}
              href={`/product/${product.slug}`}
              className="flex gap-3 p-2 hover:bg-slate-100"
            >
              <div className="h-[6rem] w-[4rem]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <div>
                  {product.name.length > 35
                    ? `${product.name.slice(0, 35)}...`
                    : product.name}
                </div>
                <div className="flex gap-1">
                  {!!product.sale_price ? (
                    <>
                      <span>&#8377;{product?.sale_price}</span>
                      <s className="text-gray-500">
                        &#8377;{product?.gst_price}
                      </s>
                      <span className="font-bold text-red-800">
                        (
                        {Math.round(
                          ((product?.gst_price - product?.sale_price) /
                            product?.gst_price) *
                            100
                        )}
                        % OFF)
                      </span>
                    </>
                  ) : (
                    <div>&#8377;{product.gst_price}</div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <div className="col-span-full p-3 text-center text-lg">
          Not Results found
        </div>
      )}
    </div>
  );
};

export default SearchResults;
