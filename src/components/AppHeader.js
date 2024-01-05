import { useStore } from "../zustand.config"
import { Link } from "react-router-dom"

import { Href } from "./Href"

export const AppHeader = () => {
    const store = useStore()

    return ( 
        <header className="p-[2rem] fixed top-0 right-0 left-0 bg-[#00000040] shadow-[inset_0_0_5rem_0_#123456] border-[#000000] border-[.1rem] rounded-[2rem] backdrop-blur-[.3rem] z-[100]">

            <nav className="flex items-center justify-between gap-[2rem]">

                <Href render="logo"/>

                <div className="flex mobile:hidden">

                    <Href render="task"/>
                    <Href render="shop"/>
                    <Href render="cart"/>
                    <Href render="account"/>
                    <Href render="auth"/>

                </div>

                <span className="hidden font-['Material_Icons'] text-xl leading-none mobile:block" onClick={() => store.mobileSet(!store.mobile)}>menu</span>

            </nav>

            {store.mobile && 

                <nav className="flex flex-col mt-[2rem] gap-[1rem]">
                    
                    <Href render="shop"/>
                    <Href render="cart"/>
                    <Href render="account"/>
                    <Href render="auth"/>

                </nav>

            }

        </header>
    )
}