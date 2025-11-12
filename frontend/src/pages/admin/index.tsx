'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { projectsApi, inquiriesApi } from '@/lib';
import { Project, Inquiry } from '@/types';
import toast from 'react-hot-toast';

const statusColors = {
  new: 'bg-blue-500/20 text-blue-400',
  in_progress: 'bg-yellow-500/20 text-yellow-400',
  responded: 'bg-green-500/20 text-green-400',
  closed: 'bg-gray-500/20 text-gray-400'
};

const projectStatusColors = {
  planning: 'bg-yellow-500/20 text-yellow-400',
  in_progress: 'bg-blue-500/20 text-blue-400',
  on_hold: 'bg-orange-500/20 text-orange-400',
  completed: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400'
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalInquiries: 0,
    newInquiries: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsResponse, inquiriesResponse] = await Promise.all([
        projectsApi.getAll(),
        inquiriesApi.getAll()
      ]);

      const projectData = projectsResponse.data;
      const inquiryData = inquiriesResponse.data;

      setProjects(projectData);
      setInquiries(inquiryData);

      // Calculate stats
      const totalProjects = projectData.length;
      const activeProjects = projectData.filter((p: Project) =>
        ['planning', 'in_progress'].includes(p.status)
      ).length;
      const totalInquiries = inquiryData.length;
      const newInquiries = inquiryData.filter((i: Inquiry) => i.status === 'new').length;

      setStats({
        totalProjects,
        activeProjects,
        totalInquiries,
        newInquiries
      });
    } catch (error: any) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (inquiryId: number, status: Inquiry['status']) => {
    try {
      await inquiriesApi.update(inquiryId, { status });
      setInquiries(inquiries.map(iq =>
        iq.id === inquiryId ? { ...iq, status } : iq
      ));
      toast.success('Inquiry status updated');
    } catch (error) {
      toast.error('Failed to update inquiry status');
    }
  };

  const recentInquiries = inquiries.slice(0, 5);
  const recentProjects = projects.slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary-700 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-secondary-800 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-secondary-800 rounded-lg"></div>
              <div className="h-96 bg-secondary-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-secondary-400">
            Manage projects, inquiries, and monitor platform activity.
          </p>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-400 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-white">{stats.totalProjects}</p>
              </div>
              <Briefcase size={24} className="text-primary-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-400 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-white">{stats.activeProjects}</p>
              </div>
              <TrendingUp size={24} className="text-blue-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-400 text-sm">Total Inquiries</p>
                <p className="text-2xl font-bold text-white">{stats.totalInquiries}</p>
              </div>
              <MessageSquare size={24} className="text-green-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-400 text-sm">New Inquiries</p>
                <p className="text-2xl font-bold text-white">{stats.newInquiries}</p>
              </div>
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {stats.newInquiries > 99 ? '99+' : stats.newInquiries}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Inquiries */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Inquiries</h2>
              <a
                href="/admin/inquiries"
                className="text-primary-400 hover:text-primary-300 text-sm font-medium"
              >
                View all
              </a>
            </div>

            {recentInquiries.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare size={48} className="text-secondary-500 mx-auto mb-4" />
                <p className="text-secondary-400">No inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-4 bg-secondary-800/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{inquiry.subject}</h3>
                        <p className="text-secondary-400 text-sm mb-2">
                          From: {inquiry.name} ({inquiry.email})
                        </p>
                        <p className="text-secondary-300 text-sm line-clamp-2">
                          {inquiry.message}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[inquiry.status]}`}>
                          {inquiry.status.replace('_', ' ')}
                        </span>
                        <select
                          value={inquiry.status}
                          onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value as Inquiry['status'])}
                          className="bg-secondary-700 border border-secondary-600 rounded px-2 py-1 text-xs"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="responded">Responded</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-secondary-500">
                      <span>{new Date(inquiry.created_at).toLocaleDateString()}</span>
                      {inquiry.service_interest && (
                        <span className="text-primary-400">
                          {inquiry.service_interest.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Projects</h2>
              <a
                href="/admin/projects"
                className="text-primary-400 hover:text-primary-300 text-sm font-medium"
              >
                View all
              </a>
            </div>

            {recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <Briefcase size={48} className="text-secondary-500 mx-auto mb-4" />
                <p className="text-secondary-400">No projects yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="p-4 bg-secondary-800/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{project.title}</h3>
                        <p className="text-secondary-400 text-sm mb-2">
                          Client: {project.client_id}
                        </p>
                        {project.description && (
                          <p className="text-secondary-300 text-sm line-clamp-2">
                            {project.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${projectStatusColors[project.status]}`}>
                          {project.status.replace('_', ' ')}
                        </span>
                        <div className="flex space-x-1">
                          <button className="p-1 text-secondary-400 hover:text-white">
                            <Eye size={14} />
                          </button>
                          <button className="p-1 text-secondary-400 hover:text-white">
                            <Edit size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-secondary-500">
                      <span>{project.project_type.replace('_', ' ')}</span>
                      <span>{new Date(project.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 card"
        >
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <a
              href="/admin/projects/new"
              className="flex items-center justify-center space-x-3 p-4 bg-primary-600/20 hover:bg-primary-600/30 rounded-lg transition-colors border border-primary-600/30"
            >
              <Plus size={20} className="text-primary-400" />
              <span className="text-white font-medium">New Project</span>
            </a>

            <a
              href="/admin/inquiries"
              className="flex items-center justify-center space-x-3 p-4 bg-secondary-700 hover:bg-secondary-600 rounded-lg transition-colors"
            >
              <MessageSquare size={20} className="text-secondary-300" />
              <span className="text-white font-medium">Manage Inquiries</span>
            </a>

            <a
              href="/admin/users"
              className="flex items-center justify-center space-x-3 p-4 bg-secondary-700 hover:bg-secondary-600 rounded-lg transition-colors"
            >
              <Users size={20} className="text-secondary-300" />
              <span className="text-white font-medium">Manage Users</span>
            </a>

            <a
              href="/admin/analytics"
              className="flex items-center justify-center space-x-3 p-4 bg-secondary-700 hover:bg-secondary-600 rounded-lg transition-colors"
            >
              <TrendingUp size={20} className="text-secondary-300" />
              <span className="text-white font-medium">Analytics</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
