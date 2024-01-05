import { useStore } from "../zustand.config"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useState } from "react"

import { Nav } from "./Nav"
import { Location } from "./Location"

export const AppItem = () => {
    const store = useStore()
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(0)

    const { idProdukt } = useParams()

    return (
        <>
            <Nav render="category"/>

            <div className="flex flex-col items-center w-[1000px] m-auto gap-[2rem]">

                <Location/>

                {store.product.filter(e => e.nazwa === idProdukt.replaceAll("-", " ")).map(e => (

                    <div className="flex flex-col items-center justify-center gap-[2rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

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

                                    <img className="max-w-[100%] max-h-[100%] w-[150px] h-[150px] object-contain" alt={e.nazwa} src={e.zdjecie[isHovered]}/>

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

                        <div className="flex flex-wrap items-center justify-between w-full text-center gap-[2rem] lg:justify-center">

                            <div className="flex flex-wrap items-center gap-[1rem]">

                                {/* <span className="_item-icon">navigate_before</span> */}
                                {e.zdjecie[0] && <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain cursor-pointer" onClick={() => setIsHovered(0)} alt={e.nazwa} src={e.zdjecie[0]}/>}
                                {e.zdjecie[1] && <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain cursor-pointer" onClick={() => setIsHovered(1)} alt={e.nazwa} src={e.zdjecie[1]}/>}
                                {e.zdjecie[2] && <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain cursor-pointer" onClick={() => setIsHovered(2)} alt={e.nazwa} src={e.zdjecie[2]}/>}
                                {e.zdjecie[3] && <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain cursor-pointer" onClick={() => setIsHovered(3)} alt={e.nazwa} src={e.zdjecie[3]}/>}
                                {e.zdjecie[4] && <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain cursor-pointer" onClick={() => setIsHovered(4)} alt={e.nazwa} src={e.zdjecie[4]}/>}
                                {/* <span className="_item-icon">navigate_next</span>*/}

                            </div>

                            <Link className="_button-cart-pink" to="/koszyk">Przejdź do koszyka</Link>

                        </div>

                        <div className="flex flex-col w-full gap-[2rem]">

                            {e.dokumentacja && <>
                                <Link className="_button-cart-blue text-center ml-auto" to={e.dokumentacja}>Przejdź do dokumentacji</Link>
                            </>}
                            
                            <p className="">Opis</p>

                            <p className="whitespace-pre-line text-left">{e.opis.split("  ").join("\n")}</p>

                            {e.parametry && 

                            <>

                                <p className="">Parametry</p>

                                <div className="flex flex-col gap-[1rem]">
                                    {e.parametry[0] && <div className="flex gap-[1rem]"><p>{store.parameter?.find(x => x.id === e.parametry[0]?.id).nazwa}</p><p>{e.parametry[0].value}</p></div>}
                                    {e.parametry[1] && <div className="flex gap-[1rem]"><p>{store.parameter?.find(x => x.id === e.parametry[1]?.id).nazwa}</p><p>{e.parametry[1].value}</p></div>}
                                    {e.parametry[2] && <div className="flex gap-[1rem]"><p>{store.parameter?.find(x => x.id === e.parametry[2]?.id).nazwa}</p><p>{e.parametry[2].value}</p></div>}
                                    {e.parametry[3] && <div className="flex gap-[1rem]"><p>{store.parameter?.find(x => x.id === e.parametry[3]?.id).nazwa}</p><p>{e.parametry[3].value}</p></div>}
                                    {e.parametry[4] && <div className="flex gap-[1rem]"><p>{store.parameter?.find(x => x.id === e.parametry[4]?.id).nazwa}</p><p>{e.parametry[4].value}</p></div>}
                                </div>

                            </>

                            }

                            {e.powiazania && 
                            
                            <>
                            
                                <p className="">Powiązania</p>

                                <div className="flex flex-wrap items-center w-full gap-[1rem]">

                                    {e.powiazania[0] && <Link className="flex flex-col items-center gap-[1rem]" to={`/sklep/produkt/${store.product.find(x => x.id === e.powiazania[0]?.id)?.nazwa.replaceAll(" ", "-")}`}>
                                        <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" alt={store.product.find(x => x.id === e.powiazania[0]?.id)?.nazwa} src={store.product.find(x => x.id === e.powiazania[0]?.id)?.zdjecie[0]}/>
                                        <p className="">{store.product.find(x => x.id === e.powiazania[0]?.id)?.nazwa}</p>
                                        <p className="">{store.product.find(x => x.id === e.powiazania[0]?.id)?.cenabrutto} zł</p>
                                    </Link>}

                                    {e.powiazania[1] && <Link className="flex flex-col items-center gap-[1rem]" to={`/sklep/produkt/${store.product.find(x => x.id === e.powiazania[1]?.id)?.nazwa.replaceAll(" ", "-")}`}>
                                        <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" alt={store.product.find(x => x.id === e.powiazania[1]?.id)?.nazwa} src={store.product.find(x => x.id === e.powiazania[1]?.id)?.zdjecie[0]}/>
                                        <p className="">{store.product.find(x => x.id === e.powiazania[1]?.id)?.nazwa}</p>
                                        <p className="">{store.product.find(x => x.id === e.powiazania[1]?.id)?.cenabrutto} zł</p>
                                    </Link>}

                                    {e.powiazania[2] && <Link className="flex flex-col items-center gap-[1rem]" to={`/sklep/produkt/${store.product.find(x => x.id === e.powiazania[2]?.id)?.nazwa.replaceAll(" ", "-")}`}>
                                        <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" alt={store.product.find(x => x.id === e.powiazania[2]?.id)?.nazwa} src={store.product.find(x => x.id === e.powiazania[2]?.id)?.zdjecie[0]}/>
                                        <p className="">{store.product.find(x => x.id === e.powiazania[2]?.id)?.nazwa}</p>
                                        <p className="">{store.product.find(x => x.id === e.powiazania[2]?.id)?.cenabrutto} zł</p>
                                    </Link>}


                                </div>

                            </>
                            }

                        </div>

                    </div>

                ))}

            </div>
        </>
    )
}