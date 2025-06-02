import { useState } from "react";
import { Link } from "react-router-dom";


const Header = () => {
    
    const [route, setRoute] = useState(null);
    const [menuMobile, setMenuMobile] = useState(false);
    

  const navheader = [
    { name: "ABOUT US", path: "about" },
    { name: "NFT", path: "nft" },
    { name: "COMMUNITY", path: "community" },
    { name: "SHOP", path: "shop" },
  ];
    
  return (
   <div
        id="header"
        className="w-full flex items-center justify-between px-4 fixed top-0 bg-gradient-to-r from-[#33CC33] to-black  h-24 top-0 z-[1000] "
      >
        <Link
          to={"/"}
          onClick={() => setRoute(null)}
          className="md:w-1/5  flex justify-center space-x-4 items-center flex-wrap p-2"
        >
          <img
            className="w-6 md:w-10 md:h-16"
            src="/assetss/DildoLogo.png"
            alt=""
          />
          <img className="md:h-10" src="/assetss/$DILDO.png" alt="" />
        </Link>

        <div className="flex w-3/4  justify-end items-center space-x-8 relative ">
          <ul className="flex  space-x-4 [@media(max-width:900px)]:hidden ">
            {navheader.map((r, i) => (
              <li
                key={i}
                onClick={() => setRoute(i)}
                className={`h-min text-center  cursor-pointer font-bold list-none py-1 px-8 rounded-3xl border border-neutral-50 transition-all ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 
            ${
              route === i
                ? "bg-white text-green-600"
                : "text-white hover:bg-white hover:text-green-600"
            }`}
              >
                {r.name}
              </li>
            ))}
          </ul>
          <button className="bg-[#33CB33] text-black hover:bg-white hover:text-green-600 transition-all duration-300 rounded-3xl py-2 px-6 font-bold transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-900 ">
            BUY $DILDO
          </button>

          <div
            onClick={() => {
              setMenuMobile(!menuMobile);
              console.log("nono");
            }}
            className="w-10 [@media(min-width:900px)]:hidden"
          >
            <img
              src="https://img.icons8.com/ios-filled/50/FFFFFF/menu--v1.png"
              alt=""
            />
          </div>
        </div>
      </div>
  )
}

export default Header
