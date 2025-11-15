import { Code } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface DashboardSwitcherProps {
  currentType: 'user' | 'partner' | 'distribution' | 'admin';
  onTypeChange: (type: 'user' | 'partner' | 'distribution' | 'admin') => void;
}

export function DashboardSwitcher({ currentType, onTypeChange }: DashboardSwitcherProps) {
  return (
    <Card className="mb-6 border-2 border-dashed border-gray-300 bg-gray-50">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <span className="text-sm text-gray-600">Development Mode: Switch Dashboard Type</span>
          </div>
          <Select value={currentType} onValueChange={(value) => onTypeChange(value as any)}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Regular User</SelectItem>
              <SelectItem value="partner">Business Partner</SelectItem>
              <SelectItem value="distribution">Distribution Partner</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
