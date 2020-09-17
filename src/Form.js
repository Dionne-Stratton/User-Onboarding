import React from 'react'

export default function Form(props) {

      const {
        values,
        submit,
        change,
        disabled,
        errors,
        formValues,
        postNewUser,
      } = props

  const onChange = evt => {
    const { name, value, type, checked } = evt.target
    const valueToUse = type === 'checkbox' ? checked : value
    change(name, valueToUse)
  }

    const onSubmit = evt => {
        evt.preventDefault()
        postNewUser(formValues)
        submit()
    }

  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='form-group submit'>
        <h2>Add a User</h2>

        {/* 🔥 DISABLE THE BUTTON */}
        <button disabled={disabled}>submit</button>

        <div className='errors'>
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div>
      </div>

      <div className='form-group inputs'>
        <h4>General information</h4>


        <label>Name
          <input
            value={values.name}
            onChange={onChange}
            name='name'
            type='text'
            placeholder='type your name'
            maxLength='30'
          />
        {/* {errors.name.length > 0 ? <p>{errors.name}</p> : null}   */}
     </label>

        <label>Email

          <input
            type='email'
            name='email'
            onChange={onChange}
            value={values.email}
            placeholder='enter your e-mail'
            maxLength='30'
          />
          {errors.email.length > 0 ? <p>{errors.email}</p> : null}
        </label>

        <label>Password

           <input
            type='password'
            name='password'
            onChange={onChange}
            value={values.password}
            placeholder='type a password'
            maxLength='30'
          />
          {errors.password.length > 0 ? <p>{errors.password}</p> : null}
        </label>
        <label>Terms
           <input
            type='checkbox'
            name='terms'
            onChange={onChange}
            value={values.terms}
          />
        </label>
      </div>
    </form>
  )
}