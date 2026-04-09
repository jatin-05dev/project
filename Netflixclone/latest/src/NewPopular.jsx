 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import Footer from './Footer';

const NewPopular = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/plans/');
        setPlans(res.data);
      } catch (err) {
        console.error("Plans fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handlePayment = async (plan) => {
    if (!plan || !plan.id) {
      alert("Plan data missing!");
      return;
    }

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    try {
      const orderRes = await axios.post('http://127.0.0.1:8000/api/create-order/', {
        plan_id: plan.id 
      });
      
      const order = orderRes.data;

      const options = {
        key: "rzp_test_pr99iascS1WRtU", 
        amount: order.amount,
        currency: "INR",
        name: "Netflix Clone",
        description: `Subscription for ${plan.name}`,
        order_id: order.id, 
        handler: async (response) => {
          try {
            const verifyRes = await axios.post('http://127.0.0.1:8000/api/verify-payment/', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.status === "success") {
              // --- 1. LOCAL STORAGE UPDATE LOGIC ---
              
              // Current User ko 'Paid' mark karna
              let currentUser = JSON.parse(localStorage.getItem('currentUser'));
              if (currentUser) {
                currentUser.isPaid = true;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Sabhi users ki list mein bhi update karna taaki permanent save ho jaye
                let allUsers = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = allUsers.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                  allUsers[userIndex].isPaid = true;
                  localStorage.setItem('users', JSON.stringify(allUsers));
                }
              }

              // --- 2. SUCCESS ALERT & REDIRECT ---
              Swal.fire({
                icon: 'success',
                title: 'Mubarak Ho!',
                text: 'Payment Successful. Ab aap movies dekh sakte hain!',
                background: '#141414',
                color: '#fff',
                confirmButtonColor: '#E50914',
              }).then(() => {
                navigate('/movies'); // Ab ye movies pe lekar jayega
              });
            }
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Verification Failed',
              text: 'Payment verify nahi ho payi!',
              background: '#141414',
              color: '#fff',
              confirmButtonColor: '#E50914',
            });
          }
        },
        modal: {
          ondismiss: function() {
            Swal.fire({
              icon: 'info',
              title: 'Payment Cancelled',
              text: 'Aapne payment cancel kar di hai.',
              background: '#141414',
              color: '#fff',
              confirmButtonColor: '#E50914',
            });
          }
        },
        prefill: {
          name: "Neeraj Kumar",
          email: "neeraj@example.com",
          contact: "9999999999"
        },
        theme: { color: "#E50914" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      alert("Payment Failed!");
    }
  };

  return (
    <div className="bg-[#141414] min-h-screen text-white font-sans">
      <Navbar />
      <div className="pt-32 pb-20 px-4 md:px-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
            Choose your <span className="text-red-600">Plan</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">
            Unlimited Movies & TV Shows • Cancel Anytime
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {loading ? (
            <div className="col-span-full text-center py-20 text-zinc-700 font-black animate-pulse uppercase">
              Connecting to Server...
            </div>
          ) : (
            plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative p-8 rounded-3xl border-2 transition-all duration-500 flex flex-col group
                  ${plan.screens >= 4 ? "border-red-600 bg-zinc-900/80 scale-105 shadow-[0_0_40px_rgba(220,38,38,0.2)]" : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-500"}`}
              >
                {plan.screens >= 4 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-tighter shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-black uppercase italic mb-2 tracking-tighter text-zinc-400 group-hover:text-white transition">{plan.name}</h3>
                <div className="text-5xl font-black mb-8 text-white tracking-tighter">
                    ₹{Math.floor(plan.price)}
                    <span className="text-sm text-zinc-600 font-bold uppercase ml-1">/mo</span>
                </div>
                <div className="space-y-6 mb-10 border-t border-zinc-800 pt-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Video Quality</span>
                    <span className="text-sm font-bold text-zinc-200">{plan.quality}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Screens</span>
                    <span className="text-sm font-bold text-zinc-200">Watch on {plan.screens} devices</span>
                  </div>
                </div>
                <button 
                  onClick={() => handlePayment(plan)}
                  className={`w-full py-4 rounded-xl font-black uppercase italic tracking-widest transition-all mt-auto
                  ${plan.screens >= 4 ? "bg-red-600 hover:bg-red-700 shadow-lg" : "bg-white text-black hover:bg-zinc-200"}`}
                >
                  Get Started
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewPopular;