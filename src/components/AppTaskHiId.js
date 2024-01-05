import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

export const AppTaskHiId = () => {
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

            {page === 1 && <div className="flex flex-col items-center justify-center w-[1000px] m-auto gap-[2rem]">
                <div className="flex items-center justify-between bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                    <div className="flex flex-col gap-[1rem]">
                        <p className="flex gap-[1rem]"><p className="font-bold text-white">Zlecenie</p>#0001</p>
                        <div className="flex gap-[2rem]">
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">construction</p>
                                <p>Montaż</p>
                            </div>
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">sort</p>
                                <p>Okablowanie</p>
                            </div>
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">home</p>
                                <p>Dom</p>
                            </div>
                        </div>

                        <div className="flex gap-[2rem]">
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">place</p>
                                <p>Warszawa</p>
                            </div>
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">calendar_month</p>
                                <p>08.08.2023</p>
                            </div>
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">schedule</p>
                                <p>16:20</p>
                            </div>
                        </div>

                        <p>Państwo Dursleyowie byli ostatnimi ludźmi, których można by posądzić o udział w czymś dziwnym lub tajemniczym, bo po prostu nie wierzyli w takie bzdury. Pan Dursley był dyrektorem firmy Grunnings produkującej świdry. Był to rosły otyły mężczyzna pozbawiony szyi, za to wyposażony w wielkie wąsy.</p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                    <div className="flex flex-col items-center justify-between w-full gap-[2rem]">
                        <p>Wiadomość od zleceniodawcy</p>
                        <div className="_button-cart-input h-[10rem] w-full resize-none"/>
                        <button className={`_button-cart-white text-center`} onClick={() => setPage(2)}>Anuluj ofertę</button>
                    </div>
                </div>
            </div>}





            {page === 2 && <div className="flex items-center justify-center w-[1000px] m-auto">
            
            <div className="flex gap-[2rem] flex-col items-center justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                <p className="_text-discounts-white">Dziękujemy za anulowanie zlecenia!</p>
                
                <div className="flex flex-col items-center gap-[1rem]">
                    <p>#0001</p>
                    <p>Nie będziesz już podejmował się tego zlecenia!</p>
                </div>

                <Link className="_button-cart-pink-block" to="/zlecenia">Powrót do zleceń</Link>

            </div>
        </div>}
        </>       
    )
}
  