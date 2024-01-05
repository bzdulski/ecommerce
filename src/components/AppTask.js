import { useStore } from "../zustand.config"
import { useLocation, Link, useSearchParams, useNavigate, createSearchParams } from "react-router-dom"
import { useTimestamp } from "../hooks/useTimestamp"
import { auth } from "../firebase.config"

export const AppTask = () => {
    const store = useStore()
    const navigate = useNavigate()
    const location = useLocation()
    const [param, setParam] = useSearchParams()

    let array = store.task
    let start = param.get("page") ? (parseFloat(param.get("page")) - 1) * 10 : 0
    let end = param.get("page") ? ((parseFloat(param.get("page")) - 1) * 10) + 10 : 10

    const colorStatus = (status, user, installer) => {
        if(store.auth?.status === "klient")
        {
            switch(status) {
                case "nowe": case "podjęte": { return store.auth?.id === user ? `shadow-[inset_0_0_5rem_0_#561234]` : `shadow-[inset_0_0_5rem_0_#123456]`}
                case "zakończone": { return `shadow-[inset_0_0_5rem_0_#28c76f40]` }
                case "anulowane": { return `shadow-[inset_0_0_5rem_0_#ffffff40]` }
                default: { return `shadow-[inset_0_0_5rem_0_#ffffff40]`}
            }
        }
        if(store.auth?.status === "instalator") {
            switch(status) {
                case "nowe": case "podjęte": { return (installer).some(x=> x.id === store.auth?.id) ? `shadow-[inset_0_0_5rem_0_#561234]` : `shadow-[inset_0_0_5rem_0_#123456]`}
                case "zakończone": { return `shadow-[inset_0_0_5rem_0_#28c76f40]` }
                case "anulowane": { return `shadow-[inset_0_0_5rem_0_#ffffff40]` }
                default: { return `shadow-[inset_0_0_5rem_0_#ffffff40]`}
            }
        }
        if(!store.auth) {
            return `shadow-[inset_0_0_5rem_0_#123456]`
        }
    }


    if(param.get("search")) array = array.filter(({nazwa, NR, typ, rodzaj, miejsce, wojewodztwo, obiekt}) => 
    (
        nazwa.toLowerCase().includes(param.get("search")) || 
        NR.toLowerCase().includes(param.get("search")) || 
        typ.includes(param.get("search")) || 
        rodzaj.includes(param.get("search")) || 
        miejsce.toLowerCase().includes(param.get("search")) || 
        wojewodztwo.toLowerCase().includes(param.get("search")) || 
        obiekt.includes(param.get("search"))
    ))

    if(!store.auth) {
        array = array.filter(e => (e.isZlecenie === true && e.status === "nowe"))
    }

    if(store.auth && store.auth.status === "klient") {
        if(location.pathname === `/zlecenia`) {
            if(!param.get("filtr")) array = array.filter(e => e.iduser === store.auth.id && e.status !== "anulowane" ? (e.isZlecenie === true || e.isZlecenie === false) : e.status === "nowe" && e.isZlecenie === true)
            // if(param.get("filtr") === "inne") array = array.filter(e => e.iduser !== store.auth.id && e.status === "nowe")
            if(param.get("filtr") === "moje") array = array.filter(e => e.iduser === store.auth.id && (e.status === "nowe" || e.status === "podjęte" || e.status === "zakończone"))
        }
        if(location.pathname === `/zlecenia/aktywne`) {
            if(!param.get("filtr")) array = array.filter(e => e.iduser === store.auth.id && (e.status === "nowe" || e.status === "podjęte"))
        }

        if(location.pathname === `/zlecenia/historia`) {
            if(!param.get("filtr")) array = array.filter(e => e.iduser === store.auth.id && (e.status === "zakończone" || e.status === "anulowane"))
            if(param.get("filtr") === "zakończone") array = array.filter(e => e.iduser === store.auth.id && e.status === "zakończone")
            if(param.get("filtr") === "anulowane") array = array.filter(e => e.iduser === store.auth.id && e.status === "anulowane")
        }
    }

    if(store.auth && store.auth.status === "instalator") {
        if(location.pathname === `/zlecenia`) {
            if(!param.get("filtr")) array = array.filter(e => e.isZlecenie === true && (e.status !== "anulowane" && e.status !== "zakończone") && ((e.worker?.id === store.auth.id || e.installer?.some(x => x.id === store.auth.id)) || (e.status === "nowe" || e.status === "podjęte")))
            // if(param.get("filtr") === "moje") array = array.filter(e => e.installer.every(x => x.id !== store.auth.id) && e.status === "nowe" && e.isZlecenie === true)
        }
        if(location.pathname === `/zlecenia/aktywne`) {
            if(!param.get("filtr")) array = array.filter(e => e.isZlecenie === true && ((e.worker?.id === store.auth.id && e.status === "podjęte") || (e.installer.some(x => x.id === store.auth.id) && e.status === "nowe")))
            if(param.get("filtr") === "podjęte") array = array.filter(e => e.worker?.id === store.auth.id && e.status === "podjęte")
            if(param.get("filtr") === "oferty") array = array.filter(e => e.installer.some(x => x.id === store.auth.id) && e.status === "nowe")
        }
        if(location.pathname === `/zlecenia/historia`) {
            if(!param.get("filtr")) array = array.filter(e => e.isZlecenie === true && e.status === "zakończone" && ((e.worker?.id === store.auth.id || e.installer?.some(x => x.id === store.auth.id)) || e.status === "nowe"))
            // if(param.get("filtr") === "zakończone") array = array.filter(e => e.worker?.id === store.auth.id && e.status === "zakończone")
        }
    }

    const handleRouterDeleteParam = (event) => {
        param.delete(event)
        setParam(param)
    }

    const handleRouterAddParam = (event, value) => {
        param.set(event, value)
        setParam(param)
    }

    const handleRouterPageParam = (page) => {
        param.set("page", page)
        setParam(param)
    }

    return (
        <>

            <div className="flex flex-col items-center justify-center w-[1000px] m-auto gap-[2rem]">

                {store.numberTask === 4 &&
                
                    <div className="flex gap-[2rem] flex-col items-center justify-between p-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                        <div className="flex flex-col items-center gap-[1rem]">
                            <p className="_text-discounts-white">Dziękujemy za stworzenie zlecenia!</p>
                            <p>Trwa weryfikacja Twojego zlecenia!</p>
                        </div>
            
                        <button className="absolute top-0 right-0 p-[1rem] font-['Material_icons']" onClick={() => store.taskSet(0)}>close</button>
        
                    </div>
                }

                {store.numberTask === 5 &&
                
                    <div className="flex gap-[2rem] flex-col items-center justify-between p-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                        <div className="flex flex-col items-center gap-[1rem]">
                            <p className="_text-discounts-white">Dziękujemy za wysłanie oferty!</p>
                            <p>Proszę poczekać na decyzję klienta!</p>
                        </div>
            
                        <button className="absolute top-0 right-0 p-[1rem] font-['Material_icons']" onClick={() => store.taskSet(0)}>close</button>
        
                    </div>
                }

                {[].concat(array).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).slice(start, 100)?.map(e => (

                    <div className={`flex items-center justify-between bg-[#00000040] ${colorStatus(e.status, e.iduser, e.installer)} backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]`} key={e.id}>

                        <div className="flex flex-col gap-[1rem]">

                            <div className="">
                                <p className="">#{e.NR}</p>
                                <p className="font-bold text-white">{e.nazwa}</p>
                                {(store.auth && store.auth.id === e.iduser) &&
                                    <>
                                        {e.isZlecenie === true && <p className="italic text-[.8rem] text-[#28c76f]">ZWERYFIKOWANE</p>}   
                                        {e.isZlecenie === false && <p className="italic text-[.8rem] text-[#ed143d]">NIEZWERYFIKOWANE</p>} 
                                    </>
                                }
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">construction</p>
                                    <p>{(e.typ).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">sort</p>
                                    <p>{(e.rodzaj).join(', ')}{e.rodzajInne ? `, ${e.rodzajInne}` : ``}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">home</p>
                                    <p>{(e.obiekt).join(', ')}{e.obiektInne ? `, ${e.obiektInne}` : ``}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">place</p>
                                    <p>{e.miejsce} ({e.wojewodztwo})</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">schedule</p>
                                    <p>{(e.data).join(', ')}</p>
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col gap-[1rem]">

                            {store.auth ?
                                <>
                                    {store.auth.status === "klient" &&
                                        <>
                                            {store.auth.id === e.iduser && 
                                                <>
                                                    {(e.status === "nowe" || e.status === "podjęte") && <Link className={`_button-cart-pink text-center m-auto`} to={`/zlecenia/aktywne/${e.id}?${createSearchParams(param)}`}>Pokaż ofertę</Link>}
                                                    {e.status === "zakończone" && <Link className={`_button-cart-green text-center m-auto`} to={`/zlecenia/historia/${e.id}?${createSearchParams(param)}`}>Pokaż ofertę</Link>}
                                                    {e.status === "anulowane" && <Link className={`_button-cart-white text-center m-auto`} to={`/zlecenia/historia/${e.id}?${createSearchParams(param)}`}>Pokaż ofertę</Link>}
                                                </>
                                            }
                                            {store.auth.id !== e.iduser && <Link className={`_button-cart-blue text-center m-auto`} to={`/zlecenia/instalator`}>Złóż ofertę</Link>}
                                        </>
                                    }
                                    {store.auth.status === "instalator" &&
                                        <>
                                            {(e.installer).every(x=> x.id !== store.auth.id && e.installer.length < 5) ?
                                                <>
                                                    {/* {(store.auth.isList === true && auth.currentUser.emailVerified) ?
                                                        <Link className={`_button-cart-blue text-center m-auto`} to={`/zlecenia/aktywne/${e.id}`}>Złóż ofertę</Link>
                                                        :
                                                        <Link className={`_button-cart-blue text-center m-auto`} to={`/zlecenia`}>{`Złóż ofertę`}</Link>
                                                    } */}
                                                    <Link className={`_button-cart-blue text-center m-auto`} to={`/zlecenia/aktywne/${e.id}`}>Złóż ofertę</Link>
                                                </>
                                             :
                                                <></>
                                            }
                                            {(e.status === "nowe" || e.status === "podjęte") && (e.installer).some(x=> x.id === store.auth.id) && <Link className={`_button-cart-pink text-center m-auto`} to={`/zlecenia/aktywne/${e.id}?${createSearchParams(param)}`}>Pokaż ofertę</Link>}
                                            {e.status === "zakończone" && (e.installer).some(x=> x.id === store.auth.id) && <Link className={`_button-cart-green text-center m-auto`} to={`/zlecenia/aktywne/${e.id}?${createSearchParams(param)}`}>Pokaż ofertę</Link>}
                                        </>
                                    }
                                </>
                            :
                                <Link className={`_button-cart-blue text-center m-auto`} to={`/logowanie`}>{`Złóż ofertę`}</Link>
                            }

                            <div className="flex items-center justify-center gap-[1rem] italic">
                                <p className="w-[10rem]">{useTimestamp(e.createdAt)}</p>
                            </div>

                            {(store.auth && (store.auth?.id === e.iduser || store.auth?.id === e.worker?.id)) && <div className="flex items-center justify-center gap-[2rem] text-[1.6rem]">
                            {e.isZlecenieDoneK ? 
                                    <p className="font-['Material_icons'] text-[#28c76f]">person</p> 
                                : 
                                    <p className="font-['Material_icons'] text-[#ed143d]">person</p> 
                            }
                            {e.isZlecenieDoneI ? 
                                    <p className="font-['Material_icons'] text-[#28c76f]">handyman</p> 
                                : 
                                    <p className="font-['Material_icons'] text-[#ed143d]">handyman</p> 
                            }
                            </div>}


                        </div>

                    </div>

                ))}

            </div>
        </>       
    )
}
  