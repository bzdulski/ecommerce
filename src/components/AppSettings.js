import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"

import { Nav } from "./Nav"
import { Form } from "./Form"
import { Input } from "./Input"


export const AppSettings = () => {
    const store = useStore()
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: store.auth })

    return (
        <>
            <Nav render="account"/>

            <Form render="settings" handleSubmit={handleSubmit}>

                <h1 className="text-xl font-bold text-[#ffffff]">Moje dane</h1>

                <div className="flex flex-col gap-[2rem] mt-[2rem] mb-[2rem]">

                    <Input render="email" register={register} errors={errors} readOnly/>
                    <Input render="telefon" register={register} errors={errors}/>

                    {watch("status") === "klient" && <>
                        
                        <Input render="imie" register={register} errors={errors}/>
                        <Input render="nazwisko" register={register} errors={errors}/>
                        <Input render="nazwa" register={register} errors={errors}/>
                        <Input render="nip" register={register} errors={errors}/>

                    </>}

                    {watch("status") === "instalator" && <>
                        
                        {watch("isFirma") === false && <>

                            <Input render="imie" register={register} errors={errors}/>
                            <Input render="nazwisko" register={register} errors={errors}/>

                        </>}

                        {watch("isFirma") === true && <>

                            <Input render="nazwa" register={register} errors={errors}/>
                            <Input render="nip" register={register} errors={errors}/>

                        </>}

                    </>}

                    <Input render="ulicainumer" register={register} errors={errors}/>
                    <Input render="miejscowosc" register={register} errors={errors}/>
                    <Input render="kodpocztowy" register={register} errors={errors}/>


                </div>

                <button className="_button-pink" type="submit">Zmień dane</button> 

                {store.error && <div className="_form-error">{store.error}</div>}

            </Form>
        </>
    )
}