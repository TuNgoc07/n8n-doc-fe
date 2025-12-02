import React, { useState } from "react";

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="font-display">
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center">
            <div className="layout-content-container flex w-full flex-col flex-1">
              <main className="flex min-h-screen w-full">
                <div className="flex w-full flex-col items-center justify-center lg:flex-row">
                  {/* Bên trái: background image (ẩn trên mobile) */}
                  <div className="relative hidden h-full flex-1 items-center justify-center lg:flex">
                    <div
                      className="absolute inset-0 h-full w-full bg-center bg-no-repeat bg-cover"
                      data-alt="Abstract gradient image with flowing blue and purple shapes representing data and technology."
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAT2f2SGLS96m5xrz26anBLOTBrS5DGp7P3LZi_OewJ7fFqqhdsHsFBSx4E41sT08HBabZs-zLtFOz0Om8kgeUqFXQcdT9KYFAm1mdgYAT9mgZG3_o0LQH5Yf_1Sqv7_9gcHvWks2o-r9DTK-rFWYNXkilW2L20ZnBe83hIjJApZ2z3N8N2cGoQxcDwjPklGIfmkVS1xEi9MO3PQ5KkPsi9nEuSHvm4wZYeKjC9CgzuR6YQkHMXXF1s-rxXerqz6hY31sqn76i8-_s")',
                      }}
                    />
                  </div>

                  {/* Bên phải: form login */}
                  <div className="flex h-full w-full flex-1 items-center justify-center bg-background-light p-6 dark:bg-background-dark lg:max-w-xl">
                    <div className="flex w-full max-w-md flex-col items-start gap-8">
                      {/* Logo */}
                      <div className="flex flex-col gap-1">
                        <svg
                          className="text-primary h-8 w-8"
                          fill="none"
                          height="32"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12.54 2.14a12.06 12.06 0 0 0-9.43 3.63 11.73 11.73 0 0 0-1 14.28 1 1 0 0 0 1.4.3L15 13.5l.39.39a2.08 2.08 0 0 1-2.94 2.94l-2.23-2.23a1.26 1.26 0 0 0-1.78 1.78l3.63 3.63c.47.47 1.23.47 1.7 0l7.88-7.88a12 12 0 0 0-9.71-11.97Z" />
                          <path d="M15 9.5a2.5 2.5 0 0 0-5 0 2.5 2.5 0 0 0 5 0Z" />
                        </svg>
                      </div>

                      {/* Heading */}
                      <div className="flex min-w-72 flex-col gap-3">
                        <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">
                          Đăng nhập vào hệ thống
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                          Nền tảng quản lý vận hành và số hóa quy trình. Tối ưu
                          tuyển dụng, quản lý tài liệu hiệu quả.
                        </p>
                      </div>

                      {/* Form */}
                      <div className="flex w-full flex-col items-stretch gap-4">
                        {/* Email / username */}
                        <label className="flex flex-col w-full">
                          <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-2">
                            Email hoặc Tên đăng nhập
                          </p>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined text-slate-400 absolute left-3">
                              person
                            </span>
                            <input
                              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 pl-10 pr-4 py-2.5 text-base font-normal leading-normal"
                              placeholder="Nhập email của bạn"
                              value={emailOrUsername}
                              onChange={(e) =>
                                setEmailOrUsername(e.target.value)
                              }
                            />
                          </div>
                        </label>

                        {/* Password */}
                        <label className="flex flex-col w-full">
                          <p className="text-slate-900 dark:text-white text-sm font-medium leading-normal pb-2">
                            Mật khẩu
                          </p>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined text-slate-400 absolute left-3">
                              lock
                            </span>
                            <input
                              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 h-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 pl-10 pr-10 py-2.5 text-base font-normal leading-normal"
                              placeholder="Nhập mật khẩu"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                              className="text-slate-400 dark:text-slate-500 absolute right-3"
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: 20 }}
                              >
                                {showPassword ? "visibility" : "visibility_off"}
                              </span>
                            </button>
                          </div>
                        </label>

                        {/* Quên mật khẩu */}
                        <a
                          className="text-primary hover:underline text-sm font-medium leading-normal self-end"
                          href="#"
                        >
                          Quên mật khẩu?
                        </a>

                        {/* Nút đăng nhập */}
                        <button
                          className="flex items-center justify-center whitespace-nowrap font-semibold transition-colors duration-200 h-12 px-6 rounded-lg bg-primary text-white hover:bg-primary/90 w-full"
                          type="button"
                          onClick={() => {
                            // TODO: gọi API login thật
                            console.log("login", {
                              emailOrUsername,
                              password,
                            });
                          }}
                        >
                          Đăng nhập
                        </button>
                      </div>

                      {/* Footer */}
                      <div className="flex w-full flex-col items-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                          © 2024 TechCorp. All rights reserved.
                        </p>
                        <div className="flex gap-4 mt-2">
                          <a
                            className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-normal leading-normal underline"
                            href="#"
                          >
                            Hỗ trợ
                          </a>
                          <a
                            className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-normal leading-normal underline"
                            href="#"
                          >
                            Điều khoản dịch vụ
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end form */}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
