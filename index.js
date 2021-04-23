const fi = (function () {
  return {
    libraryMethod: function () {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function (obj, fn) {
      Object.keys(obj).forEach(k => { fn(obj[k]) });
      return obj
      // let result = Object.keys(obj).reduce((r, k) => {
      //   fn(obj[k])
      //   r[k] = obj[k]
      //   return r
      // }, {});
      // if(Array.isArray(obj)) result = Object.values(result)
      // return result
    },

    map: function (obj, fn) {
      let result = {};
      Object.keys(obj).forEach(k => result[k] = fn(obj[k]))
      return Object.values(result)
    },

    reduce: function (obj, fn, acc) {
      const arr = !!acc ? obj : obj.slice(1)
      if (!acc) acc = obj.slice(0, 1)[0]
      for (const el of arr) acc = fn(acc, el, obj)
      return acc
      // const objKeys = Object.keys(obj)
      // let i = 0
      // if(!acc) {acc = obj[objKeys[0]]; i = 1}
      // if(typeof acc !== "number") {acc = Object.values(acc)[0]}
      // for(; i < objKeys.length; i++) {
      //   acc = fn(acc, obj[objKeys[i]], obj)
      // }
      // return acc
    },

    find: function (obj, cb) {
      const arr = Object.keys(obj)
      for (const el in arr) {
        if (cb(obj[el])) {
          return Array.isArray(obj) ? obj[el] : { el: obj[el] }
        }
      }
      // for(const el of arr) {
      //   if(cb(el)) {
      //     return el
      //   }
      // }
    },

    filter: function (obj, cb) {
      const arr = Object.keys(obj)
      const result = []
      for (const el of arr) {
        if (cb(obj[el])) {
          result.push(obj[el])
        }
      }
      return result
      // const result = []
      // for(const el of arr) {
      //   if(cb(el)) {
      //     result.push(el)
      //   }
      // }
      // return result
    },

    size: function (obj) {
      return Object.keys(obj).length
    },

    first: function (obj, n) {
      return !n ? obj[0] : obj.slice(0, n)
      // if (!n) {
      //   return obj[0]
      // } else {
      //   return obj.slice(0, n)
      // }
    },

    last: function (obj, n) {
      return !n ? obj[obj.length - 1] : obj.slice(-n)
      // if (!n) {
      //   return obj[obj.length - 1]
      // } else {
      //   return obj.slice(-n)
      // }
    },

    compact: function (arr) {
      return arr.filter(e => !!e)
    },

    sortBy: function (obj, fn) {
      // const result = obj.map(e => e)
      const result = [...obj]
      return result.sort((a, b) => fn(a) - fn(b))
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) {
        console.log("newArr [ before ]", newArr)
        console.log("collection", collection)
        newArr.push(collection)
        console.log("newArr [ after ]", newArr)
        return newArr
        // return newArr.push(collection)
      }
      if (!shallow) {
        let counter = 0
        for (let val of collection) {
          counter++
          console.log("counter", counter)
          console.log("val", val)
          this.flatten(val, false, newArr)
        }
      } else {
        for (let val of collection) {
          if(Array.isArray(val)) {
            for(let v of val) newArr.push(v)
          } else {
            newArr.push(val)
          }          
        }
      }
      return newArr
    },

    // flatten: function(arr, shallow, result = []) {
    //   if(shallow) {
    //     for(const el of arr) {
    //       if(!Array.isArray(el)) {
    //         result.push(el)
    //       } else {
    //         for(const ele of el) {
    //           result.push(ele)
    //         }
    //       }
    //     }
    //   } else {
    //     let current = arr
    //     let next = []
    //     while (current || current === 0) {
    //       if (Array.isArray(current)) {
    //         for (let i = 0; i < current.length; i++) {
    //           next.push(current[i])
    //         }
    //       } else {
    //         result.push(current)
    //       }
    //       current = next.shift()
    //     }
    //   }
    //   return result.sort((a,b) => a - b)
    // },

    uniq: function(arr, isSorted, cb) {
      let result = []
      if(isSorted) {
        arr = this.sortBy(arr, e => e)
      }
      if(!cb) {
        arr.forEach(el => {
          if(!(result.includes(el))) result.push(el)
        })
      } else {
        let tmp = []
        arr.forEach(el => {
          if(!(tmp.includes(cb(el)))) {
            tmp.push(cb(el))
            result.push(el)
          }
        })
      }
      return result
    },

    keys: function(obj) {
      return Object.keys(obj)
      // const keys = []
      // for (let key in obj){
      //   keys.push(key)
      // }
      // return keys
    },

    values: function(obj) {
      return Object.values(obj)
      // const values = []
      // for (let key in obj){
      //   values.push(obj[key])
      // }
      // return values
    },

    functions: function (obj) {
      const result = []
      for(const [k, v] of Object.entries(obj)) {
        if(v) result.push(k)
      }
      return result.sort()
    },
  }
})()

fi.libraryMethod()

// const nestedArr = [[1, 2], 4, [[3, 5], 6, [7, [8, "a"], 9]]]
// const nestedArr1 = [1, [2, 4], [[3, 5], 6, [7, [8, "a"], 9]]]

// const flatArr = fi.flatten(nestedArr)
// console.log("first element is array", flatArr)
// const flatArr1 = fi.flatten(nestedArr1)
// console.log("first element is number", flatArr1)

// const flatArr2 = fi.flatten(nestedArr1, true)
// console.log("shallow flatten", flatArr2)

// const num = fi.flatten(111)
// console.log("one number", num)
// const str = fi.flatten("Hello")
// console.log("one string", str)