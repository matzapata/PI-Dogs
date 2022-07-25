import { useState } from "react";
import SearchSelect from "../components/SearchSelect";

const options = [
    { name: 'Swedish', value: 'sv' },
    { name: 'English', value: 'en' }
];

export default function Tests() {
    const [selected, setSelected] = useState(options[0].value)
  
    return (
        <div style={{padding: "1rem"}}>
            <p>{selected}</p>
            <SearchSelect options={options} setSelected={setSelected}/>
        </div>
    );
}