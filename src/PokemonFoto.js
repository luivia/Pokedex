import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, Button, View, Image} from 'react-native';
import {pegarPokemon} from './services/PokemonService';
import {capitalize, getColorFromType} from './util';

export default props => {
  let id = props.route.params.id
  let pokemon = pegarPokemon(id);
  let name = capitalize(pokemon.name);
  let typeColor = getColorFromType(pokemon.types[0]);

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
      <View style={styles.fotoContainer}>
        <Image style={styles.foto} source={{uri: pokemon.image}} />
      </View>
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
  botaoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 15,
  },
  fotoContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginBotton: 10,
    overflow: 'hidden',
    borderRadius: 150,
  },
  foto: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: 'contain',
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
});