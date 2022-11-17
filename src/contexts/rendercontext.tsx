import { createContext, useState, useContext } from "react";
import axios from "axios";
interface iRenderContext {}
interface iRenderProps {
  children: React.ReactNode;
}
export const RenderContext = createContext({} as iRenderContext);

export const RenderProvider = ({ children }: iRenderProps) => {
  return <RenderContext.Provider value={{}}>{children}</RenderContext.Provider>;
};
