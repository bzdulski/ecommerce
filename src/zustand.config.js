import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { produce } from "immer"
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail, updatePassword, sendEmailVerification } from "firebase/auth"
import { collection, query, where, getDocs, doc, setDoc, updateDoc, orderBy, limit, endAt, serverTimestamp } from "firebase/firestore"
// eslint-disable-next-line
import { ref, listAll, getDownloadURL } from "firebase/storage"
// eslint-disable-next-line
import { auth, firestore, storage } from "./firebase.config"

export const useStore = create(devtools((set, get) => ({
    auth: null,
    user: null,
    order: null,
    product: null,
    task: null,
    category: null,
    producer: null,
    article: null,
    parameter: null,
    loading: true,
    mobile: false,
    error: "",
    numberPay: 0,
    typePay: 0,
    numberTask: 0,
    alert: 0,
    robotaPrice: 0,
    robotaId: "",
    list: [],

    fetch: async () => {
        try {
            set({ loading: true, error: "" })

            let dataProduct = []

            const docsCategory = await getDocs(query(collection(firestore, "category"), orderBy("nazwa", "asc")))
            const docsProducer = await getDocs(query(collection(firestore, "producer"), orderBy("nazwa", "asc")))
            const docsParameter = await getDocs(query(collection(firestore, "parameter"), orderBy("nazwa", "asc")))
            const docsArticle = await getDocs(query(collection(firestore, "article"), orderBy("createdAt", "desc")))
            const docsProduct = await getDocs(query(collection(firestore, "product"), orderBy("createdAt", "asc")))
            // const docsProduct = await getDocs(query(collection(firestore, "product"), orderBy("createdAt", "desc")))
            // const docsProduct = await getDocs(query(collection(firestore, "product"), orderBy("dataCreate"), limit(10)))
            const docsTask = await getDocs(query(collection(firestore, "task"), orderBy("createdAt", "asc")))
            const docsUser = await getDocs(query(collection(firestore, "user"), orderBy("createdAt", "desc")))

            docsProduct.forEach(product => { dataProduct.push(product.data()) })

            if(!auth.currentUser) {
                set({ loading: false, product: dataProduct, user: docsUser.docs.map((doc) => ({ ...doc.data() })), category: docsCategory.docs.map((doc) => ({ ...doc.data() })), producer: docsProducer.docs.map((doc) => ({ ...doc.data() })), parameter: docsParameter.docs.map((doc) => ({ ...doc.data() })), article: docsArticle.docs.map((doc) => ({...doc.data() })), task: docsTask.docs.map((doc) => ({...doc.data() })) })
            }
            else {
                let dataAuth = {}
                let dataOrder = []

                const docsAuth = await getDocs(query(collection(firestore, "user"), where("id", "==", auth.currentUser.uid)))
                // const docsOrder = await getDocs(query(collection(firestore, "order"), where("iduser", "==", auth.currentUser.uid)))
                const docsOrder = await getDocs(query(collection(firestore, "order")))
    
                docsAuth.forEach((doc) => { dataAuth = doc.data() })
                docsOrder.forEach(order => { dataOrder.push(order.data()) })

                set({ loading: false, auth: dataAuth, order: dataOrder, product: dataProduct, user: docsUser.docs.map((doc) => ({ ...doc.data() })), category: docsCategory.docs.map((doc) => ({ ...doc.data() })), producer: docsProducer.docs.map((doc) => ({ ...doc.data() })), parameter: docsParameter.docs.map((doc) => ({ ...doc.data() })), article: docsArticle.docs.map((doc) => ({...doc.data() })), task: docsTask.docs.map((doc) => ({...doc.data() })) })
            }
        }
        catch (error) {
            set({ loading: false, error: `fetch/${error.code}` })
        }
      },

    login: async (event) => {
        try {
            set({ loading: true, error: "" })

            await signInWithEmailAndPassword(auth, event.email, event.password)

            let dataAuth = {}
            let dataOrder = []

            const docsAuth = await getDocs(query(collection(firestore, "user"), where("id", "==", auth.currentUser.uid)))
            // const docsOrder = await getDocs(query(collection(firestore, "order"), where("iduser", "==", auth.currentUser.uid)))
            const docsOrder = await getDocs(query(collection(firestore, "order")))

            docsAuth.forEach((doc) => { dataAuth = doc.data() })
            docsOrder.forEach(order => { dataOrder.push(order.data()) })

            set({ loading: false, auth: dataAuth, order: dataOrder })
        }
        catch (error) {
            switch (error.code) {
                case "auth/invalid-email": return set({ loading: false, error: `Niepoprawny email!` })
                case "auth/user-not-found": return set({ loading: false, error: `Nieodnaleziono użytkownika!` })
                case "auth/wrong-password": return set({ loading: false, error: `Niepoprawne hasło!` })
                case "auth/too-many-requests": return set({ loading: false, error: `Za dużo prób logowania, spróbuj później!` })
                case "auth/network-request-failed": return set({ loading: false, error: `Brak połączenia internetowego!` })
                default: return set({ loading: false, error: `login/${error.code}` })
            }
        }
    },

    logout: async () => {
        try {
            set({ loading: true, error: "" })

            await signOut(auth)

            set({ loading: false, auth: null, order: null })
        }
        catch (error) {
            set({ loading: false, error: `logout/${error.code}` })
        }
    },

    clean: (event) => {
        set({ error: "" })
    },

    cleanPay: (event) => {
        set({ numberPay: 0 })
    },

    paySet: (event) => {
        set({ numberPay: event })
    },

    taskClean: (event) => {
        set({ numberTask: 0 })
    },

    taskSet: (event) => {
        set({ numberTask: event })
    },

    alertSet: (event) => {
        set({ alert: event })
    },

    mobileSet: (event) => {
        set({ mobile: event })
    },

    setRobotaPrice: (event) => {
        set({ robotaPrice: event })
    },

    setRobotaId: (event) => {
        set({ robotaId: event })
    },

    setList: (event) => {
        set({ list: event })
    },

    authCreate: async (event) => {
        try {
            set({ loading: true, error: "" })

            // let uid = await createUserWithEmailAndPassword(auth, event.email, event.password)
            // // MAIL
            // await sendEmailVerification(auth.currentUser)
            let id = uid.user.uid
            delete event.password
            // console.log("EMAIL")

            // await setDoc(doc(firestore, "user", id), { ...event, id: id, createdAt: serverTimestamp() })
            set({ loading: false, alert: 1, auth: { ...event, id: id, createdAt: serverTimestamp() }, order: []})
        }
        catch (error) {
            console.log(error)
            switch (error.code) {
                case "auth/invalid-email": return set({ loading: false, error: `Niepoprawny email!` })
                case "auth/email-already-in-use": set({ loading: false, error: `Niepoprawny email!` })
                case "auth/weak-password": return set({ loading: false, error: `Niepoprawne hasło!` })
                default: return set({ loading: false, error: `authCreate/${error.code}` })
            }
        }
    },

    authUpdate: async (event) => {
        try {
            set({ loading: true, error: "" })

            // await updateDoc(doc(firestore, "user", auth.currentUser.uid), { ...event, editedAt: serverTimestamp() })
            set({ loading: false, alert: 3, auth: { ...event, editedAt: serverTimestamp() }})

            // // MAIL
            // let mailid = doc(collection(firestore, "mail"))
            // await setDoc(doc(firestore, "mail", mailid.id), {to: auth.currentUser.email, message: {subject: "Zmiana danych", 
            //     html:`Witaj,<br><br>

            //     Dziękujemy za zmianę danych dla konta ${auth.currentUser.email}<br><br>
            
            //     Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt.<br>
            
            //     Dziękujemy,<br><br>
            
            //     Zespół Elektroteka.pl`,
            // }})
        }
        catch (error) {
            set({ loading: false, error: `authUpdate/${error.code}` })
        }
    },

    authChange: async (event) => {
        try {
            set({ loading: true, error: "" })

            // await updatePassword(auth.currentUser, event.password)

        //     // MAIL
        //     let mailid = doc(collection(firestore, "mail"))
        //     await setDoc(doc(firestore, "mail", mailid.id), {to: auth.currentUser.email, message: {subject: "Zmiana hasła", 
        //         html:`Witaj,<br><br>

        //         Dziękujemy za zmianę hasła dla konta ${auth.currentUser.email}<br>
        //         Twoje nowe hasło to ${event.password}<br><br>
            
        //         Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt.<br>
            
        //         Dziękujemy,<br><br>
            
        //         Zespół Elektroteka.pl`,
        //     }
        // })

            set({ loading: false, alert: 5 })
        }
        catch (error) {
            switch (error.code) {
                case "auth/weak-password": return set({ loading: false, error: `Niepoprawne hasło!` })
                default: return set({ loading: false, error: `authChange/${error.code}` })
            }
        }
    },

    authVerify: async (event) => {
        try {
            set({ loading: true, error: "" })

            if(get().auth.isKey === event.verify) {
                // await updateDoc(doc(firestore, "user", auth.currentUser.uid), {...get().auth, isList: true, editedAt: serverTimestamp() })
                set({ loading: false, alert: 2, auth: {...get().auth, isList: true, editedAt: serverTimestamp() }})

                // // MAIL
                // let mailid = doc(collection(firestore, "mail"))
                // await setDoc(doc(firestore, "mail", mailid.id), {to: auth.currentUser.email, message: {subject: "Potwierdzenie weryfikacji instalatora", 
                //     html:`Witaj,<br><br>

                //     Dziękujemy za potwierdzenie weryfikacji konta instalatora<br><br>
                
                //     Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt.<br>
                
                //     Dziękujemy,<br><br>
                
                //     Zespół Elektroteka.pl`,
                // }})
            }
            else {
                set({ loading: false, error: `Niepoprawny klucz!` })
            }
        }
        catch (error) {
            set({ loading: false, error: `authUpdate/${error.code}` })
        }
    },

    authReset: async (event) => {
        try {
            set({ loading: true, error: "" })

            // await sendPasswordResetEmail(auth, event.email)

            set({ loading: false, alert: 4 })
        }
        catch (error) {
            set({ loading: false, error: `authReset/${error.code}` })
        }
    },

    authCartSave: async (event) => {
        try {
            set({ loading: true, error: "" })

            // await updateDoc(doc(firestore, "user", auth.currentUser.uid), { ...event, editedAt: serverTimestamp() })
            set({ loading: false, auth: { ...event, editedAt: serverTimestamp() }})
        }
        catch (error) {
            set({ loading: false, error: `authCartSave/${error.code}` })
        }
    },
    
    authCartTitle: (event) => {
        set(produce((state) => { state.auth.koszyk.nazwa = event }))
    },

    authCartClear: (event) => {
        set(produce((state) => { state.auth.koszyk.produkty = event }))
    },

    authCartRemove: (event) => {
        set(produce((state) => { state.auth.koszyk.produkty = event }))
    },

    authCartQuantity: (id, value, valid) => {
        if(valid) {
            set(produce((state) => { state.auth.koszyk.produkty = state.auth.koszyk.produkty.map(x => x.id === id ? {...x, ilosc: value} : x) }))
        }
    },

    /*********************************************************************************************** */

    setCart: async (event) => {
        try {
            set({ loading: true, error: "" })
    
            if(event.nazwa === "KOSZYK") {
                const koszykq = await getDocs(query(collection(firestore, "user"), where("id", "==", auth.currentUser.uid)))
                const koszykinfo = koszykq.docs.map((doc) => doc.data().koszyk?.produkty)
                set(produce((state) => { state.auth.koszyk.produkty = koszykinfo.pop(), state.auth.koszyk.nazwa = event.nazwa, state.auth.koszyk.zlecenie = event.zlecenie }))
            }
            else {
                set(produce((state) => { state.auth.koszyk.produkty = event.produkty, state.auth.koszyk.nazwa = event.nazwa, state.auth.koszyk.zlecenie = event.zlecenie }))
            }
    
            set({ loading: false })
        }
        catch (error) {
            set({ loading: false, error: `setCart/${error.code}` })
        }
    },

    taskCartSave: async (event) => {
        try {
            set({ loading: true, error: "" })

            // await updateDoc(doc(firestore, "task", event.id), { produkty: event.produkty, editedAt: serverTimestamp() })
            set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, produkty: event.produkty, editedAt: serverTimestamp() } : e)})
        }
        catch (error) {
            set({ loading: false, error: `taskCartSave/${error.code}` })
        }
    },

    /*********************************************************************************************** */

    authCartAdd: (event) => {
        set(produce((state) => { 
            state.auth.koszyk.produkty = 
                state.auth.koszyk.produkty.find(x => x.id === event.id) 
                ?
                state.auth.koszyk.produkty.map(x => x.id === event.id ? {...x, ilosc: Number(x.ilosc)+Number(event.ilosc), rabat: state.auth.rabaty.find(x => x.producer === event.producent) ? state.auth.rabaty.find(x => x.producer === event.producent).percent : ""} : x)
                :
                state.auth.koszyk.produkty.concat({...event, rabat: state.auth.rabaty.find(x => x.producer === event.producent) ? state.auth.rabaty.find(x => x.producer === event.producent).percent : ""})

            state.product =
                state.product.map(x => x.id === event.id ? {...x, ilosc: ""} : x)
        }))
    },

    productQuantity: (id, value, valid) => {
        if(valid) {
            set(produce((state) => { state.product = state.product.map(x => x.id === id ? {...x, ilosc: value} : x)}))
        }
    },

    orderCreate: async (event) => {
        try {
            set({ loading: true, error: "" })

            let id = doc(collection(firestore, "order"))
            delete event.rule1
            delete event.rule2

            let snapshot = await getDocs(query(collection(firestore, "order"), orderBy("WZ", "desc"), limit(1)));
            let numberWZ = "0001"

            if(snapshot && snapshot.docs.length > 0){
                let lastWZ = snapshot.docs[0].data().WZ;
                let numLastWZ = Number(lastWZ);
                numberWZ = (numLastWZ + 1).toString().padStart(4, "0");
            }

            if(event.idtask !== "") {
                // await updateDoc(doc(firestore, "task", event.idtask), { produkty: [], editedAt: serverTimestamp() })
            }
            else {
                // await setDoc(doc(firestore, "user", event.iduser), {...get().auth, koszyk: {...get().auth.koszyk, produkty: []}})
            }
            
            // await setDoc(doc(firestore, "user", event.iduser), {...get().auth, koszyk: {...get().auth.koszyk, produkty: []}})
            // await setDoc(doc(firestore, "order", id.id), {...event, id: id.id, createdAt: serverTimestamp(), WZ: numberWZ})

            let typePay
            switch(event.zaplata) {
                case "punkt": typePay = 0; break;
                case "pobranie": typePay = 1; break;
                case "przelew": typePay = 2; break;
                case "blik": typePay = 3; break;
                case "krypto": typePay = 4; break;
                case "limit": typePay = 5; break;
                default: typePay = 0; break;
            }

            if(event.idtask !== "") {
                // await updateDoc(doc(firestore, "task", event.idtask), { produkty: [], editedAt: serverTimestamp() })
                set({ loading: false, numberPay: 2, typePay: typePay, auth: {...get().auth, koszyk: {...get().auth.koszyk, produkty: []}}, task: get().task.map(e => e.id === event.idtask ? {...e, produkty: []} : e), order: [...get().order, {...event, id: id.id, createdAt: serverTimestamp()}]})

            }
            else {
                // await setDoc(doc(firestore, "user", event.iduser), {...get().auth, koszyk: {...get().auth.koszyk, produkty: []}})
                set({ loading: false, numberPay: 2, typePay: typePay, auth: {...get().auth, koszyk: {...get().auth.koszyk, produkty: []}}, order: [...get().order, {...event, id: id.id, createdAt: serverTimestamp()}]})

            }

            // set({ loading: false, numberPay: 2, typePay: typePay, auth: {...get().auth, koszyk: {...get().auth.koszyk, produkty: []}}, order: [...get().order, {...event, id: id.id, createdAt: serverTimestamp()}]})

            // // MAIL
            // let mailprodukty = event.produkty.map(x => x.nazwa)
            // let mailid = doc(collection(firestore, "mail"))
            // await setDoc(doc(firestore, "mail", mailid.id), {to: auth.currentUser.email, message: {subject: "Potwierdzenie zamówienia dla Elektroteka.pl", 
            //     html:`Witaj,<br><br>

            //     Dziękujemy za złożenie zamówienia w naszym sklepie. Oto szczegóły Twojego zamówienia<br>
            
            //     Numer zamówienia: ${numberWZ}<br>
            //     Produkty: ${mailprodukty.join(', ')}<br>
            //     Całkowity koszt: ${parseFloat(Number(event.koszt)+Number(event.totalKoszt)).toFixed(2)}<br><br>

            //     Sposób dostawy: ${event.dostawa}<br>
            //     Sposób zapłaty: ${event.zaplata}<br><br>

            //     ${event.dostawa === "punkt" && `Adres punktu:<br>
            //     ul. Jarzębinowa 6<br>
            //     05-600 Grójec<br><br>
            //     `}

            //     ${event.dostawa === "kurier" && `Adres dostawy:<br>
            //     Imię: ${event.kurierimie}<br>
            //     Nazwisko: ${event.kuriernazwisko}<br>
            //     Ulica i numer: ${event.kurierulicainumer}<br>
            //     Miejscowość: ${event.kuriermiejscowosc}<br>
            //     Kod pocztowy: ${event.kurierkodpocztowy}<br><br>
            //     `}

            //     ${event.dostawa === "paczkomat" &&
            //     `Paczkomat lub adres:<br>
            //     ${event.paczkomat}<br><br>
            //     `}

            //     ${typePay === 2 && `                
            //     Dane do przelewu:<br>
            //     Elektroteka<br>
            //     ul. Jarzębinowa 6<br>
            //     05-600 Grójec<br>
            //     NIP: 797-202-82-25<br>
            //     Regon: 389314412<br>
            //     Numer konta: 92 1240 5660 1111 0011 0711 6393<br>
            //     Bank Pekao<br><br>`}

            //     ${typePay === 3 && `Numer telefonu do blika:<br>
            //     792356534<br><br>
            //     `}
            
            //     Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt.<br>
            
            //     Dziękujemy,<br><br>
            
            //     Zespół Elektroteka.pl`,
            // }})
        }
        catch (error) {
            console.log(error)
            set({ loading: false, error: `orderCreate/${error.code}` })
        }
    },

    taskAdd: async (event) => {
        try {
            set({ loading: true, error: "" })

            let id = doc(collection(firestore, "task"))

            let snapshot = await getDocs(query(collection(firestore, "task"), orderBy("NR", "desc"), limit(1)));
            let numberWZ = "0001"

            if(snapshot && snapshot.docs.length > 0){
                let lastWZ = snapshot.docs[0].data().NR;
                let numLastWZ = Number(lastWZ);
                numberWZ = (numLastWZ + 1).toString().padStart(4, "0");
            }

            // await setDoc(doc(firestore, "task", id.id), {...event, id: id.id, createdAt: serverTimestamp(), NR: numberWZ})

            set({ loading: false, numberTask: 4, task: [...get().task, {...event, id: id.id, createdAt: serverTimestamp()}]})

            // // MAIL
            // let mailid = doc(collection(firestore, "mail"))
            // await setDoc(doc(firestore, "mail", mailid.id), {to: auth.currentUser.email, message: {subject: "Trwa weryfikacja Twojego zlecenia", 
            //     html:`Witaj,<br><br>

            //     Dziękujemy za dodanie zlecenia, trwa weryfikacja twojego zlecenia<br>
            
            //     Numer zlecenia: ${numberWZ}<br><br>
            //     Weryfikacja zleceń odbywa się 6 dni w tygodniu od poniedziałku do soboty.<br>
            //     Możesz wstąpić o automatyczną weryfikację Twoich zleceń w tym przypadku skontatkuj się z nami.<br><br>
            
            //     Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt.<br>
            
            //     Dziękujemy,<br><br>
            
            //     Zespół Elektroteka.pl`,
            // }})
            
        }
        catch (error) {
            set({ loading: false, error: `taskCreate/${error.code}` })
        }
    },

    taskDelete: async (event) => {
        try {
            set({ loading: true, error: "" })

            // await updateDoc(doc(firestore, "task", event), { status: "anulowane", editedAt: serverTimestamp() })
            set({ loading: false, task: get().task.map(e => e.id === event ? {...e, status: "anulowane", editedAt: serverTimestamp() } : e)})
        }
        catch (error) {
            set({ loading: false, error: `taskCreate/${error.code}` })
        }
    },

    taskHired: async (event) => {
        try {
            set({ loading: true, error: "" })

            // await updateDoc(doc(firestore, "task", event.id), { installer: [...event.installerarray, {id: event.installer, msg: event.msg, price: event.price, telefon: event.telefon, name: event.name}], editedAt: serverTimestamp() })
            set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, installer: [...e.installer, {id: event.installer, msg: event.msg, price: event.price, telefon: event.telefon, name: event.name}], editedAt: serverTimestamp() } : e)})
        }
        catch (error) {
            console.log(error)
            set({ loading: false, error: `taskHired/${error.code}` })
        }
    },

    taskMessage: async (event) => {
        try {
            set({ loading: true, error: "" })

            // await updateDoc(doc(firestore, "task", event.id), { chat: [...event.chat, {writer: event.writer, msg: event.msg}], editedAt: serverTimestamp() })
            set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, chat: [...event.chat, {writer: event.writer, msg: event.msg}], editedAt: serverTimestamp() } : e)})
        }
        catch (error) {
            set({ loading: false, error: `taskMessage/${error.code}` })
        }
    },

    taskDoes: async (event) => {
        try {
            set({ loading: true, error: "" })

            // await updateDoc(doc(firestore, "task", event.id), { robocizna: [...event.robocizna, {name: event.name, price: event.price, isOkay: event.isOkay}], editedAt: serverTimestamp() })
            set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, robocizna: [...event.robocizna, {name: event.name, price: event.price, isOkay: event.isOkay, isDone: false}], editedAt: serverTimestamp() } : e)})
        }
        catch (error) {
            set({ loading: false, error: `taskDoes/${error.code}` })
        }
    },

    // taskDoesIsOkay: async (event) => {
    //     try {
    //         set({ loading: true, error: "" })

    //         await updateDoc(doc(firestore, "task", event.id), { robocizna: [...event.robocizna, {name: event.name, price: event.price, isOkay: event.isOkay}], editedAt: serverTimestamp() })
    //         set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, robocizna: [...event.robocizna, {name: event.name, price: event.price, isOkay: event.isOkay, isDone: true}], editedAt: serverTimestamp() } : e)})
    //     }
    //     catch (error) {
    //         set({ loading: false, error: `taskDoes/${error.code}` })
    //     }
    // },

    taskDoesIsOkay: async (event) => {
        try {
            set({ loading: true, error: "" })

            // await updateDoc(doc(firestore, "task", event.id), { robocizna: event.robocizna, editedAt: serverTimestamp() })
            set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, robocizna: event.robocizna, editedAt: serverTimestamp() } : e )})
        }
        catch (error) {
            set({ loading: false, error: `taskDoesIsOkay/${error.code}` })
        }
    },

    // taskDoesDelete: async (event) => {
    //     try {
    //         set({ loading: true, error: "" })

    //         await updateDoc(doc(firestore, "task", event.id), { robocizna: event.robocizna, editedAt: serverTimestamp() })
    //         set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, robocizna: event.robocizna, editedAt: serverTimestamp() } : e )})
    //     }
    //     catch (error) {
    //         set({ loading: false, error: `taskDoesDelete/${error.code}` })
    //     }
    // },

    taskGoOn: async (event) => {
        try {
            set({ loading: true, error: "" })

            // await updateDoc(doc(firestore, "task", event.id), { status: "podjęte", worker: event.worker, editedAt: serverTimestamp() })
            set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, status: "podjęte", worker: event.worker, editedAt: serverTimestamp() } : e)})

            // //MAIL
            // let mailid = doc(collection(firestore, "mail"))
            // await setDoc(doc(firestore, "mail", mailid.id), {to: event.email, message: {subject: "Zostałeś wybrany do zlecenia!", 
            //     html:`Witaj,<br>

            //     Zostałeś wybrany do zlecenia!<br><br>
            
            //     Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt.<br>
            
            //     Dziękujemy,<br><br>
            
            //     Zespół Elektroteka.pl`,
            // }})
        }
        catch (error) {
            set({ loading: false, error: `taskGoOn/${error.code}` })
        }
    },

    taskFinishedI: async (event) => {
        try {
            set({ loading: true, error: "" })

            if(event.isZlecenieDoneK === true && event.isZlecenieDoneI === true) {
                // await updateDoc(doc(firestore, "task", event.id), { isZlecenieDoneK: true, isZlecenieDoneI: true, status: "zakończone", editedAt: serverTimestamp() })
                set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, isZlecenieDoneK: true, isZlecenieDoneI: true, status: "zakończone", editedAt: serverTimestamp() } : e)})
            }
            else {
                // await updateDoc(doc(firestore, "task", event.id), { isZlecenieDoneI: event.isZlecenieDoneI, editedAt: serverTimestamp() })
                set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, isZlecenieDoneI: event.isZlecenieDoneI, editedAt: serverTimestamp() } : e)})
            }
        }
        catch (error) {
            set({ loading: false, error: `taskFinished/${error.code}` })
        }
    },

    taskFinishedK: async (event) => {
        try {
            set({ loading: true, error: "" })

            if(event.isZlecenieDoneK === true && event.isZlecenieDoneI === true) {
                // await updateDoc(doc(firestore, "task", event.id), { isZlecenieDoneK: true, isZlecenieDoneI: true, status: "zakończone", editedAt: serverTimestamp() })
                set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, isZlecenieDoneK: true, isZlecenieDoneI: true, status: "zakończone", editedAt: serverTimestamp() } : e)})
            }
            else {
                // await updateDoc(doc(firestore, "task", event.id), { isZlecenieDoneK: event.isZlecenieDoneK, editedAt: serverTimestamp() })
                set({ loading: false, task: get().task.map(e => e.id === event.id ? {...e, isZlecenieDoneK: event.isZlecenieDoneK, editedAt: serverTimestamp() } : e)})
            }
        }
        catch (error) {
            set({ loading: false, error: `taskFinished/${error.code}` })
        }
    },

    setRobocizna: async (event) => {
        try {
            set({ loading: true, error: "" })
            /////////////////////////////////////////////////
            console.log(event)
            let id = doc(collection(firestore, "work"))
            // await setDoc(doc(firestore, "work", id.id), {...event, id: id.id, createdAt: serverTimestamp() })
            /////////////////////////////////////////////////
            // await updateDoc(doc(firestore, "task", event.id), { robocizna: event.robocizna, editedAt: serverTimestamp() })
            set({ loading: false, alert: 6, task: get().task.map(e => e.id === event.id ? {...e, robocizna: event.robocizna, editedAt: serverTimestamp() } : e )})

            // // MAIL
            // let mailid = doc(collection(firestore, "mail"))
            // await setDoc(doc(firestore, "mail", mailid.id), {to: auth.currentUser.email, message: {subject: "Potwierdzenie robocizny", 
            //     html:`Witaj,<br><br>

            //     Dziękujemy za potwierdzenie robocizny<br>
            
            //     Oto dane do przelewu za robociznę<br><br>
            
            //     Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt.<br>
            
            //     Dziękujemy,<br><br>
            
            //     Zespół Elektroteka.pl`,
            // }})

            // // MAIL
            // let mailid2 = doc(collection(firestore, "mail"))
            // await setDoc(doc(firestore, "mail", mailid2.id), {to: event.email, message: {subject: "Potwierdzenie robocizny", 
            //     html:`Witaj,<br><br>

            //     Klient potwierdził Twoją robociznę<br><br>
            
            //     Jeśli masz jakiekolwiek pytania dotyczące zamówienia, prosimy o kontakt.<br>
            
            //     Dziękujemy,<br><br>
            
            //     Zespół Elektroteka.pl`,
            // }})
        }
        catch (error) {
            console.log(error)
            set({ loading: false, error: `setRobocizna/${error.code}` })
        }
    },

    reduceAuthCartProduktyBruttoNOPRICE: () => {
        return get().auth.koszyk?.produkty.reduce((total, item) => total+(item.cenabrutto * item.ilosc), 0).toFixed(2)
    },

    reduceAuthCartProduktyNettoNOPRICE: () => {
        return get().auth.koszyk?.produkty.reduce((total, item) => total+(item.cenanetto * item.ilosc), 0).toFixed(2)
    },

    reduceAuthCartProduktyBrutto: () => {
        return get().auth.koszyk?.produkty.reduce((total, item) => item.rabat ? total+((100-item.rabat)*(item.cenabrutto*item.ilosc)/100) : total+(item.cenabrutto * item.ilosc), 0).toFixed(2)
    },

    reduceAuthCartProduktyNetto: () => {
        return get().auth.koszyk?.produkty.reduce((total, item) => item.rabat ? total+((100-item.rabat)*(item.cenanetto*item.ilosc)/100) : total+(item.cenanetto * item.ilosc), 0).toFixed(2)
    },

    reduceOrderProduktyBrutto: (id) => {
        return get().order.find(e => e.id === id).produkty.reduce((total, item) => item.rabat ? total+((100-item.rabat)*(item.cenabrutto*item.ilosc)/100) : total+(item.cenabrutto * item.ilosc), 0).toFixed(2)
    },

    reduceOrderProduktyNetto: (id) => {
        return get().order.find(e => e.id === id).produkty.reduce((total, item) => item.rabat ? total+((100-item.rabat)*(item.cenanetto*item.ilosc)/100) : total+(item.cenanetto * item.ilosc), 0).toFixed(2)
    },

    reduceOrderProduktyBruttoNOPRICE: (id) => {
        return get().order.find(e => e.id === id).produkty.reduce((total, item) => total+(item.cenabrutto * item.ilosc), 0).toFixed(2)
    },

    reduceOrderProduktyNettoNOPRICE: (id) => {
        return get().order.find(e => e.id === id).produkty.reduce((total, item) => total+(item.cenanetto * item.ilosc), 0).toFixed(2)
    },

})))