import { useStore } from "../zustand.config"
import { useLocation, Link, useSearchParams, useNavigate, createSearchParams, useParams } from "react-router-dom"
import { auth } from "../firebase.config"

import { AppTask } from "./AppTask"
import { AppTaskAdd } from "./AppTaskAdd"
import { Button } from "../bcomponents/Button"
import { AppTaskId } from "./AppTaskId"

export const AppTa = () => {
    const store = useStore()
    const location = useLocation()
    const { idTask } = useParams()
    const [param, setParam] = useSearchParams()

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
            <div className="absolute flex flex-col items-center gap-[2rem] left-0 mobile:w-full">

                {!store.auth &&
                    <Button render="zlecenia"/>       
                }

                {store.auth &&
                    <>
                        {store.auth.status === "klient" &&
                            <>
                                <Button render="zlecenia"/>
                                {/* {auth.currentUser.emailVerified && <Button render="zlecenie"/>} */}
                                <Button render="zlecenie"/>
                                <Button render="aktywne"/>
                                <Button render="historia"/>
                            </>
                        }
                        
                        {store.auth.status === "instalator" && 
                            <>
                                <Button render="zlecenia"/>
                                <Button render="aktywne"/>
                                <Button render="historia"/>
                            </>
                        }
                    </>
                }

            </div>

            <div className="flex flex-col items-center justify-center w-[1000px] m-auto mt-0 gap-[2rem]">

                <div className="flex items-center flex-wrap font-bold w-[100%] gap-[1rem] text-lg lg:pl-[2rem] lg:pr-[2rem]">
                    {location.pathname === `/zlecenia` &&
                        <Button render="zleceniaURL"/>
                    }
                    {location.pathname === `/zlecenia/dodaj` &&
                        <>
                            <Button render="zleceniaURL"/>
                            <Button render="zlecenieURL"/>
                        </>
                    }
                    {location.pathname === `/zlecenia/aktywne` &&
                        <>
                            <Button render="zleceniaURL"/>
                            <Button render="aktywneURL"/>
                        </>
                    }
                    {location.pathname === `/zlecenia/historia` &&
                        <>
                            <Button render="zleceniaURL"/>
                            <Button render="historiaURL"/>
                        </>
                    }
                    {location.pathname === `/zlecenia/aktywne/${idTask}` &&
                        <>
                            <Button render="zleceniaURL"/>
                            <Button render="aktywneURL"/>
                            <p className="cursor-pointer">{store.task.find(e => e.id === idTask).nazwa}</p>
                        </>
                    }
                    {location.pathname === `/zlecenia/historia/${idTask}` &&
                        <>
                            <Button render="zleceniaURL"/>
                            <Button render="historiaURL"/>
                            <p className="cursor-pointer">{store.task.find(e => e.id === idTask).nazwa}</p>
                        </>
                    }
                </div>

                {(location.pathname === `/zlecenia` || location.pathname === `/zlecenia/aktywne` || location.pathname === `/zlecenia/historia`) && <div className="flex items-center justify-center gap-[2rem] lg:flex-col">
                    <div className="flex flex-col gap-[.5rem]">
                        <p>Wyszukiwanie</p>
                        <div className="relative">
                            <input className="_button-task-input" value={param.get("search") ? param.get("search") : ""} onChange={(event) => event.target.value === "" ? handleRouterDeleteParam("search") : handleRouterAddParam("search", event.target.value)}/>
                            <span className="absolute top-[8px] right-[8px] font-['Material_icons'] cursor-pointer text-[1.5rem] z-[1]">search</span>
                        </div> 
                    </div>
                    {store.auth &&
                        <>
                            {store.auth.status === "klient" &&
                                <>
                                    {(location.pathname === `/zlecenia` || location.pathname === `/zlecenia/historia`) && 
                                        <div className="flex flex-col gap-[.5rem]">
                                            <p>Filtracja</p>
                                            <select className="_button-task-input cursor-pointer" value={param.get("filtr") ? param.get("filtr") : ""} onChange={(event) => event.target.value === "" ? handleRouterDeleteParam("filtr") : handleRouterAddParam("filtr", event.target.value)}>
                                                <option className="text-[#000000]" value="">Wszystkie</option>
                                                {location.pathname === `/zlecenia` && <option className="text-[#000000]" value="moje">Moje</option>}
                                                {/* {location.pathname === `/zlecenia` && <option className="text-[#000000]" value="inne">Inne</option>} */}
                                                {location.pathname === `/zlecenia/historia` && <option className="text-[#000000]" value="zakończone">Zakończone</option>}
                                                {location.pathname === `/zlecenia/historia` && store.auth.status === `klient` && <option className="text-[#000000]" value="anulowane">Anulowane</option>}
                                            </select>
                                        </div>
                                    }
                                </>
                            }

                            {store.auth.status === "instalator" &&
                                <>
                                    {location.pathname === `/zlecenia/aktywne` && 
                                        <div className="flex flex-col gap-[.5rem]">
                                            <p>Filtracja</p>
                                            <select className="_button-task-input cursor-pointer" value={param.get("filtr") ? param.get("filtr") : ""} onChange={(event) => event.target.value === "" ? handleRouterDeleteParam("filtr") : handleRouterAddParam("filtr", event.target.value)}>
                                                <option className="text-[#000000]" value="">Wszystkie</option>
                                                {location.pathname === `/zlecenia/aktywne` && store.auth.status === `instalator` && <option className="text-[#000000]" value="oferty">Oferty</option>}
                                                {location.pathname === `/zlecenia/aktywne` && <option className="text-[#000000]" value="podjęte">Podjęte</option>}
                                            </select>
                                        </div>
                                    }
                                </>
                            }
                        </>
                    }
                </div>}

                {(location.pathname === `/zlecenia` || location.pathname === `/zlecenia/aktywne` || location.pathname === `/zlecenia/historia`) && <AppTask/>}
                {location.pathname === `/zlecenia/dodaj` && <AppTaskAdd/>}
                {(location.pathname === `/zlecenia/aktywne/${idTask}` || location.pathname === `/zlecenia/historia/${idTask}`) && <AppTaskId/>}

            </div>
        </> 
    )
}
  