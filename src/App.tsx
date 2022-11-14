import { useContext, useState } from "react";
import "../src/styles/Sass/App.scss";
import { CompSearch } from "./components/search";

import { MtgContext } from "./contexts/mtgcontext";

function App() {
  const {
    getCommander,
    card,
    rules,
    newName,
    autoComplete,
    getSpecificCard,
    setAutoComplete,
    setInputValue,
    inputValue,
    setIsActive,
  } = useContext(MtgContext);

  return (
    <>
      <header>
        <div className="App">
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
          <div className="mainDivPicture">
            <h2>{card.name}</h2>
            {card.image_uris ? (
              <img src={card?.image_uris.normal} alt={card?.name} />
            ) : (
              <>
                <p>
                  Não Encontramos uma imagem, mas talvez você tenha mais sorte
                  no
                  <a
                    href={`https://gatherer.wizards.com/Pages/Card/Details.aspx?name=${card.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Gatherer
                  </a>
                </p>
              </>
            )}
          </div>
          <div className="mainDivRules">
            {rules.length !== 0 ? (
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
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
        <div>
          {!newName ? (
            <></>
          ) : (
            <>
              <p>Sites</p>
              <p>Deck Builder</p>
              <a
                href="https://www.archidekt.com"
                target="_blank"
                rel="noreferrer"
              >
                ArchiDekt
              </a>
              <p>Reference</p>
              <a
                href={`https://edhrec.com/commanders/${newName}`}
                target="_blank"
                rel="noreferrer"
              >
                Edhrec
              </a>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
