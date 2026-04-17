"use client";

import React from "react";
import { Bar, BarChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "./ui/button";
export const description = "A stacked bar chart with a legend";
export const iframeHeight = "600px";
export const containerClassName =
  "[&>div]:w-full [&>div]:max-w-md flex items-center justify-center min-h-svh";

const chartConfig = {};

const ProgressChart = ({ tasks }) => {

  const [activeButton, setActiveButton] = React.useState(null);


  const chartData = tasks.map((t) => ({
    date: new Date(t.created_at),
    name: t.name,
    duration: t.duration / 1000,
    category : t.tag ,

  }));


  // const arrayOfTasksObjectsFlattenedByDate = chartData.reduce((acc, task) => {
  //   const dateKey = task.date.toISOString().split("T")[0];
  //   let dateEntry = acc.find((entry) => entry.date === dateKey);
  //   if (!dateEntry) {
  //     dateEntry = { date: dateKey };
  //     acc.push(dateEntry);
  //   }
  //   dateEntry[task.name] = (dateEntry[task.name] || 0) + task.duration;
  //   return acc;
  // }, []);

  // console.log(arrayOfTasksObjectsFlattenedByDate, "======> tasksGroupByDate");

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const initializedDataForNameBased = days.map((day) => ({
    date: day,
    dayTasks: [],
    dayTasksDuration: [],
    total: 0,
  }));

  for (const task of chartData) {
    const dayIndex = new Date(task.date).getDay();
    const dayName = days[dayIndex];
    const target = initializedDataForNameBased.find((d) => d.date === dayName);
    if (target) {
      target.total += task.duration;
      target.dayTasks.push(task);
      target.dayTasksDuration.push(task.duration);
    }
  }
const initializedDataForCategoryBased = days.map((day) => ({
    date: day,
    dayCategories: [],
    dayCategoriesDuration: [],
  }));

  for (const task of chartData) {
    const dayIndex = new Date(task.date).getDay();
    const dayName = days[dayIndex];
    const target = initializedDataForCategoryBased.find((d) => d.date === dayName);
    
    if (target) {
        const cat = task.category ;
        if(!target.dayCategories.find((c) => c === cat)) {
            target.dayCategories.push(cat);
            target.dayCategoriesDuration.push(task.duration);
        } else {
            const existingCatIndex = target.dayCategories.findIndex((c) => c.name === cat.name);
            target.dayCategoriesDuration[existingCatIndex] += task.duration;
        }
    }
  }


console.log(initializedDataForCategoryBased, "====> initializedDataForCategoryBased");


  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 60%)`;
  };


  const makeChartBasedOnCategories = () => {
    setActiveButton("category");

  }
  const makeChartBasedOnNames = () => {
    setActiveButton("name");

  }

  return (
    <div>
      <Button onClick={() => {
        makeChartBasedOnCategories();
      }} className="m-4 p-2 bg-violet-100 hover:bg-violet-200 text-black mx-auto">Progress Chart - Based on categories</Button>

      <Button onClick={() => {
        makeChartBasedOnNames();
      }} className="m-4  p-2 bg-violet-100 hover:bg-violet-200 text-black mx-auto">Progress Chart - Based on names</Button>

      {(!tasks || tasks.length === 0) && <div>Loading...</div>}
      {activeButton === "name" && <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Progress chart - Based on task name</CardTitle>
          
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={initializedDataForNameBased}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />

              {initializedDataForNameBased.map((data) => {
                const taskNames = data.dayTasks.map((task) => task.name);
                return taskNames.map((taskName) => (
                  <Bar
                    key={`${data.date}-${taskName}`}
                    dataKey={(entry) => {
                      const task = entry.dayTasks.find((t) => t.name === taskName);
                      return task ? task.duration : 0;
                    }}
                    stackId="a"
                    fill={getRandomColor()}
                    radius={[0, 0, 4, 4]}
                  > 
                  
                  </Bar>
                  
                ));
              })}

              {/* {arrayOfTasksObjectsFlattenedByDate.map((task) => {
                const removeDateFromTask = { ...task };
                delete removeDateFromTask.date;
                const taskNames = Object.keys(removeDateFromTask);
                return taskNames.map((taskName) => (
                  <Bar
                    key={taskName}
                    dataKey={taskName}
                    stackId="a"
                    fill={getRandomColor()}
                    radius={[0, 0, 4, 4]}
                  />
                ));
                
              })} */}

              {/* <Bar
                dataKey="value"
                stackId="a"
                fill={getRandomColor()}
                radius={[4, 4, 0, 0]}
              /> */}
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={false}
                defaultIndex={1}
              />

              
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>}

      {activeButton === "category" && <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Progress chart - Based on task category</CardTitle>
          
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={initializedDataForCategoryBased}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />

              {initializedDataForCategoryBased.map((data) => {
                
                console.log(data.dayCategories, "====> categoryName");
                console.log(data.dayCategoriesDuration, "====> categoryDDDD");



                return data.dayCategories.map((categoryName) => (
                  <Bar
                    key={`${data.date}-${categoryName}`}
                    dataKey={(entry) => {
                      const index = entry.dayCategories.findIndex((t) => t  === categoryName);
                      console.log(index, "====> index of category in dayCategories");
                      return index !== -1 ? entry.dayCategoriesDuration[index] : 0;
                    }}
                    stackId="a"
                    fill={getRandomColor()}
                    radius={[0, 0, 4, 4]}
                  > 

                  
                  </Bar>
                  
                ));
              })}
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={false}
                defaultIndex={1}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>}


      
    </div>
  );
};

export default ProgressChart;
