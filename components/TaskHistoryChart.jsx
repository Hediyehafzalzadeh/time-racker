"use client";

import React, { useEffect, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#4285F4",
  },
  safari: {
    label: "Safari",
    color: "#FFCC00",
  },
  firefox: {
    label: "Firefox",
    color: "#FF6600",
  },
  edge: {
    label: "Edge",
    color: "#00CCFF",
  },
  other: {
    label: "Other",
    color: "#9b2626",
  },
};
import { convertToRealFormat } from "./Logger";
const TaskHistoryChart = ({ taskHistory }) => {
  const [historyData, setHistoryData] = React.useState([]);

  useEffect(() => {
    if (taskHistory && taskHistory.length > 0) {
      setHistoryData(taskHistory);
    }
  }, [taskHistory]);

  const generateColors = (count) => {
    return Array.from({ length: count }, (_, i) => {
      const hue = Math.floor((360 / count) * i);
      return `hsl(${hue}, 70%, 60%)`;
    });
  };

  const colors = useMemo(
    () => generateColors(historyData.length),
    [historyData],
  );

  return (
    <div className="flex flex-col">
      <Card className="flex flex-col mt-10 mx-auto w-full max-w-3/4">
        <CardHeader className="items-center pb-0">
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={historyData} dataKey="duration" nameKey="name">
                {historyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskHistoryChart;
