import { useState } from "react"
import { useStore } from "../zustand.config"
import { Link, useLocation, useParams, useNavigate, useSearchParams, createSearchParams, } from "react-router-dom"
import { useTimestamp } from "../hooks/useTimestamp"
import { AppTaskVievK } from "./AppTaskVievK"
import { AppTaskVievI } from "./AppTaskVievI"

export const AppTaskId = () => {
    const store = useStore()
    const location = useLocation()
    const navigate = useNavigate()
    const { idTask } = useParams()
    const [param, setParam] = useSearchParams()
    const [inputTelefon, setInputTelefon] = useState()
    const [inputMsg, setInputMsg] = useState()    
    const [inputPrice, setInputPrice] = useState()
    const [inputMsgWriter, setInputMsgWriter] = useState("")
    const [inputDoesName, setInputDoesName] = useState("")
    const [inputDoesPrice, setInputDoesPrice] = useState("")

    const handleRouterDeleteParam = (event) => {
        param.delete(event)
        setParam(param)
    }

    const handleRouterAddParam = (event, value) => {
        param.set(event, value)
        setParam(param)
    }

    return (
        <>


            <div className="flex flex-col items-center justify-center w-[1000px] m-auto">
                {store.auth.status === "klient" && <AppTaskVievK/>}
                {store.auth.status === "instalator" && <AppTaskVievI/>}
            </div>
        </>       
    )
}
  