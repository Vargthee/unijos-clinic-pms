
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Activity, TrendingUp, Users } from "lucide-react";

const appointmentData = [
  { day: "Mon", appointments: 12 },
  { day: "Tue", appointments: 19 },
  { day: "Wed", appointments: 15 },
  { day: "Thu", appointments: 22 },
  { day: "Fri", appointments: 18 },
  { day: "Sat", appointments: 8 },
  { day: "Sun", appointments: 5 },
];

const departmentData = [
  { name: "General Medicine", patients: 45, color: "hsl(var(--primary))" },
  { name: "Pediatrics", patients: 32, color: "hsl(var(--medical-green))" },
  { name: "Cardiology", patients: 28, color: "hsl(158 64% 45%)" },
  { name: "Orthopedics", patients: 21, color: "hsl(25 95% 53%)" },
  { name: "Dermatology", patients: 18, color: "hsl(250 84% 54%)" },
];

const monthlyTrend = [
  { month: "Jan", patients: 95 },
  { month: "Feb", patients: 108 },
  { month: "Mar", patients: 125 },
  { month: "Apr", patients: 118 },
  { month: "May", patients: 142 },
  { month: "Jun", patients: 138 },
];

const chartConfig = {
  appointments: {
    label: "Appointments",
    color: "hsl(var(--primary))",
  },
  patients: {
    label: "Patients",
    color: "hsl(var(--primary))",
  },
};

export const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Weekly Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="appointments" fill="var(--color-appointments)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="border border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Department Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="patients"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 border border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Monthly Patient Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="var(--color-patients)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--color-patients)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
