"use client";

import {  getTasksInWeek } from "@/app/actions";
import ProgressChart from "@/components/ProgressChart";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";


const page =  () => {
    const [taskData, setTaskData] = React.useState([]);


    useEffect(() => {
        const fetchTasks = async () => {
            const Data = await getTasksInWeek();
            setTaskData(Data);
        };
        fetchTasks();
        
    }, []);
      
  return (
    <>
      <header className="flex flex-row justify-end mt-5">
        <Button
          variant="ghost"
          size="lg"
          className="bg-violet-200 hover:bg-violet-300 mr-5 "
          onClick={() => window.history.back()}
        >
          Back to Logger{" "}
        </Button>
      </header>

      <div className=" m-10 ">
        <ProgressChart tasks={taskData} />
        
      </div>
    </>
  );
};

export default page;
