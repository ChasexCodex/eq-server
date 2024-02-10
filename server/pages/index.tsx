// a dashboard page with a side navigation bar and a main content area

import Image from "next/image";
import {makePoints} from "@/util";
import {useEffect, useReducer, useState} from "react";

const Point = ({point, index, currentCount}: any) => {
  const [hover, setHover] = useState(false)

  return (
    // on hover, display a tooltip with the point's count
    <div
      className={`${hover ? 'bg-purple-700' : ''} absolute w-4 h-4 rounded-full`}
      style={{
        left: `${point.x - 2}%`,
        top: `${point.y - 2}%`,
        backgroundColor: `rgba(255, 0, 0, ${(currentCount - index) / currentCount})`
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <div className="absolute bottom-4 left-0 bg-blue-500 p-1 rounded z-10 w-28">
          <p className="bg-green-500">OK: {point.ok.yes}</p>
          <p className="bg-red-500">Danger: {point.ok.no}</p>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const [danger, setDanger] = useState(false)
  const [points] = useState(makePoints(200)) // 200 points between 25 and 60 for x and 30 and 65 for y

  const [count, setCount] = useState(200)
  const [freq, setFreq] = useState(200)
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    if (danger) {
      setCurrentCount(10)
      const interval = setInterval(() => {
        if (currentCount > count) {
          clearInterval(interval)
          return
        }
        setCurrentCount(c => c + 1)
      }, freq)
      return () => {
        clearInterval(interval)
      }
    } else {
      setCurrentCount(0)
    }
  }, [danger])

  const toggleDanger = () => setDanger(!danger)


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
                    {points
                      .map((point, i) => ({point, index: i}))
                      .slice(0, currentCount)
                      .toSorted(({point: point1}, {point: point2}) => point1.ok.no > point2.ok.no ? -1 : 1)
                      .map(({point}, i) => <Point key={i} point={point} index={i} currentCount={currentCount}/>)}
                  </div>
                  <div className="absolute right-4 bottom-4 flex flex-col space-y-2 border bg-gray-100 p-2 rounded">
                    <div className="flex flex-row text-black space-x-4">
                      <label htmlFor="">
                        Connections
                      </label>
                      <input type="number"
                             className={`h-8 rounded-lg text-black px-4`}
                             value={count}
                             onChange={(e) => setCount(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex flex-row text-black space-x-4">
                      <label htmlFor="" className={'flex-1'}>
                        Freq
                      </label>
                      <input type="number"
                             className={`h-8 rounded-lg text-black px-4 ml-auto`}
                             value={freq}
                             onChange={(e) => setFreq(parseInt(e.target.value))}
                      />
                    </div>

                    <button onClick={() => toggleDanger()}
                            className={`px-4 py-2 rounded-full bg-${!danger ? 'red' : 'green'}-500 text-white`}
                    >
                      {!danger ? 'Start an Earthquake' : 'Reset'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8"></div>
            <div>
              {/*  Table to represent theoretical stats*/}
              {/*  Cells include number of affected people in a region, responded ok, responded no */}
              {/*  using the points variable*/}
              <div className="h-screen overflow-y-scroll">
                <h3 className="text-gray-700 text-3xl font-medium">Stats</h3>
                <table className="min-w-full mt-4">
                  <thead>
                  <tr>
                    <th className="text-left text-gray-600">Region</th>
                    <th className="text-left text-gray-600">Affected</th>
                    <th className="text-left text-gray-600">Responded Ok</th>
                    <th className="text-left text-gray-600">Responded Danger</th>
                    <th className="text-left text-gray-600">Ok Percentage</th>
                    <th className="text-left text-gray-600">Status</th>
                  </tr>
                  </thead>
                  <tbody className="mt-4">
                  {points
                    .map((point, i) => ({point, index: i}))
                    .slice(0, currentCount)
                    .toSorted(({point: point1}, {point: point2}) => point1.ok.no > point2.ok.no ? -1 : 1)
                    .map(({point, index}, i) => (
                      // interpolate the background color between greed and red based on the percentage of people who responded ok
                      <tr key={i}
                          style={{
                            backgroundColor: `rgba(255, 0, 0, ${(currentCount - i) / currentCount})`
                          }}>
                        <td className="border-t">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                            </div>
                          </div>
                        </td>
                        <td className="border-t">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap">{point.ok.yes + point.ok.no}</p>
                            </div>
                          </div>
                        </td>
                        <td className="border-t">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap">{point.ok.yes}</p>
                            </div>
                          </div>
                        </td>
                        <td className="border-t">
                          <div className="flex items-center">
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap">{point.ok.no}</p>
                            </div>
                          </div>
                        </td>
                        <td className="border-t">
                          <div className="flex items-center">
                            <div>
                              <p
                                className="text-gray-900 whitespace-no-wrap">{(point.ok.yes / (point.ok.no + point.ok.yes) * 100).toFixed(2)}%</p>
                            </div>
                          </div>
                        </td>
                        <td className="border-t">
                          <div className="flex items-center">
                            <div>
                              <p
                                className="text-gray-900 whitespace-no-wrap">{point.ok.yes / (point.ok.no + point.ok.yes) > 0.5 ? 'OK' : 'Danger'}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
