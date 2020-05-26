<template>
  <v-app id="app">
    <v-app-bar 
      dense
      color="white"
      app
    >
    
    <!-- Title -->
    <v-toolbar-title class="mt-2"> CE-BU 8 | Grader </v-toolbar-title>

    <!-- tabs menu -->
    <template v-slot:extension>
        <v-tabs align-with-title id="nav" slider-color="success">
          <v-tab to="/">Home</v-tab>
          <v-tab to="/coding">Coding</v-tab>
          <v-tab to="/submission">Submissions</v-tab>   
          <v-tab to="/task">Tasks</v-tab>      
        </v-tabs>
      </template>
     
    <v-spacer></v-spacer> 
    <v-menu 
        bottom
        left
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
          
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.v-toolbar__title{
   
   font-weight: bold;
    color: #42b983;
}

#nav {
  a {
    font-weight: bold;
    color: black;
    text-decoration-line: none; /* remove underline */


    &.v-tab--active {
      color: #42b983;
    }
  }
  
}

</style>

<script>

export default {
  
}
</script>