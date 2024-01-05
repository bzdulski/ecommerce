import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"
import { Link, useLocation } from "react-router-dom"


export const AppTaskHired = () => {
    const store = useStore()
    const location = useLocation()
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

            {store.task?.map(e => (

                <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

                </div>
            ))}
            <div className="flex flex-col items-center justify-center w-[1000px] m-auto gap-[2rem]">

                <div className="flex items-center justify-center w-[1000px] m-auto">
                    <div className="flex items-center justify-between bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                        <div className="flex flex-col gap-[1rem]">
                            <p className="flex gap-[1rem]"><p className="font-bold text-white">Zlecenie</p>#0001</p>
                            <div className="flex gap-[2rem]">
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">construction</p>
                                    <p>Montaż<br/>Serwis</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">sort</p>
                                    <p>Okablowanie</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">home</p>
                                    <p>Dom<br/>Sklep</p>
                                </div>
                            </div>

                            <div className="flex gap-[2rem]">
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">place</p>
                                    <p>Grójec</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">calendar_month</p>
                                    <p>06.08.2023</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">schedule</p>
                                    <p>12:55</p>
                                </div>
                            </div>

                            <p className="italic text-[#ea5455]">Zlecenie jest w trakcie. Proszę poczekać na odpowiedź zleceniodawcy!</p>
                        </div>
                        <Link className={`_button-cart-pink shadow-[inset_0_0_5rem_0_#ea5455] text-center`} to="/zlecenia/hiid">Pokaż ofertę</Link>
                    </div>
                </div>

                <div className="flex items-center justify-center w-[1000px] m-auto">
                <div className="flex items-center justify-between bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                    <div className="flex flex-col gap-[1rem]">
                        <p className="flex gap-[1rem]"><p className="font-bold text-white">Zlecenie</p>#0002</p>
                        <div className="flex gap-[2rem]">
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">construction</p>
                                <p>Montaż<br/>Serwis</p>
                            </div>
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">sort</p>
                                <p>Okablowanie</p>
                            </div>
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">home</p>
                                <p>Dom<br/>Sklep</p>
                            </div>
                        </div>

                        <div className="flex gap-[2rem]">
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">place</p>
                                <p>Grójec</p>
                            </div>
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">calendar_month</p>
                                <p>06.08.2023</p>
                            </div>
                            <div className="flex gap-[.5rem]">
                                <p className="font-['Material_icons'] text-white">schedule</p>
                                <p>12:55</p>
                            </div>
                        </div>

                        <p className="italic text-[#ea5455]">Zlecenie jest w trakcie. Proszę poczekać na odpowiedź zleceniodawcy!</p>
                    </div>
                    <Link className={`_button-cart-pink shadow-[inset_0_0_5rem_0_#ea5455] text-center`} to="/zlecenia/hiid">Pokaż ofertę</Link>
                </div>
            </div>
            
            </div>
        </>       
    )
}
  