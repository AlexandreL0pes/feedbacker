<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>

    <button class="text-4xl text-gray-600 focus:outline-none" @click="close">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>

        <input
          v-model="state.email.value"
          type="email"
          :class="{'border-brand-danget': !!state.email.errorMessage}"
          class="block w-full px-4 py-3 mt-1 bg-gray-100 border 2 border-transparent rounded focus:outline-none"
          placeholder="jane.doe@gmail.com"
        />
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger">
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>

        <input
          v-model="state.password.value"
          type="password"
          :class="{'border-brand-danget': !!state.password.errorMessage}"
          class="block w-full px-4 py-3 mt-1 bg-gray-100 border 2 border-transparent rounded focus:outline-none"
        />
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger">
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button :disabled="state.isLoading" type="submit" :class="{'opacity-50': state.isLoading}"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >Enviar</button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import useModal from '../../hooks/useModal'
import { validateEmptyAndLength3, validateEmptyAndEmail } from '../../utils/validators'

export default {
  setup () {
    const modal = useModal()

    const { value: emailValue, errorMessage: emailErrorMessage } = useField('email', validateEmptyAndEmail)

    const { value: passwordValue, errorMessage: passwordErrorMessage } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErros: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    function handleSubmit () {}
    return {
      state,
      handleSubmit,
      close: modal.close
    }
  }
}
</script>