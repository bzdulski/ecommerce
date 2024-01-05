import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"

import { Nav } from "./Nav"
import { Form } from "./Form"
import { Input } from "./Input"

export const AppChange = () => {
    const store = useStore()
    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <>
            <Nav render="account"/>
            
            <Form render="change" handleSubmit={handleSubmit}>

                <h1 className="_form-title">Zmiana hasła</h1>

                <div className="mt-[2rem] mb-[2rem]">

                    <Input render="newpassword" register={register} errors={errors}/>

                </div>

                <button className="_button-pink" type="submit">Zmień hasło</button>

                {store.error && <div className="_form-error">{store.error}</div>}

            </Form>
        </> 
    )
}
  