// components/StartScreen.tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { portfolioStyles } from '@/styles/styles';
import { AuthMode } from '@/types';
import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';

interface StartScreenProps {
  onAuth: (mode: AuthMode) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onAuth }) => {
  return (
    <ThemedView style={portfolioStyles.startContainer}>
      <StatusBar barStyle="dark-content" />
      
      <ThemedView style={portfolioStyles.startCard}>
        <ThemedText style={portfolioStyles.titleText}>
          PortfolioBuilder
        </ThemedText>
        <ThemedText style={portfolioStyles.subtitleText}>
          Crea tu portfolio profesional
        </ThemedText>
        
        <TouchableOpacity
          style={portfolioStyles.primaryButton}
          onPress={() => onAuth('login')}
        >
          <ThemedText style={portfolioStyles.primaryButtonText}>
            Iniciar Sesión
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={portfolioStyles.secondaryButton}
          onPress={() => onAuth('register')}
        >
          <ThemedText style={portfolioStyles.secondaryButtonText}>
            Registrarse
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};