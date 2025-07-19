import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, Mail, User, ArrowLeft } from 'lucide-react-native';

type Step = 'role' | 'email' | 'name' | 'password' | 'complete';

export default function HomeScreen() {
  const [currentStep, setCurrentStep] = useState<Step>('role');
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    name: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const Logo = () => (
    <View style={styles.logoContainer}>
      <View style={styles.logoIcon}>
        <View style={styles.personIcon} />
        <View style={styles.checkMark} />
      </View>
      <Text style={styles.logoText}>
        <Text style={styles.logoRed}>SIMOPAGNO</Text>
        {'\n'}
        <Text style={styles.logoWhite}>COACHING</Text>
      </Text>
    </View>
  );

  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => {
        switch (currentStep) {
          case 'email':
            setCurrentStep('role');
            break;
          case 'name':
            setCurrentStep('email');
            break;
          case 'password':
            setCurrentStep('name');
            break;
          default:
            break;
        }
      }}
    >
      <ArrowLeft size={24} color="#FF4444" />
      <Text style={styles.backText}>Indietro</Text>
    </TouchableOpacity>
  );

  const handleRoleSelection = (role: string) => {
    if (role === 'admin') {
      Alert.alert('Admin Login', 'Funzionalità admin in arrivo!');
      return;
    }
    setFormData({ ...formData, role });
    setCurrentStep('email');
  };

  const handleEmailSubmit = () => {
    if (!formData.email || !formData.email.includes('@')) {
      Alert.alert('Errore', 'Inserisci un indirizzo email valido');
      return;
    }
    setCurrentStep('name');
  };

  const handleNameSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert('Errore', 'Inserisci il tuo nome');
      return;
    }
    setCurrentStep('password');
  };

  const handlePasswordSubmit = () => {
    if (!formData.password || formData.password.length < 6) {
      Alert.alert('Errore', 'La password deve essere di almeno 6 caratteri');
      return;
    }
    setCurrentStep('complete');
  };

  const renderRoleSelection = () => (
    <View style={styles.container}>
      <Logo />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Seleziona il tuo ruolo</Text>
        
        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => handleRoleSelection('client')}
        >
          <Text style={styles.roleButtonText}>Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.adminButton}
          onPress={() => handleRoleSelection('admin')}
        >
          <Text style={styles.adminButtonText}>Admin Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmailStep = () => (
    <View style={styles.container}>
      <BackButton />
      <Logo />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Inserisci la tua migliore email</Text>
        
        <View style={styles.inputContainer}>
          <Mail size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="ilmionome@email.com"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleEmailSubmit}>
          <Text style={styles.primaryButtonText}>Continua</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNameStep = () => (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Come ti chiami?</Text>
        
        <View style={styles.inputContainer}>
          <User size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Nome Cognome"
            placeholderTextColor="#666"
            autoCapitalize="words"
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleNameSubmit}>
          <Text style={styles.primaryButtonText}>Continua</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPasswordStep = () => (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Crea una password sicura</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { paddingRight: 50 }]}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color="#666" />
            ) : (
              <Eye size={20} color="#666" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handlePasswordSubmit}>
          <Text style={styles.primaryButtonText}>Registrati e Inizia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderComplete = () => (
    <View style={styles.container}>
      <Logo />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Benvenuto nel team!</Text>
        <Text style={styles.subtitle}>
          Ciao {formData.name}, la tua registrazione è completata.
        </Text>
        
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            Alert.alert('Successo', 'Registrazione completata!');
            setCurrentStep('role');
            setFormData({ role: '', email: '', name: '', password: '' });
          }}
        >
          <Text style={styles.primaryButtonText}>Inizia il percorso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        {currentStep === 'role' && renderRoleSelection()}
        {currentStep === 'email' && renderEmailStep()}
        {currentStep === 'name' && renderNameStep()}
        {currentStep === 'password' && renderPasswordStep()}
        {currentStep === 'complete' && renderComplete()}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  backText: {
    color: '#FF4444',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#333',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  personIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    position: 'absolute',
  },
  checkMark: {
    width: 25,
    height: 15,
    backgroundColor: '#FF4444',
    position: 'absolute',
    right: 15,
    bottom: 15,
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
  logoText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  logoRed: {
    color: '#FF4444',
  },
  logoWhite: {
    color: 'white',
  },
  contentContainer: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  roleButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF4444',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  roleButtonText: {
    color: '#FF4444',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  adminButton: {
    backgroundColor: '#FF4444',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  adminButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 73, 94, 0.8)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 25,
    position: 'relative',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 15,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  primaryButton: {
    backgroundColor: '#FF4444',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});