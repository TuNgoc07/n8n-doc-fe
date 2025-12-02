// src/pages/AdminUsersPage.jsx
import React from "react";

const AdminUsersPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <a
          href="#"
          className="text-[#9da6b9] text-base font-medium leading-normal hover:text-primary"
        >
          Dashboard
        </a>
        <span className="text-[#9da6b9] text-base font-medium leading-normal">
          /
        </span>
        <a
          href="#"
          className="text-[#9da6b9] text-base font-medium leading-normal hover:text-primary"
        >
          Quản trị hệ thống
        </a>
        <span className="text-[#9da6b9] text-base font-medium leading-normal">
          /
        </span>
        <span className="text-white text-base font-medium leading-normal">
          Người dùng
        </span>
      </div>

      {/* Page heading */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <p className="text-white text-3xl font-bold leading-tight tracking-tight">
            Quản lý Người dùng &amp; Phân quyền
          </p>
          <p className="text-[#9da6b9] text-base font-normal leading-normal">
            Quản lý, chỉnh sửa vai trò và phân quyền cho người dùng hệ thống.
          </p>
        </div>
      </div>

      {/* Toolbar & Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="flex-1">
          <label className="flex flex-col min-w-40 h-11 w-full max-w-md">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-[#9da6b9] flex bg-[#282e39] items-center justify-center pl-4 rounded-l-lg">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-[#282e39] h-full placeholder:text-[#9da6b9] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                placeholder="Tìm kiếm theo tên, email..."
                defaultValue=""
              />
            </div>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center gap-2 rounded-lg h-11 px-4 bg-[#282e39] text-white text-sm font-medium leading-normal hover:bg-[#3a4251]">
            <span className="material-symbols-outlined text-base">
              filter_list
            </span>
            <span>Vai trò</span>
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg h-11 px-4 bg-[#282e39] text-white text-sm font-medium leading-normal hover:bg-[#3a4251]">
            <span className="material-symbols-outlined text-base">
              filter_list
            </span>
            <span>Trạng thái</span>
          </button>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4 hover:bg-primary/90">
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'wght' 600" }}
            >
              add
            </span>
            <span className="truncate">Thêm Người dùng</span>
          </button>
        </div>
      </div>

      {/* User table */}
      <div className="bg-[#111318] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-[#9da6b9]">
            <thead className="text-xs text-gray-400 uppercase bg-[#282e39]/30">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                    />
                    <label htmlFor="checkbox-all" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên Đầy Đủ
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Vai trò
                </th>
                <th scope="col" className="px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày tham gia
                </th>
                <th scope="col" className="px-6 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              <UserRow
                checkboxId="checkbox-table-1"
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBN1EJk0JH3Nzi713gunb55-GDrVh_HM5Ppjm0-LILQyRZagEjK4RhB_pwCDL6VNRTLWh0qJ2hpNhKeMP-LvQ1H14fJl1MFHQEtGyLjt0HcpSnUuc0_YgfcgiuqGbqwymDtCq69xRcM35uAQV_UUyqjxYVUZzl6RVHatnD6bZG3ty5SnMMV7b39L0QrZNaJoqbkRPJgs0Jiv9pXtqrhu9CdobO_RZI59sXHeb8WuC4FtRSLV7N7rcGXJueSEC_bnJ3FYMStobco_r4"
                name="Nguyễn Văn An"
                username="@an.nguyen"
                email="an.nguyen@company.com"
                roleLabel="Admin"
                roleClass="bg-blue-900 text-blue-300"
                active
                joinedAt="2023-08-15"
                toggleIcon="toggle_on"
              />

              <UserRow
                checkboxId="checkbox-table-2"
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBrTHRJOLe3_YGANNXLYfnLugKmbdjYRDnJQxnigU2I_08xiBdjYRYLyGokek7iWGz-A4rq2KsLSIvfpvVZ1nAABo_CkeYMbmiOKYNk1as_Hi-GTvUEYyr2lET0_p2YzaboRJ-WlbGSJzBeo5O1VVNYVWjESgjpX6u7eEGtNSgVMhUfXz7MofOsDSYKLxyRHE_Wk5-nxAVPU8hUtoDeNA8wuWhuNmkWSOO7gsaLj_XPBYaXWFZwW-rKsGhneFiqKV995ZHcJFeQo8I"
                name="Trần Thị Bích"
                username="@bich.tran"
                email="bich.tran@company.com"
                roleLabel="HR Manager"
                roleClass="bg-purple-900 text-purple-300"
                active
                joinedAt="2023-07-20"
                toggleIcon="toggle_on"
              />

              <UserRow
                checkboxId="checkbox-table-3"
                avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuCnc2t4EAl_hNa7u47u6XWA5djkPbUPOiuL7DRss9-sR-vdtbtXo0mCyedADIEEhtjYdPp74CWifyZx8i_l3MGAohUJu-OOJuPsAzPNNIYEujJkmmwyDqOhchF4RDj5qQcSXskSNeTy4xCSCyQ2iQMQKqnIg10Io_FVVAOx4MNi9vrl8GbV4G4xopJfu6vexHw-0RFB_VK2s6oi0BFeUlz5umKKZOlLw4B0FTuxjqBpvLH0PHVjI68X95HeDYpQIn8VtC579KvhM9c"
                name="Lê Minh Cường"
                username="@cuong.le"
                email="cuong.le@company.com"
                roleLabel="Member"
                roleClass="bg-gray-700 text-gray-300"
                active={false}
                joinedAt="2023-05-01"
                toggleIcon="toggle_off"
              />
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav
          className="flex items-center justify-between p-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-400">
            Hiển thị{" "}
            <span className="font-semibold text-white">1-10</span> của{" "}
            <span className="font-semibold text-white">100</span>
          </span>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <a
                href="#"
                className="block px-3 py-2 ml-0 leading-tight text-gray-400 bg-[#282e39] border border-gray-700 rounded-l-lg hover:bg-[#3a4251] hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <span className="material-symbols-outlined text-xl">
                  chevron_left
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-400 bg-[#282e39] border border-gray-700 hover:bg-[#3a4251] hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-white bg-primary border border-primary hover:bg-primary/90"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="z-10 px-3 py-2 leading-tight text-gray-400 bg-[#282e39] border border-gray-700 hover:bg-[#3a4251] hover:text-white"
              >
                3
              </a>
            </li>
            <li>
              <span className="px-3 py-2 leading-tight text-gray-400 bg-[#282e39] border border-gray-700">
                ...
              </span>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-400 bg-[#282e39] border border-gray-700 hover:bg-[#3a4251] hover:text-white"
              >
                10
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-3 py-2 leading-tight text-gray-400 bg-[#282e39] border border-gray-700 rounded-r-lg hover:bg-[#3a4251] hover:text-white"
              >
                <span className="sr-only">Next</span>
                <span className="material-symbols-outlined text-xl">
                  chevron_right
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

/* ---- small components ---- */

const UserRow = ({
  checkboxId,
  avatar,
  name,
  username,
  email,
  roleLabel,
  roleClass,
  active,
  joinedAt,
  toggleIcon,
}) => (
  <tr className="border-b border-gray-800 hover:bg-[#282e39]/20">
    <td className="w-4 p-4">
      <div className="flex items-center">
        <input
          id={checkboxId}
          type="checkbox"
          className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
        />
        <label htmlFor={checkboxId} className="sr-only">
          checkbox
        </label>
      </div>
    </td>
    <th
      scope="row"
      className="flex items-center px-6 py-4 text-white whitespace-nowrap"
    >
      <img
        className="w-10 h-10 rounded-full"
        src={avatar}
        alt="User avatar"
      />
      <div className="pl-3">
        <div className="text-base font-semibold">{name}</div>
        <div className="font-normal text-gray-400">{username}</div>
      </div>
    </th>
    <td className="px-6 py-4">{email}</td>
    <td className="px-6 py-4">
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${roleClass}`}
      >
        {roleLabel}
      </span>
    </td>
    <td className="px-6 py-4">
      {active ? (
        <div className="flex items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
          Đang hoạt động
        </div>
      ) : (
        <div className="flex items-center text-red-400">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />
          Vô hiệu hóa
        </div>
      )}
    </td>
    <td className="px-6 py-4">{joinedAt}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2 text-gray-400">
        <IconButton icon="edit" />
        <IconButton icon="shield_person" />
        <IconButton icon={toggleIcon} />
        <IconButton icon="more_vert" />
      </div>
    </td>
  </tr>
);

const IconButton = ({ icon }) => (
  <button className="p-1.5 hover:bg-[#282e39] rounded-md hover:text-white">
    <span className="material-symbols-outlined text-lg">{icon}</span>
  </button>
);

export default AdminUsersPage;
