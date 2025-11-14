// components/StatCard.js - Enhanced with modern design
const StatCard = ({ title, value, icon: Icon, color = 'primary', trend = null, description = null }) => {
  const colorClasses = {
    primary: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-700',
    green: 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 text-green-700',
    red: 'bg-gradient-to-br from-red-50 to-rose-100 border-red-200 text-red-700',
    yellow: 'bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200 text-yellow-700',
    purple: 'bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 text-purple-700',
  };

  const iconBgClasses = {
    primary: 'bg-gradient-to-br from-blue-500 to-blue-600',
    green: 'bg-gradient-to-br from-green-500 to-emerald-600',
    red: 'bg-gradient-to-br from-red-500 to-rose-600',
    yellow: 'bg-gradient-to-br from-yellow-500 to-amber-600',
    purple: 'bg-gradient-to-br from-purple-500 to-violet-600',
  };

  return (
    <div className={`rounded-2xl border-2 ${colorClasses[color]} p-6 shadow-sm hover:shadow-md transition-all duration-300 group`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold opacity-80 mb-1">{title}</p>
          <p className="text-3xl font-bold mb-2">{value}</p>
          {description && (
            <p className="text-sm opacity-75">{description}</p>
          )}
          {trend !== null && (
            <p className={`text-sm font-semibold mt-2 flex items-center space-x-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend > 0 ? '↗' : '↘'}</span>
              <span>{Math.abs(trend)}%</span>
              <span className="text-xs opacity-75">from last week</span>
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-4 rounded-xl ${iconBgClasses[color]} text-white group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;