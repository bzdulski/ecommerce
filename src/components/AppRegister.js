import { useStore } from "../zustand.config"
import { useForm } from "react-hook-form"
import { useLocation, Link } from "react-router-dom"

import { Form } from "./Form"
import { Input } from "./Input"

export const AppRegister = () => {
    const store = useStore()
    const location = useLocation()

    const keyGenerator = (length) => {
        let keyResult = ""
        let keyCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let keyLength = keyCharacters.length
        
        for (let i=0; i<length; i++) {
            keyResult += keyCharacters.charAt(Math.floor(Math.random() * keyLength));
        }

        return keyResult
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: {
        id: "",
        status: location.pathname === "/rejestracja/klient" ? `klient` : `instalator`,
        email: "",
        password: "",
        telefon: "",
        isZweryfikowany: false,
        isFirma: false,
        isList: location.pathname === "/rejestracja/klient" ? true : false,
        isKey: keyGenerator(6),
        imie: "",
        nazwisko: "",
        nazwa: "",
        nip: "",
        ulicainumer: "",
        miejscowosc: "",
        kodpocztowy: "",
        koszyk: {
            nazwa: "KOSZYK",
            produkty: [],
            zlecenie: "KOSZYK",
        },
        rabaty: [],
        godzinaCreate: "",
        dataCreate: "",
        godzinaEdit: "",
        dataEdit: "",
    }})

    return ( 
        <Form render="register" handleSubmit={handleSubmit}>

            <h1 className="text-xl font-bold text-[#ffffff]">Rejestracja</h1>

            <div className="flex gap-[2rem] sm:flex-wrap sm:justify-center">

                <Link className={location.pathname === `/rejestracja/klient` ? "_form-link-blue-active" : "_form-link-blue"} to="/rejestracja/klient" onClick={() => reset(e => ({...e, status: "klient", isList: true}))}>Klient</Link>
                <Link className={location.pathname === `/rejestracja/instalator` ? "_form-link-pink-active" : "_form-link-pink"} to="/rejestracja/instalator" onClick={() => reset(e => ({...e, status: "instalator", isList: false}))}>Instalator</Link>

            </div>

            <div className="flex flex-col gap-[2rem] mt-[2rem] mb-[2rem]">

                <Input render="email" register={register} errors={errors}/>
                <Input render="password" register={register} errors={errors}/>

                {location.pathname === "/rejestracja/instalator" &&
                    <>
                        <Input render="telefon" register={register} errors={errors}/>

                        {watch("isFirma") === false && <>

                            <button className="_button-white" type="button" onClick={() => reset(e => ({...e, isFirma: true, imie: "", nazwisko: ""}))}>Bez Firmy</button> 

                            <Input render="imie" register={register} errors={errors}/>
                            <Input render="nazwisko" register={register} errors={errors}/>

                        </>}

                        {watch("isFirma") === true && <>

                            <button className="_button-white" type="button" onClick={() => reset(e => ({...e, isFirma: false, nazwa: "", nip: ""}))}>Firma</button>

                            <Input render="nazwa" register={register} errors={errors}/>
                            <Input render="nip" register={register} errors={errors}/>

                        </>}

                        <Input render="ulicainumer" register={register} errors={errors}/>
                        <Input render="miejscowosc" register={register} errors={errors}/>
                        <Input render="kodpocztowy" register={register} errors={errors}/>

                    </>
                }  

            </div>

            {location.pathname === "/rejestracja/instalator" && watch("isFirma") === false && <p className="text-center">Na Twój adres zamieszkania zostanie wysłany list z kodem weryfikacyjnym</p>}

            <button className="p-[1rem] w-full bg-transparent shadow-[inset_0_0_5rem_0_#561234] border-[#000000] border-[.1rem] rounded-[1rem] duration-[.5s] hover:text-[#ffffff]" type="submit">Zarejestruj się</button> 

            {store.error && <div className="text-[#ed143d]">{store.error}</div>}

            <Link className="duration-[.5s] hover:text-[#ffffff]" to="/logowanie">Posiadam konto</Link>

        </Form>
    )
}