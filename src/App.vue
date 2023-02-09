<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import html2pdf from "html2pdf.js";
</script>

<script>
export default {
  data() {
    return {
      title: 'Tittel',
      description: 'beskrivelse',
      verdier: [ {tittel: '', fokus: ''}],
      hendelser : [ {hendelse: '', situasjon: '', action: ''}]
    }
  },
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById("preview"), {
        margin: 1,
        filename: "ros.pdf",
      });
    },
    //  export json
    exportJson() {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(this, null, 2)], {
        type: "application/json"
      }));
      a.setAttribute("download", "data.json");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
      edit.style.width = '100%'
      edit.style.display = 'block';
      preview.style.display = 'none';
    },
    fullPreview() {
      let edit = document.getElementById('edit');
      let preview = document.getElementById('preview');
      preview.style.width = '100%'
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

    <button @click="save">Save</button>
    <button @click="load">Load</button>
    <button @click="fullEdit">Edit view</button>
    <button @click="fullPreview">Preview view</button>
    <button @click="sideBySide">Side-by-side</button>
    <button @click="exportJson">Save as Json</button>
    <button @click="exportToPDF">Save as pdf</button>
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
  <button @click="verdier.push({tittel: '', fokus: ''})">Legg til</button>
    <table>
    <tr v-for="hendelse in hendelser">
      <td><input v-model="hendelse.hendelse"></td>
      <td><input v-model="hendelse.situasjon"></td>
      <td><input v-model="hendelse.action"></td>
      <td><button @click="hendelser.splice(hendelser.indexOf(hendelse), 1)">X</button></td>
    </tr>
    </table>
    <button @click="verdier.push({tittel: '', fokus: ''})">Legg til</button>



<!--    Nr.
    Hendelse
    Eksisterende tiltak
    Anbefalte nye tiltak-->



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
  <table class="matrix">
    <tr>
      <td>Svært stor</td>
      <td class="yellow"></td>
      <td class="yellow"></td>
      <td class="red"></td>
      <td class="red"></td>
      <td class="red"></td>
    </tr>
    <tr>
      <td>Stor</td>
      <td class="green"></td>
      <td class="yellow"></td>
      <td class="yellow"></td>
      <td class="red"></td>
      <td class="red"></td>
    </tr>
    <tr>
      <td>Moderat</td>
      <td class="green"></td>
      <td class="green"></td>
      <td class="yellow"></td>
      <td class="red"></td>
      <td class="red"></td>
    </tr>
    <tr>
      <td>Liten</td>
      <td class="green"></td>
      <td class="green"></td>
      <td class="yellow"></td>
      <td class="yellow"></td>
      <td class="red"></td>
    </tr>
    <tr>
      <td>Liten</td>
      <td class="green"></td>
      <td class="green"></td>
      <td class="yellow"></td>
      <td class="yellow"></td>
      <td class="yellow"></td>
    </tr>
    <tr>
      <td></td>
      <td>Ubetydelig</td>
      <td>Lav</td>
      <td>Moderat</td>
      <td>Alvorlig</td>
      <td>Svært alvorlig</td>
    </tr>
  </table>
  </div>
</template>

<style scoped>


table.matrix  {
  table-layout: fixed;
  width : 100%;
}
table.matrix td {
  border: 1px solid black;
  overflow: hidden;
}
td.yellow {
  background: yellow;
}
td.green {
  background: green;
}
td.red {
  background: red;
}

nav {
  background: #2c3e50;
  height: 30px;
  width: 100%;
  padding: 0 2rem;
  z-index: 1000;
  top: 0;
  position: fixed;


}
table {
  border-collapse: collapse;
  width: 100%;
}

input {
  width: 100%;
}

div.preview, div.edit {
  background-color: lightgreen;
  margin: 30px 0;

  width: 50%;
  float: left;
  padding: 2rem;
}

div.preview {
  background: lightgoldenrodyellow;
  #padding: 5px;
  #resize: both;
  #overflow: auto;
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
