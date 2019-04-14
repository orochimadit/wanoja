<template>
  <form>
         <v-text-field
      v-model="id_pesanan"
      :error-messages="idPesananErrors"
      :counter="10"
      label="Id Pesanan"
      required
      @input="$v.id_pesanan.$touch()"
      @blur="$v.id_pesanan.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <!-- <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field> -->
    <v-select
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      label="Metode Pembayaran"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>
     <v-text-field
      v-model="transfer_via_bank"
      :error-messages="transferViaBankErrors"
      :counter="1"
      label="Transfer Via Bank"
      required
      @input="$v.transfer_via_bank.$touch()"
      @blur="$v.transfer_via_bank.$touch()"
    ></v-text-field>
      <v-text-field
      v-model="jumlah_transfer"
      :error-messages="jumlahTransferErrors"
      :counter="10"
      label="Jumlah Transfer"
      required
      @input="$v.jumlah_transfer.$touch()"
      @blur="$v.jumlah_transfer.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="no_rekening"
      :error-messages="noRekeningErrors"
      :counter="10"
      label="No Rekening/Atas Nama"
      required
      @input="$v.no_rekening.$touch()"
      @blur="$v.no_rekening.$touch()"
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>
   
    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import Vue from 'vue'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'


  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      id_pesanan: { required, maxLength: maxLength(10) },
      transfer_via_bank: { required, maxLength: maxLength(10) },
      jumlah_transfer: { required, maxLength: maxLength(10) },
      no_rekening: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        }
      }
    },

    data: () => ({
      name: '',
      email: '',
      id_pesanan:'',
      transfer_via_bank:'',
      no_rekening:'',
      jumlah_transfer:'',
      select: null,
      items: [
        'Bank Syariah Mandiri 131 00 13794138',
        'BCA 4371608561',
        'BRI 2105 01 004951 502',
        'BNI SYARIAH 0332797905',
        'Muamalat 110 000 3930',
        'Bank SYariah Mandiri 7105696706',
        'Tunai Deposit Awal Dll',
      ],
      checkbox: false
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      idPesananErrors () {
        const errors = []
        if (!this.$v.id_pesanan.$dirty) return errors
        !this.$v.id_pesanan.maxLength && errors.push('harus id pesanan valid')
        !this.$v.id_pesanan.required && errors.push('id pesanan valid is required')
        return errors
      },
      transferViaBankErrors() {
        const errors = []
        if (!this.$v.transfer_via_bank.$dirty) return errors
        !this.$v.transfer_via_bank.maxLength && errors.push('Transfer Via Bank harus valid')
        !this.$v.transfer_via_bank.required && errors.push('Transfer via bank is required')
        return errors
      },
      jumlahTransferErrors () {
        const errors = []
        if (!this.$v.jumlah_transfer.$dirty) return errors
        !this.$v.jumlah_transfer.maxLength && errors.push('Jumlah Transfer Harus Valid')
        !this.$v.jumlah_transfer.required && errors.push('Jumlah Transfer is required')
        return errors
      },
      noRekeningErrors () {
        const errors = []
        if (!this.$v.jumlah_transfer.$dirty) return errors
        !this.$v.jumlah_transfer.maxLength && errors.push('No rekening Harus Valid')
        !this.$v.jumlah_transfer.required && errors.push('No rekening is required')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.id_pesanan = ''
        this.name = ''
        this.metode_pembayaran = ''
        this.transfer_via_bank = ''
        this.jumlah_transfer = ''
        this.no_rekening = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      }
    }
  }
</script>
