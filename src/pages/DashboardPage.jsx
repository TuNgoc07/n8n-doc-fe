// src/pages/DashboardPage.jsx
import React from "react";

const DashboardPage = () => {
  return (
    <>
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Vị trí đang mở"
          value="12"
          subtitle="+2% so với tháng trước"
          subtitleColor="#0bda5e"
        />
        <StatCard
          title="Hồ sơ mới (24h)"
          value="8"
          subtitle="+5% so với hôm qua"
          subtitleColor="#0bda5e"
        />
        <StatCard
          title="Tác vụ của tôi"
          value="5"
          subtitle="2 quá hạn"
          subtitleColor="#fa6238"
        />
        <StatCard
          title="Quy trình đang chạy"
          value="23"
          subtitle="+1.5% so với tuần trước"
          subtitleColor="#0bda5e"
        />
      </div>

      {/* BIỂU ĐỒ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Bar chart trạng thái hồ sơ */}
        <div className="flex flex-col gap-2 rounded-xl border border-[#3b4354] p-6 bg-[#111318]">
          <p className="text-white text-base font-medium leading-normal">
            Hồ sơ ứng tuyển theo trạng thái
          </p>
          <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
            256
          </p>
          <div className="flex gap-1">
            <p className="text-[#9da6b9] text-base font-normal leading-normal">
              Tháng này
            </p>
            <p className="text-[#0bda5e] text-base font-medium leading-normal">
              +15.3%
            </p>
          </div>

          <div className="grid min-h-[180px] grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center px-3 pt-4">
            <Bar label="Mới" height="20%" />
            <Bar label="Sàng lọc" height="50%" />
            <Bar label="Phỏng vấn" height="35%" />
            <Bar label="Offer" height="25%" />
            <Bar label="Nhận việc" height="15%" />
            <Bar label="Từ chối" height="40%" color="#3b4354" />
          </div>
        </div>

        {/* Area chart xu hướng tuần */}
        <div className="flex flex-col gap-2 rounded-xl border border-[#3b4354] p-6 bg-[#111318]">
          <p className="text-white text-base font-medium leading-normal">
            Xu hướng hồ sơ theo tuần
          </p>
          <p className="text-white tracking-light text-[32px] font-bold leading-tight truncate">
            48
          </p>
          <div className="flex gap-1">
            <p className="text-[#9da6b9] text-base font-normal leading-normal">
              Tuần này
            </p>
            <p className="text-[#0bda5e] text-base font-medium leading-normal">
              +8.1%
            </p>
          </div>

          <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
            <svg
              fill="none"
              height="148"
              preserveAspectRatio="none"
              viewBox="-3 0 478 150"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
                fill="url(#paint0_linear_1131_5935)"
              />
              <path
                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                stroke="#135bec"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1131_5935"
                  x1="236"
                  x2="236"
                  y1="1"
                  y2="149"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#135bec" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#135bec" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex justify-around">
              {["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"].map((w) => (
                <p
                  key={w}
                  className="text-[#9da6b9] text-[13px] font-bold leading-normal tracking-[0.015em]"
                >
                  {w}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="mt-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
          Các tác vụ của bạn
        </h2>
        <div className="flex flex-col bg-[#111318] rounded-xl border border-[#3b4354]">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#3b4354]">
            <div className="col-span-6">
              <p className="text-[#9da6b9] text-sm font-medium">Tên tác vụ</p>
            </div>
            <div className="col-span-3">
              <p className="text-[#9da6b9] text-sm font-medium">Quy trình</p>
            </div>
            <div className="col-span-2">
              <p className="text-[#9da6b9] text-sm font-medium">
                Ngày hết hạn
              </p>
            </div>
            <div className="col-span-1">
              <p className="text-[#9da6b9] text-sm font-medium">Ưu tiên</p>
            </div>
          </div>

          <div className="divide-y divide-[#3b4354]">
            <TaskRow
              name="Duyệt hồ sơ ứng viên Nguyễn Văn A"
              flow="Tuyển dụng Senior Developer"
              due="25/07/2024"
              dueColor="text-[#fa6238]"
              priority="Cao"
              badgeClass="bg-red-500/10 text-red-400 ring-red-400/20"
            />
            <TaskRow
              name="Chuẩn bị câu hỏi phỏng vấn cho vị trí BA"
              flow="Tuyển dụng Business Analyst"
              due="26/07/2024"
              priority="Trung bình"
              badgeClass="bg-yellow-400/10 text-yellow-500 ring-yellow-400/20"
            />
            <TaskRow
              name="Gửi offer cho ứng viên Trần Thị B"
              flow="Tuyển dụng UI/UX Designer"
              due="27/07/2024"
              priority="Cao"
              badgeClass="bg-red-500/10 text-red-400 ring-red-400/20"
            />
            <TaskRow
              name="Xem xét đề xuất tối ưu quy trình onboarding"
              flow="Vận hành nội bộ"
              due="29/07/2024"
              priority="Thấp"
              badgeClass="bg-green-500/10 text-green-400 ring-green-400/20"
            />
          </div>
        </div>
      </div>
    </>
  );
};

/* --- các component con nhỏ --- */

const StatCard = ({ title, value, subtitle, subtitleColor }) => (
  <div className="flex flex-1 flex-col gap-2 rounded-xl p-6 border border-[#3b4354] bg-[#111318]">
    <p className="text-white text-base font-medium leading-normal">{title}</p>
    <p className="text-white tracking-light text-2xl font-bold leading-tight">
      {value}
    </p>
    <p
      className="text-base font-medium leading-normal"
      style={{ color: subtitleColor }}
    >
      {subtitle}
    </p>
  </div>
);

const Bar = ({ label, height, color }) => (
  <>
    <div
      className="w-full rounded-t"
      style={{ height, backgroundColor: color || "#135bec" }}
    />
    <p className="text-[#9da6b9] text-[13px] font-bold leading-normal tracking-[0.015em]">
      {label}
    </p>
  </>
);

const TaskRow = ({ name, flow, due, dueColor, priority, badgeClass }) => (
  <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/5 transition-colors duration-200 cursor-pointer">
    <div className="col-span-6">
      <p className="text-white">{name}</p>
    </div>
    <div className="col-span-3">
      <p className="text-[#9da6b9] text-sm">{flow}</p>
    </div>
    <div className="col-span-2">
      <p className={`${dueColor || "text-white"} text-sm`}>{due}</p>
    </div>
    <div className="col-span-1">
      <span
        className={
          "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset " +
          badgeClass
        }
      >
        {priority}
      </span>
    </div>
  </div>
);

export default DashboardPage;
