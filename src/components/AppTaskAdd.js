import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Form } from "./Form"

export const AppTaskAdd = () => {
    const store = useStore()
    const location = useLocation()
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [task, setTask] = useState(0)
    const [isRodzajInne, setIsRodzajInne] = useState(false)
    const [isObiektInne, setIsObiektInne] = useState(false)
    const { register, handleSubmit, watch, reset, setValue, getValues, formState: { errors } } = useForm({ defaultValues: {
        iduser: store.auth?.id,
        status: "nowe",
        isZlecenie: false,
        installer: [],
        nazwa: "",
        NR: "",
        typ: [],
        rodzaj: [],
        rodzajInne: "",
        wojewodztwo: "",
        miejsce: "",
        obiekt: [],
        obiektInne: "",
        data: "",
        telefon: "",
        opis: "",
        chat: [],
        robocizna: [],
        produkty: [],
        isZlecenieDoneI: false,
        isZlecenieDoneK: false
    }})

    return (
        <>
            <Form render="taskadd" handleSubmit={handleSubmit}>
            {task === 0 && <div className="flex items-center justify-center w-[1000px] m-auto">
                <div className="flex flex-col gap-[2rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">

                    <div className="flex flex-col">
                        <p className="font-bold text-white mb-[1rem]">Wybierz typ zlecenia</p>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="montaż" {...register("typ")}/>
                            <p>Montaż nowej instalacji</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="serwis" {...register("typ")}/>
                            <p>Serwis bierzącej instalacji</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-bold text-white mb-[1rem]">Wybierz rodzaj zlecenia</p>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="okablowanie" {...register("rodzaj")}/>
                            <p>okablowanie</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="instalacja eleketryczna" {...register("rodzaj")}/>
                            <p>instalacja eleketryczna</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="instalacja alarmowa" {...register("rodzaj")}/>
                            <p>instalacja alarmowa</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="telewizja dozorowa (monitoring)" {...register("rodzaj")}/>
                            <p>telewizja dozorowa (monitoring)</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="telewizja" {...register("rodzaj")}/>
                            <p>telewizja</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="instalacja przeciwpożarowa" {...register("rodzaj")}/>
                            <p>instalacja przeciwpożarowa</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="domfon" {...register("rodzaj")}/>
                            <p>domfon</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="napęd do bramy" {...register("rodzaj")}/>
                            <p>napęd do bramy</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="inne" onClick={() => setIsRodzajInne(!isRodzajInne)}/>
                            <p>inne</p>
                        </div>
                        {isRodzajInne && 
                            <div className="flex items-center gap-[1rem]">
                                <input className="_button-cart-input" {...register("rodzajInne")}/>
                            </div>
                        }
                    </div>

                    <div className="flex justify-center items-center w-full gap-[2rem]">
                        <button className={`_button-cart-pink text-center`} onClick={() => navigate("/zlecenia")}>Powrót</button>
                        {(watch("typ").length > 0 && (watch("rodzaj").length > 0 || watch("rodzajInne").length > 0)) && <button className={`_button-cart-blue text-center`} onClick={() => setTask(1)}>Dalej</button>}
                    </div>
                </div>
            </div>}









            {task === 1 && <div className="flex items-center justify-center w-[1000px] m-auto">
                <div className="flex flex-col gap-[2rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">

                    <div className="flex flex-col gap-[1rem]">
                        <p className="font-bold text-white">Podaj miejsce montażu / serwisu</p>
                        <div className="flex items-center gap-[1rem]">
                            <p>Województwo</p>
                            <input className="_button-cart-input" {...register("wojewodztwo")}/>
                        </div>
                        <div className="flex items-center gap-[1rem]">
                            <p>Miejscowość</p>
                            <input className="_button-cart-input" {...register("miejsce")}/>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-bold text-white mb-[1rem]">Rodzaj obiektu</p>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="dom" {...register("obiekt")}/>
                            <p>dom</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="mieszkanie" {...register("obiekt")}/>
                            <p>mieszkanie</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="magazyn" {...register("obiekt")}/>
                            <p>magazyn</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="hala" {...register("obiekt")}/>
                            <p>hala</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="pomieszczenie gospodarcze" {...register("obiekt")}/>
                            <p>pomieszczenie gospodarcze</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="biuro" {...register("obiekt")}/>
                            <p>biuro</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="sklep" {...register("obiekt")}/>
                            <p>sklep</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="altana" {...register("obiekt")}/>
                            <p>altana</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="inne" onClick={() => setIsObiektInne(!isObiektInne)}/>
                            <p>inne</p>
                        </div>
                        {isObiektInne && 
                            <div className="flex items-center gap-[1rem]">
                                <input className="_button-cart-input" {...register("obiektInne")}/>
                            </div>
                        }
                    </div>

                    <div className="flex flex-col">
                        <p className="font-bold text-white mb-[1rem]">Kiedy chcesz wykonać zlecenie</p>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="w tym tygodniu" {...register("data")}/>
                            <p>w tym tygodniu</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="w tym miesiącu" {...register("data")}/>
                            <p>w tym miesiącu</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="bardzo pilne" {...register("data")}/>
                            <p>bardzo pilne</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox" value="dłuższy termin" {...register("data")}/>
                            <p>dłuższy termin</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-full gap-[2rem]">
                        <button className={`_button-cart-pink text-center`} onClick={() => setTask(0)}>Powrót</button>
                        {(watch("wojewodztwo").length > 0 && watch("miejsce").length > 0 && watch("data").length > 0 && (watch("obiekt").length > 0 || watch("obiektInne").length > 0)) && <button className={`_button-cart-blue text-center`} onClick={() => setTask(2)}>Dalej</button>}
                    </div>
                </div>
            </div>}
















            {task === 2 && <div className="flex items-center justify-center w-[1000px] m-auto">
                <div className="flex flex-col gap-[2rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] p-[2rem] w-full max-w-[1000px] border-[1px] border-solid border-[#000000]">

                    <div className="flex flex-col">
                        <p className="font-bold text-white mb-[1rem]">Wpisz nazwę zlecenia</p>
                        <div className="flex items-center gap-[1rem]">
                            <input className="_button-cart-input" {...register("nazwa")}/>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-bold text-white mb-[1rem]">Podaj numer telefonu</p>
                        <div className="flex items-center gap-[1rem]">
                            <input className="_button-cart-input" {...register("telefon")}/>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <p className="font-bold text-white mb-[1rem]">Opisz zlecenie</p>
                        <textarea className="_button-cart-input h-[10rem] w-full resize-none" {...register("opis")}/>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex gap-[1rem]">
                            <input type="checkbox"/>
                            <p>Zakup sprzętu przez Ecommerce</p>
                        </div>
                        <div className="flex gap-[1rem]">
                            <input type="checkbox"/>
                            <p>Rozliczenie za pośrednictwem Ecommerce</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-full gap-[2rem]">
                        <button className={`_button-cart-pink text-center`} onClick={() => setTask(1)}>Powrót</button>
                        {(watch("nazwa").length > 0 && watch("telefon").length > 0 && watch("opis").length > 0) && <button className={`_button-cart-blue text-center`} type="submit">Potwierdź</button>}
                    </div>
                </div>
            </div>}










            {store.numberTask === 3 && <div className="flex items-center justify-center w-[1000px] m-auto">
            
                <div className="flex gap-[2rem] flex-col items-center justify-between p-[2rem] mb-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                    <p className="_text-discounts-white">Dziękujemy za stworzenie zlecenia!</p>
                    
                    <div className="flex flex-col items-center gap-[1rem]">
                        <p>#0001</p>
                        <p>Trwa weryfikacja Twojego nowo powstałego zlecenia!</p>
                    </div>

                    <Link className="_button-cart-pink-block" to="/zlecenia">Powrót do zleceń</Link>

                </div>
            </div>}
        </Form>

        </>       
    )
}
  