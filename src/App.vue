<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>GitEase</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          v-for="(tab, index) in links"
          :key="index"
          :title="tab.title"
          :to="{ name: tab.link }"
          router
      >
        {{ tab.title }}
      </v-btn>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    links: [
      {
        title: "Push",
        link: "Push", // `routes`の`name`に対応する名前
      },
      {
        title: "Pull",
        link: "Pull", // `routes`の`name`に対応する名前
      }
    ]
  }),
};
</script>
