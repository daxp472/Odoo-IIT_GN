import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';

interface FinancialData {
  month: string;
  revenue: number;
  expenses: number;
}

export const RevenueChart: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        // For now, we'll use mock data since the financials endpoint isn't fully implemented
        // In a real implementation, we would call the API and transform the data
        
        // Using mock data for now
        const mockData = [
          { month: 'Jan', revenue: 4000, expenses: 2400 },
          { month: 'Feb', revenue: 3000, expenses: 1398 },
          { month: 'Mar', revenue: 2000, expenses: 1800 },
          { month: 'Apr', revenue: 2780, expenses: 2000 },
          { month: 'May', revenue: 1890, expenses: 1500 },
          { month: 'Jun', revenue: 2390, expenses: 1900 },
        ];
        setFinancialData(mockData);
      } catch (error) {
        console.error('Failed to fetch financial data:', error);
        // Fallback to mock data
        const mockData = [
          { month: 'Jan', revenue: 4000, expenses: 2400 },
          { month: 'Feb', revenue: 3000, expenses: 1398 },
          { month: 'Mar', revenue: 2000, expenses: 1800 },
          { month: 'Apr', revenue: 2780, expenses: 2000 },
          { month: 'May', revenue: 1890, expenses: 1500 },
          { month: 'Jun', revenue: 2390, expenses: 1900 },
        ];
        setFinancialData(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue vs Expenses</h3>
        <div className="flex justify-center items-center h-80">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue vs Expenses</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              name="Revenue"
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};