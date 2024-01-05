import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import { Form } from "./Form"
import { Input } from "./Input"

export const AppLogin = () => {
    const store = useStore()
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {email: "klient@gmail.com", password: "123456"} })

    return ( 
        <Form render="login" handleSubmit={handleSubmit}>

            <h1 className="text-xl font-bold text-[#ffffff]">Logowanie</h1>

            <div className="flex flex-col items-center gap-[2rem] mt-[2rem] mb-[2rem] w-full">

                <Input render="email" register={register} errors={errors}/>
                <Input render="password" register={register} errors={errors}/>  

            </div>

            <button className="p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#561234] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]" type="submit">Zaloguj się</button> 

            {store.error && <div className="text-[#ed143d]">{store.error}</div>}

            <div className="flex flex-col gap-[1rem]">

                <Link className="duration-[.5s] hover:text-[#ffffff]" to="/rejestracja/klient">Nie posiadam konta</Link>
                <Link className="duration-[.5s] hover:text-[#ffffff]" to="/reset">Nie pamiętam hasła</Link>
                    
            </div>

        </Form>
    )
}