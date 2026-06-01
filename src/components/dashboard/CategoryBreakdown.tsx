import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card } from '../ui/Card'

interface CategoryBreakdownProps {
  data: { name: string; value: number; fill: string }[]
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  return (
    <Card
      title="Monitoring Sites"
      subtitle="Live Open-Meteo stations by category"
      className="min-h-[320px]"
    >
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 8,
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <ul className="mt-2 grid grid-cols-2 gap-2">
        {data.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-2 text-xs text-slate-400"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: item.fill }}
            />
            {item.name} ({item.value})
          </li>
        ))}
      </ul>
    </Card>
  )
}
