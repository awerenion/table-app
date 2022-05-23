import * as TYPES from './types'
import { generateName, generateNumber } from '@/utils/utils'

export const setRows = ({ commit }) => {
  const rows = Array.from({ length: 50 }, (item, key) => {
    item = {
      id: key,
      name: generateName(),
      price: generateNumber(null, 0.01, 1000),
      amount: generateNumber('int', 1, 100)
    }
    item.total = (item.price * item.amount).toFixed(2)
    return item
  })
  commit(TYPES.SET_ROWS, rows)
}
