import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, CircleHelp as HelpCircle, LogOut, CreditCard as Edit } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Sei sicuro di voler uscire?',
      [
        { text: 'Annulla', style: 'cancel' },
        { text: 'Esci', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const ProfileOption = ({ 
    icon, 
    title, 
    onPress, 
    isDestructive = false 
  }: {
    icon: React.ReactNode;
    title: string;
    onPress: () => void;
    isDestructive?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        isDestructive && styles.destructiveOption
      ]}
      onPress={onPress}
    >
      {icon}
      <Text style={[
        styles.optionText,
        isDestructive && styles.destructiveText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <User size={40} color="white" />
            </View>
            <Text style={styles.nameText}>{user?.name}</Text>
            <Text style={styles.emailText}>{user?.email}</Text>
            <Text style={styles.roleText}>Cliente</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Informazioni Account</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nome:</Text>
              <Text style={styles.infoValue}>{user?.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user?.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ruolo:</Text>
              <Text style={styles.infoValue}>Cliente</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Membro dal:</Text>
              <Text style={styles.infoValue}>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('it-IT') : 'N/A'}
              </Text>
            </View>
          </View>

          <View style={styles.optionsContainer}>
            <ProfileOption
              icon={<Edit size={24} color="#FF4444" />}
              title="Modifica profilo"
              onPress={() => Alert.alert('Info', 'Funzionalità in arrivo!')}
            />
            
            <ProfileOption
              icon={<Settings size={24} color="#FF4444" />}
              title="Impostazioni"
              onPress={() => Alert.alert('Impostazioni', 'Funzionalità in arrivo!')}
            />
            
            <ProfileOption
              icon={<HelpCircle size={24} color="#FF4444" />}
              title="Aiuto e supporto"
              onPress={() => Alert.alert('Supporto', 'Contatta: support@simopagnocoaching.com')}
            />
            
            <ProfileOption
              icon={<LogOut size={24} color="#FF4444" />}
              title="Logout"
              onPress={handleLogout}
              isDestructive={true}
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              SIMOPAGNO COACHING
            </Text>
            <Text style={styles.versionText}>
              Versione 1.0.0
            </Text>
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
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FF4444',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  roleText: {
    fontSize: 14,
    color: '#FF4444',
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  infoLabel: {
    fontSize: 14,
    color: '#ccc',
  },
  infoValue: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  destructiveOption: {
    borderColor: '#FF4444',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
  },
  optionText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
    fontWeight: '500',
  },
  destructiveText: {
    color: '#FF4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4444',
    marginBottom: 5,
  },
  versionText: {
    fontSize: 14,
    color: '#666',
  },
});