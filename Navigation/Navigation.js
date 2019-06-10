//Navigation/navigation.js

import { createStackNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'

const SearchStackNavigator = createStackNavigator({
  Search: { //On appelle la vue 'Search'
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail:{ //Vue 'FilmDetail
    screen: FilmDetail
  }
})

export default createAppContainer(SearchStackNavigator)
