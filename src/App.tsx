import { Rocket, ShieldCheck, CreditCard } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
        <div className="flex justify-center">
          <div className="p-3 bg-blue-50 rounded-full">
            <Rocket className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">ADSS Platform</h1>
          <p className="text-gray-500">Project Initialized & Ready for Development</p>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-700">React 19 + TypeScript 5</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-5 h-5 bg-blue-400 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">T4</div>
            <span className="text-sm font-medium text-gray-700">Tailwind CSS 4 Configured</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <CreditCard className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-700">Dependencies Installed (tRPC, Wouter)</span>
          </div>
        </div>

        <button
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 active:scale-[0.98]"
          onClick={() => alert('Frontend Ready!')}
        >
          Explore Dashboard
        </button>
      </div>

      <p className="mt-8 text-sm text-gray-400">
        Association Disciples Shaolin Si Sénégal
      </p>
    </div>
  )
}

export default App
