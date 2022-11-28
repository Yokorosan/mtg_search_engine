import { useContext } from "react";
import { MtgContext } from "../../contexts/mtgcontext";
import "../../styles/Sass/components/ulautocomplete.scss";

export const UlAutoComplete = () => {
  const { autoComplete, setAutoComplete, setInputValue, setIsActive } =
    useContext(MtgContext);
  return (
    <div className="divAutoComplete">
      <ul>
        {autoComplete.map((element, index) => (
          <li
            key={index}
            onClick={() => {
              setInputValue(element);
              setAutoComplete([]);
              setIsActive(true);
            }}
          >
            <p>{element}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
