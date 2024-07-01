import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import useStats from '../../../Hooks/useStats';
import Loading from '../../../Compnents/Loading';

const COLORS = ['#8884d8', '#82ca9d'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



const AdminHome = () => {
    const [stats, statsLoading] = useStats();
    if(statsLoading){
        return <Loading />
    }

    const {
        totalBio,
        maleBio,
        femaleBio,
        premiumUser,
        normalUser,
        totalRevenue
    } = stats;

    const genderData = [
        { name: 'Male', value: maleBio },
        { name: 'Female', value: femaleBio },
    ];

    const userTypeData = [
        { name: 'Premium', value: premiumUser },
        { name: 'Normal', value: normalUser },
    ];



    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
            <div className="grid md:grid-cols-2 gap-6">
                {/* Gender Pie Chart */}
                <div className="bg-white text-black p-4 rounded shadow">
                    <h2 className="text-2xl font-bold mb-4">Male Female Count</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={genderData}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={renderCustomizedLabel}
                                outerRadius={"80%"}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {genderData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* User Type Pie Chart */}
                <div className="bg-white text-black p-4 rounded shadow">
                    <h2 className="text-2xl font-bold mb-4">Premium User</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={userTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={"80%"}
                                fill="#82ca9d"
                                dataKey="value"
                            >
                                {userTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Total Counts */}
                <div className="bg-white text-black p-4 rounded shadow text-xl">
                    <h2 className="text-2xl font-bold mb-4">Summary</h2>
                    <p>Total Revenue: <span className='text-green-600 font-bold'> ${totalRevenue} </span></p>
                    <p><span className='text-rose-600'>Total</span> Biodata Count: <span className='font-semibold'>{totalBio}</span></p>
                    <p><span className='text-rose-600'>Male</span> Biodata Count:<span className='font-semibold'> {maleBio}</span> </p>
                    <p><span className='text-rose-600'>Female</span> Biodata Count:<span className='font-semibold'> {femaleBio}</span> </p>
                    <p><span className='text-rose-600'>Premium</span> Biodata Count:<span className='font-semibold'>  {premiumUser}</span> </p>
                    
                </div>
            </div>
        </div>
    );
};

export default AdminHome;