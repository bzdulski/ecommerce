import { useStore } from "../zustand.config"
import { Link } from "react-router-dom";

export const ItemCart = () => {
    const store = useStore()

    return (
        <>
            {store.auth.koszyk.produkty.map(e => (

                <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

                    <div className="flex w-[100%] lg:flex-col lg:gap-[2rem]">

                        <div className="flex flex-col w-[100%] gap-[2rem] lg:items-center">

                            <div className="flex flex-col gap-[.5rem]">

                                <div className="flex gap-[1rem]">
                                    <span className="font-bold">{store.auth.koszyk.produkty.indexOf(e) + 1}</span>
                                    <Link className="_item-title" to={`/sklep/produkt/${e.nazwa.replaceAll(" ", "-")}`}>{e.nazwa}</Link>
                                </div>
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

                                    <p className="_item-price-title">Rabat</p>
                                    {e.rabat && <p className="_item-price">{e.rabat} %</p>}
                                    {!e.rabat && <p className="_item-price">-</p>}

                                </div>

                                <div className="flex flex-col h-[100%] text-center gap-[2rem] lg:gap-[.5rem]">

                                    <p className="_item-price-title">Moja cena</p>

                                    <div className="flex flex-col">

                                        {e.rabat && <p className="_item-price">{e.ilosc ? ((100-e.rabat)/100*(e.cenanetto*e.ilosc)).toFixed(2) : ((100-e.rabat)/100*e.cenanetto).toFixed(2)} zł</p>}
                                        {!e.rabat && <p className="_item-price">{e.ilosc ? (e.cenanetto*e.ilosc).toFixed(2) : e.cenanetto} zł</p>}
                                        <p className="_item-price-italic">netto</p>

                                    </div>

                                    <div className="flex flex-col">

                                        {e.rabat && <p className="_item-price-active">{e.ilosc ? ((100-e.rabat)/100*(e.cenabrutto*e.ilosc)).toFixed(2) : ((100-e.rabat)/100*e.cenabrutto).toFixed(2)} zł</p>}
                                        {!e.rabat && <p className="_item-price-active">{e.ilosc ? (e.cenabrutto*e.ilosc).toFixed(2) : e.cenabrutto} zł</p>}
                                        <p className="_item-price-italic-active">brutto</p>

                                    </div>

                                </div> 

                            </div>

                            <div className="flex justify-end gap-[2rem] lg:justify-center">

                                {e.miara === "Sztuka" && <input className="_button-cart-smallinput" pattern="[1-9]\d*" value={e.ilosc ? e.ilosc : ""} placeholder='Ilość' onChange={(x) => store.authCartQuantity(e.id, x.target.value, x.target.validity.valid)}/>}
                                {e.miara === "Metr" && <input className="_button-cart-smallinput" pattern="[1-9]\d*" value={e.ilosc ? e.ilosc : ""} placeholder='Metr' onChange={(x) => store.authCartQuantity(e.id, x.target.value, x.target.validity.valid)}/>}
                                <button className="_button-cart-smallblue" type="button" onClick={() => store.authCartRemove(store.auth.koszyk.produkty.filter(x => x.id !== e.id))}>Usuń</button>

                            </div>

                        </div>

                    </div>

                </div>

            ))}
        </>
    )
}