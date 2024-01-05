import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import { Form } from "./Form"
import { Input } from "./Input"

export const AppReset = () => {
    const store = useStore()
    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <Form render="reset" handleSubmit={handleSubmit}>

            <div className="flex flex-col items-center gap-[1rem]">

                <h1 className="text-[#ffffff] text-xl font-bold">Odzyskiwanie hasła</h1>
                <p className="">Nowe hasło zostanie wysłane na maila</p>

            </div>

            <div className="mt-[2rem] mb-[2rem]">

                <Input render="email" register={register} errors={errors}/>

            </div>

            <button className="_button-pink" type="submit">Zresetuj</button> 

            {store.error && <div className="_form-error">{store.error}</div>}

            <Link className="_form-link" to="/logowanie">Pamiętam hasło</Link>

        </Form>
    )
}
  