import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"

import { Nav } from "./Nav"
import { Form } from "./Form"
import { Input } from "./Input"

export const AppVerify = () => {
    const store = useStore()
    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <>
            <Nav render="account"/>
            
            <Form render="verify" handleSubmit={handleSubmit}>

                <h1 className="_form-title">Weryfikacja</h1>

                <div className="mt-[2rem] mb-[2rem]">

                    <Input render="verify" register={register} errors={errors}/>

                </div>

                <button className="_button-pink" type="submit">Zweryfikuj</button>

                {store.error && <div className="_form-error">{store.error}</div>}

            </Form>
        </> 
    )
}
  