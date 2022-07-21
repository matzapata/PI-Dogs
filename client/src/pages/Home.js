
// - [ ] Input de búsqueda para encontrar razas de perros por nombre
// - [ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
//   - Imagen
//   - Nombre
//   - Temperamento
//   - Peso
// - [ ] Botones/Opciones para filtrar por:
//   - Temperamento
//   - Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
// - [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
//   - Orden alfabético
//   - Peso
// - [ ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDogs, nextPage, prevPage } from "../redux/actions";
import SearchBar from "../components/SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    // const dogs = useSelector(state => state.dogs);
    const pagination = useSelector(state => state.pagination);

    useEffect(() => {
        dispatch(fetchAllDogs());
    }, []);

    useEffect(() => {
        console.log(pagination);
    }, [pagination]);

    return (
        <div>
            <SearchBar />
            <ul>
                {pagination.pageContent.map((d, i) => (
                    <li key={i}>
                        <p>{d.id}</p>
                        <p>{d.name}</p>
                        <p>{d.image}</p>
                        <p>{d.weight}</p>
                        <p>{d.temperament}</p>
                    </li>
                ))}
            </ul>
            <p>Showing page {pagination.current} of {pagination.total}</p>
            <button
                disabled={pagination.prev === null}
                onClick={() => { dispatch(prevPage()); }}
            >
                prev
            </button>
            <button
                disabled={pagination.next === null}
                onClick={() => { dispatch(nextPage()); }}
            >
                next
            </button>
        </div>
    );
}