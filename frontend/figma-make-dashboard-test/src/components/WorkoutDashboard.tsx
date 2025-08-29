import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, Target, Timer, TrendingUp } from 'lucide-react';

// Mock data for the week
const weeklyData = [
  { day: 'Mon', workouts: 1, duration: 45, sets: 12 },
  { day: 'Tue', workouts: 0, duration: 0, sets: 0 },
  { day: 'Wed', workouts: 1, duration: 60, duration: 18 },
  { day: 'Thu', workouts: 1, duration: 50, sets: 15 },
  { day: 'Fri', workouts: 0, duration: 0, sets: 0 },
  { day: 'Sat', workouts: 1, duration: 75, sets: 20 },
  { day: 'Sun', workouts: 1, duration: 40, sets: 10 },
];

const recentWorkouts = [
  {
    id: 1,
    name: "Push Day",
    date: "2025-08-28",
    duration: 75,
    exercises: [
      { name: "Bench Press", sets: 4, reps: [12, 10, 8, 8] },
      { name: "Shoulder Press", sets: 3, reps: [12, 10, 10] },
      { name: "Tricep Dips", sets: 3, reps: [15, 12, 10] },
    ]
  },
  {
    id: 2,
    name: "Leg Day",
    date: "2025-08-26",
    duration: 60,
    exercises: [
      { name: "Squats", sets: 4, reps: [15, 12, 10, 8] },
      { name: "Leg Press", sets: 3, reps: [20, 18, 15] },
      { name: "Calf Raises", sets: 4, reps: [20, 20, 18, 15] },
    ]
  },
  {
    id: 3,
    name: "Pull Day",
    date: "2025-08-24",
    duration: 50,
    exercises: [
      { name: "Pull-ups", sets: 4, reps: [8, 6, 5, 4] },
      { name: "Barbell Rows", sets: 3, reps: [12, 10, 8] },
      { name: "Bicep Curls", sets: 3, reps: [15, 12, 10] },
    ]
  }
];

export function WorkoutDashboard() {
  const totalWorkouts = weeklyData.reduce((sum, day) => sum + day.workouts, 0);
  const totalDuration = weeklyData.reduce((sum, day) => sum + day.duration, 0);
  const totalSets = weeklyData.reduce((sum, day) => sum + day.sets, 0);
  const weeklyGoal = 5;
  const goalProgress = (totalWorkouts / weeklyGoal) * 100;

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1>Workout Dashboard</h1>
        <p className="text-muted-foreground">Track your weekly progress and workout history</p>
      </div>

      {/* Weekly Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-chart-1" />
              <div>
                <p className="text-sm text-muted-foreground">Workouts</p>
                <p className="text-lg font-semibold">{totalWorkouts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-chart-2" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-lg font-semibold">{totalDuration}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-chart-3" />
              <div>
                <p className="text-sm text-muted-foreground">Total Sets</p>
                <p className="text-lg font-semibold">{totalSets}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-chart-4" />
              <div>
                <p className="text-sm text-muted-foreground">Weekly Goal</p>
                <p className="text-lg font-semibold">{totalWorkouts}/{weeklyGoal}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goal Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Weekly Goal Progress
            <Badge variant={goalProgress >= 100 ? "default" : "secondary"}>
              {Math.round(goalProgress)}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={goalProgress} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            {goalProgress >= 100 ? "Goal achieved! 🎉" : `${weeklyGoal - totalWorkouts} more workouts to reach your goal`}
          </p>
        </CardContent>
      </Card>

      {/* Weekly Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Bar dataKey="duration" fill="var(--color-chart-1)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Workouts */}
      <div className="space-y-4">
        <h2>Recent Workouts</h2>
        {recentWorkouts.map((workout) => (
          <Card key={workout.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{workout.name}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Timer className="w-4 h-4" />
                  <span>{workout.duration}m</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{new Date(workout.date).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {workout.exercises.map((exercise, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets} sets × {exercise.reps.join(', ')} reps
                    </p>
                  </div>
                  <Badge variant="outline">
                    {exercise.reps.reduce((sum, rep) => sum + rep, 0)} total
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}