
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Recycle, DollarSign, TrendingUp, Droplet, Box, Trash2, Layers, FileCheck, AlertTriangle, Gift } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import Header from "@/components/ui/Header"
import Footer from "@/components/ui/Footer"
import { motion } from "framer-motion"

const recycleRules = [
  {
    title: "Sort and Separate",
    description: "Separate recyclables by material type: paper, plastic, glass, and metal. This ensures efficient processing and reduces contamination.",
    icon: Layers
  },
  {
    title: "Clean Before Recycling",
    description: "Rinse containers and remove food residue. Clean items are more likely to be recycled and prevent contamination of other recyclables.",
    icon: Droplet
  },
  {
    title: "Remove Non-Recyclables",
    description: "Take off caps, lids, and non-recyclable parts from bottles and containers. These items often have different recycling processes.",
    icon: Trash2
  },
  {
    title: "Flatten and Compact",
    description: "Flatten cardboard boxes and crush plastic bottles. This saves space in recycling bins and during transportation.",
    icon: Box
  },
  {
    title: "Avoid Bagging Recyclables",
    description: "Don't put recyclables in plastic bags. Most facilities can't process bagged items, and they may end up in landfills.",
    icon: AlertTriangle
  },
  {
    title: "Check Local Guidelines",
    description: "Familiarize yourself with your local recycling program's rules. Acceptable items can vary by location.",
    icon: FileCheck
  },
  {
    title: "Recycle Electronics Properly",
    description: "Don't throw electronics in regular recycling. Use designated e-waste recycling programs for proper disposal.",
    icon: Recycle
  },
  {
    title: "Avoid Wishcycling",
    description: "Don't recycle items you're unsure about. Wishcycling can contaminate entire batches of recyclables.",
    icon: AlertTriangle
  },
  {
    title: "Donate Instead of Discarding", 
    description: "Donate items in good condition that are no longer useful to you, such as clothes, furniture, and electronics. This reduces waste and benefits others.",
    icon: Gift 
  }
]

const recyclingData = [
  { year: 2018, amount: 1250 },
  { year: 2019, amount: 2300 },
  { year: 2020, amount: 5280 },
  { year: 2021, amount: 8350 },
  { year: 2022, amount: 7400 },
  { year: 2023, amount: 6800 },
  { year: 2024, amount: 10300 },
]

const economicImpactData = [
  { year: 2018, impact: 2.5 },
  { year: 2019, impact: 3.0 },
  { year: 2020, impact: 2.8 },
  { year: 2021, impact: 3.5 },
  { year: 2022, impact: 4.0 },
  { year: 2023, impact: 3.7 },
  { year: 2024, impact: 4.2 },
]

function getGradientColor(index: number) {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-teal-500',
    'from-yellow-500 to-orange-500',
    'from-red-500 to-pink-500',
    'from-indigo-500 to-purple-500',
    'from-emerald-500 to-lime-500',
    'from-rose-500 to-amber-500',
    'from-violet-500 to-fuchsia-500',
  ];
  return colors[index % colors.length];
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Recycle Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recycleRules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl hover:-translate-y-5 transition-all duration-300 overflow-hidden bg-gray-800 border-none">
                  <div className={cn("h-2 bg-gradient-to-r", getGradientColor(index))}></div>
                  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    <div className={cn("w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center", getGradientColor(index))}>
                      {rule.icon && <rule.icon className="h-6 w-6 text-white" />}
                    </div>
                    <CardTitle className="text-xl font-semibold text-white">{rule.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">{rule.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16 text-center"
        >
          <Button size="lg" className="text-2xl px-12 py-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">
            Request Pickup
          </Button>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Recycling Statistics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl  transition-all duration-300 bg-gray-800 border-none">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-2xl font-semibold text-white">Recycling Over Time (kg)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={recyclingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="year" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <RechartsTooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#E5E7EB' }} />
                    <Legend />
                    <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 bg-gray-800 border-none">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="w-12 h-12 rounded-full bg-green-900 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-2xl font-semibold text-white">Economic Impact (Billion USD)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={economicImpactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="year" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <RechartsTooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#E5E7EB' }} />
                    <Legend />
                    <Bar dataKey="impact" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}

