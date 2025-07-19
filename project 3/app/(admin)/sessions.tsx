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
import { Calendar, Clock, User, MapPin, Video } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

interface Session {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: number;
  location: string;
  type: 'online' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
  client_name: string;
}

export default function AdminSessionsScreen() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data } = await supabase
        .from('sessions')
        .select(`
          *,
          profiles!sessions_client_id_fkey(name)
        `)
        .order('date', { ascending: true });

      const sessionsWithClientNames = data?.map(session => ({
        ...session,
        client_name: session.profiles?.name || 'Cliente sconosciuto'
      })) || [];

      setSessions(sessionsWithClientNames);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const SessionCard = ({ session }: { session: Session }) => (
    <TouchableOpacity style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionTitle}>{session.title}</Text>
          <Text style={styles.sessionDescription}>{session.description}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: 
              session.status === 'completed' ? '#4CAF50' : 
              session.status === 'upcoming' ? '#FF9800' : '#F44336'
          }
        ]}>
          <Text style={styles.statusText}>
            {session.status === 'completed' ? 'Completata' : 
             session.status === 'upcoming' ? 'Prossima' : 'Annullata'}
          </Text>
        </View>
      </View>
      
      <View style={styles.sessionDetails}>
        <View style={styles.detailItem}>
          <User size={16} color="#666" />
          <Text style={styles.detailText}>{session.client_name}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Calendar size={16} color="#666" />
          <Text style={styles.detailText}>
            {new Date(session.date).toLocaleDateString('it-IT', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Clock size={16} color="#666" />
          <Text style={styles.detailText}>
            {new Date(session.date).toLocaleTimeString('it-IT', {
              hour: '2-digit',
              minute: '2-digit'
            })} ({session.duration} min)
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          {session.type === 'online' ? (
            <Video size={16} color="#666" />
          ) : (
            <MapPin size={16} color="#666" />
          )}
          <Text style={styles.detailText}>
            {session.type === 'online' ? 'Online' : session.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Caricamento sessioni...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tutte le Sessioni</Text>
          <Text style={styles.headerSubtitle}>
            {sessions.length} sessioni totali
          </Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Calendar size={64} color="#666" />
              <Text style={styles.emptyTitle}>Nessuna sessione</Text>
              <Text style={styles.emptyText}>
                Le sessioni programmate appariranno qui
              </Text>
            </View>
          )}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ccc',
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
  sessionCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  sessionInfo: {
    flex: 1,
    marginRight: 10,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  sessionDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  sessionDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#ccc',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});