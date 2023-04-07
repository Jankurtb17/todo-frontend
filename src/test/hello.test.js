import { inputNumberEmits } from "element-plus"
import { test, expect} from "vitest"

const sum = (...num) => {
  return num.reduce((a,b) => a+b, 0)
}

test("1 + 1", () => {
  expect(1+1).toEqual(2)
})

test("5 numbers", () => {
  expect(sum(1,2,3,4,5,6,7,8,9,10)).toEqual(55)
})

