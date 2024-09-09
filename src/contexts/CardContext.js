'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; 
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContexts';
import { auth } from '@/lib/firebase'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();
  
  const cartCollectionRef = collection(db, 'carts');
  const user = currentUser

  useEffect(() => {
    if (user) {
      loadCart(user.uid);
    }
  }, [user]);

  
  const loadCart = async (userId) => {
    try {
      const cartDoc = await getDoc(doc(cartCollectionRef, userId));
      if (cartDoc.exists()) {
        setCartItems(cartDoc.data().items || []);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  
  const saveCart = async (userId, items) => {
    try {
      await setDoc(doc(cartCollectionRef, userId), { items });
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  
  const addToCart = async (item) => {
    if (!user) return; 
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      let updatedItems;

      if (existingItem) {
        
        updatedItems = prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedItems = [...prevItems, { ...item, quantity: 1 }];
      }

      saveCart(user.uid, updatedItems); 
      return updatedItems;
    });
  };


  const removeFromCart = async (id) => {
    if (!user) return;
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((cartItem) => cartItem.id !== id);
      saveCart(user.uid, updatedItems); 
      return updatedItems;
    });
  };

  
  const updateQuantity = async (id, quantity) => {
    if (!user) return;
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      );
      saveCart(user.uid, updatedItems); 
      return updatedItems;
    });
  };


  const clearCart = async () => {
    if (!user) return;
    try {
      await deleteDoc(doc(cartCollectionRef, user.uid)); 
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);
