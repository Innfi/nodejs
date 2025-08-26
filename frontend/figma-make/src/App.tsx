import { motion } from 'motion/react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { AnimatedKettlebell } from './components/AnimatedKettlebell';
import { AnimatedBarbell } from './components/AnimatedBarbell';
import { FeatureCard } from './components/FeatureCard';
import { 
  Activity, 
  Calendar, 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  Play,
  Download
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold">FitTracker</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </nav>
          <Button variant="outline">Sign In</Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Track Your Fitness Journey
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The ultimate workout recording app that helps you monitor progress, 
              set goals, and achieve your fitness dreams with precision and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="px-8">
                <Download className="w-4 h-4 mr-2" />
                Download App
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Animated Equipment */}
          <div className="relative">
            <AnimatedKettlebell className="absolute left-1/4 top-0 text-primary/20" />
            <AnimatedBarbell className="absolute right-1/4 top-12 text-primary/20" />
            
            {/* Phone Mockup */}
            <motion.div
              className="relative mx-auto w-72 h-[600px] bg-gradient-to-b from-card to-card/50 rounded-3xl p-6 shadow-2xl border border-border/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Today's Goal</p>
                    <p className="font-semibold">85% Complete</p>
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Deadlifts</p>
                          <p className="text-sm text-muted-foreground">3 sets × 8 reps</p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Target className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Squats</p>
                          <p className="text-sm text-muted-foreground">4 sets × 10 reps</p>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background decorations */}
        <AnimatedKettlebell className="absolute top-20 left-10 text-primary/5 hidden lg:block" />
        <AnimatedBarbell className="absolute bottom-20 right-10 text-primary/5 hidden lg:block" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to make your fitness journey effective and enjoyable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Activity className="w-6 h-6 text-primary" />}
              title="Workout Tracking"
              description="Log every rep, set, and weight with our intuitive tracking system"
              delay={0.1}
            />
            <FeatureCard
              icon={<Calendar className="w-6 h-6 text-primary" />}
              title="Workout Planning"
              description="Plan your workouts in advance and follow structured programs"
              delay={0.2}
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              title="Progress Analytics"
              description="Visualize your progress with detailed charts and statistics"
              delay={0.3}
            />
            <FeatureCard
              icon={<Target className="w-6 h-6 text-primary" />}
              title="Goal Setting"
              description="Set personal goals and track your journey to achieving them"
              delay={0.4}
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 text-primary" />}
              title="Community"
              description="Connect with fellow fitness enthusiasts and share your progress"
              delay={0.5}
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Quick Logging"
              description="Fast and efficient workout logging to keep you focused"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Fitness?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who have already started their fitness transformation with FitTracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                <Download className="w-4 h-4 mr-2" />
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">FitTracker</span>
              </div>
              <p className="text-muted-foreground">
                Your ultimate fitness companion for tracking workouts and achieving goals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 FitTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}