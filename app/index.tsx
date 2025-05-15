import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { listarProdutos, excluirProduto } from '../utils/storage'
import { Link, useRouter } from 'expo-router'

export default function Home() {
  const [produtos, setProdutos] = useState([])
  const router = useRouter()

  const carregarProdutos = async () => {
    const dados = await listarProdutos()
    setProdutos(dados)
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  const confirmarExclusao = async (index) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            await excluirProduto(index)
            carregarProdutos()
          },
          style: 'destructive',
        },
      ]
    )
  }

  const editarProduto = (index) => {
    router.push(`/cadastro?editIndex=${index}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos cadastrados:</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>{item.nome}</Text>

            <Text style={styles.label}>Fabricado em:</Text>
            <Text style={styles.value}>{item.dataFabricacao}</Text>

            <Text style={styles.label}>Validade:</Text>
            <Text style={styles.value}>{item.validade}</Text>

            <Text style={styles.label}>Quantidade:</Text>
            <Text style={styles.value}>{item.quantidade}</Text>

            <Text style={styles.label}>Lote:</Text>
            <Text style={styles.value}>{item.lote}</Text>

            <Text style={styles.label}>Cód. de Barras:</Text>
            <Text style={styles.value}>{item.codigoBarras}</Text>

            <Text style={styles.label}>Estado de origem:</Text>
            <Text style={styles.value}>{item.estado}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.editButton} onPress={() => editarProduto(index)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={() => confirmarExclusao(index)}>
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Link href="/cadastro" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Cadastrar novo</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/about" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>Desenvolvedores</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 14,
  },
  value: {
    marginBottom: 6,
    color: '#333',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
