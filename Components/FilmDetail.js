//Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView } from 'react-native'
import { getImageFromApi, getFilmDetailFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
      isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
    }
  }

  componentDidMount() {
      getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false
        })
      })
  }

  _displayFilm() {
    const { film } = this.state
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image style={styles.image} source={{ uri: getImageFromApi(film.backdrop_path) }}/>
          <Text style={styles.text_title}>{this.state.film.title}</Text>
          <Text style={styles.text_descr}>{film.overview}</Text>
          <Text style={styles.text_default}>Sorti le : {film.release_date}</Text>
          <Text style={styles.text_default}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.text_default}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.text_default}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.text_default}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}</Text>
          <Text style={styles.text_default}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}</Text>
        </ScrollView>
      )
    }
  }

  _displayLoading(){
    if (this.state.isLoading){
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
          {
            /* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */
          }
        </View>
      )
    }
  }

  render(){
    console.log("Component FilmDetail rendu")
    return(
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container:{
    flex: 1
  },
  loading_container:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image:{
    width: '100%',
    height: 180,
    margin: 5
  },
  text_title:{
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  text_descr:{
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  text_default:{
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})

export default FilmDetail
