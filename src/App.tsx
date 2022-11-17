import { useContext } from "react";
import "../src/styles/Sass/App.scss";
import { CompSearch } from "./components/search";
import { GiCardRandom } from "react-icons/gi";
import { MtgContext } from "./contexts/mtgcontext";

function App() {
  const {
    getCommander,
    card,
    rules,
    newName,
    autoComplete,
    setAutoComplete,
    setInputValue,
    setIsActive,
  } = useContext(MtgContext);

  return (
    <>
      <header>
        <h1>MTG Search Engine</h1>
        <div className="headerDiv">
          <button onClick={() => getCommander()}>Random Commander</button>
          <CompSearch />
          {autoComplete.length !== 0 ? (
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
          ) : (
            <></>
          )}
        </div>
      </header>
      <main>
        <div className="mainDiv">
          {card.image_uris ? (
            <div className="mainDivPicture">
              <h2>{card.name}</h2>
              <img src={card?.image_uris.normal} alt={card?.name} />
            </div>
          ) : (
            <div className="placeholderDiv">
              <GiCardRandom />
              <div>
                <p>
                  Não Encontramos uma imagem, mas talvez você tenha mais sorte
                  no{" "}
                  <a
                    href={`https://gatherer.wizards.com/Pages/Card/Details.aspx?name=${card.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Gatherer
                  </a>
                </p>
              </div>
            </div>
          )}

          {rules.length !== 0 ? (
            <div className="mainDivRules">
              <ul>
                {rules?.map((element, index) => {
                  return (
                    <li key={index}>
                      <p>Date:</p>
                      <span>{element.published_at}</span>
                      <p>Text:</p>
                      <span>{element.comment}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="placeholderDiv">
              <GiCardRandom />
              <div>
                <p>
                  Não Encontramos rulings, mas talvez você tenha mais sorte no{" "}
                  <a
                    href={`https://gatherer.wizards.com/Pages/Card/Details.aspx?name=${card.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Gatherer
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
        <div></div>
      </main>
      {!newName ? (
        <></>
      ) : (
        <footer>
          <h1>Sites</h1>
          <section>
            <div>
              <p>Deck Builder</p>
              <a
                href="https://www.archidekt.com"
                target="_blank"
                rel="noreferrer"
              >
                ArchiDekt
              </a>
            </div>
            <div>
              <p>Reference</p>
              {card.type_line.includes("Legendary Creature") ? (
                <a
                  href={`https://edhrec.com/commanders/${newName}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Edhrec
                </a>
              ) : (
                <a
                  href={`https://edhrec.com/cards/${newName}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Edhrec
                </a>
              )}
            </div>
          </section>
        </footer>
      )}
    </>
  );
}

export default App;
