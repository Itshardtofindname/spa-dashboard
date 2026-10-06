import { useState } from 'react';
import { monthList } from '../data/dataSales';

export default function CalendarPicker({ selectedDate, onDateChange }) {
  // selectedDate format: "YYYY-MM-DD"
  const currentDate = selectedDate ? new Date(selectedDate) : new Date();
  
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth()); // 0 - 11
  const [isOpen, setIsOpen] = useState(false);

  const years = [2024, 2025, 2026];

  // Hitung hari dalam bulan ini
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Array untuk kotak hari
  const days = [];
  // Padding kosong untuk hari sebelum tanggal 1
  for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handleSelectDate = (day) => {
    if (!day) return;
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
    onDateChange(dateStr);
    setIsOpen(false); // Tutup popup kalender setelah pilih
  };

  const displayFormattedDate = `${String(currentDate.getDate()).padStart(2, '0')} ${monthList[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  return (
    <div className="relative">
      {/* Tombol Utama Trigger Kalender */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
      >
        <span className="text-base">📅</span>
        <span>Kalender:</span>
        <span className="font-extrabold text-blue-600">{displayFormattedDate}</span>
        <span className="text-slate-400 text-[10px]">▼</span>
      </button>

      {/* Pop-up Kotak Kalender */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-4 text-slate-800 animate-in fade-in zoom-in duration-150">
          
          {/* Header Navigasi Bulan & Tahun */}
          <div className="flex justify-between items-center mb-3">
            <select 
              value={currentMonth} 
              onChange={(e) => setCurrentMonth(Number(e.target.value))}
              className="text-xs font-bold bg-slate-100 border rounded px-2 py-1 cursor-pointer focus:outline-none"
            >
              {monthList.map((m, idx) => (
                <option key={idx} value={idx}>{m}</option>
              ))}
            </select>

            <select 
              value={currentYear} 
              onChange={(e) => setCurrentYear(Number(e.target.value))}
              className="text-xs font-bold bg-slate-100 border rounded px-2 py-1 cursor-pointer focus:outline-none"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Label Hari (Sen - Min) */}
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-2">
            <span>Sn</span><span>Sl</span><span>Rb</span><span>Km</span><span>Jm</span><span>Sb</span><span>Mg</span>
          </div>

          {/* Grid Tanggal */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {days.map((day, idx) => {
              const isSelected = 
                day &&
                currentDate.getDate() === day &&
                currentDate.getMonth() === currentMonth &&
                currentDate.getFullYear() === currentYear;

              return (
                <button
                  key={idx}
                  disabled={!day}
                  onClick={() => handleSelectDate(day)}
                  className={`h-8 w-8 rounded-lg flex items-center justify-center font-medium transition ${
                    !day ? 'invisible' :
                    isSelected ? 'bg-blue-600 text-white font-bold shadow-sm' :
                    'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Tombol Tutup */}
          <div className="mt-3 pt-2 border-t text-right">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-800 px-2 py-1"
            >
              Tutup
            </button>
          </div>

        </div>
      )}
    </div>
  );
}