'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BarChart3,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  TrendingUp,
  Users,
  AlertCircle,
  Plus,
  Eye
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { projectsApi } from '@/lib/api';
import { Project } from '@/types';
import toast from 'react-hot-toast';

const statusColors = {
  planning: 'badge-warning',
  in_progress: 'bg-blue-700/20 text-blue-400 border border-blue-700/40',
  on_hold: 'bg-orange-700/20 text-orange-400 border border-orange-700/40',
  completed: 'badge-success',
  cancelled: 'badge-danger'
};

const statusLabels = {
  planning: 'Planning',
  in_progress: 'In Progress',
  on_hold: 'On Hold',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalUpdates: 0
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsApi.getAll();
      const projectData = response.data;
      setProjects(projectData);

      // Calculate stats
      const totalProjects = projectData.length;
      const activeProjects = projectData.filter((p: Project) =>
        ['planning', 'in_progress'].includes(p.status)
      ).length;
      const completedProjects = projectData.filter((p: Project) => p.status === 'completed').length;
      const totalUpdates = projectData.reduce((sum: number, p: Project) => sum + p.updates.length, 0);

      setStats({
        totalProjects,
        activeProjects,
        completedProjects,
        totalUpdates
      });
    } catch (error: any) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const recentProjects = projects.slice(0, 3);
  const recentUpdates = projects
    .flatMap(p => p.updates.map(u => ({ ...u, projectTitle: p.title })))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-forge-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-10 bg-forge-slate rounded w-1/4 mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-28 bg-forge-slate rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-forge-slate rounded-xl"></div>
              <div className="h-96 bg-forge-slate rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forge-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome back, <span className="text-gradient-ember">{user?.full_name?.split(' ')[0]}</span>!
          </h1>
          <p className="text-secondary-100 text-lg">
            Here's an overview of your projects and recent activity.
          </p>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="card-interactive">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-300 text-sm font-medium mb-2">Total Projects</p>
                <p className="text-3xl font-bold text-white">{stats.totalProjects}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-ember-700/20 to-ember-800/20 rounded-xl flex items-center justify-center border border-ember-700/30">
                <BarChart3 size={26} className="text-ember-400" />
              </div>
            </div>
          </div>

          <div className="card-interactive">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-300 text-sm font-medium mb-2">Active Projects</p>
                <p className="text-3xl font-bold text-white">{stats.activeProjects}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-700/20 to-blue-800/20 rounded-xl flex items-center justify-center border border-blue-700/30">
                <Clock size={26} className="text-blue-400" />
              </div>
            </div>
          </div>

          <div className="card-interactive">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-300 text-sm font-medium mb-2">Completed</p>
                <p className="text-3xl font-bold text-white">{stats.completedProjects}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-700/20 to-green-800/20 rounded-xl flex items-center justify-center border border-green-700/30">
                <CheckCircle size={26} className="text-green-400" />
              </div>
            </div>
          </div>

          <div className="card-interactive">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-300 text-sm font-medium mb-2">Updates</p>
                <p className="text-3xl font-bold text-white">{stats.totalUpdates}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-700/20 to-purple-800/20 rounded-xl flex items-center justify-center border border-purple-700/30">
                <MessageSquare size={26} className="text-purple-400" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Recent Projects</h2>
              <Link
                href="/dashboard/projects"
                className="text-ember-400 hover:text-ember-300 text-sm font-semibold transition-colors"
              >
                View all →
              </Link>
            </div>

            {recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <FileText size={48} className="text-secondary-500 mx-auto mb-4" />
                <p className="text-secondary-400 mb-4">No projects yet</p>
                <p className="text-secondary-500 text-sm">
                  Contact us to get started on your first project
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-secondary-800/50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{project.title}</h3>
                      <p className="text-secondary-400 text-sm mb-2">{project.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                          {statusLabels[project.status]}
                        </span>
                        <span className="text-secondary-500 text-xs">
                          {project.project_type.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="text-primary-400 hover:text-primary-300 p-2"
                    >
                      <Eye size={20} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Updates */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Updates</h2>
              <Link
                href="/dashboard/updates"
                className="text-primary-400 hover:text-primary-300 text-sm font-medium"
              >
                View all
              </Link>
            </div>

            {recentUpdates.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare size={48} className="text-secondary-500 mx-auto mb-4" />
                <p className="text-secondary-400 mb-4">No updates yet</p>
                <p className="text-secondary-500 text-sm">
                  Project updates will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentUpdates.map((update) => (
                  <div key={update.id} className="p-4 bg-secondary-800/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium">{update.title}</h4>
                      <span className="text-secondary-500 text-xs">
                        {new Date(update.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-secondary-400 text-sm mb-2 line-clamp-2">
                      {update.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-400 text-sm">{update.projectTitle}</span>
                      {update.is_public && (
                        <span className="text-green-400 text-xs flex items-center">
                          <CheckCircle size={12} className="mr-1" />
                          Public
                        </span>
                      )}
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
          className="mt-12 card-glow"
        >
          <h2 className="text-2xl font-bold text-white mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/contact"
              className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-br from-ember-900/20 to-ember-800/20 hover:from-ember-900/30 hover:to-ember-800/30 rounded-xl transition-all duration-200 border border-ember-700/30 hover:border-ember-600/50 hover:shadow-glow-sm group"
            >
              <Plus size={24} className="text-ember-400 group-hover:text-ember-300 transition-colors" />
              <span className="text-white font-semibold text-lg">New Project</span>
            </Link>

            <Link
              href="/dashboard/documents"
              className="flex items-center justify-center space-x-3 p-6 bg-forge-slate hover:bg-forge-smoke rounded-xl transition-all duration-200 border border-forge-steel/30 hover:border-forge-steel/50 group"
            >
              <FileText size={24} className="text-secondary-300 group-hover:text-white transition-colors" />
              <span className="text-white font-semibold text-lg">Documents</span>
            </Link>

            <Link
              href="/dashboard/billing"
              className="flex items-center justify-center space-x-3 p-6 bg-forge-slate hover:bg-forge-smoke rounded-xl transition-all duration-200 border border-forge-steel/30 hover:border-forge-steel/50 group"
            >
              <TrendingUp size={24} className="text-secondary-300 group-hover:text-white transition-colors" />
              <span className="text-white font-semibold text-lg">Billing</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
