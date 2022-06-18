import React, {useEffect} from 'react';
import {Text, StyleSheet, ScrollView, Button, View, Image} from 'react-native';

import {pegarPokemon} from './services/PokemonService';
import {capitalize, getColorFromType} from './util';

export default props => {
  let id = props.route.params.id
  let pokemon = pegarPokemon(id);
  let name = capitalize(pokemon.name);
  let type = [];
  let typeColor = getColorFromType(pokemon.types[0]);

  for (let key in pokemon.types) {
    type.push(
      <Text style={styles.type} key={key}>
        {pokemon.types[key]}
      </Text>,
    );
  }


  const botaoVoltar = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    props.navigation.setOptions({title: name});
  });

  return (
    <ScrollView style={[styles.container, {backgroundColor: typeColor}]}>
      <Image
        style={styles.pokeball}
        source={require('../assets/pokeball.png')}
      />
      <Text style={styles.texto}>{name}</Text>
      <View style={styles.typeContainer}>{type}</View>
      <Text style={styles.description}>Description</Text>
      <Text style={styles.descriptionText}>{pokemon.description}</Text>
      <Text style={styles.dataText}>Species: {pokemon.species}</Text>
      <Text style={styles.dataText}>Height: {pokemon.height}</Text>
      <Text style={styles.dataText}>Weight: {pokemon.weight}</Text>
      <View style={styles.botaoContainer}>
        <Button style={styles.botao} onPress={botaoVoltar} title="Voltar" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBotton: 15,
    flex: 1,
  },
  texto: {
    fontSize: 40,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  botaoContainer: {
    flex: 1,
    
    justifyContent: 'center',
    marginVertical: 15,
  },
  type: {
    color: '#FFFFFF',
    fontSize: 15,
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginRight: 5,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  pokeball: {
    zIndex: -1,
    opacity: 0.15,
    width: 2000,
    height: 2000,
    position: 'absolute',
    tintColor: '#FFF',
    resizeMode: 'repeat',
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  descriptionText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  dataText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});