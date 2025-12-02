// src/pages/SchedulePage.jsx
import React from "react";

const SchedulePage = () => {
  return (
    <>
      {/* Page heading */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Lịch trình Phỏng vấn
          </p>
          <p className="text-gray-500 dark:text-[#9da6b9] text-base font-normal leading-normal">
            Quản lý và sắp xếp các cuộc phỏng vấn cho các vị trí đang tuyển.
          </p>
        </div>
        <button className="flex min-w-[84px] items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            add
          </span>
          <span className="truncate">Tạo Lịch phỏng vấn</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8">
        {/* Segmented buttons: Tháng / Tuần / Ngày / Danh sách */}
        <div className="flex">
          <div className="flex h-10 items-center justify-center rounded-lg bg-gray-200 dark:bg-[#282e39] p-1">
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-white dark:has-[:checked]:bg-[#111318] has-[:checked]:shadow-sm has-[:checked]:text-gray-900 dark:has-[:checked]:text-white text-gray-500 dark:text-[#9da6b9] text-sm font-medium leading-normal">
              <span className="truncate">Tháng</span>
              <input
                type="radio"
                name="view-toggle"
                value="Tháng"
                defaultChecked
                className="invisible w-0"
              />
            </label>
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-white dark:has-[:checked]:bg-[#111318] has-[:checked]:shadow-sm has-[:checked]:text-gray-900 dark:has-[:checked]:text-white text-gray-500 dark:text-[#9da6b9] text-sm font-medium leading-normal">
              <span className="truncate">Tuần</span>
              <input
                type="radio"
                name="view-toggle"
                value="Tuần"
                className="invisible w-0"
              />
            </label>
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-white dark:has-[:checked]:bg-[#111318] has-[:checked]:shadow-sm has-[:checked]:text-gray-900 dark:has-[:checked]:text-white text-gray-500 dark:text-[#9da6b9] text-sm font-medium leading-normal">
              <span className="truncate">Ngày</span>
              <input
                type="radio"
                name="view-toggle"
                value="Ngày"
                className="invisible w-0"
              />
            </label>
            <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 has-[:checked]:bg-white dark:has-[:checked]:bg-[#111318] has-[:checked]:shadow-sm has-[:checked]:text-gray-900 dark:has-[:checked]:text-white text-gray-500 dark:text-[#9da6b9] text-sm font-medium leading-normal">
              <span className="truncate">Danh sách</span>
              <input
                type="radio"
                name="view-toggle"
                value="Danh sách"
                className="invisible w-0"
              />
            </label>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-3 overflow-x-auto">
          <FilterChip label="Tất cả vị trí" />
          <FilterChip label="Người phỏng vấn" />
          <FilterChip label="Trạng thái" />
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-6 bg-white dark:bg-[#111318] border border-gray-200 dark:border-gray-800 rounded-xl p-4">
        {/* Calendar header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <button className="flex size-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-white">
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                chevron_left
              </span>
            </button>
            <button className="flex size-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-white">
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                chevron_right
              </span>
            </button>
          </div>
          <p className="text-gray-900 dark:text-white text-lg font-bold leading-tight">
            Tháng 10, 2024
          </p>
          <button className="text-gray-700 dark:text-gray-300 text-sm font-medium px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            Hôm nay
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 mt-4">
          {/* Day headers */}
          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
            <div
              key={d}
              className="text-center text-sm font-bold text-gray-500 dark:text-gray-400 py-3"
            >
              {d}
            </div>
          ))}

          {/* Dates (tĩnh giống HTML gốc) */}
          <div className="text-right p-2 border-t border-r border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600">
            29
          </div>
          <div className="text-right p-2 border-t border-r border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600">
            30
          </div>

          <CalendarCell day="1" />
          <CalendarCell day="2" />
          <CalendarCell day="3" />
          <CalendarCell day="4" lastInRow />

          <CalendarCell day="5" />
          <CalendarCell day="6" />
          <CalendarCell day="7" />
          <CalendarCell day="8" />
          {/* 9 có 1 lịch */}
          <CalendarCell day="9">
            <EventCard
              color="green"
              name="Nguyễn Văn A"
              time="9:00 - FE Dev"
            />
          </CalendarCell>
          <CalendarCell day="10" />
          {/* 11 là ngày đang chọn + 2 lịch */}
          <CalendarCell day="11" highlight>
            <EventCard
              color="yellow"
              name="Trần Thị B"
              time="14:00 - UI/UX"
            />
            <EventCard
              color="green"
              name="Lê Văn C"
              time="16:00 - BE Dev"
            />
          </CalendarCell>

          <CalendarCell day="12" lastInRow />

          <CalendarCell day="13" />
          {/* 14 có lịch bị huỷ */}
          <CalendarCell day="14">
            <EventCard
              color="red"
              name="Phạm Thị D"
              time="10:00 - Product"
              cancelled
            />
          </CalendarCell>
          <CalendarCell day="15" />
          <CalendarCell day="16" />
          <CalendarCell day="17" />
          <CalendarCell day="18" />
          <CalendarCell day="19" lastInRow />

          {/* Bạn có thể thêm các ngày còn lại nếu muốn, 
              nhưng cho demo giao diện thế này là đủ */}
        </div>
      </div>
    </>
  );
};

/* ---- small components ---- */

const FilterChip = ({ label }) => (
  <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-200 dark:bg-[#282e39] px-3">
    <p className="text-gray-700 dark:text-white text-sm font-medium leading-normal">
      {label}
    </p>
    <span
      className="material-symbols-outlined text-gray-500 dark:text-white"
      style={{ fontSize: 20 }}
    >
      arrow_drop_down
    </span>
  </button>
);

const CalendarCell = ({ day, children, highlight, lastInRow }) => {
  const baseClass =
    "h-32 text-right p-2 border-t border-gray-200 dark:border-gray-800";
  const rightBorder = lastInRow ? "" : " border-r";
  const bg = highlight ? " bg-primary/10 dark:bg-primary/20" : "";

  return (
    <div className={baseClass + rightBorder + bg}>
      {highlight ? (
        <span className="font-bold h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white ml-auto">
          {day}
        </span>
      ) : (
        <span className="text-gray-800 dark:text-gray-200">{day}</span>
      )}
      {children && <div className="mt-1 space-y-1 text-left text-xs">{children}</div>}
    </div>
  );
};

const EventCard = ({ color, name, time, cancelled }) => {
  const bgMap = {
    green: "bg-green-100 dark:bg-green-900/40",
    yellow: "bg-yellow-100 dark:bg-yellow-900/40",
    red: "bg-red-100 dark:bg-red-900/40",
  };
  const textMap = {
    green: "text-green-800 dark:text-green-300",
    yellow: "text-yellow-800 dark:text-yellow-300",
    red: "text-red-800 dark:text-red-300",
  };
  const timeMap = {
    green: "text-green-600 dark:text-green-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    red: "text-red-600 dark:text-red-400",
  };

  return (
    <div className={`${bgMap[color]} p-1 rounded-md`}>
      <p className={`font-bold ${textMap[color]}`}>{name}</p>
      <p
        className={`${timeMap[color]} ${
          cancelled ? "line-through" : ""
        }`}
      >
        {time}
      </p>
    </div>
  );
};

export default SchedulePage;
