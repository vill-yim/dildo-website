import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { DildosVentas } from "./components/DildosVentas";
import ReactPlayer from "react-player";

function App() {
  const scrollContainerRef = useRef(null);
  const scrollContainerLef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [unmuted, setMuted] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [copiedStates, setCopiedStates] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [route, setRoute] = useState(null);
  const [menuMobile, setMenuMobile] = useState(false);

  const navheader = [
    { name: "COMMUNITY", path: "community" },
    { name: "NFT", path: "nft" },
    { name: "SHOP", path: "shop" },
  ];

  const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

  const RenderCopy = () => {
    const copyImg = async (idx) => {
      try {
        const img = document.getElementById(`image-copy-${idx}`);
        const blob = await fetch(img.src).then((r) => r.blob());
        const item = new ClipboardItem({ "image/png": blob });
        await navigator.clipboard.write([item]);

        // Actualiza solo el estado del botón específico
        const newCopiedStates = [...copiedStates];
        newCopiedStates[idx - 1] = true;
        setCopiedStates(newCopiedStates);

        // Cambia de nuevo a "COPY" después de 500ms
        setTimeout(() => {
          const resetStates = [...copiedStates];
          resetStates[idx - 1] = false;
          setCopiedStates(resetStates);
        }, 1000);
      } catch (error) {
        console.error("Error al copiar la imagen:", error);
      }
    };

    return (
      <>
        {Array.from({ length: 4 }, (_, i) => {
          const idx = i + 1;

          return (
            <div
              key={idx}
              className="flex flex-col space-y-2 rounded-lg justify-center items-center m-2 md:w-52 h-56 py-4 my-4 max-w-full"
            >
              <div className="flex rounded-xl justify-center items-center bg-[#797979] w-40 h-52">
                <img
                  id={`image-copy-${idx}`}
                  src={`/dildos/dildo${idx}.png`}
                  alt={`Imagen ${idx}`}
                />
              </div>
              <button
                onClick={() => copyImg(idx)}
                className="bg-[#33CB33] text-white hover:bg-white hover:text-green-600 transition-all duration-300 rounded-3xl py-1 px-6 font-bold transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-900"
              >
                {copiedStates[idx - 1] ? "COPIED" : "COPY"}
              </button>
            </div>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    if (window.scrollY === 0) {
      const header = document.getElementById("header-slider");
      header.classList.add("hidden");
      document.getElementById("header").classList.add(`md:bg-none`);
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si estamos haciendo scroll hacia abajo, ocultamos
      if (currentScrollY > lastScrollY) {
        setVisible(true);
      }
      // Si estamos haciendo scroll hacia arriba, mostramos
      else {
        setVisible(false);
      }

      // Actualizamos la última posición de scroll
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Carrusel automático de derecha a izquierda
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Establece la posición inicial
    scrollContainer.scrollLeft = 0;

    const interval = setInterval(() => {
      // Incrementa la posición del scroll
      scrollContainer.scrollLeft += 2; // Velocidad del desplazamiento

      // Si llegamos al final, volver al principio
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0;
      }
    }, 16); // Aproximadamente 60fps

    return () => clearInterval(interval);
  }, []);

  //carrusel de derecha a izaueirda
  useEffect(() => {
    const scrollCont = scrollContainerLef.current;
    if (!scrollCont) return;

    scrollCont.scrollLeft = 0;

    const inte = setInterval(() => {
      scrollCont.scrollLeft -= 2;
      if (scrollCont.scrollLeft <= 0) {
        scrollCont.scrollLeft = scrollCont.scrollWidth;
      }
    }, 16);

  return () => clearInterval(inte);
}, []);



  return (
    <div className="relative mb-24 ">
      {/*header*/}
      <div
        id="header"
        className={`w-full flex flex-col items-center justify-between px-4 fixed top-0 ${window.scrollY != 0 && 'bg-gradient-to-r from-[#33CC33] to-black' } ${visible && 'hidden'} h-24 top-0 z-[1000] `}
      >
        {/*nav y logo*/}
        <div className="flex justify-between items-center w-full">
          <input required className="hidden" />
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
                <button
                  key={i}
                  onClick={() => {setRoute(i);  scrollToId(r.path)}}
                  className={` h-min text-center  cursor-pointer font-bold list-none py-1 px-8 rounded-3xl border border-neutral-50 transition-all ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 
            ${
              route === i
                ? "bg-white text-green-600"
                : "text-white hover:bg-white hover:text-green-600"
            }`}
                >
                  {r.name}
                </button>
              ))}
            </ul>
            <button className="bg-[#33CB33] text-black hover:bg-white hover:text-green-600 transition-all duration-300 rounded-3xl py-2 px-6 font-bold transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-900 ">
             CA $DILDO 
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

        <>
        
        <div
          id="header-slider"
          className={`${visible ? 'hidden' : 'flex'} absolute top-0 bg-gradient-to-r from-[#33CC33] to-black absolute  w-screen h-24 flex justify-center transition-transform duration-300 ${
            visible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div
            ref={scrollContainerLef}
            className="max-w-full w-[1600px] flex overflow-x-scroll [&::-webkit-scrollbar]:hidden z-[1000] whitespace-nowrap"
          >
            
            {Array.from({ length: 25 }, (_, i) => {
              const index = i + 1;
              return (
                <img
                  key={`original-${index}`}
                  src={`/memes/${index}.jpg`}
                  alt={`Meme ${index}`}
                  className="h-full shrink-0 cursor-pointer"
                />
              );
            })}
            {Array.from({ length: 25 }, (_, i) => {
              const index = i + 1;
              return (
                <img
                  key={`duplicate-${index}`}
                  src={`/memes/${index}.jpg`}
                  alt={`Meme ${index}`}
                  className="h-full shrink-0 cursor-pointer"
                />
              );
            })}
          </div>
        </div>
        </>
      </div>
      {/*menu mobile */}

      
      {menuMobile && (
        <div className="absolute bg-red-500 w-96 top-0 z-[1000]">
          <div
            className={`w-screen  flex flex-col items-end  justify-end   transition-all delay-900 fixed space-y-4 [@media(min-width:900px)]:hidden ${
              menuMobile ? "flex" : "opacity-0"
            } ${menuMobile != "hidden"}`}
          >
            <ul
              className={`flex-col z-[1000] py-8 bg-black h-full justify-around items-end space-y-4 px-6 `}
            >
              {navheader.map((r, i) => (
                <a
                  href={`#${r.path}`}
                  key={i}
                  onClick={() => setRoute(i)}
                  className={`h-min text-center mr-2 cursor-pointer font-bold list-none py-1 px-8 rounded-3xl border border-neutral-50 transition-all ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 
                ${
                  route === i
                    ? "bg-white text-green-600"
                    : "text-white hover:bg-white hover:text-green-600"
                }`}
                >
                  {r.name}
                </a>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/*cover con video */}
        <div className="relative md:min-h-screen mt-24 md:mt-0">
  <video
    src="/video/dildos.mp4"
    className="md:min-h-screen relative"
    autoPlay
    muted={unmuted} 
    loop={true}
    playsInline
    style={{
      width: '100vw',
      aspectRatio: '16/9',
      objectFit: 'contain',
      margin: 0,
      padding: 0,
      display: 'block',
    }}
  />
  
  <span onClick={()=>setMuted(!unmuted) } className="cursor-pointer w-18 h-12 flex md:border md:border-green-600 md:rounded-xl  flex-col justify-center items-center absolute top-0 md:top-20 right-2">
    <img className="p-2" src={`${unmuted ? 'https://img.icons8.com/pulsar-gradient/35/mute.png' : 'https://img.icons8.com/ios-filled/35/40C057/room-sound.png' }`} alt="" />
  </span>
</div>



  <>
        {/* <div
          className="absolute z-[0] w-full top-0 bg-cover bg-center "
          style={{ backgroundImage: "url('')" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#202020"
              fillOpacity="1"
              d="M0,96L48,128C96,160,192,224,288,256C384,288,480,288,576,256C672,224,768,160,864,112C960,64,1056,32,1152,42.7C1248,53,1344,107,1392,133.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
      */}
      </>

      {/*dildo grande con imagenes para copiar*/}
      <div
        id="community"
        className="w-full flex flex-col items-center pt-4 pb-6 bg-[#111111] justify-center "
      >
        <h3 className="w-full md:w-[480px] max-w-full text-white pb-2 my-10 font-bold leading-relaxed text-center px-2">
          IF YOU CAN’T COPY A PICTURE OF A DILDO, PHOTOSHOP IT AND POST IT ON X,
          YOU DON’T BELONG IN THE TRENCHES{" "}
        </h3>

        <div className="w-full flex justify-around md:justify-center md:space-x-12 flex-wrap">
          <div className="w-1/4 max-w-full ">
            <img
              src="/assetss/DILDO.png"
              className="w-32 md:w-72  object-contain mx-auto rounded-xl"
              alt="DILDO"
            />
          </div>

          <div className="w-[600px] max-w-full flex flex-wrap  ">
            <div className="flex flex-wrap w-full md:w-11/12 mx-auto justify-center ">
              <RenderCopy />
            </div>
          </div>
        </div>
      </div>

      {/*dildo fondo rosado*/}
      <div id="nft" className="relative w-full  flex flex-col items-center pt-4 pb-6 bg-gradient-to-r from-[#33CC33] to-black justify-center py-12">


<div className="absolute z-[100] w- bottom-0">
  <img src="/glass/commingsoon.jpg" className="" alt="" />
</div>

        <h3 className="w-full text-center mx-auto max-w-full text-2xl md:text-4xl text-white my-4 font-bold leading-relaxed font-extrabold p-4">
          JOIN THE MOVEMENT AND FEED OUR NEXT DILDO
        </h3>

        {/*target para dildo fondo rosado*/}

        <div className="opacity-[0.8] w-10/12 md:w-96 max-w-full bg-white/5 relative backdrop-blur-md rounded-3xl border border-slate-200/15 px-8 mb-8 shadow-lg">


          <div className="flex w-full justify-between  my-4 mx-auto">
            <div className="w-10 cursor-pointer">
              <img src="/glass/profile.png" alt="" />
            </div>
            <div className="w-10 cursor-pointer">
              {" "}
              <img
                src="https://img.icons8.com/ios-glyphs/30/FFFFFF/ellipsis.png"
                alt="more"
              />
            </div>
          </div>

          <div className="translate-x-[3px] translate-y-[-5px] rounded-2xl  border border-slate-300  border border-white/10">
            <div className="translate-x-[-5px] translate-y-[5px] bg-[#ef6097] p-4 rounded-2xl ">
              <img
                src="/assetss/Dildo_tosado.png"
                className="w-96 object-contain mx-auto rounded-xl "
                alt="DILDO"
              />
            </div>
          </div>

          <div className="w-11/12 flex justify-between py-6 items-center mx-auto">
            <div className="w-1/2">
              <h5 className="text-white  md:text-lg">Thuglife Dildo #1</h5>
              <h2 className="text-white  md:text-2xl">$45,254.25</h2>
            </div>

            <div className="w-172">
              <button className="bg-white text-green-600 hover:bg-[#33CB33] hover:text-black transition-all duration-300 rounded-xl py-2 px-6 font-bold transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-900 font-bold">
                Mint NFT
              </button>
            </div>
          </div>
        </div>
      </div>

   
      <DildosVentas />

      {/*carrusel meme dildos */}
      <div

        className={`z-[1000] bg-gradient-to-r from-[#33CC33] to-black fixed bottom-0 w-full h-24 flex justify-center transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          ref={scrollContainerRef}
          className="max-w-full w-[1600px] flex overflow-x-scroll [&::-webkit-scrollbar]:hidden z-[1000] whitespace-nowrap"
        >
          {/* Duplicamos las imágenes para crear un efecto de bucle infinito */}
          {Array.from({ length: 25 }, (_, i) => {
            const index = i + 1;
            return (
              <img
                key={`original-${index}`}
                src={`/memes/${index}.jpg`}
                alt={`Meme ${index}`}
                className="h-full shrink-0 cursor-pointer"
              />
            );
          })}
          {Array.from({ length: 25 }, (_, i) => {
            const index = i + 1;
            return (
              <img
                key={`duplicate-${index}`}
                src={`/memes/${index}.jpg`}
                alt={`Meme ${index}`}
                className="h-full shrink-0 cursor-pointer"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
