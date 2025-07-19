import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Calendar, TrendingUp, DollarSign } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface DashboardStats {
  totalClients: number;
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
}

export default function AdminDashboardScreen() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    totalSessions: 0,
    completedSessions: 0,
    upcomingSessions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch total clients
      const { count: clientsCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'client');

      // Fetch total sessions
      const { count: sessionsCount } = await supabase
        .from('sessions')
        .select('*', { count: 'exact', head: true });

      // Fetch completed sessions
      const { count: completedCount } = await supabase
        .from('sessions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');

      // Fetch upcoming sessions
      const { count: upcomingCount } = await supabase
        .from('sessions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'upcoming');

      setStats({
        totalClients: clientsCount || 0,
        totalSessions: sessionsCount || 0,
        completedSessions: completedCount || 0,
        upcomingSessions: upcomingCount || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ 
    icon, 
    title, 
    value, 
    color,
    subtitle 
  }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    color: string;
    subtitle?: string;
  }) => (
    <View style={[styles.statCard, { borderColor: color }]}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  if (loading) {
    return (
      <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Caricamento dashboard...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Benvenuto, {user?.name}</Text>
            <Text style={styles.subtitleText}>Dashboard Amministratore</Text>
          </View>

          <View style={styles.statsGrid}>
            <StatCard
              icon={<Users size={24} color="#4CAF50" />}
              title="Clienti Totali"
              value={stats.totalClients.toString()}
              color="#4CAF50"
            />
            <StatCard
              icon={<Calendar size={24} color="#2196F3" />}
              title="Sessioni Totali"
              value={stats.totalSessions.toString()}
              color="#2196F3"
            />
          </View>

          <View style={styles.statsGrid}>
            <StatCard
              icon={<TrendingUp size={24} color="#FF9800" />}
              title="Completate"
              value={stats.completedSessions.toString()}
              color="#FF9800"
              subtitle="Sessioni"
            />
            <StatCard
              icon={<Calendar size={24} color="#FF4444" />}
              title="Prossime"
              value={stats.upcomingSessions.toString()}
              color="#FF4444"
              subtitle="Sessioni"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Panoramica Rapida</Text>
            <View style={styles.overviewCard}>
              <Text style={styles.overviewText}>
                Hai {stats.totalClients} clienti attivi con {stats.upcomingSessions} sessioni programmate.
              </Text>
              <Text style={styles.overviewText}>
                Completate {stats.completedSessions} sessioni su {stats.totalSessions} totali.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#ccc',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    fontWeight: '500',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  overviewCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  overviewText: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
    marginBottom: 10,
  },
});