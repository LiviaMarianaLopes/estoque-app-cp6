import RNPickerSelect from 'react-native-picker-select'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native'
import {
  salvarProduto,
  listarProdutos,
  atualizarProdutos,
} from '../utils/storage'

export default function Cadastro() {
  const router = useRouter()
  const { editIndex } = useLocalSearchParams()

  const [produto, setProduto] = useState({
    nome: '',
    dataFabricacao: '',
    validade: '',
    quantidade: '',
    lote: '',
    codigoBarras: '',
    estado: '',
  })

  useEffect(() => {
    const carregarProdutoParaEdicao = async () => {
      if (editIndex !== undefined) {
        const produtos = await listarProdutos()
        const index = parseInt(editIndex as string, 10)
        if (!isNaN(index) && produtos[index]) {
          setProduto(produtos[index])
        }
      }
    }

    carregarProdutoParaEdicao()
  }, [editIndex])

  const handleChange = (field: string, value: string) => {
    setProduto({ ...produto, [field]: value })
  }

  const salvar = async () => {
    const camposObrigatorios = Object.entries(produto).every(([_, valor]) => valor)
    if (!camposObrigatorios) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.')
      return
    }

    if (editIndex !== undefined) {
      const index = parseInt(editIndex as string, 10)
      const produtos = await listarProdutos()
      produtos[index] = produto
      await atualizarProdutos(produtos)
      Alert.alert('Produto atualizado com sucesso!')
    } else {
      await salvarProduto(produto)
      Alert.alert('Produto salvo com sucesso!')
    }

    router.replace('/')
  }


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do produto:</Text>
      <TextInput
        style={styles.input}
        value={produto.nome}
        onChangeText={(value) => handleChange('nome', value)}
        placeholder="Ex: Sabonete líquido"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Data de fabricação:</Text>
      <TextInput
        style={styles.input}
        value={produto.dataFabricacao}
        onChangeText={(value) => handleChange('dataFabricacao', value)}
        placeholder="DD/MM/AAAA"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Prazo de validade:</Text>
      <TextInput
        style={styles.input}
        value={produto.validade}
        onChangeText={(value) => handleChange('validade', value)}
        placeholder="DD/MM/AAAA"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={produto.quantidade}
        onChangeText={(value) => handleChange('quantidade', value)}
        placeholder="Ex: 50"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Lote:</Text>
      <TextInput
        style={styles.input}
        value={produto.lote}
        onChangeText={(value) => handleChange('lote', value)}
        placeholder="Ex: A1B2C3"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Código de barras:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={produto.codigoBarras}
        onChangeText={(value) => handleChange('codigoBarras', value)}
        placeholder="Ex: 7891234567890"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Estado de origem:</Text>
      <RNPickerSelect
        onValueChange={(value) => handleChange('estado', value)}
        placeholder={{ label: 'Selecione um estado', value: null }}
        style={pickerSelectStyles}
        value={produto.estado}
        items={[
          { label: 'Acre (AC)', value: 'AC' },
          { label: 'Alagoas (AL)', value: 'AL' },
          { label: 'Amapá (AP)', value: 'AP' },
          { label: 'Amazonas (AM)', value: 'AM' },
          { label: 'Bahia (BA)', value: 'BA' },
          { label: 'Ceará (CE)', value: 'CE' },
          { label: 'Distrito Federal (DF)', value: 'DF' },
          { label: 'Espírito Santo (ES)', value: 'ES' },
          { label: 'Goiás (GO)', value: 'GO' },
          { label: 'Maranhão (MA)', value: 'MA' },
          { label: 'Mato Grosso (MT)', value: 'MT' },
          { label: 'Mato Grosso do Sul (MS)', value: 'MS' },
          { label: 'Minas Gerais (MG)', value: 'MG' },
          { label: 'Pará (PA)', value: 'PA' },
          { label: 'Paraíba (PB)', value: 'PB' },
          { label: 'Paraná (PR)', value: 'PR' },
          { label: 'Pernambuco (PE)', value: 'PE' },
          { label: 'Piauí (PI)', value: 'PI' },
          { label: 'Rio de Janeiro (RJ)', value: 'RJ' },
          { label: 'Rio Grande do Norte (RN)', value: 'RN' },
          { label: 'Rio Grande do Sul (RS)', value: 'RS' },
          { label: 'Rondônia (RO)', value: 'RO' },
          { label: 'Roraima (RR)', value: 'RR' },
          { label: 'Santa Catarina (SC)', value: 'SC' },
          { label: 'São Paulo (SP)', value: 'SP' },
          { label: 'Sergipe (SE)', value: 'SE' },
          { label: 'Tocantins (TO)', value: 'TO' },
        ]}
      />

      <View style={styles.buttonContainer}>
        <Button title="Salvar produto" onPress={salvar} color="#4CAF50" />
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 6,
  },
  buttonContainer: {
    marginTop: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
})

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#333',
    backgroundColor: '#f5f5f5',
    marginTop: 6,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#333',
    backgroundColor: '#f5f5f5',
    marginTop: 6,
  },
}
