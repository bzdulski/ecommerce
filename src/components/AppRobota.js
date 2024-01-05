import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Form } from "./Form"
import { Input } from "./Input"

export const AppRobota = () => {
    const store = useStore()
    const navigate = useNavigate()
    const { register, handleSubmit, watch, reset, setValue, getValues, formState: { errors } } = useForm({ defaultValues: {
        iduser: store.auth.id,
        idtask: store.auth.koszyk.nazwa === "KOSZYK" ? "" : store.task.find(x => x.nazwa === store.auth.koszyk.nazwa).id,
        status: "nowe",
        dostawa: "punkt",
        zaplata: "punkt",
        FV: "",
        WZ: "",
        kurierimie: "",
        kuriernazwisko: "",
        kurierulicainumer: "",
        kuriermiejscowosc: "",
        kurierkodpocztowy: "",
        paczkomat: "",
        faktura: false,
        fakturadane: "",
        fakturanazwa: "",
        fakturanip: "",
        fakturaulicainumer: "",
        fakturamiejscowosc: "",
        fakturakodpocztowy: "",
        koszt: "0.00",
        totalKoszt: Number(store.reduceAuthCartProduktyBrutto()).toFixed(2),
        rule1: false,
        rule2: false,
        produkty: store.auth.koszyk.produkty
    }})

    return (
        <>
        {store.alert !== 6 && <Form render="paymentRobota" handleSubmit={handleSubmit}>

            <h1 className="_form-title">Podsumowanie</h1>

            {/* <button className="_button-cart-blue" type="button" onClick={() => store.paySet(0)}>Wróć do koszyka</button> */}

            <div className="flex flex-col w-full gap-[2rem]">

                <div className="">

                    <p className="font-bold text-[#ffffff] mb-[1rem]">Wybierz sposób zapłaty</p>
                            
                            <div className="flex items-center gap-[1rem]">

                                <input type="radio" value="przelew" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "przelew"}))}/>
                                <label>Przelew</label>
                                
                            </div>

                            <div className="flex items-center gap-[1rem]">

                                <input type="radio" value="blik" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "blik"}))}/>
                                <label>Blik</label>

                            </div>

                            <div className="flex items-center gap-[1rem]">

                                <input type="radio" value="krypto" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "krypto"}))}/>
                                <label>Kryptowaluta</label>

                            </div>

                            <div className="flex items-center gap-[1rem]">

                                <input type="radio" value="limit" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "limit"}))}/>
                                <label>Limit kupiecki</label>

                            </div>

                </div>

                <div className="flex flex-col gap-[1rem]">

                    <div className="flex items-center gap-[1rem]">

                        {watch("faktura") === false && <input type="checkbox" {...register("faktura", {/*pattern: "", required: true*/})} onClick={() => reset(e => ({...e, faktura: true, fakturadane: "zapisane", fakturanazwa: store.auth.nazwa, fakturanip: store.auth.nip, fakturaulicainumer: store.auth.ulicainumer, fakturamiejscowosc: store.auth.miejscowosc, fakturakodpocztowy: store.auth.kodpocztowy}))}/>}
                        {watch("faktura") === true && <input type="checkbox" {...register("faktura", {/*pattern: "", required: true*/})} onClick={() => reset(e => ({...e, faktura: false, fakturadane: "", fakturanazwa: "", fakturanip: "", fakturaulicainumer: "", fakturamiejscowosc: "", fakturakodpocztowy: ""}))}/>}
                        <label>Czy chcesz otrzymać fakturę VAT?</label>

                    </div>

                    {watch("faktura") === true && 
                
                        <div className="">

                            <div className="flex items-center gap-[1rem]">

                                <input type="radio" value="zapisane" {...register("fakturadane",
                                {required: true})} onClick={() => {setValue("fakturanazwa", store.auth.nazwa);setValue("fakturanip", store.auth.nip);setValue("fakturaulicainumer", store.auth.ulicainumer);setValue("fakturamiejscowosc", store.auth.miejscowosc);setValue("fakturakodpocztowy", store.auth.kodpocztowy)}}/>
                                <label>Zapisane dane firmy</label>

                            </div>
                            
                            <div className="flex items-center gap-[1rem]">

                                <input type="radio" value="inne" {...register("fakturadane",
                                {required: true})} onClick={() => {setValue("fakturanazwa", "");setValue("fakturanip", "");setValue("fakturaulicainumer", "");setValue("fakturamiejscowosc", "");setValue("fakturakodpocztowy", "")}}/>
                                <label>Inne dane firmy</label>

                            </div>

                        </div>
                    
                    }

                </div>

                {watch("faktura") === true && watch("fakturadane") === "zapisane" && 
                    
                    <div className="flex flex-col gap-[2rem]">

                        <Input render="fakturanazwa" register={register} errors={errors} readOnly/>
                        <Input render="fakturanip" register={register} errors={errors} readOnly/>
                        <Input render="fakturaulicainumer" register={register} errors={errors} readOnly/>
                        <Input render="fakturamiejscowosc" register={register} errors={errors} readOnly/>
                        <Input render="fakturakodpocztowy" register={register} errors={errors} readOnly/>


                    </div>
                
                }

                {watch("faktura") === true && watch("fakturadane") === "inne" && 
                
                    <div className="flex flex-col gap-[2rem]">

                        <Input render="fakturanazwa" register={register} errors={errors}/>
                        <Input render="fakturanip" register={register} errors={errors}/>
                        <Input render="fakturaulicainumer" register={register} errors={errors}/>
                        <Input render="fakturamiejscowosc" register={register} errors={errors}/>
                        <Input render="fakturakodpocztowy" register={register} errors={errors}/>

                    </div>
                        
                }
                <div className="">

                    <p className="font-bold text-[#ffffff] mb-[1rem]">Robocizna</p>


                        <div className="flex gap-[1rem]">

                            <p>Suma</p>
                            <p>{store.robotaPrice} zł</p>

                        </div>

                </div>

                <div className="flex flex-col gap-[1rem]">

                    <div className="flex items-baseline gap-[1rem]">

                        <input type="checkbox" {...register("rule1", {/*pattern: "",*/ required: "Wymagane zaznaczenie!"})}/>
                        <div>
                            {errors.rule1 && <div className="text-[#ed143d]">{errors.rule1.message}</div>}
                            <label>Akceptuję regulamin, ogólne warunki sprzedaży oraz politykę prywatności</label>
                        </div>

                    </div>

                    <div className="flex items-baseline gap-[1rem]">

                        <input type="checkbox" {...register("rule2", {/*pattern: "",*/ required: "Wymagane zaznaczenie!"})}/>
                        <div>
                            {errors.rule2 && <div className="text-[#ed143d]">{errors.rule2.message}</div>}
                            <label>Wyrażam zgodę na przesyłanie przez Elektroteka.pl z siedzibą we Grójcu w formacie PDF faktur, faktur korygujących, duplikatów faktur, duplikatów faktur korygujących drogą elektroniczną na adres poczty elektronicznej</label>
                        </div>
                    </div>

                </div>

                <button className="_button-pink" type="submit">Potwierdź zakupy</button>

            </div>

        </Form>}

        {store.alert === 6 && 
            <div className="flex gap-[2rem] flex-col items-center justify-center m-auto mt-0 p-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] backdrop-blur-[5px] rounded-[10px] border-[1px] border-solid border-[#000000] lg:flex-col lg:h-full lg:gap-[1rem]">

                <div className="flex flex-col items-center text-center gap-[1rem]">
                    <p className="_text-discounts-white">Dziękuje za zakup robocizny!</p>
                    <p>Wysłaliśmy maila z danymi do przelewu na maila!</p>
                </div>

                <button className="absolute top-0 right-0 p-[1rem] font-['Material_icons']" onClick={() => {store.alertSet(0);navigate("/")}}>close</button>

            </div>
            }

        </>
    )
}
  