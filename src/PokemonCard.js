import React from 'react';
import {StyleSheet, Text, TouchableHighlight, Image, View} from 'react-native';

import {capitalize, getColorFromType} from './utils'


const styles = StyleSheet.create({
  container: {
    height: 130,
    padding: 20,
    overflow: 'hidden',
    marginBottom: 5,
    borderRadius: 15,
  },
  id: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgba(23, 23, 27, 0.3)',
  },
  name: {
    marginBottom: 5,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  pokemon: {
    width: 115,
    height: 115,
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  pokeball: {
    opacity: 0.15,
    width: 150,
    height: 150,
    position: 'absolute',
    right: -15,
    bottom: -15,
    tintColor: '#FFF',
  },
});

const styles2 = {
  container: {
    flexDirection: 'row',
  },
  type: {
    color: '#FFF',
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginRight: 5,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
};



const PokemonCard = props => {
  let type = [];
  for (let key in props.types) {
    type.push(<Text style={styles2.type} key={key}>{props.types[key]}</Text>);
  }

  let name = capitalize(props.name);
  let id = '#' + ('000' + props.id).slice(-3);

  let typeColor = getColorFromType(props.types[0]);
  
  return (
    <TouchableHighlight onPress={() => props.onPress(props.id)}>
      <View style={[styles.container, {backgroundColor: typeColor}]}>
        <Image
          style={styles.pokemon}
          source={{
            uri: props.image,
          }}
        />
        <Text style={styles.id}>{id}</Text>
        <Text style={styles.name}>{name}</Text>
        <Image
          style={styles.pokeball}
          source={require('../assets/pokeball.png')}
        />
        <View style={styles2.container}>{type}</View>
      </View>
    </TouchableHighlight>
  );
};

export default PokemonCard;