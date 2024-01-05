import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom"

import { useStore } from "../zustand.config"
// import useStartSlice from "../hooks/useStartSlice"
// import useEndSlice from "../hooks/useEndSlice"

export const ItemShop = () => {
    const store = useStore()
    const navigate = useNavigate()

    const { idKategoria1, idKategoria2, idKategoria3, idKategoria4, idProdukt } = useParams()
    const [param, setParam] = useSearchParams()
    
    let array = store.product
    let start = param.get("page") ? (parseFloat(param.get("page")) - 1) * 10 : 0
    let end = param.get("page") ? ((parseFloat(param.get("page")) - 1) * 10) + 10 : 10

    if(idKategoria1) array = array.filter(e => e.kategoria1.includes(idKategoria1))
    if(idKategoria2) array = array.filter(e => e.kategoria2.includes(idKategoria2))
    if(idKategoria3) array = array.filter(e => e.kategoria3.includes(idKategoria3))
    if(idKategoria4) array = array.filter(e => e.kategoria4.includes(idKategoria4))
    if(param.get("search")) array = array.filter(({nazwa, kategoria1, kategoria2, kategoria3, kategoria4, producent}) => 
    (
        nazwa.toLowerCase().includes(param.get("search")) || 
        kategoria1.toLowerCase().includes(param.get("search")) || 
        kategoria2.toLowerCase().includes(param.get("search")) || 
        kategoria3.toLowerCase().includes(param.get("search")) || 
        kategoria4.toLowerCase().includes(param.get("search")) || 
        // cenabrutto.toLowerCase().includes(param.get("search")) || 
        // cenanetto.toLowerCase().includes(param.get("search")) || 
        producent.toLowerCase().includes(param.get("search"))
    ))
    if(param.get("producer")) array = array.filter(e => e.producent.includes(param.get("producer")))
    if(!param.get("sort")) array = [].concat(array).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
    if(param.get("sort") === "sortMinToMax") array = [].concat(array).sort((a, b) => Number(a.cenabrutto) > Number(b.cenabrutto) ? 1 : -1)
    if(param.get("sort") === "sortMaxToMin") array = [].concat(array).sort((a, b) => Number(a.cenabrutto) < Number(b.cenabrutto) ? 1 : -1)
    if(param.get("sort") === "sortAToZ") array = [].concat(array).sort((a, b) => a.nazwa > b.nazwa ? 1 : -1)
    if(param.get("sort") === "sortZToA") array = [].concat(array).sort((a, b) => a.nazwa < b.nazwa ? 1 : -1)

    return (
        <>
            {[].concat(array).slice(start, end)?.map(e => (

                <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

                    <div className="flex w-[100%] lg:flex-col lg:gap-[2rem]">

                        <div className="flex flex-col w-[100%] gap-[2rem] lg:items-center">

                            <div className="flex flex-col gap-[.5rem]">

                                <Link className="_item-title" to={`/sklep/produkt/${e.nazwa.replaceAll(" ", "-")}`}>{e.nazwa}</Link>
                                <div>
                                    <Link className="" to={`/sklep/kategoria/${e.kategoria1.replaceAll(" ", "-")}`}>{e.kategoria1}</Link>
                                    {e.kategoria2 && <Link className="" to={`/sklep/kategoria/${e.kategoria1.replaceAll(" ", "-")}/${e.kategoria2.replaceAll(" ", "-")}`}> / {e.kategoria2}</Link>}
                                    {e.kategoria3 && <Link className="" to={`/sklep/kategoria/${e.kategoria1.replaceAll(" ", "-")}/${e.kategoria2.replaceAll(" ", "-")}/${e.kategoria3.replaceAll(" ", "-")}`}> / {e.kategoria3}</Link>}
                                    {e.kategoria4 && <Link className="" to={`/sklep/kategoria/${e.kategoria1.replaceAll(" ", "-")}/${e.kategoria2.replaceAll(" ", "-")}/${e.kategoria3.replaceAll(" ", "-")}/${e.kategoria4.replaceAll(" ", "-")}`}> / {e.kategoria4}</Link>}
                                </div>
                            </div>

                            <div className="flex gap-[2rem] lg:flex-col">

                                <img className="max-w-[100%] max-h-[100%] w-[150px] h-[150px] object-contain" alt={e.nazwa} src={e.zdjecie[0]}/>

                                <div className="flex flex-col">

                                    <div className="flex gap-[2rem]">

                                        <p className="_item-param">Producent</p>
                                        <p className="_item-param-result">{e.producent}</p>

                                    </div>

                                    {e.seria && <div className="flex gap-[2rem]">

                                        <p className="_item-param">Seria</p>
                                        <p className="_item-param-result">{e.seria}</p>

                                    </div>}

                                    {e.index && <div className="flex gap-[2rem]">

                                        <p className="_item-param">Index</p>
                                        <p className="_item-param-result">{e.index}</p>

                                    </div>}

                                </div>

                            </div>

                        </div>

                        <div className="flex flex-col w-[100%] gap-[2rem]">

                            <div className="flex flex-wrap justify-end w-[100%] lg:justify-center lg:gap-[2rem]">

                                <div className="flex flex-col h-[100%] text-center gap-[2rem] lg:gap-[.5rem]">

                                    <p className="_item-price-title">Cena katalogowa</p>

                                    <div className="flex flex-col">

                                        <p className="_item-price">{e.ilosc ? (e.cenanetto*e.ilosc).toFixed(2) : e.cenanetto} zł</p>
                                        <p className="_item-price-italic" margin="none">netto</p>

                                    </div>

                                    <div className="flex flex-col">

                                        <p className="_item-price">{e.ilosc ? (e.cenabrutto*e.ilosc).toFixed(2) : e.cenabrutto} zł</p>
                                        <p className="_item-price-italic">brutto</p>

                                    </div>

                                </div>

                                <div className="flex flex-col h-[100%] text-center lg:gap-[.5rem]">

                                    <p className="_item-price-title mb-[2rem]">Rabat</p>
                                    {store.auth?.rabaty.find(x => x.producer === e.producent) && <p className="_item-price">{store.auth.rabaty.find(x => x.producer === e.producent).percent} %</p>}
                                    {!store.auth?.rabaty.find(x => x.producer === e.producent) && <p className="_item-price">-</p>}

                                </div>

                                <div className="flex flex-col h-[100%] text-center gap-[2rem] lg:gap-[.5rem]">

                                    <p className="_item-price-title">Moja cena</p>

                                    <div className="flex flex-col">

                                        {store.auth?.rabaty.find(x => x.producer === e.producent) && <p className="_item-price">{e.ilosc ? ((100-store.auth.rabaty.find(x => x.producer === e.producent).percent)/100*(e.cenanetto*e.ilosc)).toFixed(2) : ((100-store.auth.rabaty.find(x => x.producer === e.producent).percent)/100*e.cenanetto).toFixed(2)} zł</p>}
                                        {!store.auth?.rabaty.find(x => x.producer === e.producent) && <p className="_item-price">{e.ilosc ? (e.cenanetto*e.ilosc).toFixed(2) : e.cenanetto} zł</p>}
                                        <p className="_item-price-italic">netto</p>

                                    </div>

                                    <div className="flex flex-col">

                                        {store.auth?.rabaty.find(x => x.producer === e.producent) && <p className="_item-price-active">{e.ilosc ? ((100-store.auth.rabaty.find(x => x.producer === e.producent).percent)/100*(e.cenabrutto*e.ilosc)).toFixed(2) : ((100-store.auth.rabaty.find(x => x.producer === e.producent).percent)/100*e.cenabrutto).toFixed(2)} zł</p>}
                                        {!store.auth?.rabaty.find(x => x.producer === e.producent) && <p className="_item-price-active">{e.ilosc ? (e.cenabrutto*e.ilosc).toFixed(2) : e.cenabrutto} zł</p>}
                                        <p className="_item-price-italic-active">brutto</p>

                                    </div>

                                </div> 

                            </div>
                            
                            {e.status === "wystawiony" && <div className="flex justify-end gap-[2rem] lg:justify-center">

                                {e.miara === "Sztuka" && <input className="_button-cart-smallinput" pattern="[1-9]\d*" value={e.ilosc ? e.ilosc : ""} placeholder='Ilość' onChange={(x) => store.productQuantity(e.id, x.target.value, x.target.validity.valid)}/>}
                                {e.miara === "Metr" && <input className="_button-cart-smallinput" pattern="[1-9]\d*" value={e.ilosc ? e.ilosc : ""} placeholder='Metr' onChange={(x) => store.productQuantity(e.id, x.target.value, x.target.validity.valid)}/>}
                                <button className="_button-cart-smallpink" type="button" onClick={() => store.auth ? e.ilosc > 0 ? store.authCartAdd(e) : null : navigate("/logowanie")}>Dodaj</button>

                            </div>}

                            {e.status === "niedostępny" && <div className="flex justify-end gap-[2rem] lg:justify-center">

                                <p className="text-[#ea5455] italic">Brak w magazynie!</p>

                            </div>}

                        </div>

                    </div>

                </div>

            ))}

        </>
    )
}