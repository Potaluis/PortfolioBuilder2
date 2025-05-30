// components/dashboard/StatisticsSection.tsx - Estadísticas avanzadas
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

type TimePeriod = '7d' | '30d' | '365d';

interface StatisticsSectionProps {
  // En producción estos datos vendrían del backend
}

// Datos de ejemplo - en producción vendrían de Firebase Analytics
const generateMockData = (period: TimePeriod) => {
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 365;
  const labels = [];
  const visits = [];
  const messages = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    if (period === '365d') {
      if (i % 30 === 0) { // Solo cada mes para vista anual
        labels.push(date.toLocaleDateString('es-ES', { month: 'short' }));
        visits.push(Math.floor(Math.random() * 500) + 100);
        messages.push(Math.floor(Math.random() * 20) + 5);
      }
    } else if (period === '30d') {
      if (i % 3 === 0) { // Cada 3 días para vista mensual
        labels.push(date.getDate().toString());
        visits.push(Math.floor(Math.random() * 200) + 50);
        messages.push(Math.floor(Math.random() * 10) + 2);
      }
    } else {
      // Últimos 7 días
      labels.push(date.toLocaleDateString('es-ES', { weekday: 'short' }));
      visits.push(Math.floor(Math.random() * 100) + 20);
      messages.push(Math.floor(Math.random() * 5) + 1);
    }
  }
  
  return { labels, visits, messages };
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#2563eb',
  },
  propsForBackgroundLines: {
    stroke: '#f3f4f6',
  },
};

export const StatisticsSection: React.FC<StatisticsSectionProps> = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('7d');
  const [selectedMetric, setSelectedMetric] = useState<'visits' | 'messages'>('visits');

  const mockData = generateMockData(selectedPeriod);
  const chartWidth = Math.min(width - 80, 350);

  const periods = [
    { key: '7d' as TimePeriod, label: 'Últimos 7 días', short: '7D' },
    { key: '30d' as TimePeriod, label: 'Últimos 30 días', short: '30D' },
    { key: '365d' as TimePeriod, label: 'Último año', short: '1A' },
  ];

  const kpiData = [
    {
      title: 'Visitas Totales',
      value: '12,847',
      change: '+23.1%',
      changeType: 'positive' as const,
      icon: '👁️',
      period: selectedPeriod
    },
    {
      title: 'Tiempo Promedio',
      value: '2m 34s',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: '⏱️',
      period: selectedPeriod
    },
    {
      title: 'Mensajes Recibidos',
      value: '186',
      change: '+12.8%',
      changeType: 'positive' as const,
      icon: '💬',
      period: selectedPeriod
    },
    {
      title: 'Tasa de Conversión',
      value: '3.2%',
      change: '-0.5%',
      changeType: 'negative' as const,
      icon: '📈',
      period: selectedPeriod
    },
  ];

  const deviceData = [
    {
      name: 'Móvil',
      population: 58.2,
      color: '#2563eb',
      legendFontColor: '#6b7280',
      legendFontSize: 14,
    },
    {
      name: 'Escritorio',
      population: 32.8,
      color: '#10b981',
      legendFontColor: '#6b7280',
      legendFontSize: 14,
    },
    {
      name: 'Tablet',
      population: 9.0,
      color: '#f59e0b',
      legendFontColor: '#6b7280',
      legendFontSize: 14,
    },
  ];

  const topPagesData = [
    { page: 'Página Principal', visits: 2340, percentage: 35.2 },
    { page: 'Sobre Mí', visits: 1890, percentage: 28.4 },
    { page: 'Proyectos', visits: 1456, percentage: 21.9 },
    { page: 'Contacto', visits: 567, percentage: 8.5 },
    { page: 'Blog', visits: 398, percentage: 6.0 },
  ];

  return (
    <ThemedView style={{ flex: 1, padding: 24 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              Estadísticas
            </ThemedText>
            <ThemedText style={{
              fontSize: 16,
              color: '#6b7280',
            }}>
              Analiza el rendimiento de tus portfolios
            </ThemedText>
          </View>

          {/* Selector de período */}
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#f3f4f6',
            borderRadius: 12,
            padding: 4,
          }}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.key}
                onPress={() => setSelectedPeriod(period.key)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                  backgroundColor: selectedPeriod === period.key ? '#2563eb' : 'transparent',
                }}
              >
                <ThemedText style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: selectedPeriod === period.key ? 'white' : '#6b7280',
                }}>
                  {period.short}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* KPIs Grid */}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 32,
        }}>
          {kpiData.map((kpi, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                minWidth: 250,
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 12,
              }}>
                <View style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#eff6ff',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <ThemedText style={{ fontSize: 20 }}>
                    {kpi.icon}
                  </ThemedText>
                </View>
                
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: kpi.changeType === 'positive' ? '#ecfdf5' : '#fef2f2',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 16,
                }}>
                  <ThemedText style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: kpi.changeType === 'positive' ? '#059669' : '#dc2626',
                    marginRight: 4,
                  }}>
                    {kpi.changeType === 'positive' ? '↗' : '↘'}
                  </ThemedText>
                  <ThemedText style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: kpi.changeType === 'positive' ? '#059669' : '#dc2626',
                  }}>
                    {kpi.change}
                  </ThemedText>
                </View>
              </View>

              <ThemedText style={{
                fontSize: 12,
                color: '#6b7280',
                marginBottom: 4,
              }}>
                {kpi.title}
              </ThemedText>
              
              <ThemedText style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#1f2937',
              }}>
                {kpi.value}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* Gráfico Principal */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <ThemedText style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#1f2937',
            }}>
              Evolución de {selectedMetric === 'visits' ? 'Visitas' : 'Mensajes'}
            </ThemedText>
            
            <View style={{
              flexDirection: 'row',
              backgroundColor: '#f3f4f6',
              borderRadius: 8,
              padding: 2,
            }}>
              <TouchableOpacity
                onPress={() => setSelectedMetric('visits')}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                  backgroundColor: selectedMetric === 'visits' ? '#2563eb' : 'transparent',
                }}
              >
                <ThemedText style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: selectedMetric === 'visits' ? 'white' : '#6b7280',
                }}>
                  Visitas
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setSelectedMetric('messages')}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                  backgroundColor: selectedMetric === 'messages' ? '#2563eb' : 'transparent',
                }}
              >
                <ThemedText style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: selectedMetric === 'messages' ? 'white' : '#6b7280',
                }}>
                  Mensajes
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          <LineChart
            data={{
              labels: mockData.labels,
              datasets: [{
                data: selectedMetric === 'visits' ? mockData.visits : mockData.messages,
                strokeWidth: 3,
              }],
            }}
            width={chartWidth}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
            withDots={true}
            withShadow={false}
            withVerticalLabels={true}
            withHorizontalLabels={true}
            withInnerLines={true}
            withOuterLines={false}
          />
        </View>

        {/* Segunda fila de gráficos */}
        <View style={{
          flexDirection: width > 768 ? 'row' : 'column',
          gap: 16,
          marginBottom: 24,
        }}>
          {/* Dispositivos */}
          <View style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <ThemedText style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: 16,
            }}>
              Dispositivos
            </ThemedText>
            
            <PieChart
              data={deviceData}
              width={Math.min(chartWidth, 280)}
              height={160}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              center={[10, 0]}
              absolute
            />
          </View>

          {/* Top Páginas */}
          <View style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <ThemedText style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: 16,
            }}>
              Páginas Más Visitadas
            </ThemedText>
            
            {topPagesData.map((page, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: '#eff6ff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                }}>
                  <ThemedText style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#2563eb',
                  }}>
                    {index + 1}
                  </ThemedText>
                </View>
                
                <View style={{ flex: 1 }}>
                  <ThemedText style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: 2,
                  }}>
                    {page.page}
                  </ThemedText>
                  
                  <View style={{
                    height: 4,
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}>
                    <View style={{
                      width: `${page.percentage}%`,
                      height: '100%',
                      backgroundColor: '#2563eb',
                    }} />
                  </View>
                </View>
                
                <View style={{
                  alignItems: 'flex-end',
                  marginLeft: 12,
                }}>
                  <ThemedText style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#1f2937',
                  }}>
                    {page.visits.toLocaleString()}
                  </ThemedText>
                  <ThemedText style={{
                    fontSize: 12,
                    color: '#6b7280',
                  }}>
                    {page.percentage}%
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Métricas Adicionales */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 3,
        }}>
          <ThemedText style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: 16,
          }}>
            Métricas Adicionales
          </ThemedText>
          
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 24,
          }}>
            <View style={{ alignItems: 'center' }}>
              <ThemedText style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#2563eb',
                marginBottom: 4,
              }}>
                68%
              </ThemedText>
              <ThemedText style={{
                fontSize: 12,
                color: '#6b7280',
                textAlign: 'center',
              }}>
                Tasa de rebote
              </ThemedText>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <ThemedText style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: 4,
              }}>
                3.4
              </ThemedText>
              <ThemedText style={{
                fontSize: 12,
                color: '#6b7280',
                textAlign: 'center',
              }}>
                Páginas/sesión
              </ThemedText>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <ThemedText style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#f59e0b',
                marginBottom: 4,
              }}>
              76%
              </ThemedText>
              <ThemedText style={{
                fontSize: 12,
                color: '#6b7280',
                textAlign: 'center',
              }}>
                Usuarios nuevos
              </ThemedText>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <ThemedText style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#8b5cf6',
                marginBottom: 4,
              }}>
                4.2s
              </ThemedText>
              <ThemedText style={{
                fontSize: 12,
                color: '#6b7280',
                textAlign: 'center',
              }}>
                Tiempo de carga
              </ThemedText>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};