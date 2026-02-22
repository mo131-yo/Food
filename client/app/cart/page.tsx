// "use client"
// import { useCart } from '../components/CartProvider';
// import { useRouter } from 'next/navigation';


// export default function CartPage() {
//   // ✅ useCart-аас updateQuantity ирж байгаа тул шууд ашиглана
//   const { cart, removeFromCart, updateQuantity } = useCart();
//   const router = useRouter();

//   const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
//   const shipping = subtotal > 0 ? 0.99 : 0;
//   const total = subtotal + shipping;

//   return (
//     <div className="flex justify-end min-h-screen bg-black/20">
//       <div className="w-full max-w-md bg-white h-screen shadow-xl p-6 flex flex-col">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold flex items-center gap-2">
//             <span className="text-2xl">🛒</span> Order detail
//           </h2>
//           <button onClick={() => router.back()} className="text-2xl font-light">×</button>
//         </div>

//         {/* Табууд */}
//         <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
//           <button className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold">Cart</button>
//           <button className="flex-1 text-gray-500 py-2 rounded-lg font-bold">Order</button>
//         </div>

//         {/* Сагсны бараанууд */}
//         <div className="flex-1 overflow-y-auto space-y-6">
//           <p className="font-bold text-gray-700">My cart</p>    
//           {cart.map((item) => (
//             <div key={item.id} className="flex gap-4 border-b pb-4 relative">
//               <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <h3 className="font-bold text-red-500">{item.name}</h3>
//                   <button onClick={() => removeFromCart(item.id)} className="text-red-500 border rounded-full w-6 h-6 flex items-center justify-center text-sm">×</button>
//                 </div>
//                 <p className="text-[10px] text-gray-400 mb-2">{item.ingredients}</p>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-3 border rounded-lg px-2 py-1">
//                     <button onClick={() => updateQuantity(item.id, -1)} className="text-xl">—</button>
//                     <span className="font-bold">{item.quantity}</span>
//                     <button onClick={() => updateQuantity(item.id, 1)} className="text-xl">+</button>
//                   </div>
//                   <span className="font-bold ml-auto">${item.price}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Төлбөрийн мэдээлэл */}
//         <div className="mt-6 pt-6 border-t border-dashed">
//           <div className="space-y-2">
//             <div className="flex justify-between text-gray-500">
//               <span>Items</span>
//               <span className="font-bold">${subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-gray-500">
//               <span>Shipping</span>
//               <span className="font-bold">${shipping.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-xl font-bold pt-4">
//               <span>Total</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//           </div>
//           <button className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold mt-6 hover:bg-red-600 transition">
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client"
import { useState, useEffect } from 'react';
import { useCart } from '../components/CartProvider';
import { useRouter } from 'next/navigation';
import { IoCloseOutline } from "react-icons/io5";
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [activeTab, setActiveTab] = useState<'cart' | 'order'>('cart');
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_URL = "http://localhost:8000"; // Өөрийн бэкэнд хаяг

  // 1. Захиалга үүсгэх (Checkout)
  const handleCheckout = async () => {
    if (!address) {
      toast.error("Хүргэлтийн хаягаа оруулна уу!");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('accessToken');

    try {
      const foods = cart.map(item => ({
        foodId: item.id,
        quantity: item.quantity
      }));

      const response = await fetch(`${API_URL}/order/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ foods, address }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Захиалга амжилттай үүслээ!");
        clearCart();
        setActiveTab('order');
        fetchOrders();
      } else {
        toast.error(result.message || "Алдаа гарлаа");
      }
    } catch (error) {
      toast.error("Сүлжээний алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  // 2. Захиалгын түүх дуудах
  const fetchOrders = async () => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user._id) return;

    try {
      const response = await fetch(`${API_URL}/order/get-by-id-order/${user._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (response.ok) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error("Orders fetch error", error);
    }
  };

  useEffect(() => {
    if (activeTab === 'order') fetchOrders();
  }, [activeTab]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + (subtotal > 0 ? 0.99 : 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 h-screen shadow-2xl p-6 flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black flex items-center gap-2 dark:text-white">
            <span className="text-2xl">🛒</span> Order detail
          </h2>
          <button onClick={() => router.push('/')} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition">
            <IoCloseOutline size={32} className="text-gray-500" />
          </button>
        </div>

        {/* Табууд */}
        <div className="flex bg-gray-100 dark:bg-zinc-800 rounded-2xl p-1.5 mb-8">
          <button 
            onClick={() => setActiveTab('cart')}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'cart' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500'}`}
          >
            Cart
          </button>
          <button 
            onClick={() => setActiveTab('order')}
            className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'order' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500'}`}
          >
            Order
          </button>
        </div>

        {activeTab === 'cart' ? (
          <>
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              <p className="font-black text-lg dark:text-white">My cart</p>
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400">Сагс хоосон байна</div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 dark:border-zinc-800 pb-6 relative group">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-red-500">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 border rounded-full w-6 h-6 flex items-center justify-center">×</button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-800 px-3 py-1 rounded-xl">
                          <button onClick={() => updateQuantity(item.id, -1)} className="font-bold">—</button>
                          <span className="font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="font-bold">+</button>
                        </div>
                        <span className="font-black dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Хүргэлтийн хаяг оруулах */}
              <div className="mt-6">
                <p className="font-bold mb-2 dark:text-white">Delivery location</p>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Хүргэлтийн хаягаа дэлгэрэнгүй бичнэ үү"
                  className="w-full p-4 bg-gray-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-2xl text-sm h-24 focus:ring-2 focus:ring-red-500 outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-dashed border-gray-300">
              <div className="flex justify-between text-2xl font-black dark:text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="w-full bg-red-500 text-white py-4 rounded-2xl font-black mt-6 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "Уншиж байна..." : "Checkout"}
              </button>
            </div>
          </>
        ) : (
          /* Захиалгын түүх */
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <p className="font-black text-lg dark:text-white mb-4">Order history</p>
            {orders.length === 0 ? (
              <p className="text-center text-gray-400 py-10">Түүх байхгүй байна</p>
            ) : (
              orders.map((order: any) => (
                <div key={order._id} className="p-4 rounded-2xl border dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/30 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-black dark:text-white">${order.totalPrice.toFixed(2)}</span>
                    <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-1 rounded-full font-bold">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">🕒 {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="text-xs text-red-400 mt-1 line-clamp-1">📍 {order.address}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}