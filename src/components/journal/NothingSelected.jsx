import { useSelector } from "react-redux";

export const NothingSelected = () => {
    const {name,lastName} = useSelector(state => state.auth.user);
    return (
        <div className="journal__nothing">
            <p className="journal__title">¡Bienvenido {name +" "+ lastName}!</p>
            <p>Seleccione una nota</p>
            <p>O cree una nueva entrada</p>
            <i className="far fa-star fa-5x"></i>
        </div>
    )
}
