import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './FormPage.css'; 


const schema = yup.object({
  name: yup.string().required('Name is required'),
  employeeId: yup.string().max(10).required('Employee ID is required'),
  email: yup.string().email().required('Valid email is required'),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  department: yup.string().required('Department is required'),
  dateOfJoining: yup.date().max(new Date()).required('Valid date is required'),
  role: yup.string().required('Role is required'),
});

const FormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm({
    resolver: yupResolver(schema),
  });

 
  const onSubmit = async (data) => {
    console.log('Form data:', data); 

  
    const formattedData = {
      ...data,
      dateOfJoining: new Date(data.dateOfJoining).toISOString().split('T')[0],
    };

    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Employee data submitted successfully!');
        console.log('Success:', result);
        reset(); 
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting data!');
    }
  };

  
  const handleClear = () => {
    reset(); 
  };

  return (
    <div className="form-page">
      <h1 className="form-title">ENTER THE DETAILS...</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Name" {...register('name')} />
          <p>{errors.name?.message}</p>
        </div>

        <div>
          <input placeholder="Employee ID" {...register('employeeId')} />
          <p>{errors.employeeId?.message}</p>
        </div>

        <div>
          <input placeholder="Email" {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <input placeholder="Phone Number" {...register('phoneNumber')} />
          <p>{errors.phoneNumber?.message}</p>
        </div>

        <div>
          <select {...register('department')}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
          </select>
          <p>{errors.department?.message}</p>
        </div>

        <div>
          <input type="date" {...register('dateOfJoining')} />
          <p>{errors.dateOfJoining?.message}</p>
        </div>

        <div>
          <input placeholder="Role" {...register('role')} />
          <p>{errors.role?.message}</p>
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>Clear</button> {/* Clear Button */}
        </div>
      </form>
    </div>
  );
};

export default FormPage;





