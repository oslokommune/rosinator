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

    // on data change
    onInput() {
      console.log('onInput');
    },
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
    },
    fullEdit() {
      let edit = document.getElementById('edit');
      let preview = document.getElementById('preview');
      edit.style.width = '195%'
      edit.style.display = 'block';
      preview.style.display = 'none';
    },
    fullPreview() {
      let edit = document.getElementById('edit');
      let preview = document.getElementById('preview');
      preview.style.width = '195%'
      preview.style.display = 'block';
      edit.style.display = 'none';
    },
    sideBySide() {
      let edit = document.getElementById('edit');
      let preview = document.getElementById('preview');
      edit.style.width = '';
      preview.style.width = '';
      preview.style.display = 'block';
      edit.style.display = 'block';
    },
    toggle(id) {
      let elem = document.getElementById(id);
      if (elem.style.display === 'none') {
        elem.style.display = 'block';
      } else {
        elem.style.display = 'none';
      }
    }
  }
}
</script>

<template>

  <nav>
    <button @click="exportText">Export text</button>
    <button @click="exportJson">Export json</button>
    <button @click="save">Save</button>
    <button @click="load">Load</button>
    <button @click="fullEdit">Edit</button>
    <button @click="fullPreview">Preview</button>
    <button @click="sideBySide">Side-by-side</button>
  </nav>

  <div id="edit" class="edit">
  <h2>Overskrift</h2>
  <input class="single" v-model="title">
  <h2>Beskrivelse</h2>
    <textarea v-model="description"></textarea>
    <h2>Verdier</h2>
    <button @click="toggle('values')">?</button>
    <p id="values">Verdiene i løsningen man ønsker å beskytte (skrive noe mer om K I T) og hva det betyr</p>




    <table>
      <tr>
        <th>Tittel</th>
        <th>Fokus</th>
      </tr>
      <tr v-for="verdi in verdier">
        <td><input v-model="verdi.tittel"></td>
        <td><input v-model="verdi.fokus"></td>
        <td><button @click="verdier.splice(verdier.indexOf(verdi), 1)">X</button></td>
      </tr>
    </table>
  <button @click="verdier.push({tittel: 'tittel', fokus: 'fokus'})">Legg til</button>
  </div>

  <div id="preview" class="preview">
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

nav {
  background: #2c3e50;
  height: 30px;
  width: 50%;
  padding: 0 2rem;
  z-index: 1000;
  top: 0;
  position: fixed;
  left: 25%;

}
table {
  border-collapse: collapse;
  width: 100%;
}

input {
  width: 100%;
}

div.preview, div.edit {
  margin-top: 30px;
  width: 95%
}

div.preview {
  background: lightgoldenrodyellow;
  padding: 5px;
  resize: both;
  overflow: auto;
}


textarea {
  width: 100%;
  height: 300px;
  resize: none;
}
pre {
  white-space: pre-wrap;
}
</style>
