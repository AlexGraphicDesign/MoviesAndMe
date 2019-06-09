// Components/Search.js

import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'; // import { } from ... car c'est un export nommé dans TMDBApi.js

class Search extends React.Component{

  constructor(props){
    super(props)
      // Ici on va créer les propriétés de notre component custom Search
      this.searchedText = "" //Initialisation en dehors du state de notre donnée searchedText
      this.page = 0 // compteur page courante
      this.totalPages = 0 //Nombre total de pages
      this.state = {
        films: [],
        isLoading: false //Par défaut à false, pas de chargement tant qu'on ne lance pas la recherche
      }
  }

  _searchTextInputChanged(text){
    this.searchedText = text
  }

  _loadFilms() {
    if (this.searchedText.length > 0){ //seulement si le texte cherché n'est pas vide
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films: [...this.state.films, ...data.results],
          isLoading: false //Arrêt chargement
        })
      });
    }
  }

  _searchFilms(){
    //On va remettre à 0 les films de notre state
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => {
      // J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
      this._loadFilms()
    })
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

  render() {
    console.log(this.state.isLoading)
    return (
      <View style={styles.main_container}>
        <TextInput
        style={styles.textinput}
        placeholder="Titre du film"
        onChangeText={(text) => this._searchTextInputChanged(text)}
        onSubmitEditing={() => this._searchFilms()}
        />
        <Button title="Rechercher" onPress={() => this._searchFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor = {(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages){
              this._loadFilms()
            }
          }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    main_container:{
      flex: 1,
      marginTop: 20
    },
    textinput:{
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    },
    loading_container:{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
})

export default Search
