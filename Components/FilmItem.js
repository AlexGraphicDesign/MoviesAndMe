import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi'; // import { } from ... car c'est un export nommé dans TMDBApi.js

class FilmItem extends React.Component {
  render(){
    const film = this.props.film
    return (
      <View style={styles.main_container}>
        <Image style={styles.image} source={{uri: getImageFromApi(film.poster_path)}}/>
        <View style={styles.main_content}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.descr_container}>
            <Text style={styles.descr_text} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le : {film.release_date}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    main_container:{
      flexDirection: 'row',
      height: 190,
      margin: 5
    },
    main_content:{
      flex: 1,
      margin: 5
    },
    image:{
      width: 120,
      height: 180,
      margin: 5
    },
    header_container:{
      flexDirection: 'row',
      flex: 3
    },
    title_text:{
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5
    },
    vote_text:{
      fontSize: 26,
      fontWeight: 'bold',
      color: '#666666'
    },
    descr_container:{
      flex: 7
    },
    descr_text:{
      fontStyle: 'italic',
      color: '#666666'
    },
    date_container:{
      flex: 1,
    },
    date_text:{
      fontSize: 14,
      textAlign: 'right'
    }
})

export default FilmItem
