import { useState } from 'react';
import './DashBoard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// export const Data = [
//   {
//     id: 1,
//     year: 2016,
//     userGain: 80000,
//     userLost: 823,
//   },
//   {
//     id: 2,
//     year: 2017,
//     userGain: 45677,
//     userLost: 345,
//   },
//   {
//     id: 3,
//     year: 2018,
//     userGain: 78888,
//     userLost: 555,
//   },
//   {
//     id: 4,
//     year: 2019,
//     userGain: 90000,
//     userLost: 4555,
//   },
//   {
//     id: 5,
//     year: 2020,
//     userGain: 4300,
//     userLost: 234,
//   },
// ];
function DashBoard() {
  // const [chartData, setChartData] = useState({
  //   labels: Data.map((data) => data.year),
  //   datasets: [
  //     {
  //       label: 'Users Gained ',
  //       data: Data.map((data) => data.userGain),
  //       backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
  //       borderColor: 'black',
  //       borderWidth: 2,
  //     },
  //   ],
  // });
  return (
    // <div className="w-2/3 h-2/3">
    //   <LineChart chartData={chartData} />
    // </div>

    // <div className="flex-1 flex ">
    //   <div className="flex-1 flex justify-center mt-16 ">Hello Admin</div>
    // </div>

    <header className="mb-16 group flex-1 flex-col mt-32">
      <div className="flex justify-center">
        <h1 className="mb-2 font-mono text-4xl text-gray-700 md:text-6xl">
          Hi, Welcome <br className="block md:hidden" />
          <span className="relative">
            <span className="h-20 pt-2 overflow-x-hidden whitespace-nowrap text-brand-accent">
              Admin <span className="text-3xl md:text-5xl">👋</span>
            </span>
            <span className="{`${styles.cursor} absolute -bottom-0 left-0 -top-1 inline-block bg-white w-full animate-type will-change`}"></span>
          </span>
        </h1>
      </div>

      <div className="flex text-xl font-semibold md:text-3xl justify-center">- Furniture Online Store -</div>
    </header>
    // <h1 className="mb-2 font-mono text-4xl text-gray-700 md:text-6xl">
    //   Hi, Welcome <br className="block md:hidden" />
    //   <span className="relative">
    //     <span className="h-20 pt-2 overflow-x-hidden whitespace-nowrap text-brand-accent">
    //       Admin <span className="text-3xl md:text-5xl">👋</span>
    //     </span>
    //     <span className="{`${styles.cursor} absolute -bottom-0 left-0 -top-1 inline-block bg-white w-full animate-type will-change`}"></span>
    //   </span>
    // </h1>
  );
}
// function LineChart({ chartData }) {
//   return (
//     <div className="chart-container">
//       <h2 style={{ textAlign: 'center' }}>Line Chart</h2>
//       <Line
//         data={chartData}
//         options={{
//           plugins: {
//             title: {
//               display: true,
//               text: 'Users Gained between 2016-2020',
//             },
//             legend: {
//               display: false,
//             },
//           },
//         }}
//       />
//     </div>
//   );
// }
export default DashBoard;
