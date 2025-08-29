import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Clock, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const scheduledWorkouts = [
  {
    id: 1,
    name: "Push Day",
    date: "2025-08-30",
    time: "09:00",
    duration: 60,
    type: "Strength"
  },
  {
    id: 2,
    name: "Cardio Session",
    date: "2025-08-31",
    time: "07:00",
    duration: 30,
    type: "Cardio"
  },
  {
    id: 3,
    name: "Pull Day",
    date: "2025-09-01",
    time: "18:00",
    duration: 75,
    type: "Strength"
  },
];

export function SchedulePage() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1>Schedule</h1>
          <p className="text-muted-foreground">Plan your upcoming workouts</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Workout
        </Button>
      </div>

      <div className="space-y-4">
        {scheduledWorkouts.map((workout) => (
          <Card key={workout.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3>{workout.name}</h3>
                <Badge variant="outline">{workout.type}</Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(workout.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{workout.time} ({workout.duration}m)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}