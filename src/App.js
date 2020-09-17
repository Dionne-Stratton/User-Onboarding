import './App.css';
import Form from './Form'
import React, { useState, useEffect } from 'react'
import User from './User'
import schema from './formSchema'
import axios from 'axios'
import * as yup from 'yup'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: '',
}
const initialUserList = []
const initialDisabled = true

export default function App() {
  const [users, setUsers] = useState(initialUserList)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const [post, setPost] = useState([])
  // const getUsers = () => {

  //   axios.get('https://reqres.in/api/users')
  //     .then(res => {
  //       setUsers(res.data.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  const postNewUser = newUser => {
    axios.post("https://reqres.in/api/users", newUser)
      .then(res => {
        setUsers(res.data)
        setPost(res.data)
        setFormValues(initialFormValues)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
      })
  }

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      // we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  }

  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms,
    }
    postNewUser(newUser)
  }

  // useEffect(() => {
  //   getUser()
  // }, [])

  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>User Onboarding</h1></header>
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
        formValues={formValues}
        postNewUser={postNewUser}
      />
      {/* {user.map((newUser, item) => {
        return (
          <User key={item} details={newUser} />
        )
      }) */}
      }
      {/* {console.log(user)} */}
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  )
}