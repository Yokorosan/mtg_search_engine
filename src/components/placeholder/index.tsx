import { useContext } from "react";
import { GiCardRandom } from "react-icons/gi";
import { MtgContext } from "../../contexts/mtgcontext";
import "../../styles/Sass/components/divplaceholder.scss";
interface placeholder {
  conditional: boolean;
  text: string;
}

export const Placeholder = ({ conditional, text }: placeholder) => {
  const { card } = useContext(MtgContext);

  return (
    <div className="placeholderDiv">
      <GiCardRandom />
      {conditional === true ? (
        <div>
          <p>
            Não encontramos {text}, mas talvez você tenha mais sorte no{" "}
            <a
              href={`https://gatherer.wizards.com/Pages/Card/Details.aspx?name=${card.name}`}
              target="_blank"
              rel="noreferrer"
            >
              Gatherer
            </a>
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
