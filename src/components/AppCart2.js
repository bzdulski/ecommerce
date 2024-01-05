import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { Form } from "./Form"
import { Input } from "./Input"
import { auth } from "../firebase.config"

export const AppCart2 = () => {
    const store = useStore()
    const { register, handleSubmit, watch, reset, setValue, getValues, formState: { errors } } = useForm({ defaultValues: {
        iduser: store.auth.id,
        idtask: store.auth.koszyk.nazwa === "KOSZYK" ? "" : store.task.find(x => x.nazwa === store.auth.koszyk.nazwa).id,
        status: "nowe",
        dostawa: auth?.currentUser?.emailVerified ? "punkt" : "kurier",
        zaplata: auth?.currentUser?.emailVerified ? "punkt" : "przelew",
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
        <Form render="payment" handleSubmit={handleSubmit}>

            <h1 className="_form-title">Podsumowanie</h1>

            <button className="_button-cart-blue" type="button" onClick={() => store.paySet(0)}>Wróć do koszyka</button>

            {!auth?.currentUser?.emailVerified &&
                <div className="flex flex-col items-center justify-center">
                    <p className="italic text-[#ed143d]">Zweryfikuj konto aby mieć więcej możliwości zakupu!</p>
                </div> 
            }

            <div className="flex flex-col items-center justify-center">
                {store.auth.koszyk.nazwa !== "KOSZYK" && <p className="italic text-[#ed143d]">NR zlecenia: {store.task.find(x => x.nazwa === store.auth.koszyk.nazwa).NR}</p>}
                {store.auth.koszyk.nazwa !== "KOSZYK" && <p className="italic text-[#ed143d]">Nazwa zlecenia: {store.auth.koszyk.nazwa}</p>}
            </div>

            <div className="flex flex-col w-full gap-[2rem]">

                <div className="">

                    <p className="font-bold text-[#ffffff] mb-[1rem]">Wybierz sposób dostawy</p>

                    {auth?.currentUser?.emailVerified && <div className="flex items-center gap-[1rem]">

                        <input type="radio" value="punkt" {...register("dostawa", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, dostawa: "punkt", zaplata: "punkt", koszt: "0.00", paczkomat: "", kurierimie: "", kuriernazwisko: "", kurierulicainumer: "", kuriermiejscowosc: "", kurierkodpocztowy: ""}))}/>
                        <label>Odbiór w punkcie</label>

                    </div>}

                    <div className="flex items-center gap-[1rem]">

                        <input type="radio" value="kurier" {...register("dostawa", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, dostawa: "kurier", zaplata: "pobranie", koszt: "18.00", paczkomat: ""}))}/>
                        <label>Wysyłka kurierem</label>

                    </div>

                    <div className="flex items-center gap-[1rem]">

                        <input type="radio" value="paczkomat" {...register("dostawa", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, dostawa: "paczkomat", zaplata: "przelew", koszt: "9.00", kurierimie: "", kuriernazwisko: "", kurierulicainumer: "", kuriermiejscowosc: "", kurierkodpocztowy: ""}))}/>
                        <label>Paczkomaty</label>

                    </div>

                </div>

                {watch("dostawa") === "kurier" && 
                
                    <div className="flex flex-col gap-[2rem]">

                        <Input render="kurierimie" register={register} errors={errors}/>
                        <Input render="kuriernazwisko" register={register} errors={errors}/>
                        <Input render="kurierulicainumer" register={register} errors={errors}/>
                        <Input render="kuriermiejscowosc" register={register} errors={errors}/>
                        <Input render="kurierkodpocztowy" register={register} errors={errors}/>

                    </div>
                }

                {watch("dostawa") === "paczkomat" && 
                
                    <div className="flex flex-col">

                        <Input render="paczkomat" register={register} errors={errors}/>

                        <Link className="_form-link" to="https://inpost.pl/znajdz-paczkomat" target="_blank">[ Znajdź paczkomat ]</Link>

                    </div>

                }

                <div className="">

                    <p className="font-bold text-[#ffffff] mb-[1rem]">Wybierz sposób zapłaty</p>

                    {watch("dostawa") === "punkt" && <>

                        <div className="flex items-center gap-[1rem]">

                            <input type="radio" value="punkt" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "punkt"}))}/>
                            <label>W punkcie</label>

                        </div>

                        <div className="flex items-center gap-[1rem]">

                        <input type="radio" value="przelew" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "przelew"}))}/>
                        <label>Przelew</label>

                        </div>

                        <div className="flex items-center gap-[1rem]">

                        <input type="radio" value="blik" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "blik"}))}/>
                        <label>Blik</label>

                        </div>
                        </>
                    }
                    {watch("dostawa") === "kurier" && 
                    
                        <>

                            {auth?.currentUser?.emailVerified && <div className="flex items-center gap-[1rem]">

                                <input type="radio" value="pobranie" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "pobranie"}))}/>
                                <label>Za pobraniem</label>

                            </div>}
                            
                            <div className="flex items-center gap-[1rem]">

                                <input type="radio" value="przelew" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "przelew"}))}/>
                                <label>Przelew</label>
                                
                            </div>

                            <div className="flex items-center gap-[1rem]">

                                <input type="radio" value="blik" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "blik"}))}/>
                                <label>Blik</label>

                            </div>

                            {auth?.currentUser?.emailVerified && <div className="flex items-center gap-[1rem]">

                                <input type="radio" value="krypto" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "krypto"}))}/>
                                <label>Kryptowaluta</label>

                            </div>}

                            {auth?.currentUser?.emailVerified && <div className="flex items-center gap-[1rem]">

                                <input type="radio" value="limit" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "limit"}))}/>
                                <label>Limit kupiecki</label>

                            </div>}

                        </>
                        
                    }
                    {watch("dostawa") === "paczkomat" && 

                    <>
                    
                        <div className="flex items-center gap-[1rem]">

                            <input type="radio" value="przelew" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "przelew"}))}/>
                            <label>Przelew</label>
                            
                        </div>

                        <div className="flex items-center gap-[1rem]">

                            <input type="radio" value="blik" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "blik"}))}/>
                            <label>Blik</label>

                        </div>

                        {auth?.currentUser?.emailVerified && <div className="flex items-center gap-[1rem]">

                            <input type="radio" value="krypto" {...register("zaplata", {/*pattern: "",*/ required: true})} onClick={() => reset(e => ({...e, zaplata: "krypto"}))}/>
                            <label>Kryptowaluta</label>

                        </div>}

                    </>
                    
                    }

                </div>

                <div className="flex flex-col gap-[1rem]">

                    <div className="flex items-center gap-[1rem]">

                        {watch("faktura") === false && <input type="checkbox" {...register("faktura", {/*pattern: "", required: true*/})} onClick={() => reset(e => ({...e, faktura: true, fakturadane: "zapisane", fakturanazwa: store.auth.nazwa, fakturanip: store.auth.nip, fakturaulicainumer: store.auth.ulicainumer, fakturamiejscowosc: store.auth.miejscowosc, fakturakodpocztowy: store.auth.kodpocztowy}))}/>}
                        {watch("faktura") === true && <input type="checkbox" {...register("faktura", {/*pattern: "", required: true*/})} onClick={() => reset(e => ({...e, faktura: false, fakturadane: "", fakturanazwa: "", fakturanip: "", fakturaulicainumer: "", fakturamiejscowosc: "", fakturakodpocztowy: ""}))}/>}
                        <label>Czy chcesz otrzymać fakturę VAT?</label>
                    </div>

                    {watch("faktura") === false && <p className="italic text-[#ed143d]">Po zaksięgowaniu płatności otrzymasz dowód zakupu na maila oraz będzi znajdował się w dokumentach</p>}
                    {watch("faktura") === true && <p className="italic text-[#ed143d]">Po zaksięgowaniu płatności otrzymasz fakturę na maila oraz będzie znajdowała się w dokumentach</p>}

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

                    <p className="font-bold text-[#ffffff] mb-[1rem]">Łączna wartość koszyka</p>


                        <div className="flex gap-[1rem]">

                            <p>Produkty</p>
                            <p>{store.reduceAuthCartProduktyBrutto()} zł</p>

                        </div>

                        <div className="flex gap-[1rem]">

                            <p>Dostawa</p>
                            <p>{getValues("koszt")} zł</p>

                        </div>

                </div>

                <div className="">

                    <p className="font-bold text-[#ffffff] mb-[1rem]">Suma</p>

                        <div className="flex gap-[1rem]">

                            <p>Razem netto</p>
                            <p>{(parseFloat(Number(getValues("koszt"))+Number(store.reduceAuthCartProduktyNetto()))).toFixed(2)} zł</p>

                        </div>

                        <div className="flex gap-[1rem]">

                            <p>Razem brutto</p>
                            <p>{(parseFloat(Number(getValues("koszt"))+Number(store.reduceAuthCartProduktyBrutto()))).toFixed(2)} zł</p>

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
                            <label>Wyrażam zgodę na przesyłanie przez danych do podmiotów trzecich przez Ecommerce</label>
                        </div>
                    </div>

                </div>

                <button className="_button-pink" type="submit">Potwierdź zamówienie</button>

            </div>

        </Form>
    )
}
  