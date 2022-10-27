import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { instance } from "../services/api";
import { iCommander } from "./interface/mtginterface";

interface iMtgContext {
  getCommander: () => void;
  cmdCard: iCommander | null;
}
interface iMtgProps {
  children: React.ReactNode;
}
export const MtgContext = createContext({} as iMtgContext);

export const MtgProvider = ({ children }: iMtgProps) => {
  const [pageCount, setPageCount] = useState<number | undefined>(0);
  const [cmdCard, setCmdCard] = useState<iCommander | null>(null);
  const [curPage, setCurPage] = useState<number | undefined>(0);

  function shufflePages() {
    if (pageCount !== 0 && pageCount !== undefined) {
      let pages = Math.ceil(pageCount / 100);
      pages = Math.floor(Math.random() * pages);
      setCurPage(pages);
    }
  }

  useEffect(() => {
    async function getCards() {
      try {
        const cardList = await instance.get(
          "cards?supertypes=legendary&types=creature"
        );
        if (cardList.headers["total-count"]) {
          setPageCount(+cardList.headers["total-count"]);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(err);
        }
      }
    }
    getCards();
  }, []);

  const getCommander = async () => {
    shufflePages();
    try {
      const {
        data: { cards: randomCmd },
      } = await instance.get(
        `cards?supertypes=legendary&types=creature&page=${curPage}`
      );
      const newShuffle = Math.floor(Math.random() * randomCmd.length);
      setCmdCard(randomCmd[newShuffle]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err);
      }
    }
  };

  return (
    <MtgContext.Provider
      value={{
        getCommander,
        cmdCard,
      }}
    >
      {children}
    </MtgContext.Provider>
  );
};
