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
    <div className="h-[100dvh] w-full bg-[#f4f7f9] flex font-sans text-[#003B6F] overflow-hidden">
      
      {/* 桌面端侧边栏 (Desktop Sidebar) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#003B6F] border-r border-[#002b5e] h-full shrink-0 shadow-lg z-40 text-white z-50">
        <div className="p-6 flex items-center gap-4 border-b border-[#004a8b] relative overflow-hidden">
           {/* Subtle tile background on sidebar header */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
          <div className="w-10 h-10 rounded-full bg-[#D21034] flex items-center justify-center text-white font-black text-xl shadow-md border-[2px] border-white relative z-10">
            M
          </div>
          <div className="relative z-10">
            <h1 className="text-2xl font-black text-white tracking-tight leading-tight uppercase">
              SkyBus
            </h1>
            <p className="text-xs text-[#b8cfe4] tracking-widest font-bold">AERO TRANSIT</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-3 relative overflow-y-auto">
          <DesktopNavButton icon={Home} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <DesktopNavButton icon={Zap} label="Book Ride" active={activeTab === 'book'} onClick={() => setActiveTab('book')} />
          <DesktopNavButton icon={MapIcon} label="Live Map" active={activeTab === 'live'} onClick={() => setActiveTab('live')} />
          <DesktopNavButton icon={Ticket} label="My Ticket" active={activeTab === 'ticket'} onClick={() => setActiveTab('ticket')} badge={bookingData.ticketId ? '1' : null} />
        </nav>

        <div className="p-4 border-t border-[#004a8b] bg-[#002f5a] shrink-0 mt-auto">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#00427a] transition-colors text-left group">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 shrink-0">
              <User size={20} className="text-white" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Alex Wong</p>
              <p className="text-xs text-[#9ebad3] truncate">Premium Member</p>
            </div>
          </button>
        </div>
      </aside>

      {/* 移动端与主体内容容器 */}
      <div className="flex-1 flex flex-col h-full relative min-w-0 min-h-0">
        
        {/* 移动端顶部 Header */}
        <header className="md:hidden shrink-0 bg-[#003B6F] px-6 pt-12 pb-4 flex justify-between items-center sticky top-0 z-30 shadow-md text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D21034] flex items-center justify-center text-white font-black text-lg border border-white/20 shadow-sm shrink-0">
              M
            </div>
            <h1 className="text-xl font-black tracking-widest uppercase shadow-sm">
              SkyBus
            </h1>
          </div>
          <button className="relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors shrink-0">
            <User size={20} className="text-white" />
          </button>
        </header>

        {/* 主体内容区域 */}
        <main className="flex-1 overflow-y-auto w-full md:p-10 pb-28 md:pb-10 relative min-h-0">
          <div className="max-w-5xl mx-auto h-full">
             {renderView()}
          </div>
        </main>

        {/* 移动端底部导航 */}
        <nav className="md:hidden absolute bottom-0 left-0 right-0 w-full bg-[#f9fbff] border-t border-[#e2e8f0] px-3 py-3 pb-8 flex justify-around items-end z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          <MobileNavButton icon={Home} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} isHome={true} />
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
      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold transition-all ${
        active ? 'bg-white text-[#003B6F] shadow-sm' : 'text-white/80 hover:bg-[#004a8b] hover:text-white'
      }`}
    >
      <div className="flex items-center gap-4">
        <Icon size={22} strokeWidth={active ? 2.5 : 2} />
        <span className="text-[16px]">{label}</span>
      </div>
      {badge && (
        <span className="w-5 h-5 bg-[#D21034] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
          {badge}
        </span>
      )}
    </button>
  );
}

function MobileNavButton({ icon: Icon, label, active, onClick, badge, isHome }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-[6px] relative w-16 group">
      <div className={`w-12 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${active ? 'bg-[#e5f0f9]' : 'bg-transparent'}`}>
         {isHome ? (
           <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-[#D21034] text-white font-black text-sm shadow-sm border-2 ${active ? 'border-white' : 'border-transparent'}`}>
             M
           </div>
         ) : (
           <Icon size={24} strokeWidth={active ? 2.5 : 2} className={active ? `text-[#0073B6]` : 'text-[#6e8299]'} />
         )}
      </div>
      <span className={`text-[10px] sm:text-[11px] font-bold transition-colors ${active ? 'text-[#0073B6]' : 'text-[#5c6e80]'}`}>
        {label}
      </span>
      {badge && (
        <span className="absolute -top-1 right-0 w-4 h-4 bg-[#D21034] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
          {badge}
        </span>
      )}
    </button>
  );
}

// --- 视图组件 ---

function HomeView({ setActiveTab }) {
  return (
    <div className="min-h-full space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-6 md:px-0">
      
      {/* 沉浸式顶部区域 (MTR 风格) */}
      <div className="-mx-6 px-6 -mt-6 pt-10 pb-16 md:mx-0 md:px-0 md:mt-0 md:pt-0 md:pb-8 bg-[#003B6F] md:bg-transparent text-white md:text-[#003B6F] relative overflow-hidden md:overflow-visible">
        {/* Mobile Background Pattern */}
        <div className="absolute inset-0 opacity-10 md:hidden" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#003B6F] opacity-80 md:hidden"></div>

        <div className="relative z-10 pt-4 md:pt-0">
          <h2 className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">Good Afternoon</h2>
          <p className="text-3xl md:text-4xl font-black tracking-tight">Alex Wong</p>
        </div>
      </div>

      {/* 主面板靠上悬浮 - 抵消上方的 padding */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 -mt-10 md:mt-0 relative z-20">
        
        {/* 左侧：下一班航班卡片 */}
        <div className="lg:col-span-7 xl:col-span-8 bg-gradient-to-br from-[#004a8b] to-[#003B6F] rounded-[24px] p-6 md:p-8 text-white shadow-xl shadow-[#003B6F]/20 relative overflow-hidden border border-[#005c9e]/50">
          {/* 红色装饰块 */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#D21034] opacity-20 rounded-full blur-2xl"></div>
          {/* 马赛克暗纹 */}
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff), linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 75%, #ffffff 75%, #ffffff)`, backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/20 shadow-sm">
                <Zap size={14} className="text-[#ffcc00]" />
                Next Drone
              </div>
              <span className="text-sm font-bold bg-[#D21034] px-2.5 py-1 rounded-md shadow-sm">In 12 mins</span>
            </div>
            
            <div className="space-y-1.5 mb-8">
              <p className="text-sm text-[#b8cfe4] font-bold tracking-widest uppercase">Nearest Hub</p>
              <p className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-md">Central Hub</p>
            </div>

            <button 
              onClick={() => setActiveTab('book')}
              className="w-full md:w-auto px-8 bg-white text-[#003B6F] font-black py-4 rounded-xl flex items-center justify-center md:justify-start gap-3 hover:bg-[#f0f6ff] transition-colors active:scale-[0.98] shadow-lg border-b-4 border-[#e2e8f0] active:border-b-0 active:mt-[4px]"
            >
              Book Now <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* 右侧：快捷操作与状态 */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <div className="bg-white p-5 md:p-6 rounded-[24px] shadow-sm border border-[#e2e8f0]">
            <h3 className="text-lg font-black text-[#003B6F] mb-4 flex items-center gap-2"><div className="w-1.5 h-4 bg-[#D21034] rounded-full"></div> Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setActiveTab('book')} className="bg-[#f8fafc] p-4 rounded-2xl border border-[#e2e8f0] flex flex-col items-center gap-3 hover:shadow-md hover:border-[#0073B6]/30 active:scale-95 transition-all group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-[#0073B6] shadow-sm group-hover:bg-[#0073B6] group-hover:text-white transition-colors">
                  <Navigation size={24} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-sm text-[#003B6F]">New Route</span>
              </button>
              <button onClick={() => setActiveTab('live')} className="bg-[#f8fafc] p-4 rounded-2xl border border-[#e2e8f0] flex flex-col items-center gap-3 hover:shadow-md hover:border-[#0073B6]/30 active:scale-95 transition-all group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-[#64748b] shadow-sm group-hover:bg-[#0073B6] group-hover:text-white transition-colors">
                  <MapIcon size={24} strokeWidth={2.5} />
                </div>
                <span className="font-bold text-sm text-[#003B6F]">Live Map</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] shadow-sm border border-[#e2e8f0] flex items-center gap-4 flex-1 hover:shadow-md transition-shadow cursor-default">
            <div className="w-12 h-12 rounded-full bg-[#f0fdf4] flex items-center justify-center border border-[#bbf7d0] shrink-0">
              <div className="w-3 h-3 bg-[#16a34a] rounded-full animate-pulse shadow-[0_0_10px_rgba(22,163,74,0.6)]"></div>
            </div>
            <div>
              <p className="font-black text-[15px] text-[#003B6F]">All Systems Normal</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">Drones operating on schedule.</p>
            </div>
            <ChevronRight size={20} className="text-slate-300 ml-auto" />
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
    <div className="h-full flex flex-col max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8 duration-300 px-6 py-6 md:px-0 md:py-0">
      
      {/* 进度条 (MTR Red & Blue styling) */}
      <div className="flex gap-2 mb-8 mt-2 md:mt-0">
        <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-[#D21034]' : 'bg-[#e2e8f0]'}`} />
        <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-[#003B6F]' : 'bg-[#e2e8f0]'}`} />
        <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-[#003B6F]' : 'bg-[#e2e8f0]'}`} />
      </div>

      {step === 1 && (
        <div className="flex-1 space-y-8 bg-white p-6 md:p-10 rounded-[28px] shadow-sm border border-[#e2e8f0]">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#003B6F] mb-1">Select Route</h2>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Where are you heading?</p>
          </div>

          <div className="relative space-y-5">
            {/* 连接线 */}
            <div className="absolute left-[38px] md:left-[46px] top-10 bottom-10 w-1 bg-[#e2e8f0] z-0 rounded-full"></div>

            {/* 出发地 */}
            <div className="relative z-10 flex items-center gap-4 md:gap-6 bg-[#f8fafc] p-4 md:p-6 rounded-2xl border-2 border-transparent focus-within:border-[#D21034]/30 transition-colors">
              <div className="w-5 h-5 rounded-full border-[5px] border-[#D21034] bg-white shadow-sm z-10"></div>
              <div className="flex-1">
                <div className="bg-[#D21034] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest inline-block mb-1.5">From</div>
                <select 
                  className="w-full text-xl md:text-2xl font-black bg-transparent outline-none appearance-none text-[#003B6F] cursor-pointer"
                  value={bookingData.from}
                  onChange={(e) => setBookingData({...bookingData, from: e.target.value})}
                >
                  {STOPS.map(stop => <option key={`from-${stop}`} value={stop}>{stop}</option>)}
                </select>
              </div>
            </div>

            {/* 目的地 */}
            <div className="relative z-10 flex items-center gap-4 md:gap-6 bg-[#f8fafc] p-4 md:p-6 rounded-2xl border-2 border-transparent focus-within:border-[#0073B6]/30 transition-colors">
              <div className="w-5 h-5 rounded-full bg-[#003B6F] shadow-sm z-10 border-[3px] border-white ring-1 ring-[#003B6F]"></div>
              <div className="flex-1">
                 <div className="bg-[#003B6F] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest inline-block mb-1.5">To</div>
                <select 
                  className="w-full text-xl md:text-2xl font-black bg-transparent outline-none appearance-none text-[#003B6F] cursor-pointer"
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
            className="w-full bg-[#D21034] text-white font-black text-lg py-4 md:py-5 rounded-2xl mt-8 disabled:bg-slate-200 disabled:text-slate-400 hover:bg-[#b50d2c] transition-colors active:scale-[0.98] shadow-md"
          >
            Continue to Times
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 space-y-6 animate-in slide-in-from-right-4 bg-white p-6 md:p-10 rounded-[28px] shadow-sm border border-[#e2e8f0]">
          <div className="flex items-center gap-3">
            <button onClick={() => setStep(1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-[#003B6F] transition-colors bg-slate-50 border border-slate-200">
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#003B6F] mb-1">Select Time</h2>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Drones depart every 30 mins</p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            {TIME_SLOTS.map((slot, idx) => (
              <button
                key={idx}
                onClick={() => setBookingData({...bookingData, time: slot.time})}
                className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all border-[3px] ${
                  bookingData.time === slot.time 
                    ? 'border-[#003B6F] bg-[#f4f8fc] shadow-sm' 
                    : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${bookingData.time === slot.time ? 'bg-[#003B6F] text-white' : 'bg-[#f1f5f9] text-[#64748b]'}`}>
                    <Clock size={22} strokeWidth={2.5} />
                  </div>
                  <span className={`font-black text-2xl ${bookingData.time === slot.time ? 'text-[#003B6F]' : 'text-slate-700'}`}>{slot.time}</span>
                </div>
                {slot.status === 'Filling Fast' ? (
                  <span className="bg-[#fff1f2] text-[#e11d48] text-[11px] px-3 py-1.5 rounded-lg font-black uppercase tracking-widest border border-[#fda4af] flex items-center gap-1.5">
                    <AlertCircle size={14} strokeWidth={2.5}/> Fast
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Available</span>
                )}
              </button>
            ))}
          </div>

          <button 
            disabled={!bookingData.time}
            onClick={() => setStep(3)}
            className="w-full bg-[#003B6F] text-white font-black text-lg py-4 md:py-5 rounded-2xl mt-6 disabled:bg-slate-200 disabled:text-slate-400 hover:bg-[#002b5e] transition-colors active:scale-[0.98] shadow-md"
          >
            Review Booking
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex-1 space-y-6 animate-in slide-in-from-right-4">
          <div className="flex items-center gap-3 px-2">
           <button onClick={() => setStep(2)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-[#003B6F] transition-colors bg-white border border-[#e2e8f0] shadow-sm">
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <h2 className="text-2xl md:text-3xl font-black text-[#003B6F]">Confirm & Pay</h2>
          </div>

          <div className="bg-white rounded-[28px] p-6 md:p-8 shadow-sm border border-[#e2e8f0] space-y-6 md:space-y-8 mt-4 overflow-hidden relative">
            {/* Header pattern */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-[#003B6F]"></div>

            <div className="flex justify-between items-center border-b-2 border-slate-100 pb-6 pt-4">
              <div>
                <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-1">Departure</p>
                <div className="flex items-center gap-2">
                   <Clock size={16} className="text-[#D21034]" strokeWidth={3}/>
                   <p className="text-2xl md:text-3xl font-black text-[#003B6F]">{bookingData.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-1">Passengers</p>
                <p className="text-lg md:text-xl font-black text-slate-800">1 Adult</p>
              </div>
            </div>

            <div className="flex items-stretch gap-6 px-2">
              <div className="w-5 flex flex-col items-center gap-1.5 py-1">
                 <div className="w-4 h-4 rounded-full border-[4px] border-[#D21034] bg-white ring-2 ring-[#fee2e2]"></div>
                 <div className="w-1 flex-1 bg-[#e2e8f0] my-1 rounded-full"></div>
                 <MapPin size={20} className="text-[#003B6F]" strokeWidth={2.5}/>
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div className="mb-8">
                  <p className="text-xs text-[#D21034] font-black tracking-widest uppercase mb-1">From</p>
                  <p className="text-xl md:text-2xl font-black text-[#003B6F] leading-none">{bookingData.from}</p>
                </div>
                <div>
                  <p className="text-xs text-[#0073B6] font-black tracking-widest uppercase mb-1">To</p>
                  <p className="text-xl md:text-2xl font-black text-[#003B6F] leading-none">{bookingData.to}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl p-5 md:p-6 flex justify-between items-center mt-6 border-2 border-slate-100">
              <span className="font-black text-slate-500 uppercase tracking-widest text-sm">Total HKD</span>
              <span className="text-4xl font-black text-[#D21034] tracking-tighter">$45</span>
            </div>
          </div>

          <button 
            onClick={handleBook}
            className="w-full bg-black text-white font-bold text-lg py-5 rounded-2xl mt-4 flex items-center justify-center gap-3 hover:bg-slate-800 transition-transform active:scale-[0.98] shadow-lg"
          >
            <CreditCard size={24} /> <span>Pay with <span className="font-black">Apple Pay</span></span>
          </button>
        </div>
      )}
    </div>
  );
}

function LiveRouteView() {
  return (
    <div className="animate-in fade-in duration-500 pb-10 max-w-3xl mx-auto px-6 md:px-0">
      <div className="mb-6 md:mb-8 text-center md:text-left pt-4 md:pt-0">
        <h2 className="text-2xl md:text-3xl font-black text-[#003B6F] mb-1">Route Status</h2>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Real-time drone tracking</p>
      </div>

      <div className="bg-white rounded-[28px] p-8 md:p-12 shadow-sm border border-[#e2e8f0] relative overflow-hidden">
        {/* Subtle Map Watermark */}
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, #003B6F 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

        {/* MTR 风格粗竖线 */}
        <div className="absolute left-[44px] md:left-[56px] top-14 bottom-14 w-3 md:w-4 bg-[#e2e8f0] rounded-full z-0 border border-[#cbd5e1]"></div>
        
        {/* 行驶进度线 (MTR Blue) */}
        <div className="absolute left-[44px] md:left-[56px] top-14 h-[45%] w-3 md:w-4 bg-[#0073B6] rounded-full shadow-[0_0_15px_rgba(0,115,182,0.4)] z-0"></div>

        <div className="space-y-12 md:space-y-14 relative z-10">
          {STOPS.map((stop, index) => (
            <div key={stop} className="flex items-center gap-6 md:gap-8 relative">
              {/* 站点节点 */}
              <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-[5px] md:border-[6px] z-10 bg-white shadow-sm ring-2 ${index <= 3 ? 'border-[#003B6F] ring-white/50' : 'border-[#cbd5e1] ring-transparent'}`}></div>
              
              <div className="flex-1 pb-1">
                <p className={`text-xl md:text-2xl font-black tracking-tight ${index <= 3 ? 'text-[#003B6F] drop-shadow-sm' : 'text-slate-400'}`}>{stop}</p>
                {index === 0 && <p className="text-[10px] font-black text-[#D21034] mt-1 tracking-widest uppercase bg-[#fee2e2] inline-block px-2 py-0.5 rounded">Origin Hub</p>}
                {index === 7 && <p className="text-[10px] font-black text-slate-500 mt-1 tracking-widest uppercase bg-slate-100 inline-block px-2 py-0.5 rounded">Terminal</p>}
              </div>

              {/* 模拟运行中的无人机 */}
              {index === 1 && (
                <div className="absolute -left-3 md:-left-4 top-20 bg-white p-1.5 rounded-full shadow-lg border border-slate-200 z-20 animate-bounce ring-4 ring-white/60">
                  <div className="w-8 h-8 bg-[#D21034] rounded-full flex items-center justify-center">
                    <Navigation size={18} className="text-white rotate-180" strokeWidth={2.5} />
                  </div>
                </div>
              )}
              {index === 4 && (
                <div className="absolute -left-3.5 md:-left-4.5 top-8 bg-white p-1.5 rounded-full shadow-lg border border-slate-200 z-20">
                  <div className="w-9 h-9 bg-[#003B6F] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <Navigation size={18} className="text-white rotate-180" strokeWidth={2.5}/>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* 图例 */}
      <div className="flex gap-6 justify-center mt-8 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-white py-3 px-6 rounded-full w-max mx-auto border border-slate-100 shadow-sm">
        <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 bg-[#D21034] rounded-full"></div> En Route</div>
        <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 bg-[#003B6F] rounded-full"></div> Approaching</div>
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
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-in fade-in max-w-sm mx-auto p-6">
        <div className="w-24 h-24 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-slate-300 shadow-sm">
          <Ticket size={48} strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#003B6F]">No Tickets</h2>
          <p className="text-sm font-bold text-slate-400 mt-2 uppercase tracking-widest">Your boarding pass will appear here.</p>
        </div>
        <button 
          onClick={() => document.querySelector('button[label="Book"]')?.click() || document.querySelector('button[label="Book Ride"]')?.click()}
          className="mt-6 border-2 border-[#003B6F] text-[#003B6F] font-black px-6 py-2.5 rounded-xl hover:bg-[#003B6F] hover:text-white transition-colors"
        >
          Go to Booking
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500 max-w-md mx-auto px-4 md:px-0">
      <div className="flex justify-between items-end mb-6 md:mb-8 pt-4 md:pt-0">
        <div>
          <h2 className="text-3xl font-black text-[#003B6F]">E-Ticket</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Ready for boarding</p>
        </div>
        <div className="bg-[#f0fdf4] text-[#16a34a] px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 border border-[#bbf7d0] uppercase tracking-widest">
          <CheckCircle2 size={16} strokeWidth={2.5}/> Confirmed
        </div>
      </div>

      {/* 实体票券视觉 */}
      <div className="bg-white rounded-[24px] shadow-2xl shadow-[#003B6F]/10 relative overflow-hidden border border-[#e2e8f0]">
        
        {/* 顶部倒计时 - MTR Dark Blue 风格 */}
        <div className="bg-[#003B6F] p-8 text-white text-center relative border-b-4 border-[#D21034]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, white 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
          <p className="text-[#9ebad3] text-[10px] font-black tracking-widest uppercase mb-1 relative z-10">Gate Closes In</p>
          <p className="text-5xl font-black tabular-nums tracking-tighter relative z-10 text-white drop-shadow-md">{formatTime(timeLeft)}</p>
        </div>

        {/* 票券缺口 */}
        <div className="absolute top-[128px] -left-5 w-10 h-10 bg-[#f4f7f9] rounded-full z-10 border-r border-[#e2e8f0] shadow-inner"></div>
        <div className="absolute top-[128px] -right-5 w-10 h-10 bg-[#f4f7f9] rounded-full z-10 border-l border-[#e2e8f0] shadow-inner"></div>
        
        {/* 虚线 */}
        <div className="border-t-4 border-dotted border-slate-200 mx-10 mt-6 mb-6"></div>

        {/* 路线与详细信息 */}
        <div className="px-8 py-2">
          <div className="flex justify-between items-center mb-10 bg-[#f8fafc] rounded-2xl p-4 border border-slate-100">
            <div className="flex-1 text-center">
              <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-1.5">From</p>
              <p className="text-xl font-black text-[#003B6F] leading-none">{bookingData.from}</p>
            </div>
            <div className="px-4 text-[#D21034]"><ArrowRight size={28} strokeWidth={3} /></div>
            <div className="flex-1 text-center">
              <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-1.5">To</p>
              <p className="text-xl font-black text-[#003B6F] leading-none">{bookingData.to}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div>
              <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-1">Time</p>
              <p className="font-black text-[#003B6F] text-xl">{bookingData.time}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-1">Gate</p>
              <p className="font-black text-[#D21034] text-2xl leading-none">B4</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-1">Class</p>
              <p className="font-black text-[#003B6F] text-xl">Std</p>
            </div>
          </div>

          {/* 二维码区域 */}
          <div className="flex flex-col items-center justify-center pb-8 border-t-2 border-slate-100 pt-8">
            <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-4 text-center">Scan at barrier</p>
            <div className="p-4 bg-white border-2 border-[#e2e8f0] rounded-3xl shadow-sm mb-4">
              <QrCode size={160} className="text-[#003B6F]" strokeWidth={1} />
            </div>
            <p className="text-sm font-black text-[#0073B6] bg-[#f0f6ff] px-4 py-1.5 rounded-lg tracking-widest">{bookingData.ticketId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}