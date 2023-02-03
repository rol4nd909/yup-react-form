import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './App.css';

type UserSubmitForm = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

function App() {
  const wait = (timeoutMs: number) => new Promise<void>(resolve => window.setTimeout(() => resolve(), timeoutMs))

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted }
  } = useForm<UserSubmitForm>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data: UserSubmitForm) => {
    await wait(3000);
    
    console.log(JSON.stringify(data, null, 2));    
  }

  return (
    <>
      {!isSubmitted ?
        <form onSubmit={handleSubmit(onSubmit)} className="form">

          <div className={`form__group ${errors.fullname ? 'is-invalid' : ''}`}>
            <label htmlFor="fullname">Full Name</label>
            <input 
              type="text" 
              {...register('fullname')} 
              className={`form__input ${errors.fullname ? 'is-invalid' : ''}`} 
              id="fullname" />

            <div className="form__feedback">{errors.fullname?.message}</div>
          </div>

          <div className={`form__group ${errors.username ? 'is-invalid' : ''}`}>
            <label htmlFor="username">User Name</label>
            <input 
              type="text" 
              {...register('username')} 
              className={`form__input ${errors.username ? 'is-invalid' : ''}`} 
              autoComplete="username"
              id="username" />

            <div className="form__feedback">{errors.username?.message}</div>
          </div>

          <div className={`form__group ${errors.email ? 'is-invalid' : ''}`}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              {...register('email')} 
              className={`form__input ${errors.email ? 'is-invalid' : ''}`} 
              id="email" />

            <div className="form__feedback">{errors.email?.message}</div>
          </div>

          <div className={`form__group ${errors.password ? 'is-invalid' : ''}`}>
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              {...register('password')} 
              className={`form__input ${errors.password ? 'is-invalid' : ''}`} 
              autoComplete="new-password"
              id="password" />

            <div className="form__feedback">{errors.password?.message}</div>
          </div>

          <div className={`form__group ${errors.confirmPassword ? 'is-invalid' : ''}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password"
              {...register('confirmPassword')} 
              className={`form__input ${errors.confirmPassword ? 'is-invalid' : ''}`} 
              autoComplete="new-password"
              id="confirmPassword" />

            <div className="form__feedback">{errors.confirmPassword?.message}</div>
          </div>

          <div className={`form__group ${errors.acceptTerms ? 'is-invalid' : ''}`}>
            <input 
              type="checkbox"
              {...register('acceptTerms')} 
              id="acceptTerms" />
            <label htmlFor="acceptTerms" className='form__label'>
              I have read and agree to the Terms
            </label>

            <div className="form__feedback">{errors.acceptTerms?.message}</div>
          </div>

          <div className="form__group">
            <button className="btn  btn-primary" type="submit">
              Register
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn  btn-warning"
            >
              Reset
            </button>
          </div>
          
          {isSubmitting && <div className="form__loader"><span className="srt">loading</span></div>}
            
        </form> : 'verstuurd'
      }
    </>
  );
}

export default App;
