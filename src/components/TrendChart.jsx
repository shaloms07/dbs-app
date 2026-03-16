import PropTypes from 'prop-types';
import { BarChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getBand } from '@constants/scoreBands';

export default function TrendChart({ data, activeMonth }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center bg-neutral-50 rounded-lg">
        <p className="text-sm text-neutral-600">No data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: '#9aa5b8' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
          }}
          labelStyle={{ color: '#fff', fontSize: '12px' }}
          formatter={(value) => [`${value}`, 'Score']}
          cursor={{ fill: 'rgba(2, 132, 199, 0.1)' }}
        />
        <Bar dataKey="score" fill="#0284c7" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => {
            const band = getBand(entry.score);
            const isActive = activeMonth && entry.month === activeMonth;
            return (
              <Cell
                key={`cell-${index}`}
                fill={band.color}
                opacity={isActive ? 1 : 0.7}
                strokeWidth={isActive ? 2 : 0}
                stroke={band.color}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

TrendChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
  activeMonth: PropTypes.string,
};
