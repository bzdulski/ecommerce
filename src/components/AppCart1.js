import { useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"
import { useStore } from "../zustand.config"
import { Link, useNavigate } from "react-router-dom"
import { PrintCartOF } from "./PrintCartOF"
import { PrintCartOFR } from "./PrintCartOFR"
import { ItemCart } from "./ItemCart"

export const AppCart1 = () => {
    const store = useStore()
    const navigate = useNavigate()
    const refCartOF = useRef(null)
    const refCartOFR = useRef(null)

    const [cartName, setCartName] = useState(store.auth.koszyk.nazwa)
    const [taskNr, setTaskNr] = useState(store.auth.koszyk.zlecenie === "KOSZYK" ? "KOSZYK" : store.task.find(x => x.NR === store.auth.koszyk.zlecenie))
    const [taskId, setTaskId] = useState(store.auth.koszyk.zlecenie === "KOSZYK" ? "KOSZYK" : store.task.find(x => x.NR === store.auth.koszyk.zlecenie).id)

    return (
        <div className="flex flex-col items-center w-[1000px] m-auto gap-[2rem]">

            <div className="flex gap-[2rem]">
                {store.auth.koszyk.nazwa !== "KOSZYK" && <button className="_button-cart-pink" type="button" onClick={() => navigate(`/zlecenia/aktywne/${store.task.find(x => x.nazwa === store.auth.koszyk.nazwa).id}`)}>Powrót do zlecenia</button>}
                <Link className="_button-cart-pink-block" to="/sklep">Kontynuuj zakupy</Link>
            </div>

            <div className="flex gap-[2rem]">

                <div className="flex gap-[2rem] lg:flex-col">

                    {/* <button className="_button-cart-pink" type="button" onClick={() => store.authCartTitle(cartName)}>Zmień nazwę</button> */}

                    <div className="flex flex-col gap-[2rem]">

                        <select className="_button-cart-input"
                            value={store.auth.koszyk.zlecenie === "KOSZYK" ? "KOSZYK" : store.task.find(x => x.NR === store.auth.koszyk.zlecenie).NR}
                            onChange={(event) => {event.target.value === "KOSZYK" ? store.setCart({produkty: store.auth.koszyk.produkty, nazwa: "KOSZYK", zlecenie: "KOSZYK"}) : store.setCart({produkty: store.task.find(x => x.NR === event.target.value).produkty, nazwa: (store.task.find(x => x.NR === event.target.value).nazwa), zlecenie: store.task.find(x => x.NR === event.target.value).NR});setTaskNr(event.target.value);setTaskId(event.target.value === "KOSZYK" ? "KOSZYK" : store.task.find(x => x.NR === event.target.value).id)}}>
                            <optgroup className="text-[#123456]" label="SKLEP">
                                <option className="text-[#000000]" value="KOSZYK">Koszyk</option>
                            </optgroup>
                            <optgroup className="text-[#561234]" label="ZLECENIA">
                                {store.task.map(x => (x.isZlecenie === true && (x.status === "nowe" || x.status === "podjęte") && (x.iduser === store.auth?.id || x.worker?.id === store.auth?.id)) && 
                                    <option className="text-[#000000]" key={x.id} value={x.NR}>{x.nazwa} ({x.NR})</option>
                                )}
                            </optgroup>
                        </select>

                        <button className="_button-cart-blue" type="button" onClick={() => taskNr === "KOSZYK" ? store.authCartSave(store.auth) : store.taskCartSave({id: taskId, produkty: store.auth.koszyk.produkty})}>Zapisz koszyk</button>

                    </div>

                    {/* <button className="_button-cart-blue" type="button" onClick={() => store.authCartClear([])}>Wyczyść koszyk</button> */}

                </div>

                <div className="flex gap-[2rem] lg:flex-col">

                    {/* <input className="_button-cart-input" value={cartName} onChange={(event) => setCartName(event.target.value)}/> */}
                    <div className="flex flex-col gap-[2rem]">
                        {store.auth.status === "instalator" && <button className="_button-cart-white" type="button" onClick={useReactToPrint({content: () => refCartOF.current})}>Ofertuj (dla klienta)</button>}

                        <button className="_button-cart-white" type="button" onClick={useReactToPrint({content: () => refCartOFR.current})}>Ofertuj (dla mnie)</button>
                    </div>

                    <div className="hidden">

                        <div className="" ref={refCartOF}>

                            <PrintCartOF/>

                        </div>

                    </div>

                    <div className="hidden">

                        <div className="" ref={refCartOFR}>

                            <PrintCartOFR/>

                        </div>

                    </div>

                </div>

            </div>

            {store.auth.koszyk.produkty.length === 0 &&

                <div className="flex flex-col items-center justify-center gap-[2rem] p-[2rem] m-auto w-full max-w-[30rem] bg-[#000000]/[.25] shadow-[inset_0_0_5rem_0_#ffffff40] rounded-[2rem] border-[1px] border-solid border-[#000000] backdrop-blur-[5px]">

                    <p className="">Twój koszyk jest pusty.</p>
                    <Link className="_button-cart-pink w-full max-w-[300px]" to="/sklep">Zacznij</Link>

                </div>

            }

            <ItemCart/>

            {store.auth.koszyk.produkty.length > 0 &&

                <div className="flex flex-col items-end text-center w-full gap-[2rem] lg:items-center">

                    <p className="_button-cart-white">{store.auth.koszyk.produkty.reduce((total, item) => item.rabat ? total+((100-item.rabat)*(item.cenabrutto*item.ilosc)/100) : total+(item.cenabrutto * item.ilosc), 0).toFixed(2)} zł</p>
                    {store.auth.koszyk.produkty.every(x => x.ilosc !== "") ?
                        <>
                            {store.auth.status === "klient" && <button className="_button-cart-blue w-full max-w-[300px]" type="button" onClick={() => store.paySet(1)}>Podsumowanie</button>}
                            {(store.auth.koszyk.nazwa === "KOSZYK" && store.auth.status === "instalator") && <button className="_button-cart-blue w-full max-w-[300px]" type="button" onClick={() => store.paySet(1)}>Podsumowanie</button>}
                            {(store.auth.koszyk.nazwa !== "KOSZYK" && store.auth.status === "instalator") && <button className="_button-cart-red w-full max-w-[300px]" type="button">Podsumowanie</button>}
                        </>
                    :
                        <button className="_button-cart-red w-full max-w-[300px]" type="button">Podsumowanie</button>
                    }

                </div>

            }
            
        </div>
    )
}
  