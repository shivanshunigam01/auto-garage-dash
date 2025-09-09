import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  count: number;
  total?: number;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, count, total, icon: Icon, bgColor, iconColor }) => {
  return (
    <Card className={`${bgColor} border-none`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-foreground">{title}</h3>
            <p className="text-2xl font-bold text-foreground">{count}</p>
            {total && total > 0 && (
              <p className="text-sm text-muted-foreground">₹{total.toLocaleString()}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;