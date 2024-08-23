"use client"
import React, { createContext, useContext, useState } from "react";

interface CounterContextType {
  counter: number;
  shoppingList: number[];
  increment: () => void;
  decrement: () => void;
  addToList: (itemIDList: number) => void;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [counter, setCounter ] = useState(0);
  const [shoppingList, setList] = useState<number[]>([]);

  const addToList = (itemIDList: number) => {
    setList(shoppingList => [...shoppingList, itemIDList]);
  }
  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  return (
    <CounterContext.Provider value={{ counter, shoppingList, increment, decrement, addToList }}>
      {children}
    </CounterContext.Provider>
  );
};
// This is the hook to use the add to cart functionality
export default function useCounter(){
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};

export function useShoppingList(){
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
}
