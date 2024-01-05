import { useStore } from "../zustand.config"
import { useLocation, useParams, Link } from "react-router-dom";

export const Href = ({ render }) => {
    const store = useStore()
    const location = useLocation()
    const { idKategoria, idPodkategoria, idProdukt } = useParams()
    let to, url, text, icon, target, onClick, className, classActive, classHover, classIcon, classText
    
    if([`logo`].includes(render)) {
        classText = `text-2xl leading-none font-bold text-[#ffffff] text-center`
    }

    if([`logo2`].includes(render)) {
        classText = `text-2xl leading-none font-bold text-[#000000] text-center`
    }

    if(["onas", "regulamin", "współpraca", "kariera", "galeria", "kontakt"].includes(render)) {
        classActive = `text-[#ffffff]`
        classHover = `duration-[.5s] hover:text-[#ffffff]`
    }
    
    if(["telefon", "email", "facebook", "instagram"].includes(render)) {
        className = `p-[1rem] font-['Material_Icons'] text-xl leading-none bg-transparent shadow-[inset_0_0_1rem_0_#ffffff40] border-[#ffffff40] border-[.1rem] rounded-[50%] duration-[.5s] cursor-pointer hover:text-[#ffffff]`
    }

    if(store.mobile && ["shop", "cart", "account", "auth"].includes(render)) {
        classActive = `flex gap-[1rem] text-[#ffffff]`
        classHover = `flex gap-[1rem] duration-[.5s] hover:text-[#ffffff]`
        classIcon = `font-['Material_Icons'] text-xl leading-none`
        classText = `whitespace-pre-line max-w-[9rem] text-center font-bold truncate`
    }

    if(!store.mobile && ["shop", "cart", "account", "auth"].includes(render)) {
        classActive = `flex flex-col items-center justify-start gap-[1rem] relative ml-[4rem] text-[#ffffff] before:content-[''] before:absolute before:top-[0] before:left-[-2rem] before:right-[0] before:bottom-[0] before:p-[1.5rem] before:w-full before:h-full before:skew-x-[340deg] before:border-l-[.1rem] before:border-[#ffffff40] before:pointer-events-none`
        classHover = `flex flex-col items-center justify-start gap-[1rem] relative ml-[4rem] duration-[.5s] hover:text-[#ffffff] before:content-[''] before:absolute before:top-[0] before:left-[-2rem] before:right-[0] before:bottom-[0] before:p-[1.5rem] before:w-full before:h-full before:skew-x-[340deg] before:border-l-[.1rem] before:border-[#ffffff40] before:pointer-events-none`
        classIcon = `font-['Material_Icons'] text-xl leading-none`
        classText = `whitespace-pre-line max-w-[9rem] text-center font-bold truncate`
    }

    if(!store.mobile && ["task"].includes(render)) {
        classActive = `flex flex-col items-center justify-start gap-[1rem] relative ml-[4rem] text-[#ffffff] before:content-[''] before:absolute before:top-[0] before:left-[-2rem] before:right-[0] before:bottom-[0] before:p-[1.5rem] before:w-full before:h-full before:skew-x-[340deg] before:border-l-[.1rem] before:border-[#ffffff40] before:pointer-events-none`
        classHover = `flex flex-col items-center justify-start gap-[1rem] relative ml-[4rem] duration-[.5s] hover:text-[#ffffff] before:content-[''] before:absolute before:top-[0] before:left-[-2rem] before:right-[0] before:bottom-[0] before:p-[1.5rem] before:w-full before:h-full before:skew-x-[340deg] before:border-l-[.1rem] before:border-[#ffffff40] before:pointer-events-none`
        classIcon = `font-['Material_Icons'] text-xl leading-none`
        classText = `whitespace-pre-line max-w-[8rem] text-center font-bold truncate`
    }

    switch(render) {
        case "onas": { to = "/onas", text = "O nas"; break}
        case "regulamin": { to = "/regulamin", text = "Regulamin"; break}
        case "współpraca": { to = "/wspolpraca", text = "Współpraca"; break}
        case "kariera": { to = "/kariera", text = "Kariera"; break}
        case "galeria": { to = "/galeria", text = "Galeria"; break}
        case "kontakt": { to = "/kontakt", text = "Kontakt"; break}
        case "telefon": { to = "/kontakt", text = "phone"; break}
        case "email": { to = "/kontakt", text = "email"; break}
        case "facebook": { to = "https://www.facebook.com", text = "facebook", target = "_blank"; break}
        case "instagram": { to = "https://www.instagram.com", text = "photo_camera", target = "_blank"; break}
        case "logo": 
        { 
            url = ["/"],
            to = "/",
            text = "Ecommerce";
            break
        }
        case "logo2": 
        { 
            url = ["/"],
            to = "/",
            text = "Ecommerce";
            break
        }
        case "task": 
        { 
            url = ["/zlecenia"],
            to = "/zlecenia",
            text = "ZLECENIA",
            icon = "task";
            break
        }
        case "shop": 
        { 
            url = ["/sklep", `/sklep/kategoria/${idKategoria}`, `/sklep/kategoria/${idKategoria}/${idPodkategoria}`, `/sklep/produkt/${idProdukt}`],
            to = "/sklep",
            text = "SKLEP",
            icon = "shop";
            break
        }
        case "cart": 
        {
            url = ["/koszyk"], 
            to = "/koszyk", 
            text = `${store.auth ? `${store.auth.koszyk?.nazwa}${store.mobile ? ` ` : `\n`}(${store.reduceAuthCartProduktyBrutto()}) ZŁ` : `KOSZYK${store.mobile ? ` ` : `\n`}(0.00) ZŁ`}`, 
            icon = "shopping_cart";
            break
        }
        case "account":
        { 
            url = store.auth ? ["/konto/ustawienia", "/konto/dokumenty", "/konto/rabaty", "/konto/reset"] : ["/rejestracja/klient", "/rejestracja/instalator"],
            to = `${store.auth ? `/konto/ustawienia` : `/rejestracja/klient`}`,
            text = `${store.auth ? `${store.auth.email}` : `KONTO`}`,
            icon = "person";
            break
        }
        case "auth":
        { 
            if(store.auth) { onClick = () => store.logout()}
            url = ["/logowanie"],
            to = "/logowanie",
            text = `${store.auth ? "WYLOGUJ SIĘ" : `ZALOGUJ SIĘ`}`,
            icon = "key";
            break
        }
    }

    return (
        <>

            {["logo", "logo2", "shop", "cart", "account", "auth", "task"].includes(render) &&
                <Link className={url.includes(location.pathname) ? classActive : classHover}
                    to={to}
                    onClick={onClick}>
                    <span className={classIcon}>{icon}</span>
                    <p className={classText}>{text}</p>
                </Link>
            }

            {["onas", "regulamin", "współpraca", "kariera", "galeria", "kontakt"].includes(render) &&
                <Link className={location.pathname === to ? classActive : classHover}
                    to={to}
                    target={target}>
                    {text}
                </Link>
            }

            {["facebook", "instagram", "telefon", "email"].includes(render) &&
                <Link className={className}
                    to={to}
                    target={target}>
                    {text}
                </Link>
            }

            {/* {["telefon", "email"].includes(render) &&
                <span className={className}>
                    {text}
                </span>
            } */}

            {store.mobile && render === "shop" && ["/sklep", `/sklep/kategoria/${idKategoria}`, `/sklep/kategoria/${idKategoria}/${idPodkategoria}`, `/sklep/produkt/${idProdukt}`].includes(location.pathname) && 
                                    
                <div className="flex flex-col ml-[2rem] gap-[1rem]">

                    {[].concat(store.category).sort((a, b) => Number(a.number) > Number(b.number) ? 1 : -1).map(e => (

                        <div key={e.id}>

                            <div className="flex flex-col gap-[1rem]">

                                <Link className={idKategoria === e.name.replaceAll(" ", "-") ? "text-[#ffffff]" : "duration-[.5s] hover:text-[#ffffff]"} to={`/sklep/kategoria/${e.name.replaceAll(" ", "-")}`}>{e.name} ({store.product.filter(el => el.kategoria === e.name).length})</Link>

                                {idKategoria === e.name.replaceAll(" ", "-") && store.category.find(x => x.id === e.id).categories.map(x =>

                                    <div className="ml-[2rem]" key={x.number}>

                                        <Link className={idPodkategoria === x.name.replaceAll(" ", "-") ? "text-[#ffffff]" : "duration-[.5s] hover:text-[#ffffff]"} to={`/sklep/kategoria/${e.name.replaceAll(" ", "-")}/${x.name.replaceAll(" ", "-")}`}>{x.name} ({store.product.filter(el => el.podkategoria === x.name).length})</Link>
                                    
                                    </div>

                                )}

                            </div>

                        </div>
                        
                    ))}

                </div>

            }

            {store.mobile && render === "account" && ["/konto/ustawienia", "/konto/dokumenty", "/konto/rabaty", "/konto/reset"].includes(location.pathname) && 
                
                <div className="flex flex-col ml-[2rem] gap-[1rem]">

                    <Link className={location.pathname === `/konto/ustawienia` ? "text-[#ffffff]" : "duration-[.5s] hover:text-[#ffffff]"} to="/konto/ustawienia">Ustawienia</Link>
                    <Link className={location.pathname === `/konto/dokumenty` ? "text-[#ffffff]" : "duration-[.5s] hover:text-[#ffffff]"} to="/konto/dokumenty">Dokumenty</Link>
                    <Link className={location.pathname === `/konto/rabaty` ? "text-[#ffffff]" : "duration-[.5s] hover:text-[#ffffff]"} to="/konto/rabaty">Rabaty</Link>
                    <Link className={location.pathname === `/konto/reset` ? "text-[#ffffff]" : "duration-[.5s] hover:text-[#ffffff]"} to="/konto/reset">Zmiana hasła</Link>
            
                </div>

            }

        </>
    )
}