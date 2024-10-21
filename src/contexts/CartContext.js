'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; 
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContexts';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const { currentUser } = useAuth();
  
  const cartCollectionRef = collection(db, 'users');
  const user = currentUser;

  useEffect(() => {
    if (user) {
      loadUserData(user.uid);
    }
  }, [user]);

  const loadUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(cartCollectionRef, userId));
      if (userDoc.exists()) {
        setCartItems(userDoc.data().itemsInCart || []);
        setAddresses(userDoc.data().addresses || []);
        setOrders(userDoc.data().orders || []);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveCart = async (userId, itemsInCart) => {
    try {
      await updateDoc(doc(cartCollectionRef, userId), { itemsInCart });
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const saveOrder = async (userId, orders, orderDetails) => {
    try {
      const userDocRef = doc(cartCollectionRef, userId);
      await updateDoc(userDocRef, { orders });
      
      const ordersCollectionRef = collection(db, 'orders');
      await setDoc(doc(ordersCollectionRef, orderDetails.id), orderDetails);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const saveAddress = async (userId, addresses) => {
    try {
      await updateDoc(doc(cartCollectionRef, userId), { addresses });
    } catch (error) {
      console.error('Error saving address:', error);
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

  const addToAddresses = async (address) => {
    if (!user) return; 
    setAddresses((prevAddresses) => {
      const addressExists = prevAddresses.some((addr) =>
        JSON.stringify(addr) === JSON.stringify(address)
      );
      
      if (addressExists) {
        console.log('Address already exists:', address);
        return prevAddresses; // Don't add if it exists
      }

      const updatedAddresses = [...prevAddresses, address];
      saveAddress(user.uid, updatedAddresses); 
      return updatedAddresses;
    });
  };

  const addOrder = async (delAddress, paymentMethod) => {
    if (!user) return; 

    const ordersCollectionRef = collection(db, 'orders');
    const newOrderRef = doc(ordersCollectionRef);  
    const orderId = newOrderRef.id;  

    const orderDetails = {
      id: orderId, 
      deliveryAddress: delAddress,
      paymentMethod,
      items: cartItems,
      orderDate: new Date(),
    };
   
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders, orderDetails];

      saveOrder(user.uid, updatedOrders, orderDetails); 
      console.log("Order saved:", updatedOrders);

      clearCart(); 
      return updatedOrders;
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
      await updateDoc(doc(cartCollectionRef, user.uid), { itemsInCart: [] });
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addresses, orders, addToAddresses, addToCart, removeFromCart, updateQuantity, clearCart, addOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
