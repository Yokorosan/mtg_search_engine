import { useContext } from "react";
import { MtgContext } from "../../contexts/mtgcontext";
import "../../styles/Sass/components/search.scss";

export const CompSearch = () => {
  const {
    getCard,
    setIsActive,
    isActive,
    setInputValue,
    inputValue,
    getSpecificCard,
    setAutoComplete,
  } = useContext(MtgContext);

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
          }}
        >
          Procurar
        </button>
      </div>
    </>
  );
};
