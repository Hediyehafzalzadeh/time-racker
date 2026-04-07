"use client"



import React  from 'react'
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const page = ({ params }) => {

    const id = params.id ;
    const [date, setDate] = React.useState(new Date());



    const showHistory = async (date) => {
        setDate(date);
        console.log("selected date :" , date) ;
        
    }
 
  return (
    <div className='mx-auto mt-10'>
        <div>
            pick a day :  
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => showHistory(selectedDate)}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </div></div>
  )
}

export default page;

