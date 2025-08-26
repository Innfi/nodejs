import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="h-full border-border/50 hover:border-primary/20 transition-colors">
        <CardContent className="p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              {icon}
            </div>
          </div>
          <h3 className="mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}