import { useState, useEffect } from "react"
import { useStore } from "../zustand.config"
import { Link, useLocation, useParams, useNavigate, useSearchParams, createSearchParams, } from "react-router-dom"
import { useTimestamp } from "../hooks/useTimestamp"

export const AppTaskVievI = () => {
    const store = useStore()
    const location = useLocation()
    const navigate = useNavigate()
    const { idTask } = useParams()
    const [param, setParam] = useSearchParams()
    const [inputMsg, setInputMsg] = useState()    
    const [inputPrice, setInputPrice] = useState()
    const [inputMsgWriter, setInputMsgWriter] = useState("")
    const [inputDoesName, setInputDoesName] = useState("")
    const [inputDoesPrice, setInputDoesPrice] = useState("")

    const [taskViev, setTaskViev] = useState(0)
    const [taskStatus, setTaskStatus] = useState(store.task?.find(x => x.id === idTask)?.status)

    const handleTaskViev = (event) => {
        switch(event) {
            case "ZLECENIE": {return taskViev === 0 ? `text-white` : "text-[#ffffff40]"}
            case "OFERTY": {return taskViev === 1 ? `text-white` : "text-[#ffffff40]"}
            case "CZAT": {return taskViev === 2 ? `text-white` : "text-[#ffffff40]"}
            case "KOSZYK": {return taskViev === 3 ? `text-white` : "text-[#ffffff40]" }
            case "ROBOCIZNA": {return taskViev === 4 ? `text-white` : "text-[#ffffff40]"}
        }
    }

    const handleTaskColorCard = (worker, installer) => {
        let cardclr
        switch(taskStatus) {
            case "nowe": {return cardclr = (worker?.id === store.auth.id || installer?.find(x => x.id === store.auth.id)) ? `shadow-[inset_0_0_2.5rem_0_#561234]` : `shadow-[inset_0_0_2.5rem_0_#123456]`;break}
            case "podjęte": {return cardclr = `shadow-[inset_0_0_2.5rem_0_#561234]`;break}
            case "anulowane": {return cardclr = `shadow-[inset_0_0_2.5rem_0_#ffffff40]`;break}
            case "zakończone": {return cardclr = `shadow-[inset_0_0_2.5rem_0_#28c76f40]`;break}
        }
    }

    const handleTaskColor = (event, worker, installer) => {
        let sts, stsHover
        switch(taskStatus) {
            case "nowe": {sts = (worker?.id === store.auth.id || installer?.find(x => x.id === store.auth.id)) ? `shadow-[inset_0_0_2.5rem_0_#561234]`: `shadow-[inset_0_0_2.5rem_0_#123456]`, stsHover =  (worker?.id === store.auth.id || installer?.find(x => x.id === store.auth.id)) ? `hover:shadow-[inset_0_0_2.5rem_0_#561234]` : `hover:shadow-[inset_0_0_2.5rem_0_#123456]`;break}
            case "podjęte": {sts = `shadow-[inset_0_0_2.5rem_0_#561234]`, stsHover = `hover:shadow-[inset_0_0_2.5rem_0_#561234]`;break}
            case "anulowane": {sts = `shadow-[inset_0_0_2.5rem_0_#ffffff40]`, stsHover = `hover:shadow-[inset_0_0_2.5rem_0_#ffffff40]`;break}
            case "zakończone": {sts = `shadow-[inset_0_0_2.5rem_0_#28c76f40]`, stsHover = `hover:shadow-[inset_0_0_2.5rem_0_#28c76f40]`;break}
        }
        switch(event) {
            case "ZLECENIE": {return taskViev === 0 ? sts : `shadow-[inset_0_0_2.5rem_0_#ffffff40] ${stsHover}`}
            case "OFERTY": {return taskViev === 1 ? sts : `shadow-[inset_0_0_2.5rem_0_#ffffff40] ${stsHover}`}
            case "CZAT": {return taskViev === 2 ? sts : `shadow-[inset_0_0_2.5rem_0_#ffffff40] ${stsHover}`}
            case "KOSZYK": {return taskViev === 3 ? sts : `shadow-[inset_0_0_2.5rem_0_#ffffff40] ${stsHover}`}
            case "ROBOCIZNA": {return taskViev === 4 ? sts : `shadow-[inset_0_0_2.5rem_0_#ffffff40] ${stsHover}`}
        }
    }

    useEffect(() => {
        const handleList = async () => {
            let list = []
            let arr = await store.order.filter(k => k.idtask === idTask)
            let prod = await arr.map(x => x.produkty)
            await prod.forEach(element => { 
                while(element.length > 0) {
                    list.push(element.pop())
                }
            })
            await store.setList(list)
          }
          handleList()
    }, [])

    return (
        <>
            {store.task?.filter(e => e.id === idTask).map(e => <>

                {e.worker?.id === store.auth?.id && <div className="flex w-full gap-[2rem]">
                    <button onClick={() => setTaskViev(0)} className={`flex items-center justify-center cursor-pointer bg-[#00000040] backdrop-blur-[5px] rounded-[10px] rounded-bl-none rounded-br-none p-[1rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000] border-b-0 font-bold hover:text-white duration-[.5s] ${handleTaskViev("ZLECENIE")} ${handleTaskColor("ZLECENIE", e.worker, e.installer)}`}>
                        ZLECENIE
                    </button>
                    <button onClick={() => setTaskViev(1)} className={`flex items-center justify-center cursor-pointer bg-[#00000040] backdrop-blur-[5px] rounded-[10px] rounded-bl-none rounded-br-none p-[1rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000] border-b-0 font-bold hover:text-white duration-[.5s] ${handleTaskViev("OFERTY")} ${handleTaskColor("OFERTY", e.worker, e.installer)}`}>
                        OFERTY
                    </button>   
                    <button onClick={() => setTaskViev(2)} className={`flex items-center justify-center cursor-pointer bg-[#00000040] backdrop-blur-[5px] rounded-[10px] rounded-bl-none rounded-br-none p-[1rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000] border-b-0 font-bold hover:text-white duration-[.5s] ${handleTaskViev("CZAT")} ${handleTaskColor("CZAT", e.worker, e.installer)}`}>
                        CZAT
                    </button>
                    <button onClick={() => setTaskViev(3)} className={`flex items-center justify-center cursor-pointer bg-[#00000040] backdrop-blur-[5px] rounded-[10px] rounded-bl-none rounded-br-none p-[1rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000] border-b-0 font-bold hover:text-white duration-[.5s] ${handleTaskViev("KOSZYK")} ${handleTaskColor("KOSZYK", e.worker, e.installer)}`}>
                        KOSZYK
                    </button>
                    <button onClick={() => setTaskViev(4)} className={`flex items-center justify-center cursor-pointer bg-[#00000040] backdrop-blur-[5px] rounded-[10px] rounded-bl-none rounded-br-none p-[1rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000] border-b-0 font-bold hover:text-white duration-[.5s] ${handleTaskViev("ROBOCIZNA")} ${handleTaskColor("ROBOCIZNA", e.worker, e.installer)}`}>
                        ROBOCIZNA
                    </button>
                </div>}
                {e.worker?.id !== store.auth?.id && <div className="flex w-full gap-[2rem]">
                    <button onClick={() => setTaskViev(0)} className={`flex items-center justify-center cursor-pointer bg-[#00000040] backdrop-blur-[5px] rounded-[10px] rounded-bl-none rounded-br-none p-[1rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000] border-b-0 font-bold hover:text-white duration-[.5s] ${handleTaskViev("ZLECENIE")} ${handleTaskColor("ZLECENIE", e.worker, e.installer)}`}>
                        ZLECENIE
                    </button>
                    <button onClick={() => setTaskViev(1)} className={`flex items-center justify-center cursor-pointer bg-[#00000040] backdrop-blur-[5px] rounded-[10px] rounded-bl-none rounded-br-none p-[1rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000] border-b-0 font-bold hover:text-white duration-[.5s] ${handleTaskViev("OFERTY")} ${handleTaskColor("OFERTY", e.worker, e.installer)}`}>
                        OFERTY
                    </button>   
                    <button onClick={() => setTaskViev(3)} className={`flex items-center justify-center cursor-pointer bg-[#00000040] backdrop-blur-[5px] rounded-[10px] rounded-bl-none rounded-br-none p-[1rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000] border-b-0 font-bold hover:text-white duration-[.5s] ${handleTaskViev("KOSZYK")} ${handleTaskColor("KOSZYK", e.worker, e.installer)}`}>
                        KOSZYK
                    </button>
                </div>}




                <div className={`flex items-center justify-between bg-[#00000040] ${handleTaskColorCard(e.worker, e.installer)} backdrop-blur-[5px] rounded-[10px] rounded-tl-none rounded-tr-none p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]`} key={e.id}>

                    {taskViev === 0 && <>
                        <div className="flex flex-col gap-[1rem] w-full">
                            <div className="">
                                <p className="">#{e.NR}</p>
                                <p className="font-bold text-white">{e.nazwa}</p>
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
                            <p className="">{e.opis}</p>
                        </div>


                        <div className="flex flex-col items-center justify-center gap-[1rem]">

                            {e.status === "podjęte" && !e.isZlecenieDoneI && e.robocizna?.find(x => !x.isDone) && 
                                <div className="flex flex-col items-center justify-center text-center">
                                    <span className="font-['Material_icons'] text-[#ed143d] text-[1.6rem]">warning</span>
                                    <p className="italic text-[.8rem] text-[#ed143d]">MASZ NIEZAKOŃCZONĄ ROBOCIZNĘ PRZEZ KIENTA!</p>
                                </div>
                            }
                            {e.status === "podjęte" && !e.isZlecenieDoneI && <button className={`_button-cart-green text-center`} onClick={() => {store.taskFinishedI({id: e.id, isZlecenieDoneK: e.isZlecenieDoneK, isZlecenieDoneI: true})}}>Zakończ ofertę</button>}
                            {e.status === "podjęte" && e.isZlecenieDoneI && <button className={`_button-cart-red text-center`} onClick={() => {store.taskFinishedI({id: e.id, isZlecenieDoneK: e.isZlecenieDoneK, isZlecenieDoneI: false})}}>Przywróć ofertę</button>}
                            {e.status === "zakończone" && <p className="italic text-[.8rem] text-[#28c76f]">ZAKOŃCZONE</p>}   

                            <p className="italic w-[10rem]">{useTimestamp(e.createdAt)}</p>

                            {e.worker?.id === store.auth?.id && <div className="flex gap-[2rem] text-[1.6rem]">
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
                    </>}






                    {taskViev === 1 && <div className={`flex flex-col gap-[2rem] w-full`}>
                        {(e.installer).every(x=> x.id !== store.auth.id) && <>
                            <p className="text-left w-full font-bold">TWOJA OFERTA</p>
                            <div className="flex items-center justify-between w-full gap-[2rem]">
                                <div className="flex flex-col gap-[2rem] w-full">
                                    <textarea className="_button-cart-input h-[10rem] w-full resize-none" value={inputMsg} onChange={(x) => setInputMsg(x.target.value)} placeholder="Wpisz wiadomość!"/>
                                    <input className="_button-cart-input h-[3rem] w-full resize-none" value={inputPrice} onChange={(x) => setInputPrice(x.target.value)} placeholder="Wpisz kwotę!"/>
                                </div>
                                <button className={`_button-cart-blue text-center`} onClick={() => {store.taskHired({id: e.id, installerarray: e.installer, installer: store.auth.id, msg: inputMsg, price: inputPrice, telefon: store.auth.telefon, name: store.auth.isFirma ? store.auth.nazwa : (store.auth.imie+` `+store.auth.nazwisko)});navigate(`/zlecenia/thx`)}}>Podejmij ofertę</button>
                            </div>
                        </>}
                        {(e.installer).some(x=> x.id === store.auth.id) && <>
                            <p className="text-left w-full font-bold">TWOJA OFERTA</p>
                            <div className="flex items-center justify-between w-full gap-[2rem]">
                                <div className="flex flex-col w-full">
                                    <p  className="flex gap-[.5rem]"><p className="text-white">Wiadomość:</p>{(e.installer).find(x => x.id === store.auth.id).msg}</p>
                                    <p className="flex gap-[.5rem]"><p className="text-white">Orientacyjna kwota robocizny:</p>{(e.installer).find(x => x.id === store.auth.id).price} zł</p>
                                </div>
                            </div>
                        </>}
                    </div>}





                    {taskViev === 2 && <div className={`flex flex-col gap-[2rem] w-full`}>

                        <div className="w-full text-left min-h-[20rem]">
                            {e.chat?.map((x, i) =>
                                <>
                                    {x.writer !== e.iduser &&
                                        <div key={i} className="flex justify-start gap-[.5rem]">
                                            <p className="text-[#dcde43]">Instalator:</p>
                                            <p className="">{x.msg}</p>
                                        </div>
                                    }
                                    {x.writer === e.iduser &&
                                        <div key={i} className="flex justify-start gap-[.5rem]">
                                            <p className="text-[#00cfe8]">Klient:</p>
                                            <p className="">{x.msg}</p>
                                        </div>
                                    }
                                </>
                            )}
                        </div>

                        {(taskStatus !== "zakończone" && taskStatus !== "anulowane") && <div className="flex items-center justify-between w-full gap-[2rem]">
                            <div className="flex flex-col gap-[2rem] w-full">
                                <input className="_button-cart-input h-[3rem] w-full" value={inputMsgWriter} onChange={(x) => setInputMsgWriter(x.target.value)} placeholder="Wpisz wiadomość!"/>
                            </div>
                            <button className={`_button-cart-blue text-center`} onClick={() => {store.taskMessage({id: e.id, chat: e.chat, writer: store.auth.id, msg: inputMsgWriter})}}>Wyślij wiadomość</button>
                        </div>}

                    </div>}





                    {taskViev === 3 && <div className={`flex flex-col gap-[2rem] w-full`}>

                        <p className="text-left w-full font-bold">PRODUKTY</p>

                        {e.produkty?.length > 0 && e.produkty?.map((o, i) => <>
                            {i > 0 && <span className="h-[1px] w-full bg-[#ffffff40]"></span>}
                            <div className="flex flex-col items-start w-full" key={o.id}>
                                <img width="100px" height="100px" src={o.zdjecie}/>
                                <div className="flex gap-[1rem]">
                                    <p className="font-bold">Nazwa</p>
                                    <p className="">{o.nazwa}</p>
                                </div>
                                <div className="flex gap-[1rem]">
                                    <p className="font-bold">Ilość</p>
                                    <p className="">{o.ilosc}</p>
                                </div>
                                <div className="flex gap-[1rem]">
                                    <p className="font-bold">Rabat</p>
                                    <p className="">{o.rabat ? `${o.rabat} %` : `-`}</p>
                                </div>
                                <div className="flex gap-[1rem]">
                                    <p className="font-bold">Cena netto</p>
                                    <p className="">{o.cenanetto} zł | {(o.cenanetto*o.ilosc).toFixed(2)} zł</p>
                                </div>
                                <div className="flex gap-[1rem]">
                                    <p className="font-bold">Cena brutto</p>
                                    <p className="">{o.cenabrutto} zł | {(o.cenabrutto*o.ilosc).toFixed(2)} zł</p>
                                </div>
                            </div>
                        </>)}

                        {(e.worker?.id === store.auth?.id && e.produkty.length === 0 && taskStatus !== "zakończone" && taskStatus !== "anulowane") && <div className="flex flex-col">
                                <div className="flex flex-col items-center justify-center">
                                    <span className="font-['Material_icons'] text-[#ed143d] text-[1.6rem]">hourglass_bottom</span>
                                    <p className="italic text-[.8rem] text-[#ed143d]">PROSZĘ ZŁOŻYĆ ZAMÓWIENIE W SKLEPIE</p>
                                </div>
                        </div>}

                        {/* {(e.worker?.id === store.auth?.id && taskStatus !== "zakończone" && taskStatus !== "anulowane") && <button className={`_button-cart-pink text-center m-auto`} onClick={() => {navigate(`/koszyk`); store.setCart({produkty: store.task.find(x => x.id === idTask).produkty, nazwa: store.task.find(x => x.id === idTask).nazwa})}}>Przejdź do koszyka</button>} */}

                        <span className="h-[1px] w-full bg-[#ffffff40]"></span>

                        <p className="text-left w-full font-bold">ZAMÓWIONE</p>

                        {store.list?.map(o => <>
                            <div className="flex flex-col items-start w-full" key={o.id}>
                                <img width="100px" height="100px" src={o.zdjecie}/>
                                <div className="flex gap-[1rem]">
                                    <p className="font-bold">Nazwa</p>
                                    <p className="">{o.nazwa}</p>
                                </div>
                                <div className="flex gap-[1rem]">
                                    <p className="font-bold">Ilość</p>
                                    <p className="">{o.ilosc}</p>
                                </div>
                                <div className="flex gap-[1rem]">
                                    <p className="font-bold">Rabat</p>
                                    <p className="">{o.rabat ? `${o.rabat} %` : `-`}</p>
                                </div>
                                <div className="flex gap-[1rem]">
                                    <p className="font-bold">Cena netto</p>
                                    <p className="">{o.cenanetto} zł | {(o.cenanetto*o.ilosc).toFixed(2)} zł</p>
                                </div>
                                <div className="flex gap-[1rem]">
                                    <p className="font-bold">Cena brutto</p>
                                    <p className="">{o.cenabrutto} zł | {(o.cenabrutto*o.ilosc).toFixed(2)} zł</p>
                                </div>
                            </div>
                        </>)}

                    </div>}






                    {taskViev === 4 && <div className={`flex flex-col gap-[2rem] w-full`}>

                        <p className="text-left w-full font-bold">USŁUGI</p>

                        <div className="flex flex-col justify-start w-full">
                            {store.task?.find(o => o.id === e.id).robocizna?.map((x, i) => !x.isDone &&
                                <div key={i} className="flex gap-[.5rem]">
                                    {(x.isOkay && e.status !== "anulowane" && e.status !== "zakończone") && <p className="font-['Material_icons'] text-[#28c76f]">done</p>}
                                    {(!x.isOkay && e.status !== "anulowane" && e.status !== "zakończone") && <p className="font-['Material_icons'] text-[#ed143d]">close</p>}
                                    {(x.isOkay && (e.status === "anulowane" || e.status === "zakończone")) && <p className="font-['Material_icons'] text-[#28c76f] cursor-pointer">done</p>}
                                    {(!x.isOkay && (e.status === "anulowane" || e.status === "zakończone")) && <p className="font-['Material_icons'] text-[#ed143d] cursor-pointer">close</p>}
                                    <p>{x.name}</p>
                                    <p className="text-white italic">{x.price} zł</p>
                                </div>
                            )}
                        </div>
                        <p className="flex gap-[.5rem] text-left w-full font-bold">SUMA: <p className="text-white italic">{store.task?.find(o => o.id === e.id)?.robocizna?.reduce((total, item) => (item.isOkay === true && item.isDone === false) ? total+(Number(item.price)) : total, 0).toFixed(2)} zł</p></p>

                        {(e.status !== "anulowane" && e.status !== "zakończone" && !e.isZlecenieDoneI) && <div className="flex gap-[2rem] w-full">
                            <input className="_button-cart-input h-[3rem] w-full resize-none" value={inputDoesName} onChange={(x) => setInputDoesName(x.target.value)} placeholder="Wpisz usługę!"/>
                            <input className="_button-cart-input h-[3rem] w-full resize-none" value={inputDoesPrice} onChange={(x) => setInputDoesPrice(x.target.value)} placeholder="Wpisz kwotę!"/>
                            <button className={`_button-cart-blue text-center w-full`} onClick={() => {store.taskDoes({id: e.id, robocizna: e.robocizna, name: inputDoesName, price: inputDoesPrice, isOkay: false})}}>Dodaj usługę</button>
                        </div>}

                        <span className="h-[1px] w-full bg-[#ffffff40]"></span>

                        <p className="text-left w-full font-bold">ZAPŁACONE</p>

                        <div className="flex flex-col">
                            <div className="flex flex-col items-center justify-center">
                                <span className="font-['Material_icons'] text-[#ed143d] text-[1.6rem]">hourglass_bottom</span>
                                <p className="italic text-[.8rem] text-[#ed143d]">ZANIM SKOŃCZYSZ ROBOCIZNĘ POCZEKAJ NA AKCEPTACJĘ ORAZ PRZELEW ZA ROBOCIZNĘ</p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            {store.task?.find(o => o.id === e.id).robocizna?.map((x, i) => x.isDone &&
                                <div key={i} className="flex gap-[.5rem]">
                                    {(x.isOkay && x.isDone && e.status !== "anulowane" && e.status !== "zakończone") && <p className="font-['Material_icons'] text-[#28c76f] cursor-pointer">done</p>}
                                    {(x.isOkay && x.isDone && (e.status === "anulowane" || e.status === "zakończone")) && <p className="font-['Material_icons'] text-[#28c76f] cursor-pointer">done</p>}
                                    <p>{x.name}</p>
                                    <p className="text-white italic">{x.price} zł</p>
                                </div>
                            )}
                        </div>

                        <p className="flex gap-[.5rem] text-left w-full font-bold">SUMA<p className="text-white italic">{store.task?.find(o => o.id === e.id)?.robocizna?.reduce((total, item) => item.isDone === true ? total+(Number(item.price)) : total, 0).toFixed(2)} zł</p></p>


                    </div>}

                </div>
                </>

                )}

        </>       
    )
}
  