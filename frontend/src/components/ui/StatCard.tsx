import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color?: string;
}

export const StatCard = ({ title, value, icon: Icon, color = 'bg-blue-500' }: StatCardProps) => (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            <Icon className="text-white" size={24} />
        </div>
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);