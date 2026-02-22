"use client";
import React, { createContext, ReactNode, useContext, useState } from 'react';

// 1. Интерфэйсүүд
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  ingredients: ReactNode;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, delta: number) => void;
}

// 2. Context-оо зарлах (Энд нэрийг нь зөв өгөх ёстой)
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prev, newItem];
    });
  };
  
  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);

  return (
    /* 3. Энд CartContext гэдэг нэр нь дээр зарласантайгаа яг ижил байх ёстой */
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// 4. Hook-оо экспортлох
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};