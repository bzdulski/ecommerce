import { useState } from "react"
import { useStore } from "../zustand.config"
import { Link, useLocation, useParams, useNavigate } from "react-router-dom"
import { useTimestamp } from "../hooks/useTimestamp"

export const AppTaskAll = () => {
    const store = useStore()
    const location = useLocation()
    const navigate = useNavigate()
    const { idTask } = useParams()
    const [inputMsg, setInputMsg] = useState()    
    const [inputPrice, setInputPrice] = useState()
    return (
        <>
            <div className="flex flex-col items-center justify-center w-[1000px] m-auto gap-[2rem]">

                <div className="flex flex-wrap font-bold w-[100%] gap-[2rem] text-lg lg:pl-[2rem] lg:pr-[2rem]">
                    <Link className="" to={`/zlecenia`}>Zlecenia</Link>
                    <span className="">&#10157;</span>
                    <Link className="" to={`/zlecenia/${idTask}`}>{idTask}</Link>
                </div>











                <h1 className="text-3xl italic text-teal-500">PRZED PODJĘCIEM OFERTY (WIDOK KLIENTA)</h1>

                {store.auth.status === "klient" && store.task?.filter(e => e.id === idTask && e.status === "nowe").map(e => (

                    <div className="flex items-center justify-between bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

                        <div className="flex flex-col gap-[1rem]">

                            <div className="">
                                <p className="">#{e.NR}</p>
                                <p className="font-bold text-white">Nazwa zlecenia</p>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">construction</p>
                                    <p>{(e.typ).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">sort</p>
                                    <p>{(e.rodzaj).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">home</p>
                                    <p>{(e.obiekt).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">place</p>
                                    <p>{e.miejsce}</p>
                                </div>
                            </div>

                            <p>{e.opis}</p>

                        </div>

                        <div className="flex flex-col gap-[1rem]">

                            <div className="flex items-center justify-center gap-[1rem] italic">
                                <p>{useTimestamp(e.createdAt)}</p>
                            </div>

                            <button className={`_button-cart-white text-center`} onClick={() => {store.taskDelete(e.id);navigate(`/zlecenia`)}}>Anuluj ofertę</button>

                            <div className="flex items-center justify-center gap-[.5rem]">
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                            </div>

                        </div>

                    </div>

                    ))}


















                <h1 className="text-3xl italic text-yellow-500">PRZED PODJĘCIEM OFERTY (WIDOK INSTALATORA)</h1>

                {store.auth.status === "instalator" && store.task?.filter(e => e.id === idTask && e.status === "nowe").map(e => (
                    <>
                    <div className="flex items-center justify-between bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

                        <div className="flex flex-col gap-[1rem]">

                            <div className="">
                                <p className="">#{e.NR}</p>
                                <p className="font-bold text-white">Nazwa zlecenia</p>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">construction</p>
                                    <p>{(e.typ).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">sort</p>
                                    <p>{(e.rodzaj).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">home</p>
                                    <p>{(e.obiekt).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">place</p>
                                    <p>{e.miejsce}</p>
                                </div>
                            </div>

                            <p>{e.opis}</p>

                        </div>

                        <div className="flex flex-col gap-[1rem]">

                            <div className="flex items-center justify-center gap-[1rem] italic">
                                <p>{useTimestamp(e.createdAt)}</p>
                            </div>

                            <div className="flex items-center justify-center gap-[.5rem]">
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                            </div>

                        </div>

                    </div>

                    {(e.installer).every(x=> x.id !== store.auth.id) && <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                    <div className="flex items-center justify-between w-full gap-[2rem]">
                        <div className="flex flex-col gap-[2rem] w-full">
                            <textarea className="_button-cart-input h-[10rem] w-full resize-none" value={inputMsg} onChange={(x) => setInputMsg(x.target.value)} placeholder="Wpisz wiadomość!"/>
                            <input className="_button-cart-input h-[3rem] w-full resize-none" value={inputPrice} onChange={(x) => setInputPrice(x.target.value)} placeholder="Wpisz kwotę!"/>
                        </div>
                        <button className={`_button-cart-blue text-center`} onClick={() => {store.taskHired({id: e.id, installerarray: e.installer, installer: store.auth.id, msg: inputMsg, price: inputPrice});navigate(`/zlecenia/thx`)}}>Podejmij ofertę</button>
                    </div>
                    </div>}

                    {(e.installer).some(x=> x.id === store.auth.id) && <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                    <div className="flex items-center justify-between w-full gap-[2rem]">
                        <div className="flex flex-col gap-[1rem] w-full">
                            <p  className="flex gap-[.5rem]"><p className="text-white">Wiadomość:</p>{(e.installer).find(x => x.id === store.auth.id).msg}</p>
                            <p className="flex gap-[.5rem]"><p className="text-white">Kwota:</p>{(e.installer).find(x => x.id === store.auth.id).price} zł</p>
                        </div>
                    </div>
                    </div>}

                    </>
                    ))}

















                    <h1 className="text-3xl italic text-teal-500">PO PODJĘCIU OFERTY (WIDOK KLIENTA)</h1>

                    {store.auth.status === "klient" && store.task?.filter(e => e.id === idTask && e.status === "podjęte").map(e => (
                    <>
                    <div className="flex items-center justify-between bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

                        <div className="flex flex-col gap-[1rem]">

                            <div className="">
                                <p className="">#{e.NR}</p>
                                <p className="font-bold text-white">Nazwa zlecenia</p>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">construction</p>
                                    <p>{(e.typ).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">sort</p>
                                    <p>{(e.rodzaj).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">home</p>
                                    <p>{(e.obiekt).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">place</p>
                                    <p>{e.miejsce}</p>
                                </div>
                            </div>

                            <p>{e.opis}</p>

                        </div>

                        <div className="flex flex-col gap-[1rem]">

                            <div className="flex items-center justify-center gap-[1rem] italic">
                                <p>{useTimestamp(e.createdAt)}</p>
                            </div>

                            <button className={`_button-cart-white text-center`} onClick={() => {store.taskDelete(e.id);navigate(`/zlecenia`)}}>Anuluj ofertę</button>

                            <div className="flex items-center justify-center gap-[.5rem]">
                                <p className="font-['Material_icons'] text-[1.5rem] text-white">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-white">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                            </div>

                        </div>

                    </div>

                    <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                    <div className="flex items-center justify-between w-full gap-[2rem]">
                        <div className="flex flex-col gap-[1rem] w-full">
                            <p className="flex gap-[.5rem]"><p className="text-white">Imię:</p>Janek</p>
                            <p  className="flex gap-[.5rem]"><p className="text-white">Wiadomość:</p>Dzień dobry, Chętnie podejmę się zlecenia montażu okablowania w Państwa domu. Posiadam doświadczenie i kompetencje, aby zapewnić profesjonalną instalację zgodnie z Państwa oczekiwaniami. Proszę o więcej szczegółów dotyczących projektu.</p>
                            <p className="flex gap-[.5rem]"><p className="text-white">Kwota:</p>7000 zł</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-[1rem]">
                            <p>738 745 777</p>
                            <button className={`_button-cart-pink text-center`} onClick={() => navigate(`/zlecenia`)}>Podejmij instalatora</button>
                        </div>
                    </div>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                    <div className="flex items-center justify-between w-full gap-[2rem]">
                        <div className="flex flex-col gap-[1rem] w-full">
                            <p className="flex gap-[.5rem]"><p className="text-white">Imię:</p>Mirek</p>
                            <p  className="flex gap-[.5rem]"><p className="text-white">Wiadomość:</p>Dzień dobry, Chętnie podejmę się zlecenia montażu okablowania w Państwa domu. Posiadam doświadczenie i kompetencje, aby zapewnić profesjonalną instalację zgodnie z Państwa oczekiwaniami. Proszę o więcej szczegółów dotyczących projektu.</p>
                            <p className="flex gap-[.5rem]"><p className="text-white">Kwota:</p>7000 zł</p>
                        </div>
                        <button className={`_button-cart-blue text-center`} onClick={() => navigate(`/zlecenia`)}>Pokaż numer</button>
                    </div>
                    </div>
                    </>
                    ))}















                    <h1 className="text-3xl italic text-yellow-500">PO PODJĘCIU OFERTY (WIDOK INSTALATORA)</h1>

                    {store.auth.status === "instalator" && store.task?.filter(e => e.id === idTask && e.status === "podjęte").map(e => (
                    <>
                    <div className="flex items-center justify-between bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

                        <div className="flex flex-col gap-[1rem]">

                            <div className="">
                                <p className="">#{e.NR}</p>
                                <p className="font-bold text-white">Nazwa zlecenia</p>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">construction</p>
                                    <p>{(e.typ).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">sort</p>
                                    <p>{(e.rodzaj).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">home</p>
                                    <p>{(e.obiekt).join(', ')}</p>
                                </div>
                                <div className="flex gap-[.5rem]">
                                    <p className="font-['Material_icons'] text-white">place</p>
                                    <p>{e.miejsce}</p>
                                </div>
                            </div>

                            <p>{e.opis}</p>

                        </div>

                        <div className="flex flex-col gap-[1rem]">

                            <div className="flex items-center justify-center gap-[1rem] italic">
                                <p>{useTimestamp(e.createdAt)}</p>
                            </div>

                            <div className="flex items-center justify-center gap-[.5rem]">
                                <p className="font-['Material_icons'] text-[1.5rem] text-white">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-white">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                            </div>

                        </div>

                    </div>

                    <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                    <div className="flex items-center justify-between w-full gap-[2rem]">
                        <div className="flex flex-col gap-[1rem] w-full">
                            <p  className="flex gap-[.5rem]"><p className="text-white">Wiadomość:</p>Dzień dobry, Chętnie podejmę się zlecenia montażu okablowania w Państwa domu. Posiadam doświadczenie i kompetencje, aby zapewnić profesjonalną instalację zgodnie z Państwa oczekiwaniami. Proszę o więcej szczegółów dotyczących projektu.</p>
                            <p className="flex gap-[.5rem]"><p className="text-white">Kwota:</p>7000 zł</p>
                        </div>
                    </div>
                    </div>
                    </>

                    ))}

























                    <h1 className="text-3xl italic text-teal-500">PO PODJĘCIU INSTALATORA (WIDOK KLIENTA)</h1>

                        {store.task?.filter(e => e.id === idTask).map(e => (

                            <div className="flex items-center justify-between bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

                                <div className="flex flex-col gap-[1rem]">

                                    <div className="">
                                        <p className="">#{e.NR}</p>
                                        <p className="font-bold text-white">Nazwa zlecenia</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-white">construction</p>
                                            <p>{(e.typ).join(', ')}</p>
                                        </div>
                                        <div className="flex gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-white">sort</p>
                                            <p>{(e.rodzaj).join(', ')}</p>
                                        </div>
                                        <div className="flex gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-white">home</p>
                                            <p>{(e.obiekt).join(', ')}</p>
                                        </div>
                                        <div className="flex gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-white">place</p>
                                            <p>{e.miejsce}</p>
                                        </div>
                                    </div>

                                    <p>{e.opis}</p>

                                </div>

                                <div className="flex flex-col gap-[1rem]">

                                    <div className="flex items-center justify-center gap-[1rem] italic">
                                        <p>{useTimestamp(e.createdAt)}</p>
                                    </div>

                                    <button className={`_button-cart-white text-center`} onClick={() => {store.taskDelete(e.id);navigate(`/zlecenia`)}}>Anuluj ofertę</button>

                                    <div className="flex items-center justify-center gap-[.5rem]">
                                        <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                        <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                        <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                        <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                        <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                    </div>

                                </div>

                            </div>

                            ))}

                        <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                            <div className="flex items-center justify-between w-full gap-[2rem]">
                                <div className="flex flex-col gap-[1rem] w-full">
                                    <p  className="flex gap-[.5rem]"><p className="text-white">Wiadomość:</p>Dzień dobry, Chętnie podejmę się zlecenia montażu okablowania w Państwa domu. Posiadam doświadczenie i kompetencje, aby zapewnić profesjonalną instalację zgodnie z Państwa oczekiwaniami. Proszę o więcej szczegółów dotyczących projektu.</p>
                                    <p className="flex gap-[.5rem]"><p className="text-white">Kwota:</p>7000 zł</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-[2rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                        {[].concat(store.product).slice(0, 1)?.map(e => (

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
                                            <button className="_button-cart-smallpink" type="button" onClick={() => store.auth ? store.authCartAdd(e) : navigate("/logowanie")}>Dodaj</button>

                                        </div>}

                                        {e.status === "niedostępny" && <div className="flex justify-end gap-[2rem] lg:justify-center">

                                            <p className="text-[#ea5455] italic">Brak w magazynie!</p>

                                        </div>}

                                    </div>

                                </div>

                            </div>

                            ))}
                            <button className={`_button-cart-blue text-center`} onClick={() => navigate(`/koszyk`)}>Przejdź do podsumowania</button>
                        </div>






















                        <h1 className="text-3xl italic text-yellow-500">PO PODJĘCIU INSTALATORA (WIDOK INSTALATORA)</h1>

                        {store.task?.filter(e => e.id === idTask).map(e => (

                            <div className="flex items-center justify-between bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

                                <div className="flex flex-col gap-[1rem]">

                                    <div className="">
                                        <p className="">#{e.NR}</p>
                                        <p className="font-bold text-white">Nazwa zlecenia</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-white">construction</p>
                                            <p>{(e.typ).join(', ')}</p>
                                        </div>
                                        <div className="flex gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-white">sort</p>
                                            <p>{(e.rodzaj).join(', ')}</p>
                                        </div>
                                        <div className="flex gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-white">home</p>
                                            <p>{(e.obiekt).join(', ')}</p>
                                        </div>
                                        <div className="flex gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-white">place</p>
                                            <p>{e.miejsce}</p>
                                        </div>
                                    </div>

                                    <p>{e.opis}</p>

                                </div>

                                <div className="flex flex-col gap-[1rem]">

                                    <div className="flex items-center justify-center gap-[1rem] italic">
                                        <p>{useTimestamp(e.createdAt)}</p>
                                    </div>

                                    <div className="flex items-center justify-center gap-[.5rem]">
                                        <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                        <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                        <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                        <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                        <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                    </div>

                                </div>

                            </div>

                            ))}

                        <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                            <div className="flex items-center justify-between w-full gap-[2rem]">
                                <div className="flex flex-col gap-[1rem] w-full">
                                    <p  className="flex gap-[.5rem]"><p className="text-white">Wiadomość:</p>Dzień dobry, Chętnie podejmę się zlecenia montażu okablowania w Państwa domu. Posiadam doświadczenie i kompetencje, aby zapewnić profesjonalną instalację zgodnie z Państwa oczekiwaniami. Proszę o więcej szczegółów dotyczących projektu.</p>
                                    <p className="flex gap-[.5rem]"><p className="text-white">Kwota:</p>7000 zł</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-[2rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                        {[].concat(store.product).slice(0, 1)?.map(e => (

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
                                            <button className="_button-cart-smallpink" type="button" onClick={() => store.auth ? store.authCartAdd(e) : navigate("/logowanie")}>Dodaj</button>

                                        </div>}

                                        {e.status === "niedostępny" && <div className="flex justify-end gap-[2rem] lg:justify-center">

                                            <p className="text-[#ea5455] italic">Brak w magazynie!</p>

                                        </div>}

                                    </div>

                                </div>

                            </div>

                            ))}
                            <button className={`_button-cart-pink text-center`} onClick={() => navigate(`/koszyk`)}>Przejdź do koszyka</button>
                        </div>












                        <h1 className="text-3xl italic text-green-500">PO PODSUMOWANIU (WIDOK KLIENTA / INSTALATORA)</h1>

                            {store.task?.filter(e => e.id === idTask).map(e => (

                                <div className="flex items-center justify-between bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

                                    <div className="flex flex-col gap-[1rem]">

                                        <div className="">
                                            <p className="">#{e.NR}</p>
                                            <p className="font-bold text-white">Nazwa zlecenia</p>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex gap-[.5rem]">
                                                <p className="font-['Material_icons'] text-white">construction</p>
                                                <p>{(e.typ).join(', ')}</p>
                                            </div>
                                            <div className="flex gap-[.5rem]">
                                                <p className="font-['Material_icons'] text-white">sort</p>
                                                <p>{(e.rodzaj).join(', ')}</p>
                                            </div>
                                            <div className="flex gap-[.5rem]">
                                                <p className="font-['Material_icons'] text-white">home</p>
                                                <p>{(e.obiekt).join(', ')}</p>
                                            </div>
                                            <div className="flex gap-[.5rem]">
                                                <p className="font-['Material_icons'] text-white">place</p>
                                                <p>{e.miejsce}</p>
                                            </div>
                                        </div>

                                        <p>{e.opis}</p>

                                    </div>

                                    <div className="flex flex-col gap-[1rem]">

                                        <div className="flex items-center justify-center gap-[1rem] italic">
                                            <p>{useTimestamp(e.createdAt)}</p>
                                        </div>

                                        <button className={`_button-cart-white text-center`} onClick={() => {store.taskDelete(e.id);navigate(`/zlecenia`)}}>Anuluj ofertę</button>

                                        <div className="flex items-center justify-center gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                            <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                            <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                            <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                            <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                        </div>

                                    </div>

                                </div>

                                ))}

                            <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                                <div className="flex items-center justify-between w-full gap-[2rem]">
                                    <div className="flex flex-col gap-[1rem] w-full">
                                        <p  className="flex gap-[.5rem]"><p className="text-white">Wiadomość:</p>Dzień dobry, Chętnie podejmę się zlecenia montażu okablowania w Państwa domu. Posiadam doświadczenie i kompetencje, aby zapewnić profesjonalną instalację zgodnie z Państwa oczekiwaniami. Proszę o więcej szczegółów dotyczących projektu.</p>
                                        <p className="flex gap-[.5rem]"><p className="text-white">Kwota:</p>7000 zł</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-[2rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                            {[].concat(store.product).slice(0, 1)?.map(e => (

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
                                                <button className="_button-cart-smallpink" type="button" onClick={() => store.auth ? store.authCartAdd(e) : navigate("/logowanie")}>Dodaj</button>

                                            </div>}

                                            {e.status === "niedostępny" && <div className="flex justify-end gap-[2rem] lg:justify-center">

                                                <p className="text-[#ea5455] italic">Brak w magazynie!</p>

                                            </div>}

                                        </div>

                                    </div>

                                </div>

                                ))}

                            </div>

                            <div className="flex flex-col gap-[2rem] items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                                <div className="flex flex-col">
                                    <p className="flex gap-[1rem]">Klient: <p className="text-red-500">Niezakończone</p></p>
                                    <p className="flex gap-[1rem]">Instalator: <p className="text-green-500">Zakończone</p></p>
                                </div>
                                <button className={`_button-cart-blue text-center`} onClick={() => navigate(`/zlecenia`)}>Zlecenie wykonane</button>
                                <button className={`_button-cart-pink text-center`} onClick={() => navigate(`/zlecenia`)}>Zlecenie niewykonane</button>
                            </div>












                            <h1 className="text-3xl italic text-green-500">PO WYKONANIU / NIEWYKONANIU (WIDOK KLIENTA / INSTALATORA)</h1>

                            {store.task?.filter(e => e.id === idTask).map(e => (

                                <div className="flex items-center justify-between bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]" key={e.id}>

                                    <div className="flex flex-col gap-[1rem]">

                                        <div className="">
                                            <p className="">#{e.NR}</p>
                                            <p className="font-bold text-white">Nazwa zlecenia</p>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex gap-[.5rem]">
                                                <p className="font-['Material_icons'] text-white">construction</p>
                                                <p>{(e.typ).join(', ')}</p>
                                            </div>
                                            <div className="flex gap-[.5rem]">
                                                <p className="font-['Material_icons'] text-white">sort</p>
                                                <p>{(e.rodzaj).join(', ')}</p>
                                            </div>
                                            <div className="flex gap-[.5rem]">
                                                <p className="font-['Material_icons'] text-white">home</p>
                                                <p>{(e.obiekt).join(', ')}</p>
                                            </div>
                                            <div className="flex gap-[.5rem]">
                                                <p className="font-['Material_icons'] text-white">place</p>
                                                <p>{e.miejsce}</p>
                                            </div>
                                        </div>

                                        <p>{e.opis}</p>

                                    </div>

                                    <div className="flex items-center justify-center flex-col gap-[1rem]">

                                        <div className="flex items-center justify-center gap-[1rem] italic">
                                            <p>{useTimestamp(e.createdAt)}</p>
                                        </div>

                                        <p className="text-green-500 italic">ZAKOŃCZONE</p>

                                        <div className="flex items-center justify-center gap-[.5rem]">
                                            <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                            <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                            <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                            <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                            <p className="font-['Material_icons'] text-[1.5rem] text-black">person</p>
                                        </div>

                                    </div>

                                </div>

                                ))}

                            <div className="flex flex-col items-center justify-center bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                                <div className="flex items-center justify-between w-full gap-[2rem]">
                                    <div className="flex flex-col gap-[1rem] w-full">
                                        <p  className="flex gap-[.5rem]"><p className="text-white">Wiadomość:</p>Dzień dobry, Chętnie podejmę się zlecenia montażu okablowania w Państwa domu. Posiadam doświadczenie i kompetencje, aby zapewnić profesjonalną instalację zgodnie z Państwa oczekiwaniami. Proszę o więcej szczegółów dotyczących projektu.</p>
                                        <p className="flex gap-[.5rem]"><p className="text-white">Kwota:</p>7000 zł</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-[2rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">
                            {[].concat(store.product).slice(0, 1)?.map(e => (

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
                                                <button className="_button-cart-smallpink" type="button" onClick={() => store.auth ? store.authCartAdd(e) : navigate("/logowanie")}>Dodaj</button>

                                            </div>}

                                            {e.status === "niedostępny" && <div className="flex justify-end gap-[2rem] lg:justify-center">

                                                <p className="text-[#ea5455] italic">Brak w magazynie!</p>

                                            </div>}

                                        </div>

                                    </div>

                                </div>

                                ))}

                            </div>




            </div>
        </>       
    )
}
  