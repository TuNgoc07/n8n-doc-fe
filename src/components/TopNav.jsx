// src/components/TopNav.jsx
import React from "react";

export default function TopNav({ title = "Dashboard Tổng quan" }) {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#282e39] px-10 py-3 bg-[#111318] sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-white">
          <span className="material-symbols-outlined text-xl">
            space_dashboard
          </span>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            {title}
          </h2>
        </div>

        {/* search */}
        <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-[#9da6b9] flex border-none bg-[#282e39] items-center justify-center pl-4 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#282e39] focus:border-none h-full placeholder:text-[#9da6b9] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              placeholder="Search..."
            />
          </div>
        </label>
      </div>

      <div className="flex flex-1 justify-end gap-4">
        <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-[#282e39] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          data-alt="User Avatar"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCeZjHcDmIulBLKDko3HB-WRU90LhzY1j6GPlU4NAeyecXkTuD3yO_yozCChGjyHvqNSnAtJATHBBl5uBPiwQBzNEJtWLx6NX2gF2urb7akZPp_tXkBiszR5MjG2sux9ZOsURfRyFAqxPwK3yNu5lrTuaKLnQD-VQNwus0cQz3LvBt1KfovqsFlZ6-GyNhj2d0jzNmKeRTMs-K5KU5WgQOqDyYe0EJZvvDKrfgdneHHfJrmNwQC4R-6_rLCIQEZF5HQeN2bQNdeQ88")',
          }}
        />
      </div>
    </header>
  );
}
