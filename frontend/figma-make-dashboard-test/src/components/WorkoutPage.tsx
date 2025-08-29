import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from './ui/button';
import { Play, Plus, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

const workoutTemplates = [
  {
    id: 1,
    name: "Push Day",
    exercises: 6,
    duration: "60-75 min",
    difficulty: "Intermediate",
    type: "Strength"
  },
  {
    id: 2,
    name: "Pull Day",
    exercises: 5,
    duration: "45-60 min",
    difficulty: "Intermediate",
    type: "Strength"
  },
  {
    id: 3,
    name: "Leg Day",
    exercises: 7,
    duration: "60-90 min",
    difficulty: "Advanced",
    type: "Strength"
  },
  {
    id: 4,
    name: "HIIT Cardio",
    exercises: 8,
    duration: "20-30 min",
    difficulty: "Beginner",
    type: "Cardio"
  },
];

export function WorkoutPage() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1>Workouts</h1>
          <p className="text-muted-foreground">Start a workout or create a new routine</p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Routine
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-chart-1/10 to-chart-2/10 border-chart-1/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3>Quick Start Workout</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Jump into a workout with no planning required
              </p>
            </div>
            <Button>
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2>Workout Templates</h2>
        {workoutTemplates.map((template) => (
          <Card key={template.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3>{template.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {template.type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {template.difficulty}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{template.exercises} exercises</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{template.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}