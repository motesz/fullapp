const email = (input) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(input) === false) {
    return false
  }
  return true
}

const phoneNumber = (input) => {
  const pattern = /(\+)?(\(?\d+\)?)(([\s-]+)?(\d+)){0,}/g  
  if(pattern.test(input) === false) return false
  if(input.length != 11) return false
  if(input.startsWith("09") === false) return false
  return true
}

const password = (input) => {
  if(input.length < 6) return false
  return true
}

const checkForEmptyValues = (payload) => {
  let results = []
  if(payload.length == 0) return false
  Object.values(payload).map((value, index) => {
    if(value == "") results.push({
      field: Object.keys(payload)[index]
    })
  })
  return results
}

const file = (data = []) => {
  if(!data) return []

  return data.map((value) => {
    return {
      name: value.attributeName,
      data: {
        ...value,
        fileName: value?.name
      }
    }
  })
  
}

const defaultFormValidatorFields = {
  login: {
    username: {
      required: true
    },
    password: {
      required: true
    }
  }
}

const VALIDATOR = {
  email,
  phoneNumber,
  password,
  checkForEmptyValues,
  file,
  defaultFormValidatorFields
}

export default VALIDATOR;