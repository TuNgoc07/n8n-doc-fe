// src/pages/JobDetailPage.jsx
import React from "react";
import NavigationLayout from "../components/NavigationLayout";

const JobDetailPage = () => {
  return (
    <NavigationLayout title="Chi tiết vị trí" active="recruitment">
      <div className="max-w-7xl mx-auto">
        {/* Header trên nội dung chi tiết */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Senior Frontend Developer
            </h1>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="material-icons-outlined text-base">
                  location_on
                </span>
                <span>Remote (Ho Chi Minh City)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-icons-outlined text-base">
                  attach_money
                </span>
                <span>$2,000 - $3,500</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-icons-outlined text-base">
                  event
                </span>
                <span>Đăng ngày: 25/10/2023</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 flex items-center gap-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
              <span className="material-icons-outlined text-lg">share</span>
              Chia sẻ
            </button>

            <button className="px-4 py-2 flex items-center gap-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
              <span className="material-icons-outlined text-lg">close</span>
              Đóng vị trí
            </button>

            <button className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-700">
              <span className="material-icons-outlined text-lg">edit</span>
              Chỉnh sửa
            </button>
          </div>
        </div>

        {/* GRID: mô tả + sidebar tóm tắt */}
        <div className="grid grid-cols-12 gap-8">
          {/* Khối mô tả bên trái */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 space-y-8">
              {/* Mô tả công việc */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Mô tả công việc
                </h2>
                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  <p>
                    We are seeking a highly skilled and experienced Senior
                    Frontend Developer to join our dynamic team. You will be
                    responsible for developing and maintaining our web
                    applications, ensuring high performance, responsiveness, and
                    an excellent user experience. You will collaborate closely
                    with our product managers, UI/UX designers, and backend
                    engineers to deliver high-quality products.
                  </p>
                </div>
              </div>

              {/* Yêu cầu ứng viên */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Yêu cầu ứng viên
                </h2>
                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  <ul>
                    <li>Bachelor&apos;s degree in Computer Science or a related field.</li>
                    <li>5+ years of experience in frontend development.</li>
                    <li>
                      Proficient in HTML, CSS, JavaScript, and modern JavaScript
                      frameworks (e.g., React, Vue, or Angular).
                    </li>
                    <li>
                      Experience with state management libraries (e.g., Redux,
                      Vuex).
                    </li>
                    <li>
                      Familiarity with RESTful APIs and modern authorization
                      mechanisms.
                    </li>
                    <li>
                      Strong understanding of web performance and optimization
                      techniques.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quyền lợi */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Quyền lợi
                </h2>
                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  <ul>
                    <li>Competitive salary and performance-based bonuses.</li>
                    <li>Comprehensive health insurance package.</li>
                    <li>Flexible working hours and remote work options.</li>
                    <li>
                      Opportunities for professional development and training.
                    </li>
                    <li>
                      A collaborative and supportive work environment.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar tóm tắt bên phải */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tóm tắt vị trí
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Trạng thái
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Đang mở
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Hết hạn
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    31/12/2023
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Phòng ban
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Engineering
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Loại hình
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    Full-time
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700" />

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white pt-2">
                Số liệu ứng viên
              </h3>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">15</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Tổng số
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    5
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Mới
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    3
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sàng lọc
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    2
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Phỏng vấn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigationLayout>
  );
};

export default JobDetailPage;
