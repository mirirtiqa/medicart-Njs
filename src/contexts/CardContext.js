
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; 
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContexts';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const { currentUser } = useAuth();
  
  const cartCollectionRef = collection(db, 'users');
  const user = currentUser;

  useEffect(() => {
    if (user) {
      loadCart(user.uid);
    }
  }, [user]);

  const loadCart = async (userId) => {
    try {
      const cartDoc = await getDoc(doc(cartCollectionRef, userId));
      if (cartDoc.exists()) {
        setCartItems(cartDoc.data().itemsInCart || []);
        setAddresses(cartDoc.data().addresses || []);
        setOrders(cartDoc.data().orders || []);
        setAppointments(cartDoc.data().appointments || []);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
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
      const updatedAddresses = [...prevAddresses, address];
      saveAddress(user.uid, updatedAddresses); 
      return updatedAddresses;
    });
  };
  const addOrder = async (delAddress,paymentMethod) => {
    if (!user) return; 

    const ordersCollectionRef = collection(db, 'orders');
  const newOrderRef = doc(ordersCollectionRef);  
  const orderId = newOrderRef.id;  


    const orderDetails = {
      id: orderId, 
      deliveryAddress: delAddress,
      paymentMethod: paymentMethod,
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
    <CartContext.Provider value={{ cartItems, addresses,orders, addToAddresses, addToCart, removeFromCart, updateQuantity, clearCart, addOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

















