<template>
  <div class="page">
    <a-page-header bordered title="Todo List" />

    <a-button class="btn" @click="showModal(null)">Add</a-button>

    <a-table bordered :data-source="tasks" :columns="columns" :row-key="task => task.id" :loading="loading"
      :pagination="false">
      <template slot="status" slot-scope="task">
        <a-select v-model="task.status">
          <a-select-option value="done">
            Done
          </a-select-option>
          <a-select-option value="cancel">
            Cancel
          </a-select-option>
          <a-select-option value="new">
            New
          </a-select-option>
        </a-select>
      </template>
      <template slot="date" slot-scope="date">
        {{ new Date(date).toLocaleString('ru') }}
      </template>
      <template slot="actions" slot-scope="task">
        <a-button @click="showModal(task)">
          <img src="@/assets/images/icons/edit.svg" alt="edit">
        </a-button>
        <a-button style="margin-left: 8px;" @click="deleteTask(task)">
          <img src="@/assets/images/icons/delete.svg" alt="delete">
        </a-button>
      </template>
    </a-table>

    <a-modal title="Todo Item" :visible="modalVisible" :confirm-loading="confirmLoading" @ok="handleOk"
      @cancel="handleCancel">
      <a-form-model :model="form">
        <a-form-model-item label="Name">
          <a-input v-model="form.label" placeholder="Enter todo name" />
        </a-form-model-item>
        <a-form-model-item label="Activity zone">
          <a-select v-model="form.status" placeholder="Please select status">
            <a-select-option value="done">
              Done
            </a-select-option>
            <a-select-option value="cancel">
              Cancel
            </a-select-option>
            <a-select-option value="new">
              New
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { Button, PageHeader, Table, Input } from 'ant-design-vue';
import { mapGetters } from 'vuex'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: '6%',
  },
  {
    title: 'Name',
    dataIndex: 'label',
    width: '20%',
    scopedSlots: { customRender: 'label' },
  },
  {
    title: 'Status',
    width: '30%',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: 'Date',
    dataIndex: 'created_at',
    scopedSlots: { customRender: 'date' },
  },
  {
    title: 'Actions',
    scopedSlots: { customRender: 'actions' },
  },
];

export default {
  name: 'IndexPage',

  components: {
    AButton: Button,
    APageHeader: PageHeader,
    ATable: Table,
    AInput: Input
  },

  data() {
    return {
      loading: false,
      modalVisible: false,
      confirmLoading: false,
      edit: false,
      form: {
        label: 'Новая задача',
        status: 'new',
      },
      columns
    }
  },

  computed: {
    ...mapGetters(['tasks']),
  },

  methods: {
    handleOk() {
      this.confirmLoading = true;

      setTimeout(() => {
        this.modalVisible = false;
        this.confirmLoading = false;
        if (this.edit) {
          this.$store.dispatch('updateTask', this.form);
        } else {
          this.$store.dispatch('addTask', this.form);
        }
      }, 500);
    },

    showModal(editItem) {
      this.edit = false;
      if (editItem) {
        this.edit = true;
        this.form = { ...editItem };
      } else {
        this.form = {
          label: 'Новая задача',
          status: 'new',
        };
      }

      this.modalVisible = true;
    },

    handleCancel() {
      this.modalVisible = false;
    },

    deleteTask(item) {
      this.$store.dispatch('deleteTask', item);
    },
  },
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  max-width: 800px;
  margin: auto;
  padding-top: 60px;
}

.btn {
  display: flex;
  align-items: center;
  margin: 0 0 16px auto;
}
</style>