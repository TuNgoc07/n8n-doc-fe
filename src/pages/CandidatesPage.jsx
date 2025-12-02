// src/pages/CandidatesPage.jsx
import React from "react";

const CandidatesPage = () => {
  return (
    <>
      {/* Page Heading */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight">
            Quản lý Ứng viên
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
            Xem, lọc và quản lý tất cả ứng viên trong hệ thống.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 h-10 px-4 bg-primary text-white rounded-lg text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            add_circle
          </span>
          <span className="truncate">Thêm ứng viên mới</span>
        </button>
      </div>

      {/* Search + Filters */}
      <div className="bg-white dark:bg-[#1a2233] p-4 rounded-xl shadow-sm mb-6">
        {/* SearchBar */}
        <div className="mb-4">
          <label className="flex flex-col w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-12">
              <div className="text-gray-400 flex border border-r-0 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-primary h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                placeholder="Tìm kiếm theo tên, email, hoặc từ khóa..."
                defaultValue=""
              />
            </div>
          </label>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-2">
            Bộ lọc:
          </p>

          <FilterChip
            icon="work_outline"
            label="Vị trí ứng tuyển"
          />
          <FilterChip
            icon="label_outline"
            label="Trạng thái"
          />
          <FilterChip
            icon="calendar_today"
            label="Ngày nộp hồ sơ"
          />

          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 px-3 text-red-500 dark:text-red-400 transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              close
            </span>
            <p className="text-sm font-medium leading-normal">Xóa bộ lọc</p>
          </button>
        </div>
      </div>

      {/* TABLE ứng viên */}
      <div className="overflow-x-auto bg-white dark:bg-[#1a2233] rounded-xl shadow-sm">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4" scope="col">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th className="px-6 py-3" scope="col">
                Tên Ứng viên
              </th>
              <th className="px-6 py-3" scope="col">
                Vị trí ứng tuyển
              </th>
              <th className="px-6 py-3" scope="col">
                Ngày nộp
              </th>
              <th className="px-6 py-3" scope="col">
                Tài liệu
              </th>
              <th className="px-6 py-3" scope="col">
                Trạng thái
              </th>
              <th className="px-6 py-3" scope="col">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            <CandidateRow
              checkboxId="checkbox-table-1"
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBe9Wg80SdCHYIQdFOIOtO0Zj5tP8NHGNAYqbetyMuEvoz8HvyunKCJLkAlvVPt6IWHOvW5vrYWjAINCYUAIcl4unkgLgaAR797RxA_VU1XDfKbvoozGd4tJdRsrPmphdlIJH_u1_zC10jjdTff4LKlJde7bYz2PzZu5p6F-phXU_JlnRPUhjEE1fttxn3XWOmzMwbtdHkpZyp0WuL9LrK8xiZYURh1C7V-5dW5qNVNn2cuj9W0LqaH5MxDck54-BFesg9O-F_4XKg"
              name="Lê Minh Anh"
              email="minhanh.le@email.com"
              position="Senior UI/UX Designer"
              date="25/07/2024"
              files="2 files"
              statusLabel="Mới"
              statusClass="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            />

            <CandidateRow
              checkboxId="checkbox-table-2"
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDkvZyWNu_TUyg4PnKHdk1Julz-fk4aqVJ9aOYHdCU2ga9ePu4VCMVxk5tEfMMRWGkBiavqEhiqGdpAjtm62Q4FTvXRRaWGhuDM8kBdM7NjmJsO8H6E3giGdRfeux2DqkbFyqty-PNues5gGrpH9YFGGnPiHt1I9aP3HEGuQxugr8-NTtA8nI7rbUGF8Mqxxi1g9SvQYnMAbTjEkczJ1rr9OYW18tnzDYeTeC6wdXpBGHgKZzZuj5veMps2Vxmn-8nDYcOwCKg1wTM"
              name="Trần Văn Hùng"
              email="hung.tran@email.com"
              position="Backend Developer (Go)"
              date="24/07/2024"
              files="1 file"
              statusLabel="Đang xem xét"
              statusClass="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            />

            <CandidateRow
              checkboxId="checkbox-table-3"
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuAG3UvR8fPyEQXRM7fu3L_gQhdDUn3SnMyJKOA_jA38r03T_Iy7FoZKNQvpi5KtmHJUuSJ-oxnpl-CWdlhVN8qrtGvnfLPiQIG4TQbQyqEB1lNvPIUrog2tFlfQEBOxMuapGa0TJlnUTyRYlAUJ_SPuIjcp7fvlO8sW1kT-e3Ezz1vtsEWh41KT1LcgMSlUBKFW8qV0P6O5E7mBEyjoqY0SWD3WsliWf9CghUpl2Mew6YHMNuKD5xCJq2-9K24_S21hglduFlcib7s"
              name="Phạm Thị Thu Thảo"
              email="thao.pham@email.com"
              position="Product Manager"
              date="23/07/2024"
              files="3 files"
              statusLabel="Phỏng vấn V1"
              statusClass="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            />

            <CandidateRow
              checkboxId="checkbox-table-4"
              avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuC4EqJhVhZbofcxulhgRx5XMnC21a4uAajnT1L98RhFbYODoDfKLrQio5Fnk07wJP87u564eTgYPVhHLaqjDnfqlSzGQiUZW7AH9t65YsvmzIdXm5aWtOnpDZ903Dqph3Mwtyu6TgI1AG8gpxMcwnRBMJX45ReSKcuVVUKoDcs9LNwH13yki0iUtoHTL83Wle3o732uR73FCURopd7HOT5EtQ0JxOEuLRBX7J3GIs4ozlObvbeuBQlfSGiFwkvn-Om8ST_tuDRKXCM"
              name="Nguyễn Hoàng Yến"
              email="yen.nguyen@email.com"
              position="Senior UI/UX Designer"
              date="22/07/2024"
              files="2 files"
              statusLabel="Từ chối"
              statusClass="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            />
          </tbody>
        </table>

        {/* Pagination */}
        <nav
          aria-label="Table navigation"
          className="flex items-center justify-between p-4"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Hiển thị{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            của{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul className="inline-flex -space-x-px text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-primary border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

/* ---- small components ---- */

const FilterChip = ({ icon, label }) => (
  <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 transition-colors">
    <span
      className="material-symbols-outlined text-gray-600 dark:text-gray-300"
      style={{ fontSize: 20 }}
    >
      {icon}
    </span>
    <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
      {label}
    </p>
    <span
      className="material-symbols-outlined text-gray-600 dark:text-gray-300"
      style={{ fontSize: 20 }}
    >
      expand_more
    </span>
  </button>
);

const CandidateRow = ({
  checkboxId,
  avatar,
  name,
  email,
  position,
  date,
  files,
  statusLabel,
  statusClass,
}) => (
  <tr className="bg-white dark:bg-[#1a2233] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
    <td className="w-4 p-4">
      <div className="flex items-center">
        <input
          id={checkboxId}
          type="checkbox"
          className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label htmlFor={checkboxId} className="sr-only">
          checkbox
        </label>
      </div>
    </td>
    <th
      scope="row"
      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
    >
      <img
        className="w-10 h-10 rounded-full"
        src={avatar}
        alt="Candidate avatar"
      />
      <div className="pl-3">
        <div className="text-base font-semibold">{name}</div>
        <div className="font-normal text-gray-500 dark:text-gray-400">
          {email}
        </div>
      </div>
    </th>
    <td className="px-6 py-4">{position}</td>
    <td className="px-6 py-4">{date}</td>
    <td className="px-6 py-4">
      <button className="flex items-center gap-1 text-primary hover:underline">
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          attach_file
        </span>
        <span>{files}</span>
      </button>
    </td>
    <td className="px-6 py-4">
      <span
        className={
          "text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full " + statusClass
        }
      >
        {statusLabel}
      </span>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <IconButton icon="visibility" colorHover="primary" />
        <IconButton icon="edit" colorHover="green" />
        <IconButton icon="delete" colorHover="red" />
      </div>
    </td>
  </tr>
);

const IconButton = ({ icon, colorHover }) => {
  const colorMap = {
    primary: "hover:text-primary dark:hover:text-primary-400",
    green: "hover:text-green-500 dark:hover:text-green-400",
    red: "hover:text-red-500 dark:hover:text-red-400",
  };

  return (
    <button
      type="button"
      className={
        "p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg " +
        (colorMap[colorHover] || "")
      }
    >
      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
        {icon}
      </span>
    </button>
  );
};

export default CandidatesPage;
