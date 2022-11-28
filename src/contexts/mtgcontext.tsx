import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { instance } from "../services/api";
import { toast } from "react-toastify";
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
    const id = toast.loading("Buscando Commander...");
    try {
      const resp = await instance.get(`cards/random?q=is%3Acommander`);
      getRulings(resp.data.rulings_uri.split("/")[4]);
      setCard(resp.data);
      fixName(resp.data.name);
      toast.update(id, {
        render: `Encontramos seu General`,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(err);
      }
      toast.update(id, {
        render: `Não encontramos seu Commander`,
        type: "warning",
        isLoading: false,
        autoClose: 1000,
      });
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
    const id = toast.loading("Procurando Carta...");
    try {
      const resp = await instance.get(`cards/named?fuzzy=${data}`);
      getRulings(resp.data.rulings_uri.split("/")[4]);
      setCard(resp.data);
      fixName(resp.data.name);
      toast.update(id, {
        render: `Encontramos sua carta`,
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.update(id, {
          render: `Não achamos a sua carta`,
          type: "warning",
          isLoading: false,
          autoClose: 1000,
        });
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
