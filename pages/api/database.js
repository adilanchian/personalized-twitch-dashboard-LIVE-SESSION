// These are database actions needed to interact with Replit DB!
// Feel free to see how this works or how to make it better!
const DB_URL = process.env.DB_URL

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      if (req.body) {
        const { key, value, action } = JSON.parse(req.body)
        
        if (action === 'GET_CHANNELS') {
          const value = await getValue(key)
          if (value) {
            res.status(200).json({ data: value })
          } else {
            res.status(404).send()
          }
        } else {
          const success = await setKey(key, value)
          if (success) {
            res.status(200).send()
          }
        }
      }
    }
  } catch (error) {
    console.warn(error.message)
    res.status(500).send()
  }
}

// Actions
const setKey = async (key, value) => {
  try {
    const result = await fetch(DB_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: `${key}=${value}`
    })

    if (result.status === 200) {
      return true
    }
  } catch (err) {
    console.warn(err.message)
  }
}

const getValue = async key => {
  try {
    const result = await fetch(`${DB_URL}/${key}`)
    const textData = await result.text()

    if (result.status === 200) {
      return textData
    }
  } catch (err) {
    console.warn(err.message)
    return false
  }
}
