"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Menu, ArrowRight, Camera, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Popup show/hide karne ke liye state
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Custom Order Form ki state
  const [customName, setCustomName] = useState("");
  const [customDetails, setCustomDetails] = useState("");

  // REVIEWS STATE
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ name: "", product: "", text: "", rating: 5 });

  // Browser memory se reviews load karein
  useEffect(() => {
    const savedReviews = localStorage.getItem("littleYarnReviews");
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      // Default dummy reviews (agar koi na ho)
      setReviews([
        { id: 1, name: "Ayesha", product: "Crochet Gloves", text: "Bohat pyari gloves hain, quality zabardast hai!", rating: 5 },
        { id: 2, name: "Fatima", product: "Handmade Gajra", text: "Meri shaadi par sabne tareef ki. Thank you Daima!", rating: 5 }
      ]);
    }
  }, []);

  // Naya review save karne ka function
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return alert("Please naam aur review likhein.");

    const reviewToAdd = { ...newReview, id: Date.now() };
    const updatedReviews = [reviewToAdd, ...reviews];
    setReviews(updatedReviews);
    
    // Browser memory mein save karein
    localStorage.setItem("littleYarnReviews", JSON.stringify(updatedReviews));
    
    // Form clear karein
    setNewReview({ name: "", product: "", text: "", rating: 5 });
    alert("Aapka review add ho gaya! Shukriya 🤍");
  };

  // AAPKE NAYE PRODUCTS
  const featuredProducts = [
    { id: 1, name: "Crochet Gloves", price: "PKR 1,500", img: "https://hayhaycrochet.com/wp-content/uploads/2022/12/IMG_4214-1-1024x1024.jpg", tag: "Winter Special" },
    { id: 2, name: "Cozy Muffler", price: "PKR 2,000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR62F83PS5lRr9BRXV8DnFPm4hu7FKs5gN7GeGdRdTy1Ztm4OBrqWpqO5o&s=10", tag: "Best Seller" },
    { id: 3, name: "Handmade Gajra", price: "PKR 500", img: "https://pk-live-21.slatic.net/kf/S92d1b48c9cdf43eab5163e6ab2583dcfV.jpg", tag: "New" },
    { id: 4, name: "Crochet Bag", price: "PKR 2,500", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7we60WaU90HskG1r_fzS0-_rCllDYMfH7_0nankewp5Yk9ScCF_e5wwp4&s=10", tag: "" },
    { id: 5, name: "Crochet Mobile Cover", price: "PKR 1,200", img: "https://i.etsystatic.com/62543593/r/il/45cd26/8020715021/il_fullxfull.8020715021_gpb6.jpg", tag: "Customizable" },
  ];

  const handleInstaOrder = (productName: string, price: string) => {
    const orderMessage = `Hi Little Yarn Studio! Mujhe yeh order karna hai:\n\n📦 Item: ${productName}\n💰 Price: ${price}\n\nPlease details bata dein.`;
    
    navigator.clipboard.writeText(orderMessage).then(() => {
      setShowOrderModal(true);
    }).catch(err => {
      alert("Copy nahi ho saka, please dobara try karein.");
    });
  };

  const handleCustomOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName || !customDetails) return alert("Please apna naam aur details bharein.");

    const orderMessage = `Hi Little Yarn Studio! Mujhe custom order karna hai:\n\n👤 Name: ${customName}\n📝 Details: ${customDetails}\n\nPlease is par baat karein.`;
    
    navigator.clipboard.writeText(orderMessage).then(() => {
      setShowOrderModal(true); 
    }).catch(err => {
      alert("Copy nahi ho saka, please dobara try karein.");
    });
  };

  return (
    <div className="min-h-screen bg-[#FBF6E9] text-[#344936] font-sans selection:bg-[#CC8586] selection:text-white overflow-x-hidden">
      
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#FBF6E9]/90 backdrop-blur-md border-b border-[#E8D7C1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
              <Image src="/logo.png" alt="Logo" width={48} height={48} className="rounded-full object-cover shadow-sm" />
              <span className="font-serif text-2xl font-bold tracking-tight text-[#344936]">
                Little Yarn Studio
              </span>
            </div>

            <div className="hidden md:flex space-x-8 items-center text-sm font-medium tracking-wide">
              <Link href="#home" className="hover:text-[#CC8586] transition-colors focus:outline-none">Home</Link>
              <Link href="#shop" className="hover:text-[#CC8586] transition-colors focus:outline-none">Shop</Link>
              <Link href="#collections" className="hover:text-[#CC8586] transition-colors focus:outline-none">Collections</Link>
              <Link href="#story" className="hover:text-[#CC8586] transition-colors focus:outline-none">Our Story</Link>
              <Link href="#custom-orders" className="hover:text-[#CC8586] transition-colors focus:outline-none">Custom Orders</Link>
              <Link href="#reviews" className="hover:text-[#CC8586] transition-colors focus:outline-none">Reviews</Link>
              <Link href="#contact" className="hover:text-[#CC8586] transition-colors focus:outline-none">Contact</Link>
            </div>

            <div className="hidden md:flex items-center space-x-5">
              <a href="https://www.instagram.com/littleyarn.studio_/" target="_blank" rel="noopener noreferrer" className="text-[#344936] hover:text-[#CC8586] transition-colors focus:outline-none">
                <Camera className="w-5 h-5" />
              </a>
              <button className="text-[#344936] hover:text-[#CC8586] transition-colors focus:outline-none">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#344936] focus:outline-none">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            <span className="inline-block text-xs font-bold tracking-widest text-[#879780] uppercase">
              Handmade with Love
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight text-[#344936]">
              Little Stitches, <br /> A Whole Lot of Love.
            </h1>
            <p className="text-[#5a6b5c] text-lg max-w-md leading-relaxed">
              Thoughtfully handcrafted crochet treasures, made by hand and designed to bring a little warmth and happiness into your everyday life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#shop" className="bg-[#344936] text-[#FBF6E9] px-8 py-3 rounded-full font-medium hover:bg-[#344936]/90 transition-all flex items-center justify-center gap-2 focus:outline-none">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/littleyarn.studio_/" target="_blank" rel="noopener noreferrer" className="border border-[#344936] text-[#344936] px-8 py-3 rounded-full font-medium hover:bg-[#E8D7C1]/30 transition-all text-center flex items-center justify-center gap-2 focus:outline-none">
                <Camera className="w-4 h-4" /> Follow Us
              </a>
            </div>
            <p className="text-sm text-[#CC8586] font-serif italic pt-4">
              "Every piece has a little piece of heart."
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="relative h-[500px] w-full rounded-[2rem] overflow-hidden border-8 border-[#E8D7C1]/50 shadow-2xl bg-[#FBF6E9] group"
          >
            <img 
              src="https://sentimentsexpress.com/cdn/shop/files/SunnyBlooms.jpg?v=1749040926" 
              alt="Beautiful crochet" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 bg-[#FFFCF6] p-3 rounded-full shadow-lg text-[#CC8586]">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div className="absolute bottom-6 right-6 bg-[#FFFCF6]/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[#E8D7C1]">
              <p className="font-serif italic text-[#344936] text-sm">Made with love</p>
              <p className="text-xs text-[#879780]">100% Handmade</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. SHOP BY COLLECTION */}
      <section id="collections" className="bg-[#FFFCF6] py-20 border-t border-[#E8D7C1] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#344936] mb-4">Shop by Collection</h2>
            <p className="text-[#5a6b5c]">Discover something special, handcrafted just for you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Winter Wear", img: "https://brianakdesigns.com/wp-content/uploads/2025/01/Winter-Wheat-Mittens-10.jpg" },
              { title: "Floral Gajray", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcvlgLd_fk0XFIID84BDzWjgVhvJp3fDGt2tAld0HZx9JNoY7lBCyjCRxt&s=10" },
              { title: "Mini Bags", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCwVpuhmSc0GfOJBu-b4Rr2PGzzzmWgyIi98v2hBuYmCS9zD3quwS4Aww&s=10" }
            ].map((item, index) => (
              <div key={index} className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-serif text-2xl font-semibold mb-2">{item.title}</h3>
                  <span className="text-sm border-b border-white pb-1 group-hover:border-[#CC8586] transition-colors">Shop Now</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED TREASURES (Products) */}
      <section id="shop" className="py-20 bg-[#FBF6E9] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#344936] mb-4">Featured Treasures</h2>
            <p className="text-[#5a6b5c]">Handpicked pieces, made with love.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative h-56 rounded-xl overflow-hidden bg-[#E8D7C1] mb-4">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-[#FFFCF6] text-[#344936] text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                      {product.tag}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-[#344936] hover:text-[#CC8586] hover:bg-white transition-all opacity-0 group-hover:opacity-100">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-grow">
                  <h3 className="font-serif text-base font-semibold text-[#344936] leading-tight">{product.name}</h3>
                  <p className="text-[#CC8586] font-medium mt-1 text-sm">{product.price}</p>
                </div>
                
                <button 
                  onClick={() => handleInstaOrder(product.name, product.price)}
                  className="w-full mt-3 bg-[#344936] text-[#FBF6E9] py-2 rounded-lg font-medium hover:bg-[#344936]/90 transition-all text-xs flex items-center justify-center gap-1 focus:outline-none"
                >
                  <ShoppingCart className="w-3 h-3" /> Order on Insta
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CUSTOM ORDER SECTION */}
      <section id="custom-orders" className="py-20 bg-[#E8D7C1]/30 border-t border-[#E8D7C1] scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#344936] mb-4">Dream It. We'll Crochet It.</h2>
          <p className="text-[#5a6b5c] mb-8">Have a special color, flower, or gift in mind? Share your idea and let's create something made just for you.</p>
          
          <form onSubmit={handleCustomOrder} className="bg-[#FFFCF6] p-8 rounded-2xl shadow-lg border border-[#E8D7C1] text-left space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#344936] mb-1">Your Name</label>
              <input 
                type="text" 
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Ayesha" 
                className="w-full px-4 py-2 bg-[#FBF6E9] border border-[#E8D7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CC8586] text-[#344936]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#344936] mb-1">What would you like?</label>
              <textarea 
                value={customDetails}
                onChange={(e) => setCustomDetails(e.target.value)}
                placeholder="e.g. I want a pink crochet tulip bouquet for a gift..." 
                rows={4}
                className="w-full px-4 py-2 bg-[#FBF6E9] border border-[#E8D7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CC8586] text-[#344936]"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#344936] text-[#FBF6E9] px-6 py-3 rounded-lg font-medium hover:bg-[#344936]/90 transition-all focus:outline-none flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" /> Request on Instagram
            </button>
          </form>
        </div>
      </section>

      {/* 6. REVIEWS SECTION (NAYA ADD HUA HAI) */}
      <section id="reviews" className="py-20 bg-[#FFFCF6] border-t border-[#E8D7C1] scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#344936] mb-4">What Our Customers Say</h2>
            <p className="text-[#5a6b5c]">Real reviews from our lovely customers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left: Reviews List */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[#FBF6E9] p-6 rounded-2xl border border-[#E8D7C1]">
                  <div className="flex items-center gap-1 text-[#CC8586] mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-[#5a6b5c] italic mb-3">"{review.text}"</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-[#344936]">- {review.name}</span>
                    {review.product && <span className="text-[#879780] text-xs">Bought: {review.product}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Add Review Form */}
            <div className="bg-[#E8D7C1]/20 p-6 rounded-2xl border border-[#E8D7C1] h-fit">
              <h3 className="font-serif text-xl font-bold text-[#344936] mb-4">Add Your Review</h3>
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#344936] mb-1">Your Name</label>
                  <input 
                    type="text" 
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    placeholder="e.g. Maryam" 
                    className="w-full px-4 py-2 bg-white border border-[#E8D7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CC8586]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#344936] mb-1">Product Name (Optional)</label>
                  <input 
                    type="text" 
                    value={newReview.product}
                    onChange={(e) => setNewReview({...newReview, product: e.target.value})}
                    placeholder="e.g. Crochet Gloves" 
                    className="w-full px-4 py-2 bg-white border border-[#E8D7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CC8586]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#344936] mb-1">Rating</label>
                  <select 
                    value={newReview.rating}
                    onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                    className="w-full px-4 py-2 bg-white border border-[#E8D7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CC8586]"
                  >
                    <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                    <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                    <option value={3}>3 Stars ⭐⭐⭐</option>
                    <option value={2}>2 Stars ⭐⭐</option>
                    <option value={1}>1 Star ⭐</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#344936] mb-1">Your Review</label>
                  <textarea 
                    value={newReview.text}
                    onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                    placeholder="Tell us what you loved..." 
                    rows={3}
                    className="w-full px-4 py-2 bg-white border border-[#E8D7C1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CC8586]"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#CC8586] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#b06f70] transition-all focus:outline-none"
                >
                  Submit Review
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 7. INSTAGRAM SECTION */}
      <section id="story" className="py-20 bg-[#FBF6E9] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#344936] mb-4">A Little Yarn, A Lot of Love</h2>
          <p className="text-[#5a6b5c] mb-8">Follow our journey on Instagram</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQq8xwPUpwOtbSe-anqBCfJ8g9m5oJzGqGfBJFEUImja6ImRxg434DhYk&s=10", 
              "https://cdn.cakeie.com/images/charming-crochet-item-gift-img1-cakeie.webp", 
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6YptDSiQ4hu886DumbyNHOnQLFmvwtKO0Cux4q1qnn_ckQ7HgTbkgL6j&s=10", 
              "https://hooklina.com/cdn/shop/files/56_5cfafe7b-cf0c-46d6-b108-687ca05f9535.png?v=1778568727"  
            ].map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                <img src={img} alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white w-8 h-8" />
                </div>
              </div>
            ))}
          </div>

          <a 
            href="https://www.instagram.com/littleyarn.studio_/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#344936] text-[#FBF6E9] px-8 py-3 rounded-full font-medium hover:bg-[#344936]/90 transition-all focus:outline-none"
          >
            <Camera className="w-5 h-5" /> @littleyarn.studio_
          </a>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="contact" className="bg-[#344936] text-[#FBF6E9] py-12 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold mb-2">Little Yarn Studio</h3>
            <p className="text-[#E8D7C1]/80 text-sm">Handmade with love, Made by Daima.</p>
          </div>
          <div className="flex gap-6 text-sm text-[#E8D7C1]/80">
            <Link href="#shop" className="hover:text-white transition-colors focus:outline-none">Shop</Link>
            <Link href="#story" className="hover:text-white transition-colors focus:outline-none">Our Story</Link>
            <Link href="#custom-orders" className="hover:text-white transition-colors focus:outline-none">Custom Orders</Link>
            <Link href="#reviews" className="hover:text-white transition-colors focus:outline-none">Reviews</Link>
            <Link href="#contact" className="hover:text-white transition-colors focus:outline-none">Contact</Link>
          </div>
          <a 
            href="https://www.instagram.com/littleyarn.studio_/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm border border-[#E8D7C1]/30 px-4 py-2 rounded-full hover:bg-[#E8D7C1]/10 transition-all focus:outline-none"
          >
            <Camera className="w-4 h-4" /> Follow on Instagram
          </a>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-[#E8D7C1]/20 text-center flex flex-col items-center gap-2">
          <p className="text-xs text-[#E8D7C1]/60">
            © 2026 Little Yarn Studio. All rights reserved.
          </p>
          <p className="text-xs font-serif italic text-[#CC8586]">
            Made by Daima with 🤍
          </p>
        </div>
      </footer>

      {/* 9. ORDER POPUP MODAL */}
      {showOrderModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#FFFCF6] rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-[#E8D7C1]">
            <div className="w-16 h-16 bg-[#CC8586]/20 text-[#CC8586] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#344936] mb-2">Details Copied!</h3>
            <p className="text-[#5a6b5c] mb-6">
              Aapki details copy ho chuki hain. Ab niche wale button se Instagram par jayen aur message box mein <strong>Paste (Ctrl+V)</strong> karke send karein.
            </p>
            <div className="flex flex-col gap-3">
              <a 
                href="https://www.instagram.com/littleyarn.studio_/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setShowOrderModal(false)}
                className="w-full bg-[#344936] text-[#FBF6E9] px-6 py-3 rounded-xl font-medium hover:bg-[#344936]/90 transition-all flex items-center justify-center gap-2 focus:outline-none"
              >
                <Camera className="w-5 h-5" /> Open Instagram
              </a>
              <button 
                onClick={() => setShowOrderModal(false)}
                className="w-full bg-transparent text-[#879780] px-6 py-2 rounded-xl font-medium hover:text-[#344936] transition-all focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}