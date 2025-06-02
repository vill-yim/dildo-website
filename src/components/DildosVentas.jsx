import { useRef, useEffect, useState } from "react";

export const DildosVentas = () => {
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en viewport móvil (menos de md)
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Funciones para el slider
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const dildosVentas = [
    {
      title: "Blush Neo Elite 6 Inch Silicone",
      dildo_img: "/v1.png",
      buy: "https://hotcherry.com/products/blush-neo-elite-6-inch-silicone-dual-density-cock-with-balls?variant=43544656675069",
    },
    {
      title: "Glowing green dildos",
      dildo_img: "/v2.png",
      buy: "https://es.aliexpress.com/item/1005008845584147.html?spm=a2g0o.productlist.main.5.5e9a6b8abhqi1l&algo_pvid=d51daf13-3ac7-401b-bf5d-b1bfb25cc799&pdp_ext_f=%7B%22order%22%3A%221%22%2C%22eval%22%3A%221%22%7D&utparam-url=scene%3Asearch%7Cquery_from%3A",
    },
    {
      title: "Silicone dildo with female fit",
      dildo_img: "/v4.png",
      buy: "https://www.alibaba.com/product-detail/New-Fluorescent-Green-Penis-Noctilucent-Thick_1600725907085.html?spm=a2700.galleryofferlist.normal_offer.d_image.758813a0u5F3pD&selectedCarrierCode=SEMI_MANAGED_STANDARD@@STANDARD",
    },
    { title: "Colorful large-kernel corn dildo", dildo_img: "/v6.png", buy: "https://www.alibaba.com/product-detail/Dildo-Colourful-Big-Grain-Corn-Adult_1600941616642.html?spm=a2700.galleryofferlist.normal_offer.d_image.3d3213a0Vs2SwY" },
  ];

  return (
    <div
      id="shop"
      className="w-full flex flex-col items-center pt-4 pb-6 bg-[#111111] justify-center"
    >
      <h3 className="w-full md:w-[480px] max-w-full text-white pb-2 my-10 font-bold leading-relaxed text-center px-2">
        BUY A GREEN MONSTER AND GET IT SOME VIRAL ATTENTION TO BE REWARDED BY
        OUR COMUNITY
      </h3>

      <div className="w-full relative">
        {/* Botones de navegación - solo visibles en mobile */}
        {isMobile && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg "
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-green-500 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
              aria-label="Scroll right"
            >
              →
            </button>
          </>
        )}

        <div className="w-[920px] max-w-full mx-auto flex justify-around md:justify-center md:space-x-12 flex-wrap">
          <div className="w-full">
            <div
              ref={sliderRef}
              className="flex [&::-webkit-scrollbar]:hidden overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 px-4 md:flex-wrap md:overflow-x-hidden md:justify-center"
            >
              {dildosVentas.map((dildo, idx) => (
                <div
                  key={idx}
                  className="snap-center flex-shrink-0 w-64 md:flex-shrink md:w-72"
                >
                  <RenderVentaTarget
                    title={dildo.title}
                    price={dildo.price}
                    dildo_img={dildo.dildo_img}
                    url_buy={dildo.buy}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderVentaTarget = ({ title, price, dildo_img, url_buy }) => {
  return (
    <div className="md:w-72 md:h-80 bg-[#46C738]/10 m-4 relative backdrop-blur-md rounded-2xl border border-green-300/15 px-6 ">
      <div className="flex w-full justify-between  my-4 mx-auto">
        <div className="cursor-pointer w-5">
          <img src="/glass/profile.png" alt="" />
        </div>
        <div className="cursor-pointer w-4 ">
          <img
            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/ellipsis.png"
            alt="more"
          />
        </div>
      </div>

      <div className="w-48 mx-auto border border-slate-300 translate-x-[4px] translate-y-[-4px] rounded-2xl  border border-white/10">
        <img
          src={`/ventas/${dildo_img}`}
          className="bg-white object-contain mx-auto translate-x-[-4px] translate-y-[4px] rounded-xl"
          alt="DILDO"
        />
      </div>

      <div className="w-11/12 flex justify-between py-6 items-center mx-auto">
        <div className="md:w-3/5">
          <h5 className="text-white md:text-sm">{title}</h5>
          <h2 className="text-white md:text-lg">{price}</h2>
        </div>

        <div className="flex justify-end md:w-2/5">
          <a
            href={url_buy}
            target="blank"
            className="cursor-pointer bg-[#33CB33] text-black hover:bg-white hover:text-green-600 transition-all duration-300 rounded-lg py-2 px-6 font-bold transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-900 "
          >
            BUY
          </a>
        </div>
      </div>
    </div>
  );
};
