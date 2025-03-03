import React,{useState} from 'react'
import CommonForm from '../components/CommonForm'



const LoginPage = ()=>{
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
      email: '',
      password: '',
    });

  return (
    <div>
      <CommonForm
      register={false}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
      />
    </div>
  )
}

export default LoginPage
