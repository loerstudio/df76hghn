import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Settings, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Sei sicuro di voler uscire?',
      [
        { text: 'Annulla', style: 'cancel' },
        { text: 'Esci', style: 'destructive', onPress: () => {
          Alert.alert('Logout', 'Logout effettuato con successo!');
        }},
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
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User size={40} color="white" />
          </View>
          <Text style={styles.welcomeText}>Il tuo profilo</Text>
          <Text style={styles.subtitleText}>Gestisci le tue impostazioni</Text>
        </View>

        <View style={styles.optionsContainer}>
          <ProfileOption
            icon={<User size={24} color="#FF4444" />}
            title="Informazioni personali"
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
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#FF4444',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#ccc',
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  destructiveOption: {
    borderColor: '#FF4444',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
  },
  optionText: {
    fontSize: 18,
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