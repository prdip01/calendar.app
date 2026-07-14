import React, { useState, useEffect } from 'react'
import { Shield, Lock, LayoutDashboard, Mail, Phone, Calendar, Trash2, CheckCircle2, AlertCircle } from 'lucide-react'

// Dummy seed orders if localStorage is empty
const SEED_ORDERS = [
  {
    id: 'ord-101',
    name: 'Rohit Sharma',
    email: 'rohit.sharma@startup.in',
    phone: '+91 98765 43210',
    budget: '5k-10k',
    message: 'Hi Nexroythm, I would like to get started with the "Growth Website" package (₹5,000) for my fintech SaaS.',
    status: 'In Progress',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString(),
  },
  {
    id: 'ord-102',
    name: 'Vikram Roy',
    email: 'vikram.designer@gmail.com',
    phone: '+91 99887 76655',
    budget: 'custom',
    message: 'Hi Nexroythm, I would like to get started with the "Digital Gift Site" package (From ₹1,000) to design a premium greeting letter for my wife.',
    status: 'New',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleString(),
  },
]

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('All')

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('nexroythm_orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    } else {
      localStorage.setItem('nexroythm_orders', JSON.stringify(SEED_ORDERS))
      setOrders(SEED_ORDERS)
    }
  }, [])

  // Check login state on mount
  useEffect(() => {
    const loggedIn = sessionStorage.getItem('nexroythm_admin_logged')
    if (loggedIn === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple password validation
    if (password === 'prdip@2026') {
      setIsAuthenticated(true)
      sessionStorage.setItem('nexroythm_admin_logged', 'true')
      setError('')
    } else {
      setError('Invalid admin credentials. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('nexroythm_admin_logged')
  }

  const updateStatus = (id, newStatus) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    setOrders(updated)
    localStorage.setItem('nexroythm_orders', JSON.stringify(updated))
  }

  const deleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      const filtered = orders.filter((o) => o.id !== id)
      setOrders(filtered)
      localStorage.setItem('nexroythm_orders', JSON.stringify(filtered))
    }
  }

  const filteredOrders = orders.filter((o) => filter === 'All' || o.status === filter)

  // Compute metrics
  const totalSubmissions = orders.length
  const pendingOrders = orders.filter((o) => o.status === 'New').length
  const inProgressOrders = orders.filter((o) => o.status === 'In Progress').length
  const completedOrders = orders.filter((o) => o.status === 'Completed').length

  // Render Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8 bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Admin Dashboard</h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter password to access client orders and metrics.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="Password"
                />
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Render Dashboard
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Admin Cockpit</h1>
              <p className="text-sm text-slate-500 mt-0.5">Nexroythm lead submissions and analytics dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs transition active:scale-95"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <span className="text-xs font-semibold text-slate-500 tracking-wider block">TOTAL LEADS</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{totalSubmissions}</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <span className="text-xs font-semibold text-amber-500 tracking-wider block">NEW LEADS</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{pendingOrders}</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <span className="text-xs font-semibold text-indigo-500 tracking-wider block">IN PROGRESS</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{inProgressOrders}</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <span className="text-xs font-semibold text-emerald-500 tracking-wider block">COMPLETED</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">{completedOrders}</div>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap gap-2 justify-start items-center">
          <span className="text-xs font-semibold text-slate-500 mr-2 uppercase tracking-widest">Filter status:</span>
          {['All', 'New', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                filter === status
                  ? 'bg-indigo-500 text-white border-transparent'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
              <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="font-semibold text-lg">No lead orders found</p>
              <p className="text-sm mt-1">Submissions matching "{filter}" will be listed here.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">{order.name}</h3>
                      <span className="text-xs font-mono text-slate-400">ID: {order.id}</span>
                      <span className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                        Budget: {order.budget === 'custom' ? 'Custom Quote' : `₹${order.budget.replace('k', ',000')}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Submitted: {order.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`text-xs font-bold border rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        order.status === 'New'
                          ? 'bg-amber-50 text-amber-600 border-amber-200'
                          : order.status === 'In Progress'
                          ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Delete Order"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

                {/* Client Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                    <a href={`mailto:${order.email}`} className="hover:underline hover:text-indigo-600 break-all">{order.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                    <a href={`tel:${order.phone}`} className="hover:underline hover:text-indigo-600">{order.phone}</a>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Client Request:</span>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    {order.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
