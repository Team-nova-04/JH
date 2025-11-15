const DataTable = ({
  title,
  icon: Icon,
  columns,
  data,
  emptyMessage = "No data available",
}) => {
  return (
    <div className="p-6 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
      <h3 className="flex items-center mb-6 text-2xl font-bold text-gray-800">
        {Icon && <Icon className="h-6 w-6 mr-3 text-[#8D153A]" />}
        {title}
      </h3>

      {data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-white/60">
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`pb-3 text-left text-sm font-bold text-gray-700 ${
                      column.className || ""
                    }`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-white/40 hover:bg-white/40 transition-colors duration-200"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-4 ${column.className || ""}`}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
      )}
    </div>
  );
};

export default DataTable;
