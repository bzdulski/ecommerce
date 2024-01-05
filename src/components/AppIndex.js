import { useStore } from "../zustand.config"
import { useEffect } from "react"
import { useLocation, Outlet } from "react-router-dom"

import { AppImage } from "./AppImage"
import { AppLoader } from "./AppLoader"
import { AppHeader } from "./AppHeader"
import { AppMain } from "./AppMain"
import { AppFooter } from "./AppFooter"
import { AppHome } from "./AppHome"
import { AppLogin } from "./AppLogin"

export const AppIndex = () => {
    const store = useStore()
    const location = useLocation()

    useEffect(() => {
        store.fetch()
    }, [])

    useEffect(() => {
        if(store.error !== "") { store.clean() }
        if(store.numberPay === 2) { store.cleanPay() }
        if(store.numberTask === 4) { store.taskClean() }
        if(store.mobile) { store.mobileSet(false) }
        window.scrollTo(0, 0);
    }, [location])
  
    return(
        <>
            {store.loading ?
                <>
                    <AppImage/>
                    <AppMain render="isLoading">
                        <AppLoader/>
                    </AppMain>
                </>
            :
                <>
                    <AppImage/>
                    <AppHeader/>
                    <AppMain render="isLoaded">
                        {store.auth ?
                            <>
                                {["/logowanie", "/rejestracja/klient", "/rejestracja/instalator", "/reset"].includes(location.pathname) ?
                                    <AppHome/>
                                :
                                    <Outlet/>
                                }
                            </>
                        :
                            <>
                                {[`/koszyk`, `/konto/dokumenty`, `/konto/rabaty`, `/konto/reset`, `/konto/ustawienia`, `/konto/finanse`].includes(location.pathname) ?
                                    <AppLogin/>
                                :
                                    <Outlet/>
                                }
                            </>
                        }
                    </AppMain>
                    <AppFooter/>
                </>  
            }
        </>  
    )
}