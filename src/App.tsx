import { useContext, useState } from "react";
import "../src/styles/Sass/App.scss";
import { UlAutoComplete } from "./components/autocomplete";
import { Placeholder } from "./components/placeholder";
import { CompSearch } from "./components/search";
import { MtgContext } from "./contexts/mtgcontext";

function App() {
  const { getCommander, card, rules, newName, autoComplete } =
    useContext(MtgContext);
  const [conditional, setConditional] = useState(false);

  return (
    <>
      <header>
        <h1>MTG Search Engine</h1>
        <div className="headerDiv">
          <button
            onClick={() => {
              getCommander();
              setConditional(true);
            }}
          >
            Random Commander
          </button>
          <CompSearch />
          {autoComplete.length !== 0 ? <UlAutoComplete /> : <></>}
        </div>
      </header>
      <main>
        <h2>{card.name}</h2>
        <div className="mainDiv">
          {card.image_uris ? (
            <div className="mainDivPicture">
              <img src={card?.image_uris.normal} alt={card?.name} />
            </div>
          ) : (
            <Placeholder conditional={conditional} text={"foto"} />
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
            <Placeholder conditional={conditional} text={"regras"} />
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
