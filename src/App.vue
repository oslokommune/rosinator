<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<script>
export default {
  data() {
    return {
      title: 'Tittel',
      description: 'beskrivelse',
      verdier: [ {tittel: 'tittel', fokus: 'fokus'}]
    }
  },
  methods: {
    // export text
    exportText() {
      let text = '';
      text += this.title + '\n';
      text += this.description + '\n';
      text += this.verdier.map(verdi => verdi.tittel + ' ' + verdi.fokus).join('\n');
      console.log(text);
    },
    //  export json
    exportJson() {
      let {title, description, verdier} = this;
      console.log(JSON.stringify({title, description, verdier}));
    },
    // save to local storage
    save() {
      let {title, description, verdier} = this;
      localStorage.setItem('title', title);
      localStorage.setItem('description', description);
      localStorage.setItem('verdier', JSON.stringify(verdier));
    },
    // load from local storage
    load() {
      this.title = localStorage.getItem('title');
      this.description = localStorage.getItem('description');
      this.verdier = JSON.parse(localStorage.getItem('verdier'));
    }
  }
}
</script>

<template>
  <div class="edit">
  <h2>Overskrift</h2>
  <input v-model="title">
  <h2>Beskrivelse</h2>
    <textarea v-model="description"></textarea>
    <h2>Verdier</h2>
    <table>
      <tr>
        <th>Tittel</th>
        <th>Fokus</th>
      </tr>
      <tr v-for="verdi in verdier" :key="verdi.tittel">
        <td><input v-model="verdi.tittel"></td>
        <td><input v-model="verdi.fokus"></td>
        <td><button @click="verdier.splice(verdier.indexOf(verdi), 1)">X</button></td>
      </tr>
    </table>
  <button @click="verdier.push({tittel: 'tittel', fokus: 'fokus'})">Legg til</button>
  </div>

  <div class="preview">
  <h1>{{ title }}</h1>
  <pre>{{ description }}</pre>

  <h2>Verdier i løsningen</h2>
  <table class="preview">
    <tr>
      <th>Tittel</th>
      <th>Fokus</th>
    </tr>

    <tr v-for="verdi in verdier" :key="verdi.tittel">
      <td>{{ verdi.tittel }}</td>
      <td>{{ verdi.fokus }}</td>
    </tr>

  </table>
  </div>
  <div>
  <button @click="exportText">Export text</button>
  <button @click="exportJson">Export json</button>
  <button @click="save">Save</button>
  <button @click="load">Load</button>
  </div>
</template>

<!--<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>-->

<style scoped>
table.preview {
  border-collapse: collapse;
  width: 100%;
}

div.preview, div.edit {
  width: 95%
}
button {
  margin: 0 auto;
}
textarea {
  width: 100%;
  height: 100px;
}
pre {
  white-space: pre-wrap;
}
</style>
