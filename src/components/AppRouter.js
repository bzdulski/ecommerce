import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AppIndex } from "./AppIndex"
import { AppHome } from "./AppHome"
import { AppLogin } from "./AppLogin"
import { AppRegister } from "./AppRegister"
import { AppReset } from "./AppReset"
import { AppDocuments } from "./AppDocuments"
import { AppSettings } from "./AppSettings"
import { AppDiscounts } from "./AppDiscounts"
import { AppChange } from "./AppChange"
import { AppCart } from "./AppCart"
import { AppShop } from "./AppShop"
import { AppItem } from "./AppItem"
import { AppError } from "./AppError"
import { AppUnknown } from "./AppUnknown"

import { AppAbout } from "./AppAbout"
import { AppRules } from "./AppRules"
import { AppBusiness } from "./AppBusiness"
import { AppCarier } from "./AppCarier"
import { AppGallery } from "./AppGallery"
import { AppFinance } from "./AppFinance"

import { AppInfo } from "./AppInfo"
import { AppMessenger } from "./AppMessenger"
import { AppArticle } from "./AppArticle"
import { AppContact } from "./AppContact"
import { AppVerify } from "./AppVerify"

import { AppTask } from "./AppTask"
import { AppTa } from "./AppTa"
import { AppTaskAdd } from "./AppTaskAdd"
import { AppTaskThx } from "./AppTaskThx"
import { AppTaskAll } from "./AppTaskAll"

import { AppTaskId } from "./AppTaskId"
import { AppTaskMyId } from "./AppTaskMyId"
import { AppTaskHired } from "./AppTaskHired"
import { AppTaskHiId } from "./AppTaskHiId"
import { AppTaskInv } from "./AppTaskInv"
import { AppRegisterInstalator } from "./AppRegisterInstalator"
import { AppRegisterKlient } from "./AppRegisterKlient"

import { AppRobota } from "./AppRobota"

export const AppRouter = () => 
{
  return (
    <BrowserRouter>

        <Routes>

            <Route element={<AppIndex/>}>

              <Route path="/" element={<AppHome/>}/>

              <Route path="logowanie" element={<AppLogin/>}/>

              <Route path="rejestracja/klient" element={<AppRegister/>}/>
              <Route path="rejestracja/instalator" element={<AppRegister/>}/>

              <Route path="reset" element={<AppReset/>}/>

              <Route path="konto/dokumenty" element={<AppDocuments/>}/>
              <Route path="konto/rabaty" element={<AppDiscounts/>}/>
              <Route path="konto/reset" element={<AppChange/>}/>
              <Route path="konto/ustawienia" element={<AppSettings/>}/>
              <Route path="konto/finanse" element={<AppFinance/>}/>
              <Route path="konto/weryfikacja" element={<AppVerify/>}/>

              <Route path="informacje" element={<AppInfo/>}/>
              <Route path="aktualnosci" element={<AppArticle/>}/>
              <Route path="komunikator" element={<AppMessenger/>}/>

              <Route path="koszyk" element={<AppCart/>}/>

              <Route path="sklep" element={<AppShop/>}/>
              <Route path="sklep/kategoria/:idKategoria1" element={<AppShop/>}/>
              <Route path="sklep/kategoria/:idKategoria1/:idKategoria2" element={<AppShop/>}/>
              <Route path="sklep/kategoria/:idKategoria1/:idKategoria2/:idKategoria3" element={<AppShop/>}/>
              <Route path="sklep/kategoria/:idKategoria1/:idKategoria2/:idKategoria3/:idKategoria4" element={<AppShop/>}/>
              <Route path="sklep/produkt/:idProdukt" element={<AppItem/>}/>

              <Route path="onas" element={<AppAbout/>}/>
              <Route path="regulamin" element={<AppRules/>}/>
              <Route path="wspolpraca" element={<AppBusiness/>}/>
              <Route path="kariera" element={<AppCarier/>}/>
              <Route path="galeria" element={<AppGallery/>}/>
              <Route path="kontakt" element={<AppContact/>}/>

              <Route path="robota" element={<AppRobota/>}/>

              <Route path="zlecenia" element={<AppTa/>}/>
              <Route path="zlecenia/dodaj" element={<AppTa/>}/>
              <Route path="zlecenia/aktywne" element={<AppTa/>}/>
              <Route path="zlecenia/historia" element={<AppTa/>}/>

              <Route path="zlecenia/aktywne/:idTask" element={<AppTa/>}/>
              <Route path="zlecenia/historia/:idTask" element={<AppTa/>}/>


              <Route path="zlecenia/:idTask" element={<AppTaskId/>}/>
              <Route path="zlecenia/thx" element={<AppTaskThx/>}/>
              <Route path="zlecenia/instalator" element={<AppRegisterInstalator/>}/>
              <Route path="zlecenia/klient" element={<AppRegisterKlient/>}/>
              <Route path="zlecenia/all" element={<AppTaskAll/>}/>

              {/* <Route path="zlecenia/dodaj" element={<AppTaskAdd/>}/>
              <Route path="zlecenia/dodane" element={<AppTaskAdded/>}/>
              <Route path="zlecenia/podjete" element={<AppTaskHired/>}/>
              <Route path="zlecenia/historia" element={<AppTask/>}/>
              <Route path="zlecenia/id" element={<AppTaskId/>}/>
              <Route path="zlecenia/myid" element={<AppTaskMyId/>}/>
              <Route path="zlecenia/hiid" element={<AppTaskHiId/>}/>
              <Route path="zlecenia/invite" element={<AppTaskInv/>}/> */}

              <Route path="*" element={<AppError/>}/>
              
            </Route>
            
        </Routes>

    </BrowserRouter>
  )
}