import { readonly } from '@vue/reactivity'
import UserModule from './user'
import GlobalModule from './global'

export default readonly({
  User: UserModule,
  Global: GlobalModule
})