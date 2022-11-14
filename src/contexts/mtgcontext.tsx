import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { instance } from "../services/api";
import { iCommander } from "./interface/mtginterface";
import { iRules } from "../contexts/interface/mtginterface";
interface iMtgProps {
  children: React.ReactNode;
}

interface iMtgContext {
  getCommander: () => void;
  card: iCommander;
  rules: iRules[];
  getCard: (data: string) => void;
  newName: string;
  autoComplete: string[];
  getSpecificCard: (data: string) => void;
  setAutoComplete: React.Dispatch<React.SetStateAction<string[]>>;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
}

export const MtgContext = createContext({} as iMtgContext);

export const MtgProvider = ({ children }: iMtgProps) => {
  const [card, setCard] = useState({} as iCommander);
  const [isActive, setIsActive] = useState(false);
  const [rules, setRules] = useState([] as iRules[]);
  const [newName, setNewName] = useState("");
  const [autoComplete, setAutoComplete] = useState([] as string[]);
  const [inputValue, setInputValue] = useState("");

  const fixName = (card: string) => {
    setNewName(
      card
        .replaceAll("´", "")
        .replaceAll("'", "")
        .replaceAll(",", "")
        .replaceAll(" ", "-")
        .toLowerCase()
    );
  };
  const getCommander = async () => {
    try {
      const resp = await instance.get(`cards/random?q=is%3Acommander`);
      getRulings(resp.data.rulings_uri.split("/")[4]);
      setCard(resp.data);
      fixName(resp.data.name);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err);
      }
    }
  };

  const getRulings = async (number: number) => {
    try {
      const rules = await instance.get(`/cards/${number}/rulings`);
      setRules(rules.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err);
      }
    }
  };

  const getCard = async (data: string) => {
    try {
      const resp = await instance.get(`cards/autocomplete?q=${data}`);
      setAutoComplete(resp.data.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err);
      }
    }
  };

  const getSpecificCard = async (data: string) => {
    try {
      const resp = await instance.get(`cards/named?fuzzy=${data}`);
      getRulings(resp.data.rulings_uri.split("/")[4]);
      setCard(resp.data);
      fixName(resp.data.name);
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
        card,
        rules,
        getCard,
        newName,
        autoComplete,
        getSpecificCard,
        setAutoComplete,
        setIsActive,
        isActive,
        setInputValue,
        inputValue,
      }}
    >
      {children}
    </MtgContext.Provider>
  );
};
