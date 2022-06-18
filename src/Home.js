import React, { useState, useEffect } from 'react'
import Icon from 'react-native-ionicons'
import {StyleSheet, View, Text, TextInput, Image, ActivityIndicator, FlatList} from 'react-native'

import PokemonCard from './PokemonCard'
import {pegarPokemons} from './services/PokemonService'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 25,
    paddingBottom: 0,
    backgroundColor: '#fff'
  },
  imgPokeball: {
    zIndex: -1,
    opacity: 0.025,
    width: 400,
    height: 400,
    position: 'absolute',
    alignSelf: 'auto',
    top: -200
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  text1: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 10,
  },
  list: {
    marginTop: 45,
  }
});

const styleSearchBar = StyleSheet.create({
  input: {
    padding: 20,
    paddingLeft: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 50
  },
  icon: {
    color: '#747476',
    position: 'absolute',
    top: 20,
    left: 20,
    bottom: 22,
    fontFamily: 'Ionicons',
    fontSize: 22
  },
});

const App = props => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => {
    carregarDados()
  }, []);
  
  const carregarDados = () => { 
    pegarPokemons()
    .then(pokemons =>{
      setData(pokemons)
      setLoading(false)
    }) 
  }

  const abrirDetalhe = id => {
    props.navigation.navigate('Detalhes', {id})
  };

  const jsxPokemon = () => (
    <View style={styles.container}>
      <Image style={styles.imgPokeball}
        source={require('../assets/pokeball.png')} />
      <Text style={styles.title}>Pokédex</Text>
      <Text style={styles.text1}>Pesquise um Pokemon pelo nome ou usando um número da National Pokedex.</Text>
      <View>
        <TextInput style={styleSearchBar.input} placeholder="Qual Pokemon você está procurando?"
          placeholderTextColor="#747476"
          value={q} onChangeText={setQ}
        />
        <Icon android="md-search" name="Pesquisa" style={styleSearchBar.icon} />
      </View>
      <FlatList
        data={dataFiltrado}
        renderItem={Item}
      />
    </View>
  )

  const Item = props => {
    return (
      <PokemonCard
        id={props.item.id}
        name={props.item.name} 
        image={props.item.image}
        types={props.item.types}
        onPress={abrirDetalhe}
        description={props.item.description}
        training={props.item.training}
        key={props.indexOf}
      />
    )}

  const jsxLoading = () => (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );

  let dataFiltrado;
  if (q == '') {
    dataFiltrado = data
  } else {
    dataFiltrado = []
    let q2 = q.toUpperCase()
    for (let key in data) {
      let texto = `${data[key].id} ${data[key].name}`;
      if (texto.toUpperCase().indexOf(q2) >= 0) {
        dataFiltrado.push(data[key])
      }
    }
  }

  /*
  if (loading) {
    return jsxLoading()
  } else {
    return jsxPokemon()
  }*/
  return loading ? jsxLoading() : jsxPokemon();
};

export default App;