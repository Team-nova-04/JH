import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const MetricCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  color = "from-[#8D153A] to-[#00534E]",
  iconBg = "from-[#8D153A] to-[#A52D5A]",
}) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getTrendColor = () => {
    if (!trend) return "text-gray-600";
    if (trend > 0) return "text-green-600";
    if (trend < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`bg-gradient-to-br ${iconBg} p-3 rounded-2xl shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend !== undefined && (
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={`text-sm font-bold ${getTrendColor()}`}>
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
          </div>
        )}
      </div>
      <p className="mb-2 text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-semibold text-gray-600">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      <div className="w-full h-2 mt-3 rounded-full bg-white/60">
        <div
          className={`bg-gradient-to-r ${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default MetricCard;
