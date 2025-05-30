// components/dashboard/MessagesSection.tsx - Bandeja de entrada
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { Alert, Dimensions, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isApproved: boolean;
  hasAttachments: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    type: 'image' | 'audio' | 'file';
    url: string;
  }>;
  conversationId: string;
  isInitialMessage: boolean;
}

interface Conversation {
  id: string;
  participantName: string;
  participantEmail: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isApproved: boolean;
  messages: Message[];
}

// Datos mock - en producción vendrían de Firebase
const mockMessages: Message[] = [
  {
    id: '1',
    senderName: 'María García',
    senderEmail: 'maria@ejemplo.com',
    subject: 'Consulta sobre servicios de diseño',
    content: 'Hola! Me encanta tu trabajo y me gustaría saber si tienes disponibilidad para un proyecto de diseño web. Es para una startup de tecnología y necesitamos algo moderno y profesional.',
    timestamp: '2024-05-30T10:30:00Z',
    isRead: false,
    isApproved: false,
    hasAttachments: true,
    attachments: [
      { id: '1', name: 'brief-proyecto.pdf', type: 'file', url: '#' },
      { id: '2', name: 'referencia-1.jpg', type: 'image', url: '#' }
    ],
    conversationId: 'conv1',
    isInitialMessage: true
  },
  {
    id: '2',
    senderName: 'Carlos López',
    senderEmail: 'carlos@empresa.com',
    subject: 'Colaboración para portfolio',
    content: 'Hola! Soy desarrollador frontend y me gustaría colaborar contigo en algunos proyectos. ¿Podríamos hablar?',
    timestamp: '2024-05-29T15:45:00Z',
    isRead: true,
    isApproved: true,
    hasAttachments: false,
    conversationId: 'conv2',
    isInitialMessage: true
  },
  {
    id: '3',
    senderName: 'Ana Martínez',
    senderEmail: 'ana@marketing.com',
    subject: 'Propuesta de trabajo',
    content: 'Buenos días! Trabajo en una agencia de marketing y nos gustaría contratarte para varios proyectos de diseño. ¿Tienes tiempo para una llamada esta semana?',
    timestamp: '2024-05-28T09:20:00Z',
    isRead: true,
    isApproved: false,
    hasAttachments: false,
    conversationId: 'conv3',
    isInitialMessage: true
  }
];

export const MessagesSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'inbox' | 'approved' | 'pending'>('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const tabs = [
    { 
      key: 'inbox' as const, 
      label: 'Bandeja de entrada', 
      count: messages.filter(m => !m.isApproved).length,
      icon: '📥'
    },
    { 
      key: 'approved' as const, 
      label: 'Conversaciones activas', 
      count: messages.filter(m => m.isApproved).length,
      icon: '💬'
    },
    { 
      key: 'pending' as const, 
      label: 'Pendientes', 
      count: messages.filter(m => !m.isRead).length,
      icon: '⏳'
    }
  ];

  const getFilteredMessages = () => {
    switch (selectedTab) {
      case 'approved':
        return messages.filter(m => m.isApproved);
      case 'pending':
        return messages.filter(m => !m.isRead);
      default:
        return messages.filter(m => !m.isApproved);
    }
  };

  const handleApproveMessage = (messageId: string) => {
    Alert.alert(
      'Aprobar conversación',
      'Al aprobar esta conversación, el usuario podrá enviarte más mensajes y archivos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Aprobar', 
          onPress: () => {
            setMessages(prev => 
              prev.map(m => 
                m.id === messageId ? { ...m, isApproved: true, isRead: true } : m
              )
            );
          }
        }
      ]
    );
  };

  const handleRejectMessage = (messageId: string) => {
    Alert.alert(
      'Rechazar mensaje',
      '¿Estás seguro? El mensaje será eliminado permanentemente.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            setMessages(prev => prev.filter(m => m.id !== messageId));
            setSelectedMessage(null);
          }
        }
      ]
    );
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;

    // Simular envío de respuesta
    Alert.alert('Mensaje enviado', 'Tu respuesta ha sido enviada correctamente.');
    setReplyText('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 24) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    }
  };

  const filteredMessages = getFilteredMessages();

  return (
    <ThemedView style={{ flex: 1, padding: 24 }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      }}>
        <View>
          <ThemedText style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 4,
          }}>
            Mensajes
          </ThemedText>
          <ThemedText style={{
            fontSize: 16,
            color: '#6b7280',
          }}>
            Gestiona las consultas de tus visitantes
          </ThemedText>
        </View>

        <View style={{
          backgroundColor: '#eff6ff',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <ThemedText style={{ fontSize: 16, marginRight: 8 }}>📊</ThemedText>
          <ThemedText style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#1e40af',
          }}>
            Tasa de respuesta: 94%
          </ThemedText>
        </View>
      </View>

      {/* Tabs */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        borderRadius: 12,
        padding: 4,
        marginBottom: 24,
      }}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setSelectedTab(tab.key)}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              backgroundColor: selectedTab === tab.key ? '#2563eb' : 'transparent',
            }}
          >
            <ThemedText style={{
              fontSize: 16,
              marginRight: 8,
            }}>
              {tab.icon}
            </ThemedText>
            <ThemedText style={{
              fontSize: 14,
              fontWeight: '600',
              color: selectedTab === tab.key ? 'white' : '#6b7280',
              marginRight: 8,
            }}>
              {tab.label}
            </ThemedText>
            {tab.count > 0 && (
              <View style={{
                backgroundColor: selectedTab === tab.key ? 'rgba(255,255,255,0.2)' : '#ef4444',
                borderRadius: 10,
                minWidth: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 6,
              }}>
                <ThemedText style={{
                  color: selectedTab === tab.key ? 'white' : 'white',
                  fontSize: 11,
                  fontWeight: 'bold',
                }}>
                  {tab.count}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={{
        flex: 1,
        flexDirection: width > 768 ? 'row' : 'column',
        gap: 20,
      }}>
        {/* Lista de mensajes */}
        <View style={{
          flex: width > 768 ? 1 : undefined,
          height: width > 768 ? undefined : 300,
          backgroundColor: 'white',
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}>
          {filteredMessages.length === 0 ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 40,
            }}>
              <ThemedText style={{ fontSize: 48, marginBottom: 16 }}>📭</ThemedText>
              <ThemedText style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: 8,
              }}>
                No hay mensajes
              </ThemedText>
              <ThemedText style={{
                fontSize: 14,
                color: '#6b7280',
                textAlign: 'center',
              }}>
                Los nuevos mensajes aparecerán aquí
              </ThemedText>
            </View>
          ) : (
            <ScrollView style={{ flex: 1 }}>
              {filteredMessages.map((message, index) => (
                <TouchableOpacity
                  key={message.id}
                  onPress={() => {
                    setSelectedMessage(message);
                    if (!message.isRead) {
                      setMessages(prev => 
                        prev.map(m => 
                          m.id === message.id ? { ...m, isRead: true } : m
                        )
                      );
                    }
                  }}
                  style={{
                    padding: 16,
                    borderBottomWidth: index < filteredMessages.length - 1 ? 1 : 0,
                    borderBottomColor: '#f3f4f6',
                    backgroundColor: selectedMessage?.id === message.id ? '#eff6ff' : 'transparent',
                  }}
                >
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 8,
                  }}>
                    <View style={{ flex: 1 }}>
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 4,
                      }}>
                        <ThemedText style={{
                          fontSize: 16,
                          fontWeight: message.isRead ? '500' : 'bold',
                          color: '#1f2937',
                          marginRight: 8,
                        }}>
                          {message.senderName}
                        </ThemedText>
                        
                        {!message.isRead && (
                          <View style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: '#2563eb',
                          }} />
                        )}
                        
                        {message.hasAttachments && (
                          <ThemedText style={{ fontSize: 14, marginLeft: 8 }}>📎</ThemedText>
                        )}
                      </View>
                      
                      <ThemedText style={{
                        fontSize: 14,
                        color: '#6b7280',
                        marginBottom: 4,
                      }}>
                        {message.subject}
                      </ThemedText>
                      
                      <ThemedText
                        style={{
                          fontSize: 13,
                          color: '#9ca3af',
                          lineHeight: 18,
                        }}
                        numberOfLines={2}
                      >
                        {message.content}
                      </ThemedText>
                    </View>
                    
                    <View style={{
                      alignItems: 'flex-end',
                      marginLeft: 12,
                    }}>
                      <ThemedText style={{
                        fontSize: 12,
                        color: '#6b7280',
                        marginBottom: 4,
                      }}>
                        {formatTime(message.timestamp)}
                      </ThemedText>
                      
                      {message.isInitialMessage && !message.isApproved && (
                        <View style={{
                          backgroundColor: '#fef3c7',
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 8,
                        }}>
                          <ThemedText style={{
                            fontSize: 10,
                            color: '#92400e',
                            fontWeight: '600',
                          }}>
                            NUEVO
                          </ThemedText>
                        </View>
                      )}
                      
                      {message.isApproved && (
                        <View style={{
                          backgroundColor: '#ecfdf5',
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 8,
                        }}>
                          <ThemedText style={{
                            fontSize: 10,
                            color: '#059669',
                            fontWeight: '600',
                          }}>
                            ACTIVO
                          </ThemedText>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Detalle del mensaje */}
        <View style={{
          flex: width > 768 ? 1.5 : undefined,
          backgroundColor: 'white',
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}>
          {selectedMessage ? (
            <View style={{ flex: 1 }}>
              {/* Header del mensaje */}
              <View style={{
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#f3f4f6',
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 12,
                }}>
                  <View style={{ flex: 1 }}>
                    <ThemedText style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: 4,
                    }}>
                      {selectedMessage.senderName}
                    </ThemedText>
                    <ThemedText style={{
                      fontSize: 14,
                      color: '#6b7280',
                      marginBottom: 8,
                    }}>
                      {selectedMessage.senderEmail}
                    </ThemedText>
                    <ThemedText style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#374151',
                    }}>
                      {selectedMessage.subject}
                    </ThemedText>
                  </View>
                  
                  <ThemedText style={{
                    fontSize: 12,
                    color: '#6b7280',
                  }}>
                    {new Date(selectedMessage.timestamp).toLocaleString('es-ES')}
                  </ThemedText>
                </View>

                {/* Botones de acción para mensajes no aprobados */}
                {selectedMessage.isInitialMessage && !selectedMessage.isApproved && (
                  <View style={{
                    flexDirection: 'row',
                    gap: 12,
                  }}>
                    <TouchableOpacity
                      onPress={() => handleApproveMessage(selectedMessage.id)}
                      style={{
                        flex: 1,
                        backgroundColor: '#10b981',
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ThemedText style={{ fontSize: 16, marginRight: 8 }}>✓</ThemedText>
                      <ThemedText style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: 14,
                      }}>
                        Aprobar conversación
                      </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleRejectMessage(selectedMessage.id)}
                      style={{
                        backgroundColor: '#ef4444',
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ThemedText style={{ fontSize: 16, marginRight: 8 }}>✕</ThemedText>
                      <ThemedText style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: 14,
                      }}>
                        Rechazar
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Contenido del mensaje */}
              <ScrollView style={{ flex: 1, padding: 20 }}>
                <ThemedText style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#374151',
                  marginBottom: 20,
                }}>
                  {selectedMessage.content}
                </ThemedText>

                {/* Archivos adjuntos */}
                {selectedMessage.hasAttachments && selectedMessage.attachments && (
                  <View style={{
                    backgroundColor: '#f8fafc',
                    padding: 16,
                    borderRadius: 12,
                    marginBottom: 20,
                  }}>
                    <ThemedText style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: 12,
                    }}>
                      Archivos adjuntos:
                    </ThemedText>
                    
                    {selectedMessage.attachments.map((attachment) => (
                      <TouchableOpacity
                        key={attachment.id}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 8,
                          backgroundColor: 'white',
                          borderRadius: 8,
                          marginBottom: 8,
                        }}
                      >
                        <ThemedText style={{
                          fontSize: 20,
                          marginRight: 12,
                        }}>
                          {attachment.type === 'image' ? '🖼️' : 
                           attachment.type === 'audio' ? '🎵' : '📄'}
                        </ThemedText>
                        <ThemedText style={{
                          fontSize: 14,
                          color: '#2563eb',
                          textDecorationLine: 'underline',
                        }}>
                          {attachment.name}
                        </ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </ScrollView>

              {/* Responder (solo si está aprobado) */}
              {selectedMessage.isApproved && (
                <View style={{
                  padding: 20,
                  borderTopWidth: 1,
                  borderTopColor: '#f3f4f6',
                }}>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 8,
                      padding: 12,
                      marginBottom: 12,
                      minHeight: 80,
                      textAlignVertical: 'top',
                      fontSize: 16,
                    }}
                    placeholder="Escribe tu respuesta..."
                    value={replyText}
                    onChangeText={setReplyText}
                    multiline
                  />
                  
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      gap: 12,
                    }}>
                      <TouchableOpacity style={{
                        padding: 8,
                        borderRadius: 8,
                        backgroundColor: '#f3f4f6',
                      }}>
                        <ThemedText style={{ fontSize: 18 }}>📎</ThemedText>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={{
                        padding: 8,
                        borderRadius: 8,
                        backgroundColor: '#f3f4f6',
                      }}>
                        <ThemedText style={{ fontSize: 18 }}>🎵</ThemedText>
                      </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity
                      onPress={handleSendReply}
                      disabled={!replyText.trim()}
                      style={{
                        backgroundColor: replyText.trim() ? '#2563eb' : '#d1d5db',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <ThemedText style={{
                        fontSize: 16,
                        marginRight: 8,
                      }}>📤</ThemedText>
                      <ThemedText style={{
                        color: 'white',
                        fontWeight: '600',
                      }}>
                        Enviar
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 40,
            }}>
              <ThemedText style={{ fontSize: 64, marginBottom: 16 }}>💬</ThemedText>
              <ThemedText style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: 8,
              }}>
                Selecciona un mensaje
              </ThemedText>
              <ThemedText style={{
                fontSize: 14,
                color: '#6b7280',
                textAlign: 'center',
              }}>
                Elige un mensaje de la lista para ver su contenido completo
              </ThemedText>
            </View>
          )}
        </View>
      </View>
    </ThemedView>
  );
};