import { useStore } from "../zustand.config"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

export const Button = ({ render }) => {
    const store = useStore()
    const location = useLocation()
    const navigate = useNavigate()
    const [param, setParam] = useSearchParams()

    let classButton, urlButton, classOnButton, classURLButton, colorButton, onClickButton, nameButton

    switch(render) {
        case "zlecenie": { 
            nameButton = `Stwórz zlecenie`, 
            urlButton = `/zlecenia/dodaj`,
            colorButton = `inset_0_0_5rem_0_#444444`,
            onClickButton = () => navigate(`/zlecenia/dodaj`);
            break 
        }
        case "zlecenia": { 
            nameButton = `Zlecenia`, 
            urlButton = `/zlecenia`,
            colorButton = `inset_0_0_5rem_0_#ffffff40`,
            // onClickButton = () => {param.delete("filtr"); setParam(param)};
            onClickButton = () => navigate(`/zlecenia`);
            break 
        }
        case "aktywne": { 
            nameButton = `Aktywne`, 
            urlButton = `/zlecenia/aktywne`,
            colorButton = `inset_0_0_5rem_0_#561234`,
            onClickButton = () => navigate(`/zlecenia/aktywne`);
            break 
        }
        case "historia": { 
            nameButton = `Historia`, 
            urlButton = `/zlecenia/historia`,
            colorButton = `inset_0_0_5rem_0_#123456`,
            onClickButton = () => navigate(`/zlecenia/historia`);
            break 
        }
        case "zlecenieURL": { 
            nameButton = `Dodaj`, 
            urlButton = `/zlecenia/dodaj`,
            onClickButton = () => navigate(`/zlecenia/dodaj`);
            break 
        }
        case "zleceniaURL": { 
            nameButton = `Zlecenia`, 
            urlButton = `/zlecenia`,
            onClickButton = () => navigate(`/zlecenia`);
            break 
        }
        case "aktywneURL": { 
            nameButton = `Aktywne`, 
            urlButton = `/zlecenia/aktywne`,
            onClickButton = () => navigate(`/zlecenia/aktywne`);
            break 
        }
        case "historiaURL": { 
            nameButton = `Historia`, 
            urlButton = `/zlecenia/historia`,
            onClickButton = () => navigate(`/zlecenia/historia`);
            break 
        }
    }

    switch(render) {
        case `zlecenia`: case `aktywne`: case `historia`: {
            classButton = `w-[300px] text-center p-[13px] border-[1px] border-[#000000] rounded-[10px] duration-[.5s] shadow-[${colorButton}] backdrop-blur-[5px] hover:text-[#ffffff]`
            break
        }
        case `zlecenie`: {
            classButton = `w-[300px] text-center p-[13px] border-[1px] border-[#000000] rounded-[10px] duration-[.5s] shadow-[inset_0_0_5rem_0_#351351] backdrop-blur-[5px] hover:text-[#ffffff]`
            break
        }
        case `zlecenieURL`: case `zleceniaURL`: case `aktywneURL`:  case `historiaURL`: {
            classButton = ``
            break
        }
    }

    classOnButton = `text-[#ffffff]`
    classURLButton = `font-['Material_icons']`

    return (
        <>
            {[`zlecenie`, `zlecenia`, `aktywne`, `historia`].includes(render) &&
                <button className={location.pathname === urlButton ? `${classButton} ${classOnButton}` : `${classButton}`}
                    type="button"
                    onClick={onClickButton}>
                        {nameButton}
                </button>
            }

            {[`zlecenieURL`, `zleceniaURL`, `aktywneURL`, `historiaURL`].includes(render) &&
                <>
                    <button className={classButton}
                        type="button"
                        onClick={onClickButton}>
                            {nameButton}
                    </button>
                    <span className={classURLButton}>navigate_next</span>
                </>
            }
        </>
    )
}