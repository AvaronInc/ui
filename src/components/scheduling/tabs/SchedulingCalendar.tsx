
import React, { useState } from 'react';
import { useScheduling } from '@/hooks/use-scheduling';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { ScheduleEvent, CalendarView } from '@/types/scheduling';
import { format, addDays, subDays, addWeeks, subWeeks, addMonths, subMonths, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import DayView from '../components/calendar/DayView';
import WeekView from '../components/calendar/WeekView';
import MonthView from '../components/calendar/MonthView';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SchedulingCalendarProps {
  schedulingData: ReturnType<typeof useScheduling>;
  onEventClick: (event: ScheduleEvent) => void;
  onNewEvent: () => void;
}

const SchedulingCalendar: React.FC<SchedulingCalendarProps> = ({ 
  schedulingData, 
  onEventClick,
  onNewEvent 
}) => {
  const { 
    currentViewEvents, 
    selectedDate, 
    calendarView, 
    setSelectedDate, 
    setCalendarView 
  } = schedulingData;
  
  const viewOptions: { value: CalendarView; label: string }[] = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' }
  ];
  
  const navigateToPrevious = () => {
    switch (calendarView) {
      case 'day':
        setSelectedDate(subDays(selectedDate, 1));
        break;
      case 'week':
        setSelectedDate(subWeeks(selectedDate, 1));
        break;
      case 'month':
        setSelectedDate(subMonths(selectedDate, 1));
        break;
    }
  };
  
  const navigateToNext = () => {
    switch (calendarView) {
      case 'day':
        setSelectedDate(addDays(selectedDate, 1));
        break;
      case 'week':
        setSelectedDate(addWeeks(selectedDate, 1));
        break;
      case 'month':
        setSelectedDate(addMonths(selectedDate, 1));
        break;
    }
  };
  
  const navigateToToday = () => {
    setSelectedDate(new Date());
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  
  const getViewHeading = () => {
    switch (calendarView) {
      case 'day':
        return format(selectedDate, 'EEEE, MMMM d, yyyy');
      case 'week': {
        const startOfWeek = addDays(selectedDate, -selectedDate.getDay());
        const endOfWeek = addDays(startOfWeek, 6);
        return `${format(startOfWeek, 'MMM d')} - ${format(endOfWeek, 'MMM d, yyyy')}`;
      }
      case 'month':
        return format(selectedDate, 'MMMM yyyy');
      default:
        return '';
    }
  };
  
  const renderCalendarView = () => {
    switch (calendarView) {
      case 'day':
        return <DayView date={selectedDate} events={currentViewEvents} onEventClick={onEventClick} />;
      case 'week':
        return <WeekView date={selectedDate} events={currentViewEvents} onEventClick={onEventClick} />;
      case 'month':
        return <MonthView date={selectedDate} events={currentViewEvents} onEventClick={onEventClick} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 pb-4 border-b flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-2">
          <Button onClick={navigateToPrevious} variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={navigateToNext} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold ml-2">{getViewHeading()}</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          
          <Select
            value={calendarView}
            onValueChange={(value) => setCalendarView(value as CalendarView)}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              {viewOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button onClick={navigateToToday} variant="outline">
            Today
          </Button>
          
          <Button onClick={onNewEvent}>
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {renderCalendarView()}
      </div>
    </div>
  );
};

export default SchedulingCalendar;
