// a dashboard page with a side navigation bar and a main content area

import Image from "next/image";
import {points} from "@/util";
import {useState} from "react";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 h-screen bg-gray-800">
        <div className="flex items-center justify-center mt-10">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span className="text-white text-2xl mx-2 font-semibold">
              ResQ
            </span>
          </div>
        </div>
        <nav className="mt-10">
          <a
            href="#"
            className="flex items-center mt-4 py-2 px-6 bg-gray-900 bg-opacity-25 text-gray-100"
          >
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            <span className="mx-3">Analysis</span>
          </a>
          <a
            href="#"
            className="flex items-center mt-4 py-2 px-6 bg-gray-900 bg-opacity-25 text-gray-100"
          >
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="mx-3">Settings</span>
          </a>
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
          <div className="flex items-center">
            <button className="text-gray-500 focus:outline-none">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <button className="flex mx-4 text-gray-600 focus:outline-none">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
            <div className="relative">
              <button className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
                <img
                  src="https://randomuser.me/api/portraits"
                  alt="Your avatar"
                />
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>
            <div className="mt-4">
              <div className="flex flex-wrap -mx-6">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  {/* A placeholder map with some dots in random places*/}
                  <div className="w-[50rem] h-[28rem] bg-black rounded relative">
                    <Image src="/map.png" alt="map" layout="fill"/>
                    {points.map((point, index) => {
                      const [hover, setHover] = useState(false)

                      return (
                        // on hover, display a tooltip with the point's count
                        <div
                          key={index}
                          className={`${hover ? 'bg-purple-700' : (point.ok ? "bg-green-500" : "bg-red-500") + ' bg-opacity-70'} absolute w-4 h-4 rounded-full`}
                          style={{
                            left: `${point.x - 2}%`,
                            top: `${point.y - 2}%`,
                          }}
                          onMouseEnter={() => setHover(true)}
                          onMouseLeave={() => setHover(false)}
                        >
                          {hover && (
                            <div className="absolute bottom-4 left-0 bg-blue-500 p-1 rounded z-10">
                              {point.count}
                            </div>
                          )}
                        </div>
                      )
                    })
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
