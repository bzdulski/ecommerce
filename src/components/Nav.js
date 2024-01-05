import { useStore } from "../zustand.config"
import { useParams, Link, useLocation } from "react-router-dom"
import { auth } from "../firebase.config"

export const Nav = ({ render }) => {
    const store = useStore()
    const location = useLocation()
    const { idKategoria1, idKategoria2, idKategoria3, idKategoria4, idProdukt } = useParams()
    let classLinkActive = `text-[#ffffff]`
    let classLinkHover = `duration-[.5s] hover:text-[#ffffff]`

    console.log(auth)

    return (
        <>

            {render === "account" && 
                <nav className="_nav mobile:hidden">

                    <Link className={location.pathname === `/konto/ustawienia` ? classLinkActive : classLinkHover} to="/konto/ustawienia">Moje dane</Link>
                    <Link className={location.pathname === `/konto/dokumenty` ? classLinkActive : classLinkHover} to="/konto/dokumenty">Dokumenty</Link>
                    <Link className={location.pathname === `/konto/rabaty` ? classLinkActive : classLinkHover} to="/konto/rabaty">Rabaty</Link>
                    <Link className={location.pathname === `/konto/reset` ? classLinkActive : classLinkHover} to="/konto/reset">Zmiana hasła</Link>
                    <Link className={location.pathname === `/konto/finanse` ? classLinkActive : classLinkHover} to="/konto/finanse">Finanse</Link>
                    {store.auth.status === "instalator" && !store.auth.isList && <Link className={location.pathname === `/konto/weryfikacja` ? classLinkActive : classLinkHover} to="/konto/weryfikacja">Weryfikacja</Link>}
                    <div className="mt-auto">
                        {auth?.currentUser?.emailVerified ? <p className="font-['Material_icons'] text-[2rem] text-center text-[#28c76f]">warning</p> : <p className="font-['Material_icons'] text-[2rem] text-center text-[#ed143d]">warning</p>}
                        {auth?.currentUser?.emailVerified ? <p className="text-[1rem] italic text-[#28c76f] text-center">KONTO ZWERYFIKOWANE</p> : <p className="text-[1rem] text-center italic text-[#ed143d]">KONTO NIEZWERYFIKOWANE</p>}
                        {store.auth.status === "instalator" && <div className="">
                            {store.auth.isList ? <p className="font-['Material_icons'] text-[2rem] text-center text-[#28c76f]">warning</p> : <p className="font-['Material_icons'] text-[2rem] text-center text-[#ed143d]">warning</p>}
                            {store.auth.isList ? <p className="text-[1rem] italic text-[#28c76f] text-center">LIST ZWERYFIKOWANY</p> : <p className="text-[1rem] text-center italic text-[#ed143d]">LIST ZWERYFIKOWANY</p>}
                        </div>}
                    </div>
                </nav>
            }

            {render === "category" &&
                
                <nav className="_nav mobile:hidden">

                    <Link className={location.pathname === "/sklep" ? "_link-active" : "_link"} to={`/sklep`}>Sklep (wszystkie)</Link>

                    {[].concat(store.category.filter(l => l.kategoria === "kategoria1")).sort((a, b) => a.nazwa > b.nazwa ? 1 : -1)?.map(e => (

                        <div key={e.id}>

                            <div className="flex flex-col gap-[1rem]">

                                <Link className={idKategoria1 === e.nazwa.replaceAll(" ", "-") ? "_link-active" : "_link"} to={`/sklep/kategoria/${e.nazwa.replaceAll(" ", "-")}`}>{e.nazwa} ({store.product.filter(el => el.kategoria1 === e.nazwa).length})</Link>

                                {idKategoria1 === e.nazwa.replaceAll(" ", "-") && store.category.filter(x => (x.kategoria1 === e.nazwa && x.kategoria === "kategoria2"))?.map(x =>

                                    <div className="flex flex-col ml-[2rem] gap-[1rem]" key={x.id}>

                                        <Link className={idKategoria2 === x.nazwa.replaceAll(" ", "-") ? "_link-active" : "_link"} to={`/sklep/kategoria/${e.nazwa.replaceAll(" ", "-")}/${x.nazwa.replaceAll(" ", "-")}`}>{x.nazwa} ({store.product.filter(el => el.kategoria2 === x.nazwa).length})</Link>
                                    
                                        {idKategoria2 === x.nazwa.replaceAll(" ", "-") && store.category.filter(kk2 => (kk2.kategoria2 === x.nazwa && kk2.kategoria === "kategoria3"))?.map(kkx =>

                                            <div className="flex flex-col ml-[2rem] gap-[1rem]" key={kkx.id}>

                                                <Link className={idKategoria3 === kkx.nazwa.replaceAll(" ", "-") ? "_link-active" : "_link"} to={`/sklep/kategoria/${e.nazwa.replaceAll(" ", "-")}/${x.nazwa.replaceAll(" ", "-")}/${kkx.nazwa.replaceAll(" ", "-")}`}>{kkx.nazwa} ({store.product.filter(el => el.kategoria3 === kkx.nazwa).length})</Link>

                                                {idKategoria3 === kkx.nazwa.replaceAll(" ", "-") && store.category.filter(kk3 => (kk3.kategoria3 === kkx.nazwa && kk3.kategoria === "kategoria4"))?.map(oo =>

                                                    <div className="ml-[2rem]" key={oo.id}>

                                                        <Link className={idKategoria4 === oo.nazwa.replaceAll(" ", "-") ? "_link-active" : "_link"} to={`/sklep/kategoria/${e.nazwa.replaceAll(" ", "-")}/${x.nazwa.replaceAll(" ", "-")}/${kkx.nazwa.replaceAll(" ", "-")}/${oo.nazwa.replaceAll(" ", "-")}`}>{oo.nazwa} ({store.product.filter(el => el.kategoria4 === oo.nazwa).length})</Link>

                                                    </div>

                                                )}

                                            </div>

                                        )}

                                    </div>

                                )}

                            </div>

                        </div>
                            
                    ))}

                </nav>

            }

        </>
    )
}