import { useStore } from "../zustand.config"
import { useEffect, useState, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { useTimestamp } from "../hooks/useTimestamp"

import { Nav } from "./Nav"
import { PrintFV } from "./PrintFV"
import { PrintOF } from "./PrintOF"
import { PrintOFR } from "./PrintOFR"

export const AppDocuments = () => {
    const store = useStore()
    const [document, setDocument] = useState(null)

    const refFV = useRef(null)
    const refOF = useRef(null)
    const refOFR = useRef(null)

    const handlePrintFV = useReactToPrint({
        content: () => refFV.current,
      });
    
      const handlePrintOF = useReactToPrint({
        content: () => refOF.current,
      });

      const handlePrintOFR = useReactToPrint({
        content: () => refOFR.current,
      });

      const handleStatusColor = (status) => {
        switch(status) {
            case "nowe": {return `text-[#ea5455]`}
            case "zakończone": {return `text-[#28c76f]`}
            case "nieopłacone": {return `text-[#de8d43]`}
            case "wygasłe": {return `text-[#ed143d]`}
        }
    }

    return (
        <>
            <Nav render="account"/>
            
            <div className="flex flex-col m-auto gap-[2rem]">

                <div className="flex justify-start items-center text-center h-[108px] w-full max-w-[900px] p-[2rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <p className="_text-documents-80 lg:m-0 text-left">Numer</p>
                    <p className="_text-documents-80 lg:m-0">Status</p>
                    <p className="_text-documents-80 w-[160px] lg:m-0">Data</p>
                    <p className="_text-documents-80 lg:m-0">Cena</p>
                    <p className="_text-documents lg:m-0">Dokumenty</p>
                    
                </div>

                {[].concat(store.order.filter(x => x.iduser === store.auth.id)).sort((a, b) => Number(a.WZ) < Number(b.WZ) ? 1 : -1).map(e => ( 

                    <div className="cursor-pointer flex justify-start items-center text-center w-full max-w-[900px] p-[2rem] m-auto bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]"
                        key={e.id}
                        onClick={() => setDocument(e.id)}>
                        
                        <p className="_text-documents-80 lg:m-0 text-left">{e.WZ}</p>
                        <p className={`_text-documents-80 lg:m-0 ${handleStatusColor(e.status)}`}>{e.status}</p>
                        <p className="_text-documents-80-none w-[160px] lg:m-0">{e.createdAt ? useTimestamp(e.createdAt) : " | "}</p>
                        <p className="_text-documents-80-none lg:m-0">{store.reduceOrderProduktyBrutto(e.id) +"zł"}</p>

                        <div className="flex lg:gap-[1rem]"> 

                            {document !== e.id && <p className="italic text-[.8rem] text-[#ed143d]">Kliknij aby podejrzeć</p>}

                            {(e.FV && document === e.id) && <button className="_button-print lg:m-0" type="button" onClick={handlePrintFV}>FV</button>}

                            {document === e.id && <button className="_button-print lg:m-0" type="button" onClick={handlePrintOF}>OF</button>}

                            {(store.auth.status === "instalator" && document === e.id) && <button className="_button-print lg:m-0" type="button" onClick={handlePrintOFR}>OFR</button>}

                        </div>

                        <div className="hidden">

                            <div className="" ref={refFV}>

                                <PrintFV id={document}/>

                            </div>

                        </div>

                        <div className="hidden">

                            <div className="" ref={refOF}>

                                <PrintOF id={document}/>

                            </div>

                        </div>

                        <div className="hidden">

                            <div className="" ref={refOFR}>

                            <PrintOFR id={document}/>

                            </div>

                        </div>

                    </div>
                    
                ))}

            </div>
        </> 
    )
}
  