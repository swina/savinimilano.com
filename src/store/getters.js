const getters = {
  navigation:   state => state.navigation,
  home:         state => state.navigation.home,
  menu_header:  state => state.navigation.menu.header,
  menu_footer:  state => state.navigation.menu.footer,
  pagine:       state => state.navigation.pagine,
  user:         state => state.navigation.user,
  logged:       state => state.navigation.logged,
  sectors:      state => state.products.sectors ,
  categories:   state => state.products.categories,
  products:     state => state.products.products,
}

export default getters
