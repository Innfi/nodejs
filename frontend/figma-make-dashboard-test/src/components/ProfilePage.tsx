import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Settings, Trophy, Target, Calendar, TrendingUp } from 'lucide-react';

const achievements = [
  { id: 1, name: "First Workout", description: "Complete your first workout", earned: true },
  { id: 2, name: "Week Warrior", description: "Workout 5 times in a week", earned: true },
  { id: 3, name: "Consistency King", description: "Workout 30 days in a row", earned: false },
  { id: 4, name: "Heavy Lifter", description: "Lift 1000 total pounds in one session", earned: false },
];

const stats = [
  { label: "Total Workouts", value: 47, icon: Calendar },
  { label: "Total Duration", value: "2,340", unit: "min", icon: TrendingUp },
  { label: "Current Streak", value: 5, unit: "days", icon: Target },
  { label: "Personal Records", value: 12, icon: Trophy },
];

export function ProfilePage() {
  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h1>Profile</h1>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* User Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2>John Doe</h2>
              <p className="text-muted-foreground">Fitness Enthusiast</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge>Intermediate</Badge>
                <Badge variant="outline">Goal: Strength</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-chart-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-semibold">
                      {stat.value}{stat.unit && <span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className={`flex items-center justify-between p-3 rounded-lg border ${
              achievement.earned ? 'bg-chart-1/10 border-chart-1/20' : 'bg-muted/30 border-muted'
            }`}>
              <div>
                <p className={`font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {achievement.name}
                </p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                achievement.earned ? 'bg-chart-1 text-white' : 'bg-muted text-muted-foreground'
              }`}>
                <Trophy className="w-4 h-4" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}