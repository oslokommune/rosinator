<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import MatrixTable   from "./components/MatrixTable.vue";
import html2pdf from "html2pdf.js";
</script>

<script>
export default {
  data() {
    return {
      title: 'Tittel',
      description: 'beskrivelse',
      verdier: [ {tittel: '', fokus: ''}],
      hendelser : [ {hendelse: '', situasjon: '', action: '', sannsynlighet: '', konsekvens: ''}]
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
    //export json to console
    exportJsonToConsole() {
      console.log(JSON.stringify(this, null, 2));
    },
    // save to local storage
    save() {
      let {title, description, verdier, hendelser} = this;
      localStorage.setItem('title', title);
      localStorage.setItem('description', description);
      localStorage.setItem('verdier', JSON.stringify(verdier));
      localStorage.setItem('hendelser', JSON.stringify(hendelser));
    },
    // load from local storage
    load() {
      this.title = localStorage.getItem('title');
      this.description = localStorage.getItem('description');
      this.verdier = JSON.parse(localStorage.getItem('verdier'));
      this.hendelser = JSON.parse(localStorage.getItem('hendelser'));
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
    },
    pushHendelse() {
      // create if empty
      if (!this.hendelser) {
        this.hendelser = [];
      }
      // push
      this.hendelser.push({hendelse: '', situasjon: '', action: '', sannsynlighet: '', konsekvens: ''});
    },
    pushVerdi() {
      // create if empty
      if (!this.verdier) {
        this.verdier = [];
      }
      // push
      this.verdier.push({tittel: '', fokus: ''});
    },
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
    <button @click="exportJsonToConsole">Dump Json to console</button>
  </nav>
  <div id="edit" class="edit">
  <h2>Overskriften til rosen</h2>
  <input class="single" v-model="title">
  <h2>Beskrivelse av løsningen</h2>
    <textarea class="long-text" v-model="description"></textarea>
    <h2>Verdier som skal beskyttes</h2>
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
  <button @click="pushVerdi">Legg til</button>
    <table>
    <tr>
      <th>Nr.</th>
      <th>Hendelse</th>
      <th>Eksisteredne tiltak</th>
      <th>Planlagte tiltak</th>
      <th>Sannsynlighet</th>
      <th>Konsekvens</th>
    </tr>
    <tr v-for="(hendelse, index) in hendelser">
      <td>{{ index + 1 }}</td>
      <td><textarea class="medium-text" v-model="hendelse.hendelse"></textarea></td>
      <td><textarea class="medium-text" v-model="hendelse.situasjon"> </textarea></td>
      <td><textarea class="medium-text" v-model="hendelse.action"></textarea></td>
      <td>
        <select v-model="hendelse.sannsynlighet">
        <option value="1">Meget Liten</option>
        <option value="2">Liten</option>
        <option value="3">Moderat</option>
        <option value="4">Stor</option>
        <option value="5">Svært stor</option>
      </select>
      </td>
      <td>
        <select v-model="hendelse.konsekvens">
        <option value="1">Ubetydelig</option>
        <option value="2">Lav</option>
        <option value="3">Moderat</option>
        <option value="4">Alvorlig</option>
        <option value="5">Svært alvorlig</option>
      </select></td>
      <td><button @click="hendelser.splice(hendelser.indexOf(hendelse), 1)">X</button></td>
    </tr>
    </table>
    <button @click="pushHendelse">Legg til</button>



  </div>

  <div id="preview" class="preview">
  <h1>{{ title }}</h1>
  <pre>{{ description }}</pre>

  <h2>Verdier i løsningen</h2>
  <table class="data">
    <tr>
      <th>Tittel</th>
      <th>Fokus</th>
    </tr>

    <tr v-for="verdi in verdier" :key="verdi.tittel">
      <td>{{ verdi.tittel }}</td>
      <td>{{ verdi.fokus }}</td>
    </tr>

  </table>
<h2>Identifiserte hendelser</h2>
    <table class="data">
      <tr>
        <th>Hendelse</th>
        <th>Eksisterende tiltak</th>
        <th>Planlagte tiltak</th>
      </tr>

      <tr v-for="hendelse in hendelser">
        <td>{{ hendelse.hendelse }}</td>
        <td>{{ hendelse.situasjon }}</td>
        <td>{{ hendelse.action }}</td>
      </tr>

    </table>
  <h2>Vurdert risiko med eksisterende tiltak</h2>
    <table class="matrix">
      <tr>
        <td>Svært stor</td>
        <td class="yellow">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '1'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="yellow">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '2'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="red">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '3'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="red">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '4'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="red">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '5'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Stor</td>
        <td class="green">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '1'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="yellow">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '2'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="yellow">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '3'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="red">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '4'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="red">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '5'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Moderat</td>
        <td class="green">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '1'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="green">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '2'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="yellow">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '3'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="red">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '4'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="red">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '5'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Liten</td>
        <td class="green">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '1'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="green">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '2'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="yellow">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '3'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="yellow">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '4'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="red">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '5'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
      </tr>
      <tr>
        <td>Meget Liten</td>
        <td class="green">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '1'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="green">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '2'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="yellow">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '3'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="yellow">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '4'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
        <td class="yellow">
          <ul class="comma-list">
            <template v-for="(hendelse, index) in hendelser">
              <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '5'">
                {{ index + 1 }}
              </li>
            </template>
          </ul>
        </td>
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
<!--     <MatrixTable :hendelser="hendelser"></MatrixTable>-->
  </div>
</template>

<style scoped>

ul.comma-list {
  display: inline;
  list-style: none;
}

.comma-list li {
  display: inline;
  font-weight: bold;
  color: #0a0ab9;

}

.comma-list li::after {
  content: ", ";
}
.comma-list li:last-child::after {
  content: "";
}

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

table.data {
  border: solid 1px black;
  margin: 15px 0;

}

table.data td, table.data th {
  border: solid 2px black;
  padding: 5px;
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

textarea.long-text {
  width: 100%;
  height: 300px;
  resize: none;
}

textarea.medium-text {
  width: 100%;
  height: 50px;
  resize: none;
}

pre {
  white-space: pre-wrap;
}
</style>
