import { useNavigate } from "react-router-dom"
import { useStore } from "../zustand.config"

export const Form = ({ render, handleSubmit, children }) => {

    const store = useStore()
    const navigate = useNavigate()
    let classForm = "flex flex-col items-center gap-[2rem] m-auto p-[2rem] w-full max-w-[30rem] bg-[#00000040] shadow-[inset_0_0_5rem_0_#ffffff40] border-[#000000] border-[.1rem] rounded-[2rem] backdrop-blur-[.3rem]"
    let onSubmit

    switch(render) {
        case "login": { onSubmit = handleSubmit(event => store.login(event)); break }
        case "register": { onSubmit = handleSubmit(event => {store.authCreate(event);navigate(`/`)}); break }
        case "reset": { onSubmit = handleSubmit(event => {store.authReset(event);navigate(`/`)}); break }
        case "change": { onSubmit = handleSubmit(event => {store.authChange(event);navigate(`/`)}); break }
        case "settings": { onSubmit = handleSubmit(event => {store.authUpdate(event);navigate(`/`)}); break }
        case "payment": { onSubmit = handleSubmit(event => store.orderCreate(event)); break }
        case "paymentRobota": { onSubmit = handleSubmit(event => {store.setRobocizna({...event, id: event.idtask, email: store.user.find(o => o.id === store.robotaId).email, robocizna: store.task.find(x => x.id === event.idtask).robocizna.map(w => (w.isOkay === true && w.isDone === false) ? {...w, isDone: true} : w)})}); break }
        case "verify": { onSubmit = handleSubmit(event => {store.authVerify(event);navigate(`/`)}); break }
        case "taskadd": { onSubmit = handleSubmit(event => {store.taskAdd(event);navigate(`/zlecenia`)}); break }
    }

    if(render === "taskadd") classForm = `flex items-center justify-center m-auto`

    return ( 
        <form className={classForm} 
            onSubmit={onSubmit} 
            noValidate>
            {children}
        </form>
    )
}