import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, Mail, User, ArrowLeft, Lock } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

type Step = 'role' | 'email' | 'name' | 'password' | 'login';

export default function AuthScreen() {
  const { signUp, signIn } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>('role');
  const [formData, setFormData] = useState({
    role: '' as 'client' | 'admin',
    email: '',
    name: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const BackButton = ({ onPress }: { onPress: () => void }) => (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <ArrowLeft size={20} color="#FF4444" />
      <Text style={styles.backText}>Indietro</Text>
    </TouchableOpacity>
  );

  const handleRoleSelection = (role: 'client' | 'admin') => {
    if (role === 'admin') {
      setFormData({ ...formData, role });
      setCurrentStep('login');
    } else {
      setFormData({ ...formData, role });
      setCurrentStep('email');
    }
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

  const handleSignUp = async () => {
    if (!formData.password || formData.password.length < 6) {
      Alert.alert('Errore', 'La password deve essere di almeno 6 caratteri');
      return;
    }

    setLoading(true);
    try {
      await signUp(formData.email, formData.password, formData.name, formData.role);
      Alert.alert('Successo', 'Registrazione completata!');
    } catch (error: any) {
      Alert.alert('Errore', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Errore', 'Inserisci email e password');
      return;
    }

    setLoading(true);
    try {
      await signIn(formData.email, formData.password);
    } catch (error: any) {
      Alert.alert('Errore', error.message);
    } finally {
      setLoading(false);
    }
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
      <BackButton onPress={() => setCurrentStep('role')} />
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
      <BackButton onPress={() => setCurrentStep('email')} />
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
      <BackButton onPress={() => setCurrentStep('name')} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Crea una password sicura</Text>
        
        <View style={styles.inputContainer}>
          <Lock size={20} color="#666" style={styles.inputIcon} />
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

        <TouchableOpacity 
          style={[styles.primaryButton, loading && styles.disabledButton]} 
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? 'Registrazione...' : 'Registrati e Inizia'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLogin = () => (
    <View style={styles.container}>
      <BackButton onPress={() => setCurrentStep('role')} />
      <Logo />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Admin Login</Text>
        
        <View style={styles.inputContainer}>
          <Mail size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock size={20} color="#666" style={styles.inputIcon} />
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

        <TouchableOpacity 
          style={[styles.primaryButton, loading && styles.disabledButton]} 
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? 'Accesso...' : 'Accedi'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {currentStep === 'role' && renderRoleSelection()}
          {currentStep === 'email' && renderEmailStep()}
          {currentStep === 'name' && renderNameStep()}
          {currentStep === 'password' && renderPasswordStep()}
          {currentStep === 'login' && renderLogin()}
        </KeyboardAvoidingView>
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
  keyboardView: {
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
    paddingHorizontal: 12,
    paddingVertical: 6,
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
    marginBottom: 40,
  },
  logoIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#333',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  personIcon: {
    width: 24,
    height: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    position: 'absolute',
  },
  checkMark: {
    width: 20,
    height: 12,
    backgroundColor: '#FF4444',
    position: 'absolute',
    right: 12,
    bottom: 12,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
  logoText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  logoRed: {
    color: '#FF4444',
  },
  logoWhite: {
    color: 'white',
  },
  contentContainer: {
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 30,
  },
  roleButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  roleButtonText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  adminButton: {
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  adminButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 73, 94, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    position: 'relative',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 14,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  primaryButton: {
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});