import { useYear } from "../hooks/useYear"

import { Href } from "./Href"

export const AppFooter = () => {
    return ( 
        <footer className="p-[2rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#123456] border-[#000000] border-[.1rem] rounded-[2rem] backdrop-blur-[.3rem]">

            <div className="flex flex-wrap justify-evenly max-w-[100rem] m-auto gap-[2rem]">
                
                <div className="flex flex-col sm:w-full">

                    <p className="mb-[1rem] text-[#ffffff] font-bold">INFO</p>
                    <Href render="onas"/>
                    <Href render="regulamin"/>
                    <Href render="współpraca"/>
                    <Href render="kariera"/>
                    {/* <Href render="projekty"/> */}
                    <Href render="galeria"/>
                    <Href render="kontakt"/>
                    {/* <Href render="polityka"/>
                    <Href render="regulamin"/>
                    <Href render="kalkulatory"/>
                    <Href render="programy"/>
                    <Href render="projekty"/>
                    <Href render="galeria"/>
                    <Href render="kontakt"/> */}

                </div>

                <div className="flex flex-col justify-evenly items-end gap-[2rem] sm:w-full">

                    <div className="flex flex-wrap gap-[2rem] sm:w-full sm:justify-center">

                        <Href render="telefon"/>
                        <Href render="email"/>
                        <Href render="facebook"/>
                        <Href render="instagram"/>
                            
                    </div>

                    <p className="font-bold">ECOMMERCE COPYRIGHT {useYear()}</p>

                </div>

            </div>

        </footer>
    )
}