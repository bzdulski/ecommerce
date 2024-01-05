export const Input = ({ render, register, errors, readOnly }) => {

    let classContainer = `relative` 
    let classInput = `p-[.7rem] w-[20rem] bg-transparent shadow-[inset_0_0_1rem_0_#123456] border-[#123456] border-[.1rem] rounded-[1rem] duration-[.5s] outline-none focus:shadow-[inset_0_0_1rem_0_#561234] focus:border-[#561234] peer`
    let classLabel = `absolute p-[.7rem] left-[0] duration-[.5s] pointer-events-none peer-focus:text-[#ffffff] peer-focus:translate-y-[-40px] peer-valid:text-[#ffffff] peer-valid:translate-y-[-40px]`
    let classLabelReadOnly = `absolute p-[.7rem] left-[0] duration-[.5s] pointer-events-none text-[#ffffff] translate-y-[-40px]`
    let classError = `absolute top-[3.3rem] right-[0] text-[#ed143d]`
    let type, input, label, pattern, required

    switch(render) {
        case "email": { type = "text", input = "email", label = "Email", required = "Niepoprawny email!"; break}
        case "password": { type = "password", input = "password", label = "Hasło", required = "Niepoprawne hasło!"; break}
        case "newpassword": { type = "password", input = "newpassword", label = "Wpisz nowe hasło", required = "Niepoprawne hasło!"; break}
        case "verify": { type = "text", input = "verify", label = "Wpisz klucz weryfikacji", required = "Niepoprawny klucz!"; break}
        case "telefon": { type = "text", input = "telefon", label = "Telefon", required = "Niepoprawny telefon!"; break}
        case "imie": { type = "text", input = "imie", label = "Imię", required = "Niepoprawne imię!"; break}
        case "nazwisko": { type = "text", input = "nazwisko", label = "Nazwisko", required = "Niepoprawne nazwisko!"; break}
        case "nazwa": { type = "text", input = "nazwa", label = "Nazwa", required = "Niepoprawna nazwa!"; break}
        case "nip": { type = "text", input = "nip", label = "Nip", required = "Niepoprawny nip!"; break}
        case "ulicainumer": { type = "text", input = "ulicainumer", label = "Ulica i numer", required = "Niepoprawna ulica i numer!"; break}
        case "miejscowosc": { type = "text", input = "miejscowosc", label = "Miejscowość", required = "Niepoprawna miejscowość!"; break}
        case "kodpocztowy": { type = "text", input = "kodpocztowy", label = "Kod pocztowy", required = "Niepoprawny kod pocztowy!"; break}
        case "kurierimie": { type = "text", input = "kurierimie", label = "Imię", required = "Niepoprawne imię!"; break}
        case "kuriernazwisko": { type = "text", input = "kuriernazwisko", label = "Nazwisko", required = "Niepoprawne nazwisko!"; break}
        case "kurierulicainumer": { type = "text", input = "kurierulicainumer", label = "Ulica i numer", required = "Niepoprawna ulica i numer!"; break}
        case "kuriermiejscowosc": { type = "text", input = "kuriermiejscowosc", label = "Miejscowość", required = "Niepoprawna miejscowość!"; break}
        case "kurierkodpocztowy": { type = "text", input = "kurierkodpocztowy", label = "Kod pocztowy", required = "Niepoprawny kod pocztowy!"; break}
        case "paczkomat": { type = "text", input = "paczkomat", label = "Numer paczkomatu lub adres", required = "Niepoprawny paczkomat!"; break}
        case "fakturanazwa": { type = "text", input = "fakturanazwa", label = "Nazwa", required = "Niepoprawna nazwa!"; break}
        case "fakturanip": { type = "text", input = "fakturanip", label = "Nip", required = "Niepoprawny nip!"; break}
        case "fakturaulicainumer": { type = "text", input = "fakturaulicainumer", label = "Ulica i numer", required = "Niepoprawna ulica i numer!"; break}
        case "fakturamiejscowosc": { type = "text", input = "fakturamiejscowosc", label = "Miejscowość", required = "Niepoprawna miejscowość!"; break}
        case "fakturakodpocztowy": { type = "text", input = "fakturakodpocztowy", label = "Kod pocztowy", required = "Niepoprawny kod pocztowy!"; break}
    }

    return ( 
        <div className={classContainer}>

            <input className={classInput} 
                type={type} 
                pattern={pattern} 
                required={required} 
                readOnly={readOnly} 
                {...register(input, {/*pattern: "",*/ required: required})}/>

            <label className={readOnly ? classLabelReadOnly : classLabel}>
                {label}
            </label>

            {errors[input] && 
                <div className={classError}>
                    {errors[input].message}
                </div>
            }

        </div>  
    )
}