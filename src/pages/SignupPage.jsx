import React,{useState} from "react";
import CommonForm from "../components/CommonForm";

const SignupPage = ()=>{
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      const [errors, setErrors] = useState({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
    return (
        <div>
          <CommonForm
            register={true}
            formData={formData}
            setFormData={setFormData}
            setErrors={setErrors}
            errors={errors}
          />
        </div>
      )
}

export default SignupPage;