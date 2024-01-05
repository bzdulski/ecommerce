import { useStore } from "../zustand.config"

import { AppCart1 } from "./AppCart1"
import { AppCart2 } from "./AppCart2"
import { AppCart3 } from "./AppCart3"

export const AppCart = () => {
    const store = useStore()

    return (
        <>
            {store.numberPay === 0 && <AppCart1/>}
            {store.numberPay === 1 && <AppCart2/>}
            {store.numberPay === 2 && <AppCart3/>}
        </> 
    )
}
  