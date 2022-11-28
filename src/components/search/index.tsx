import { useContext, useRef } from "react";
import { MtgContext } from "../../contexts/mtgcontext";
import "../../styles/Sass/components/search.scss";
interface iCompSearch {
  setConditional: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CompSearch = ({ setConditional }: iCompSearch) => {
  const {
    getCard,
    setIsActive,
    isActive,
    setInputValue,
    inputValue,
    getSpecificCard,
    setAutoComplete,
  } = useContext(MtgContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const HandleTextChange = (text: string) => {
    getCard(text);
    setInputValue(text);
    if (inputValue !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  return (
    <>
      <div className="InputDiv">
        <label className={isActive ? "active" : ""}>
          Digite o nome da carta
        </label>
        <input
          value={inputValue}
          ref={inputRef}
          onChange={(event) => {
            HandleTextChange(event.target.value);
            if (event.target.value === "") {
              setIsActive(false);
            }
          }}
        ></input>
        <button
          onClick={() => {
            getSpecificCard(inputValue);
            setInputValue("");
            setAutoComplete([]);
            setIsActive(false);
            setConditional(true);
            inputRef.current?.blur();
          }}
        >
          Procurar
        </button>
      </div>
    </>
  );
};
