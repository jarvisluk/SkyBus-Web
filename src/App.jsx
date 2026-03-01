import React, { useState, useEffect } from 'react';
import { 
  Home, Map as MapIcon, Ticket, User, Navigation, 
  MapPin, Clock, CreditCard, QrCode, Zap, 
  ChevronRight, ArrowRight, CheckCircle2, ChevronLeft,
  ShieldCheck, AlertCircle, Menu
} from 'lucide-react';

// --- MOCK DATA ---
const STOPS = [
  "Central MTR Hub", 
  "Valley Plaza", 
  "Mid-Levels East",
  "Cloud Terrace", 
  "Sky Walk", 
  "Peak View Point",
  "Highland Gardens", 
  "Peak Residential Terminal"
];

const TIME_SLOTS = [
  { time: "14:00", status: "Available" },
  { time: "14:30", status: "Filling Fast" },
  { time: "15:00", status: "Available" },
  { time: "15:30", status: "Available" },
  { time: "16:00", status: "Available" }
];

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [bookingData, setBookingData] = useState({
    from: STOPS[0],
    to: STOPS[7],
    time: null,
    ticketId: null
  });

  // 视图渲染
  const renderView = () => {
    switch (activeTab) {
      case 'home': return <HomeView setActiveTab={setActiveTab} />;
      case 'book': return <BookingView bookingData={bookingData} setBookingData={setBookingData} setActiveTab={setActiveTab} />;
      case 'live': return <LiveRouteView />;
      case 'ticket': return <TicketView bookingData={bookingData} />;
      default: return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* 桌面端侧边栏 (Desktop Sidebar) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 shrink-0 shadow-sm z-40">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white font-bold text-xl shadow-md">
            M
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
              SkyBus
            </h1>
            <p className="text-xs text-red-700 font-bold tracking-widest">Aero Transit</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <DesktopNavButton icon={Home} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <DesktopNavButton icon={Zap} label="Book Ride" active={activeTab === 'book'} onClick={() => setActiveTab('book')} />
          <DesktopNavButton icon={MapIcon} label="Live Map" active={activeTab === 'live'} onClick={() => setActiveTab('live')} />
          <DesktopNavButton icon={Ticket} label="My Ticket" active={activeTab === 'ticket'} onClick={() => setActiveTab('ticket')} badge={bookingData.ticketId ? '1' : null} />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              <User size={20} className="text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Alex Wong</p>
              <p className="text-xs text-slate-500">MTR Premium Member</p>
            </div>
          </button>
        </div>
      </aside>

      {/* 移动端与主体内容容器 */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        
        {/* 移动端顶部 Header */}
        <header className="md:hidden bg-white px-6 pt-12 pb-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white font-bold text-lg">
              M
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              SkyBus
            </h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
            <User size={20} className="text-slate-600" />
          </button>
        </header>

        {/* 主体内容区域 */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 pb-28 md:pb-10">
          <div className="max-w-5xl mx-auto">
            {renderView()}
          </div>
        </main>

        {/* 移动端底部导航 */}
        <nav className="md:hidden absolute bottom-0 w-full bg-white border-t border-slate-200 px-6 py-4 pb-8 flex justify-between items-center z-40">
          <MobileNavButton icon={Home} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <MobileNavButton icon={Zap} label="Book" active={activeTab === 'book'} onClick={() => setActiveTab('book')} />
          <MobileNavButton icon={MapIcon} label="Map" active={activeTab === 'live'} onClick={() => setActiveTab('live')} />
          <MobileNavButton icon={Ticket} label="Ticket" active={activeTab === 'ticket'} onClick={() => setActiveTab('ticket')} badge={bookingData.ticketId ? '1' : null} />
        </nav>
      </div>
    </div>
  );
}

// --- 导航组件 ---

function DesktopNavButton({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button 
      onClick={onClick} 
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all ${
        active ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} strokeWidth={active ? 2.5 : 2} />
        <span>{label}</span>
      </div>
      {badge && (
        <span className="w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

function MobileNavButton({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 relative w-16">
      <div className={`p-2 rounded-2xl transition-all duration-300 ${active ? 'bg-red-50 text-red-700' : 'text-slate-400 hover:bg-slate-50'}`}>
        <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      </div>
      <span className={`text-[10px] font-bold transition-colors ${active ? 'text-red-700' : 'text-slate-400'}`}>
        {label}
      </span>
      {badge && (
        <span className="absolute top-1 right-2 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
          {badge}
        </span>
      )}
    </button>
  );
}

// --- 视图组件 ---

function HomeView({ setActiveTab }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 问候语 (桌面端可见, 移动端紧凑) */}
      <div className="pt-2 md:pt-0">
        <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Good Afternoon</h2>
        <p className="text-2xl md:text-3xl font-black text-slate-900">Alex Wong</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 左侧：下一班航班卡片 */}
        <div className="lg:col-span-7 xl:col-span-8 bg-gradient-to-br from-red-800 to-red-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-red-900/10 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/20">
                <Zap size={14} className="text-yellow-300" />
                Next Drone
              </div>
              <span className="text-sm font-medium opacity-90">In 12 mins</span>
            </div>
            
            <div className="space-y-1 mb-8">
              <p className="text-sm text-red-100 font-medium">Nearest Boarding Hub</p>
              <p className="text-3xl md:text-4xl font-black tracking-tight">Central MTR Hub</p>
            </div>

            <button 
              onClick={() => setActiveTab('book')}
              className="w-full md:w-auto px-8 bg-white text-red-700 font-bold py-3.5 rounded-xl flex items-center justify-center md:justify-start gap-2 hover:bg-slate-50 transition-colors active:scale-[0.98] shadow-sm"
            >
              Book Now <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* 右侧：快捷操作与状态 */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setActiveTab('book')} className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover:shadow-md hover:border-red-100 active:scale-95 transition-all">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-50 flex items-center justify-center text-red-700">
                  <Navigation size={24} />
                </div>
                <span className="font-bold text-sm text-slate-800">New Route</span>
              </button>
              <button onClick={() => setActiveTab('live')} className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover:shadow-md hover:border-slate-200 active:scale-95 transition-all">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <MapIcon size={24} />
                </div>
                <span className="font-bold text-sm text-slate-800">Live Map</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900">All Systems Normal</p>
              <p className="text-xs text-slate-500 mt-0.5">All drones are operating on schedule.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

function BookingView({ bookingData, setBookingData, setActiveTab }) {
  const [step, setStep] = useState(1);

  const handleBook = () => {
    setBookingData({ ...bookingData, ticketId: `MTR-${Math.floor(1000 + Math.random() * 9000)}` });
    setActiveTab('ticket');
  };

  return (
    <div className="h-full flex flex-col max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8 duration-300">
      
      {/* 进度条 */}
      <div className="flex gap-2 mb-8 mt-2 md:mt-0">
        <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-red-700' : 'bg-slate-200'}`} />
        <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-red-700' : 'bg-slate-200'}`} />
        <div className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-red-700' : 'bg-slate-200'}`} />
      </div>

      {step === 1 && (
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Select Route</h2>
            <p className="text-sm text-slate-500">Where are you heading today?</p>
          </div>

          <div className="relative space-y-4">
            {/* 连接线 */}
            <div className="absolute left-6 md:left-8 top-8 bottom-8 w-0.5 bg-slate-200 z-0"></div>

            {/* 出发地 */}
            <div className="relative z-10 flex items-center gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm hover:border-red-200 transition-colors">
              <div className="w-4 h-4 rounded-full border-4 border-red-700 bg-white shadow-sm"></div>
              <div className="flex-1">
                <p className="text-xs text-slate-400 font-bold tracking-wider uppercase mb-1">From</p>
                <select 
                  className="w-full text-base md:text-lg font-bold bg-transparent outline-none appearance-none text-slate-900 cursor-pointer"
                  value={bookingData.from}
                  onChange={(e) => setBookingData({...bookingData, from: e.target.value})}
                >
                  {STOPS.map(stop => <option key={`from-${stop}`} value={stop}>{stop}</option>)}
                </select>
              </div>
            </div>

            {/* 目的地 */}
            <div className="relative z-10 flex items-center gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm hover:border-red-200 transition-colors">
              <div className="w-4 h-4 rounded-full bg-slate-900 shadow-sm"></div>
              <div className="flex-1">
                <p className="text-xs text-slate-400 font-bold tracking-wider uppercase mb-1">To</p>
                <select 
                  className="w-full text-base md:text-lg font-bold bg-transparent outline-none appearance-none text-slate-900 cursor-pointer"
                  value={bookingData.to}
                  onChange={(e) => setBookingData({...bookingData, to: e.target.value})}
                >
                  {STOPS.map(stop => <option key={`to-${stop}`} value={stop}>{stop}</option>)}
                </select>
              </div>
            </div>
          </div>

          <button 
            disabled={bookingData.from === bookingData.to}
            onClick={() => setStep(2)}
            className="w-full bg-red-700 text-white font-bold text-lg py-4 md:py-5 rounded-2xl md:rounded-full mt-8 disabled:bg-slate-200 disabled:text-slate-400 hover:bg-red-800 transition-colors active:scale-[0.98]"
          >
            Continue to Times
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 space-y-6 animate-in slide-in-from-right-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setStep(1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">Select Time</h2>
              <p className="text-sm text-slate-500">Drones depart every 30 mins</p>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4 pt-4">
            {TIME_SLOTS.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setBookingData({...bookingData, time: slot.time})}
                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all border-2 ${
                  bookingData.time === slot.time 
                    ? 'border-red-700 bg-red-50' 
                    : 'border-slate-100 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${bookingData.time === slot.time ? 'bg-red-100 text-red-700' : 'bg-slate-50 text-slate-400'}`}>
                    <Clock size={20} />
                  </div>
                  <span className="font-black text-xl text-slate-900">{slot.time}</span>
                </div>
                {slot.status === 'Filling Fast' ? (
                  <span className="bg-orange-100 text-orange-700 text-xs px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 border border-orange-200">
                    <AlertCircle size={14} /> Filling Fast
                  </span>
                ) : (
                  <span className="text-sm text-slate-500 font-bold">Available</span>
                )}
              </button>
            ))}
          </div>

          <button 
            disabled={!bookingData.time}
            onClick={() => setStep(3)}
            className="w-full bg-red-700 text-white font-bold text-lg py-4 md:py-5 rounded-2xl md:rounded-full mt-6 disabled:bg-slate-200 disabled:text-slate-400 hover:bg-red-800 transition-colors active:scale-[0.98]"
          >
            Review Booking
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex-1 space-y-6 animate-in slide-in-from-right-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setStep(2)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Confirm & Pay</h2>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6 md:space-y-8 mt-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-6 md:pb-8">
              <div>
                <p className="text-xs text-slate-400 font-bold tracking-wider uppercase mb-1">Departure</p>
                <p className="text-xl md:text-2xl font-black text-slate-900">{bookingData.time}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-bold tracking-wider uppercase mb-1">Passengers</p>
                <p className="text-base md:text-lg font-bold text-slate-900">1 Adult</p>
              </div>
            </div>

            <div className="flex items-stretch gap-6">
              <div className="w-6 flex flex-col items-center gap-1.5 py-1">
                 <div className="w-4 h-4 rounded-full border-[4px] border-red-700 bg-white"></div>
                 <div className="w-0.5 flex-1 bg-slate-200 my-1"></div>
                 <MapPin size={18} className="text-slate-900" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div className="mb-8">
                  <p className="text-xs text-slate-400 font-bold tracking-wider uppercase mb-1">From</p>
                  <p className="text-lg md:text-xl font-bold text-slate-900">{bookingData.from}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold tracking-wider uppercase mb-1">To</p>
                  <p className="text-lg md:text-xl font-bold text-slate-900">{bookingData.to}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 md:p-6 flex justify-between items-center mt-6 border border-slate-100">
              <span className="font-bold text-slate-600">Total HKD</span>
              <span className="text-3xl font-black text-slate-900">$45.00</span>
            </div>
          </div>

          <button 
            onClick={handleBook}
            className="w-full bg-slate-900 text-white font-bold text-lg py-4 md:py-5 rounded-2xl md:rounded-full mt-4 flex items-center justify-center gap-2 hover:bg-black transition-transform active:scale-[0.98] shadow-lg shadow-slate-900/20"
          >
            <CreditCard size={20} /> Pay with Apple Pay
          </button>
        </div>
      )}
    </div>
  );
}

function LiveRouteView() {
  return (
    <div className="animate-in fade-in duration-500 pb-10 max-w-3xl mx-auto">
      <div className="mb-8 md:mb-10 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Live Route Map</h2>
        <p className="text-sm md:text-base text-slate-500">MTR SkyBus real-time drone tracking system</p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 relative">
        {/* MTR 风格粗竖线 */}
        <div className="absolute left-10 md:left-14 top-12 bottom-12 w-2 md:w-3 bg-slate-100 rounded-full"></div>
        
        {/* 行驶进度线 (MTR Red) */}
        <div className="absolute left-10 md:left-14 top-12 h-[45%] w-2 md:w-3 bg-red-700 rounded-full shadow-[0_0_15px_rgba(185,28,28,0.4)]"></div>

        <div className="space-y-10 md:space-y-12 relative">
          {STOPS.map((stop, index) => (
            <div key={stop} className="flex items-center gap-6 md:gap-8 relative">
              {/* 站点节点 */}
              <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-[4px] md:border-[5px] z-10 bg-white ${index <= 3 ? 'border-red-700' : 'border-slate-300'}`}></div>
              
              <div className="flex-1 pb-1">
                <p className={`text-lg md:text-xl font-bold ${index <= 3 ? 'text-slate-900' : 'text-slate-400'}`}>{stop}</p>
                {index === 0 && <p className="text-xs font-bold text-red-600 mt-0.5 tracking-wider uppercase">Origin Hub</p>}
                {index === 7 && <p className="text-xs font-bold text-slate-400 mt-0.5 tracking-wider uppercase">Terminal</p>}
              </div>

              {/* 模拟运行中的无人机 */}
              {index === 1 && (
                <div className="absolute -left-2.5 md:-left-3.5 top-16 bg-white p-1.5 rounded-full shadow-lg border border-slate-100 z-20 animate-bounce">
                  <div className="w-7 h-7 bg-red-700 rounded-full flex items-center justify-center">
                    <Navigation size={14} className="text-white rotate-180" />
                  </div>
                </div>
              )}
              {index === 4 && (
                <div className="absolute -left-2.5 md:-left-3.5 top-6 bg-white p-1.5 rounded-full shadow-lg border border-slate-100 z-20">
                  <div className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                    <Navigation size={14} className="text-white rotate-180" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* 图例 */}
      <div className="flex gap-6 justify-center mt-8 text-sm font-bold text-slate-500">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-700 rounded-full"></div> En Route</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-800 rounded-full"></div> Approaching</div>
      </div>
    </div>
  );
}

function TicketView({ bookingData }) {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (!bookingData.ticketId) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [bookingData.ticketId]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!bookingData.ticketId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-in fade-in max-w-sm mx-auto">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
          <Ticket size={48} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900">No Active Tickets</h2>
          <p className="text-sm text-slate-500 mt-2">Book a ride to see your boarding pass here.</p>
        </div>
        <button 
          onClick={() => document.querySelector('button[label="Book"]')?.click() || document.querySelector('button[label="Book Ride"]')?.click()}
          className="mt-4 text-red-700 font-bold hover:underline"
        >
          Go to Booking
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500 max-w-md mx-auto">
      <div className="flex justify-between items-end mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">Boarding Pass</h2>
          <p className="text-sm text-slate-500">Ready for boarding</p>
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-green-200">
          <CheckCircle2 size={14} /> Confirmed
        </div>
      </div>

      {/* 实体票券视觉 */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 relative overflow-hidden border border-slate-100">
        
        {/* 顶部倒计时 - MTR Red 风格 */}
        <div className="bg-red-700 p-8 text-white text-center relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
          <p className="text-red-100 text-sm font-bold tracking-widest uppercase mb-1 relative z-10">Departing in</p>
          <p className="text-5xl font-black tabular-nums tracking-tight relative z-10">{formatTime(timeLeft)}</p>
        </div>

        {/* 票券缺口 */}
        <div className="absolute top-[124px] -left-4 w-8 h-8 bg-slate-50 rounded-full z-10 border-r border-slate-100"></div>
        <div className="absolute top-[124px] -right-4 w-8 h-8 bg-slate-50 rounded-full z-10 border-l border-slate-100"></div>
        
        {/* 虚线 */}
        <div className="border-t-2 border-dashed border-slate-200 mx-8 mt-6 mb-6"></div>

        {/* 路线与详细信息 */}
        <div className="px-8 py-2">
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1">
              <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mb-1">From</p>
              <p className="text-xl font-black text-slate-900 leading-tight">{bookingData.from}</p>
            </div>
            <div className="px-4 text-red-200"><ArrowRight size={24} strokeWidth={3} /></div>
            <div className="flex-1 text-right">
              <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mb-1">To</p>
              <p className="text-xl font-black text-slate-900 leading-tight">{bookingData.to}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 bg-slate-50 border border-slate-100 rounded-2xl p-4">
            <div>
              <p className="text-xs text-slate-400 font-bold mb-1">Time</p>
              <p className="font-black text-slate-900 text-lg">{bookingData.time}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold mb-1">Pad</p>
              <p className="font-black text-red-700 text-xl">B4</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold mb-1">Seat</p>
              <p className="font-black text-slate-900 text-lg">2A</p>
            </div>
          </div>

          {/* 二维码区域 */}
          <div className="flex flex-col items-center justify-center pb-8">
            <div className="p-4 bg-white border-2 border-slate-100 rounded-2xl shadow-sm mb-4">
              <QrCode size={140} className="text-slate-900" strokeWidth={1.2} />
            </div>
            <p className="text-sm text-slate-400 font-mono tracking-widest">{bookingData.ticketId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}