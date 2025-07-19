import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, Target, TrendingUp } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Session {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'upcoming' | 'cancelled';
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  target_date: string;
}

export default function ClientHomeScreen() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch sessions
      const { data: sessionsData } = await supabase
        .from('sessions')
        .select('*')
        .eq('client_id', user?.id)
        .order('date', { ascending: false })
        .limit(3);

      // Fetch goals
      const { data: goalsData } = await supabase
        .from('goals')
        .select('*')
        .eq('client_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(3);

      setSessions(sessionsData || []);
      setGoals(goalsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ 
    icon, 
    title, 
    value, 
    color 
  }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    color: string;
  }) => (
    <View style={[styles.statCard, { borderColor: color }]}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const SessionCard = ({ session }: { session: Session }) => (
    <TouchableOpacity style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionTitle}>{session.title}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: session.status === 'completed' ? '#4CAF50' : '#FF9800' }
        ]}>
          <Text style={styles.statusText}>
            {session.status === 'completed' ? 'Completata' : 'Prossima'}
          </Text>
        </View>
      </View>
      <Text style={styles.sessionDate}>{new Date(session.date).toLocaleDateString('it-IT')}</Text>
    </TouchableOpacity>
  );

  const GoalCard = ({ goal }: { goal: Goal }) => (
    <View style={styles.goalCard}>
      <Text style={styles.goalTitle}>{goal.title}</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${goal.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{goal.progress}%</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Caricamento...</Text>
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
            <Text style={styles.welcomeText}>Ciao, {user?.name}!</Text>
            <Text style={styles.subtitleText}>Ecco il tuo progresso oggi</Text>
          </View>

          <View style={styles.statsContainer}>
            <StatCard
              icon={<Calendar size={24} color="#FF4444" />}
              title="Sessioni"
              value={sessions.length.toString()}
              color="#FF4444"
            />
            <StatCard
              icon={<Target size={24} color="#4CAF50" />}
              title="Obiettivi"
              value={goals.length.toString()}
              color="#4CAF50"
            />
            <StatCard
              icon={<TrendingUp size={24} color="#2196F3" />}
              title="Progresso"
              value={goals.length > 0 ? `${Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%` : '0%'}
              color="#2196F3"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prossime Sessioni</Text>
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))
            ) : (
              <Text style={styles.emptyText}>Nessuna sessione programmata</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>I Tuoi Obiettivi</Text>
            {goals.length > 0 ? (
              goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))
            ) : (
              <Text style={styles.emptyText}>Nessun obiettivo impostato</Text>
            )}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
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
  sessionCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  sessionDate: {
    fontSize: 14,
    color: '#ccc',
  },
  goalCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF4444',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});