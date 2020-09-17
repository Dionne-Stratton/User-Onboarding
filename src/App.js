import './App.css';
import Form from './Form'
import React, { useState, useEffect } from 'react'
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

const initialDisabled = true

export default function App() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  const [post, setPost] = useState([])

  const postNewUser = newUser => {
    axios.post("https://reqres.in/api/users", newUser)
      .then(res => {
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
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  }

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
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
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  )
}