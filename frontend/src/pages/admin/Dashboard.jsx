import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FiUsers, FiMap, FiBriefcase, FiDollarSign, FiTarget,
  FiTrendingUp, FiUserCheck, FiHome, FiAlertCircle, FiClock,
} from 'react-icons/fi';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Link } from 'react-router-dom';
import StatCard from '@components/ui/StatCard';
import Card from '@components/ui/Card';
import Badge, { StatusBadge } from '@components/ui/Badge';
import { SkeletonCard } from '@components/ui/Loading';
import api from '@services/api';
import useAuth from '@hooks/useAuth';

// ── Mock data until real API is connected ─────────────────────────────────────
const MOCK_STATS = {
  totalCustomers:   1248,
  totalLeads:       342,
  totalBookings:    89,
  totalRevenue:     48500000,
  pendingPayment:   8200000,
  availablePlots:   156,
  bookedPlots:      94,
  activeAssociates: 23,
  todaySales:       3,
  weekSales:        18,
  monthSales:       89,
  leadConversion:   26,
};

const REVENUE_DATA = [
  { month: 'Jan', revenue: 3200000, target: 4000000 },
  { month: 'Feb', revenue: 4100000, target: 4000000 },
  { month: 'Mar', revenue: 3800000, target: 4500000 },
  { month: 'Apr', revenue: 5200000, target: 4500000 },
  { month: 'May', revenue: 4800000, target: 5000000 },
  { month: 'Jun', revenue: 6100000, target: 5000000 },
  { month: 'Jul', revenue: 5900000, target: 5500000 },
  { month: 'Aug', revenue: 7200000, target: 6000000 },
];

const LEAD_STAGE_DATA = [
  { name: 'New',         value: 45, color: '#3B82F6' },
  { name: 'Interested',  value: 32, color: '#8B5CF6' },
  { name: 'Site Visit',  value: 28, color: '#F59E0B' },
  { name: 'Negotiation', value: 19, color: '#EF4444' },
  { name: 'Booked',      value: 89, color: '#10B981' },
  { name: 'Lost',        value: 21, color: '#9CA3AF' },
];

const TOP_ASSOCIATES = [
  { name: 'Rajesh Kumar',   sales: 12, revenue: 6800000, commission: 170000 },
  { name: 'Priya Sharma',   sales: 9,  revenue: 5100000, commission: 127500 },
  { name: 'Amit Verma',     sales: 8,  revenue: 4600000, commission: 115000 },
  { name: 'Sunita Singh',   sales: 7,  revenue: 4000000, commission: 100000 },
  { name: 'Deepak Gupta',   sales: 6,  revenue: 3400000, commission: 85000 },
];

const RECENT_BOOKINGS = [
  { id: 'BKG001', customer: 'Rahul Mehta',   plot: 'A-12', project: 'Proptix', amount: 1250000, status: 'CONFIRMED', date: '2026-08-10' },
  { id: 'BKG002', customer: 'Sneha Patil',   plot: 'B-05', project: 'Sky Garden Phase 2', amount: 800000, status: 'PENDING', date: '2026-08-09' },
  { id: 'BKG003', customer: 'Vivek Pandey',  plot: 'C-22', project: 'Proptix', amount: 1580000, status: 'CONFIRMED', date: '2026-08-08' },
  { id: 'BKG004', customer: 'Anita Joshi',   plot: 'A-31', project: 'Palm City',    amount: 870000,  status: 'CANCELLED', date: '2026-08-07' },
  { id: 'BKG005', customer: 'Suresh Yadav',  plot: 'D-08', project: 'Sky Garden',   amount: 1420000, status: 'CONFIRMED', date: '2026-08-06' },
];

const formatCr = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
  if (val >= 100000)   return `₹${(val / 100000).toFixed(1)}L`;
  return `₹${val.toLocaleString('en-IN')}`;
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
};

// ── Custom Tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(6,78,59,0.1)', borderRadius: '10px', padding: '10px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: '#0F1923', marginBottom: '4px' }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ fontSize: '0.8125rem', color: entry.color, fontWeight: 600 }}>
          {entry.name}: {formatCr(entry.value)}
        </p>
      ))}
    </div>
  );
};

// ── Dashboard Component ───────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { user } = useAuth();

  const statCards = [
    { title: 'Total Revenue',     value: formatCr(MOCK_STATS.totalRevenue),  icon: <FiDollarSign />, color: 'primary', change: 18 },
    { title: 'Total Customers',   value: MOCK_STATS.totalCustomers,           icon: <FiUsers />,      color: 'info',    change: 12 },
    { title: 'Active Leads',      value: MOCK_STATS.totalLeads,               icon: <FiTarget />,     color: 'warning', change: 8 },
    { title: 'Total Bookings',    value: MOCK_STATS.totalBookings,            icon: <FiBriefcase />,  color: 'success', change: 24 },
    { title: 'Pending Payment',   value: formatCr(MOCK_STATS.pendingPayment), icon: <FiAlertCircle />,color: 'danger',  change: -5 },
    { title: 'Available Plots',   value: MOCK_STATS.availablePlots,           icon: <FiMap />,        color: 'accent',  change: -8 },
    { title: 'Active Associates', value: MOCK_STATS.activeAssociates,         icon: <FiUserCheck />,  color: 'primary', change: 15 },
    { title: 'Lead Conversion',   value: `${MOCK_STATS.leadConversion}%`,     icon: <FiTrendingUp />, color: 'success', change: 4 },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — Proptix</title>
      </Helmet>

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, #064E3B 0%, #059669 60%, #047857 100%)',
          borderRadius: '16px', padding: '1.5rem 2rem', marginBottom: '1.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          overflow: 'hidden', position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)' }} />
        <div style={{ position: 'absolute', right: '80px', bottom: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#fff', marginBottom: '0.25rem' }}>
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem' }}>
            You have <strong style={{ color: '#D4AF37' }}>3 bookings</strong> and <strong style={{ color: '#D4AF37' }}>12 follow-ups</strong> today.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
          {[
            { label: "Today's Sales", value: MOCK_STATS.todaySales,  icon: '📅' },
            { label: 'This Week',     value: MOCK_STATS.weekSales,   icon: '📊' },
            { label: 'This Month',    value: MOCK_STATS.monthSales,  icon: '📈' },
          ].map((s) => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.12)', borderRadius: '12px', padding: '0.875rem 1.25rem',
              textAlign: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)',
              minWidth: '90px',
            }}>
              <div style={{ fontSize: '1.375rem', marginBottom: '0.25rem' }}>{s.icon}</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#fff', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* KPI Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        {statCards.map((card, i) => (
          <motion.div key={card.title} custom={i} initial="hidden" animate="visible" variants={CARD_VARIANTS}>
            <StatCard
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              change={card.change}
            />
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem', marginBottom: '1.75rem' }}>
        {/* Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card padding="md">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.0625rem', color: '#0F1923' }}>Revenue Overview</h3>
                <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginTop: '0.125rem' }}>Monthly revenue vs target</p>
              </div>
              <div style={{ background: '#ECFDF5', borderRadius: '8px', padding: '0.375rem 0.875rem' }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.8125rem', color: '#064E3B' }}>2026</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#064E3B" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#064E3B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(6,78,59,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF', fontFamily: 'Manrope' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="target"  name="Target"  stroke="#D4AF37" strokeWidth={2} fill="url(#targetGrad)"  strokeDasharray="5 5" />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#064E3B" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ fill: '#064E3B', r: 4 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Lead Pipeline Pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card padding="md">
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.0625rem', color: '#0F1923' }}>Lead Pipeline</h3>
              <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginTop: '0.125rem' }}>Stage distribution</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={LEAD_STAGE_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                  paddingAngle={3} dataKey="value">
                  {LEAD_STAGE_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val, name) => [val, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginTop: '0.75rem' }}>
              {LEAD_STAGE_DATA.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ color: '#374151' }}>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#0F1923' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1.25rem' }}>
        {/* Recent Bookings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card padding="none">
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(6,78,59,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.0625rem', color: '#0F1923' }}>Recent Bookings</h3>
                <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginTop: '0.125rem' }}>Latest 5 bookings</p>
              </div>
              <Link to="/admin/bookings" style={{ fontSize: '0.875rem', color: '#064E3B', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
            </div>
            <div className="table-container" style={{ border: 'none', borderRadius: 0, boxShadow: 'none' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Plot</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_BOOKINGS.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: '#0F1923' }}>{b.customer}</div>
                        <div style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>{b.project}</div>
                      </td>
                      <td><span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: '#064E3B' }}>{b.plot}</span></td>
                      <td><span style={{ fontWeight: 700, color: '#0F1923' }}>{formatCr(b.amount)}</span></td>
                      <td><StatusBadge status={b.status} /></td>
                      <td style={{ color: '#9CA3AF', fontSize: '0.8125rem' }}>{b.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Top Associates */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Card padding="none">
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(6,78,59,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.0625rem', color: '#0F1923' }}>Top Associates</h3>
                <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginTop: '0.125rem' }}>By revenue this month</p>
              </div>
              <Link to="/admin/associates" style={{ fontSize: '0.875rem', color: '#064E3B', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
            </div>
            <div style={{ padding: '0.75rem 1.5rem' }}>
              {TOP_ASSOCIATES.map((a, i) => (
                <div key={a.name} style={{
                  display: 'flex', alignItems: 'center', gap: '0.875rem',
                  padding: '0.875rem 0', borderBottom: i < TOP_ASSOCIATES.length - 1 ? '1px solid rgba(6,78,59,0.05)' : 'none',
                }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                    background: i === 0 ? 'linear-gradient(135deg, #D4AF37, #F5E6A3)' : 'linear-gradient(135deg, #064E3B, #059669)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '0.875rem',
                    color: i === 0 ? '#0F1923' : '#fff',
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0F1923', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>{a.sales} sales • {formatCr(a.commission)} commission</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#064E3B' }}>{formatCr(a.revenue)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AdminDashboard;
