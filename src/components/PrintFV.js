import { useStore } from "../zustand.config"
import { Href } from "./Href"
import { useDate } from "../hooks/useDate"

export const PrintFV = ({ id }) => {
    const store = useStore()  

    if(id === null) {
        return null
    }

    return ( 
        <div className="w-[100%] p-[2rem] bg-[#ffffff] text-[#000000]">

            <div className="flex mb-[5rem]">

                <div className="flex flex-col w-[50%]">

                    <Href render="logo2"/>

                </div>

                <div className="flex flex-col w-[50%]">

                    <p className="_print-text-title">Miejsce wystawienia</p>
                    <p className="_print-text">Grójec</p>
                    <p className="_print-text-title">Data wystawienia</p>
                    <p className="_print-text">{useDate()}</p>
                    <p className="_print-text-title">Data sprzedaży</p>
                    <p className="_print-text">{useDate()}</p>

                </div>

            </div>

            <div className="flex mb-[5rem]">
                
                <div className="flex flex-col w-[50%]">

                    <p className="_print-text-title">Sprzedawca</p>
                    <p className="_print-text-left">Elektroteka Arkadiusz Konarowski</p>
                    <p className="_print-text-left">NIP: 797208225</p>
                    <p className="_print-text-left">Jarzębinowa 6</p>
                    <p className="_print-text-left">05-600 Grójec</p>

                </div>

                <div className="flex flex-col w-[50%]">

                    <p className="_print-text-title">Nabywca</p>
                    <p className="_print-text-left">{store.order.find(e => e.id === id)?.fakturanazwa}</p>
                    <p className="_print-text-left">NIP: {store.order.find(e => e.id === id)?.fakturanip}</p>
                    <p className="_print-text-left">{store.order.find(e => e.id === id)?.fakturaulica}</p>
                    <p className="_print-text-left">{store.order.find(e => e.id === id)?.fakturakodpocztowy} {store.order.find(e => e.id === id)?.fakturamiejscowosc}</p>

                </div>

            </div>

            <p className="font-bold text-center">Faktura VAT {store.order.find(e => e.id === id)?.FV}</p>

            <div className="flex justify-between bg-[lightgray] text-center p-[1rem]">

                <p className="w-[100%]">LP</p>
                <p className="w-[100%]">Nazwa</p>
                <p className="w-[100%]">Ilość</p>
                <p className="w-[100%]">Miara</p>
                <p className="w-[100%]">Cena Netto</p>
                <p className="w-[100%]">Cena Brutto</p>

            </div>

            {store.order.find(x => x.id === id)?.produkty.map((e, i) => (

                <div className="flex justify-between text-center p-[1rem] border-[.1rem] border-solid border-[#000000] gap-[1rem]" 
                    key={e.id}>

                    <p className="w-[100%]">{i+1}</p>
                    <p className="w-[100%] text-left">{e.nazwa}</p>
                    <p className="w-[100%]">{e.ilosc}</p>
                    <p className="w-[100%]">{e.miara}</p>
                    <p className="w-[100%]">{(e.cenanetto*e.ilosc).toFixed(2)} zł</p>
                    <p className="w-[100%]">{(e.cenabrutto*e.ilosc).toFixed(2)} zł</p>

                </div>

            ))}

            <div className="flex flex-col justify-end items-end mt-[5rem] text-center">

                <div className="flex mb-[2rem]">

                    <p className="_print-text-mr">Sposób płatności</p>
                    <p className="_print-text">{store.order.find(e => e.id === id)?.zaplata}</p>

                </div>

                <div className="flex mb-[2rem]">

                    <p className="_print-text-mr">Do zapłaty</p>
                    <p className="_print-text">{store.order.find(e => e.id === id)?.produkty.reduce((total, item) => total+(item.cenabrutto * item.ilosc), 0).toFixed(2)} zł</p>

                </div>

            </div>
            
        </div>
    )
}