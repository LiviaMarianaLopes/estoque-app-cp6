import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@produtos'

export async function salvarProduto(novoProduto) {
  const produtos = await listarProdutos()
  produtos.push(novoProduto)
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos))
}

export async function listarProdutos() {
  const json = await AsyncStorage.getItem(STORAGE_KEY)
  return json ? JSON.parse(json) : []
}

export async function atualizarProdutos(listaAtualizada) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada))
}

export async function excluirProduto(index) {
  const produtos = await listarProdutos()
  produtos.splice(index, 1)
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos))
}
