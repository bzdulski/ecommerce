import { useStore } from "../zustand.config"
import { Href } from "./Href"
import { useDate } from "../hooks/useDate"
import { useNewDate } from "../hooks/useNewDate"

export const PrintOF = ({ id }) => {
    const store = useStore()

    if(id === null) {
        return null
    }

    return ( 
        <div className="w-[100%] p-[2rem] bg-[#ffffff] text-[#000000]">

            <div className="flex mb-[5rem]">

                <div className="w-[50%]">

                    <Href render="logo2"/>

                </div>

                <div className="flex flex-col w-[50%]">

                    <p className="_print-text-title">Data wystawienia oferty</p>
                    <p className="_print-text">{useDate()}</p>
                    <p className="_print-text-title">Oferta ważna do</p>
                    <p className="_print-text">{useNewDate()}</p>

                </div>

            </div>

            <p className="_print-text-bold">Oferta</p>
            
            <div className="flex justify-between bg-[lightgray] text-center p-[1rem]">

                <p className="w-[100%]">Zdjęcie</p>
                <p className="w-[100%]">Nazwa</p>
                <p className="w-[100%]">Ilość</p>
                <p className="w-[100%]">Cena Netto</p>
                <p className="w-[100%]">Cena Brutto</p>

            </div>

            {store.order.find(x => x.id === id)?.produkty.map(e => (

                <div className="flex items-center justify-between text-center p-[1rem] border-[.1rem] border-solid border-[#000000] gap-[1rem]" key={e.id}>

                    <img className="max-w-[100%] max-h-[100%] w-[90px] h-[90px] object-contain" alt={e.nazwa} src={e.zdjecie[0]}/>
                    <p className="w-[100%] text-left">{e.nazwa}</p>
                    <p className="w-[100%]">{e.ilosc}</p>
                    <p className="w-[100%]">{(e.cenanetto*e.ilosc).toFixed(2)} zł</p>
                    <p className="w-[100%]">{(e.cenabrutto*e.ilosc).toFixed(2)} zł</p>

                </div>
            ))}

            <div className="flex flex-col justify-end items-end mt-[5rem] text-center">

                <div className="flex">

                    <p className="_print-text-mr">Suma Netto</p>
                    <p className="_print-text">{store?.reduceOrderProduktyNettoNOPRICE(id)} zł</p>

                </div>

                <div className="flex">

                    <p className="_print-text-mr">Suma Brutto</p>
                    <p className="_print-text">{store?.reduceOrderProduktyBruttoNOPRICE(id)} zł</p>

                </div>

            </div>
            
        </div>
    )
}