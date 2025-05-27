// components/dashboard/CreateProjectButton.tsx
import { ThemedText } from '@/components/ThemedText';
import { portfolioStyles } from '@/styles/styles';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface CreateProjectButtonProps {
  onPress: () => void;
}

export const CreateProjectButton: React.FC<CreateProjectButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={portfolioStyles.newProjectCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ThemedText style={portfolioStyles.newProjectIcon}>+</ThemedText>
      <ThemedText style={portfolioStyles.newProjectText}>Nuevo Portfolio</ThemedText>
    </TouchableOpacity>
  );
};