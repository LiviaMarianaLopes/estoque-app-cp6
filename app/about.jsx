import { View, Text, Image, Linking, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const developers = [
  {
    nome: "Celeste Mayumi",
    imagem: require('../assets/celeste.png'),
    linkedin: "https://www.linkedin.com/in/celestetanaka/",
    github: "https://github.com/celestemayumi"
  },
  {
    nome: "Lívia Lopes",
    imagem: require('../assets/livia.png'),
    linkedin: "https://www.linkedin.com/in/liviamarianalopes/",
    github: "https://github.com/LiviaMarianaLopes"
  },
  {
    nome: "Luana Vieira",
    imagem: require('../assets/luana.png'),
    linkedin: "https://www.linkedin.com/in/luana-vieira-a093b5289/",
    github: "https://github.com/luacttau"
  }
];

export default function TelaDevs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Desenvolvedoras</Text>
      {developers.map((dev, index) => (
        <View key={index} style={styles.card}>
          <Image source={dev.imagem} style={styles.image} />
          <Text style={styles.name}>{dev.nome}</Text>
          <View style={styles.links}>
            <TouchableOpacity onPress={() => Linking.openURL(dev.linkedin)}>
              <Image
                source={{ uri: 'https://logopng.com.br/logos/linkedin-83.png' }}
                style={[styles.icon, { width: 30, height: 30 }]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(dev.github)}>
              <Image
                source={{ uri: 'https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png' }}
                style={[styles.icon, { width: 30, height: 30 }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f8fafc',
    marginBottom: 5,
  },
  links: {
    flexDirection: 'row',
    gap: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
});
