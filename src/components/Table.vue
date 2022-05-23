<template>
  <div class="container">
    <div class="header">
      <button
        class="btn-generation"
        @click="generateTable"
      >
        Сгенерировать
      </button>
    </div>
    <table
      class="animation"
      :class="tableIsGenerated ? 'table-visible': 'table-hidden'"
    >
      <thead>
        <tr>
          <th
            v-for="tableCol in $options.TABLE_NAMES"
            :key="tableCol.id"
          >
            {{ tableCol.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.id"
        >
          <td>{{ row.name }}</td>
          <td>{{ row.price | replaceDot }}</td>
          <td>{{ row.amount }}</td>
          <td>{{ row.total | replaceDot }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            Общая стоимость:
          </td>
          <td>{{ finalPrice | replaceDot | getSeparated }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TABLE_NAMES from '@/constants/tableColumnNames'

export default {
  name: 'Table',
  filters: {
    replaceDot: value => {
      return String(value).replace('.', ',')
    },
    getSeparated: value => {
      return String(value).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ' ')
    }
  },
  data () {
    return {
      tableIsGenerated: false
    }
  },
  computed: {
    ...mapGetters(['rows']),

    finalPrice () {
      return this.rows.reduce((acc, res) => acc + Number(res.total), 0).toFixed(2)
    }
  },
  methods: {
    ...mapActions(['setRows']),

    generateTable () {
      this.setRows()
      this.tableIsGenerated = true
    }
  },
  TABLE_NAMES
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}

.header {
  width: 100%;
  margin: 0 auto 10px;
}

.btn-generation {
  border-radius: 10px;
  padding: 10px 25px;
  margin: 0 auto;
  color: $white;
  background: $brown;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

table {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  position: relative;
  border-collapse: collapse;
  background-color: $gray;
}

.table-visible {
  animation-duration: 1s;
  animation-name: showElement;
}

.table-hidden {
  opacity: 0;
}

@keyframes showElement {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

td, th {
  border: 1px solid $gray-dark;
  padding: 20px;
}

th {
  background: $brown;
  color: $white;
  border-radius: 0;
  position: sticky;
  top: 0;
  padding: 10px;
}

tfoot > tr:hover  {
  background-color: $gray-little-dark;
}

tbody > tr:hover {
  background-color: $gray-little-dark;
}
</style>
