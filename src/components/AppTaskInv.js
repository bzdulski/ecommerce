import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

export const AppTaskInv = () => {
    const store = useStore()
    const location = useLocation()
    const [page, setPage] = useState(1)
    return (
        <>
            <div className="absolute flex flex-col items-center gap-[2rem] left-0 mobile:w-full">
                <Link className={`_button-cart-blue text-center ${location.pathname === "/zlecenia/dodaj" ? `text-white` : ``}`} to="/zlecenia/dodaj">Dodaj zlecenie</Link>
                <Link className={`_button-cart-white text-center ${location.pathname === "/zlecenia" ? `text-white` : ``}`} to="/zlecenia">Wszystkie</Link>
                <Link className={`_button-cart-pink text-center ${location.pathname === "/zlecenia/dodane" ? `text-white` : ``}`} to="/zlecenia/dodane">Moje dodane</Link>
                <Link className={`_button-cart-pink2 text-center ${location.pathname === "/zlecenia/podjete" ? `text-white` : ``}`} to="/zlecenia/podjete">Moje podjęte</Link>
                <Link className={`_button-cart-white text-center ${location.pathname === "/zlecenia/historia" ? `text-white` : ``}`} to="/zlecenia/historia">Historia</Link>
                <Link className={`_button-cart-black text-center ${location.pathname === "/zlecenia/invite" ? `text-white` : ``}`} to="/zlecenia/invite">REKLAMA</Link>
            </div>

            <div className="flex items-center justify-center w-[1000px] m-auto">
            
                <div className="flex gap-[2rem] flex-col items-center justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <p className="_text-discounts-white">Zostań instalatorem!</p>
                    
                    <div className="flex flex-col items-center gap-[1rem]">
                        <p>Aby móc podejmować się zleceń!</p>
                    </div>

                    <Link className="_button-cart-pink-block" to="/zlecenia">Powrót do zleceń</Link>

                </div>
            </div>
        </>       
    )
}
  