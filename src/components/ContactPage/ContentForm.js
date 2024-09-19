import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form';
import CountryArray from '../../data/countrycode.json'
import { contactusEndpoint } from '../../services/Api';
import { apiConnector } from '../../services/ApiConnector';
export const ContentForm = () => {
    const [loading, setloading] = useState();
    const { register,
        reset,
        handleSubmit,
        formState: {
            errors, isSubmitSuccessful
        } } = useForm();


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firsTName: "",
                lastName: "",
                message: "",
                phone: ""
            });
            setloading(false);
        }
    }, [reset, isSubmitSuccessful])

    const submitContactForm = async (data) => {
        try {
            setloading(true);
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
            setloading(false)
        } catch (error) {
            console.error(error)
            setloading(false)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submitContactForm)}>
                <div>
                    {/* firstaName */}
                    <div>
                        <label htmlFor="firstName">FirstName:</label>
                        <input
                            type="firstName"
                            id="firstName"
                            name="firstName"
                            placeholder='Enter your firstName'
                            {...register("firstName", { required: true })}
                        />
                        {errors.firstName && <p>This field is required</p>}
                    </div>

                    {/* lastName */}
                    <div>
                        <label htmlFor="lastName">LastName:</label>
                        <input
                            type="lastName"
                            id="lastName"
                            name="lastName"
                            placeholder='Enter your lastName'
                            {...register("lastName")}
                        />
                    </div>
                </div>
                {/* email */}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Enter your email'
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p>This field is required</p>}
                </div>

                {/* phone */}
                <div className='flex flex-col' >
                    <label htmlFor="phone">Phone:</label>

                    <div className='flex gap-5 w-[50%]'>

                        <select className='bg-richblack-500 w-[20%]'>
                            {
                                CountryArray.map((element, index) => {
                                    return <option key={index} value={element.code}>{element.code}-{element.country}</option>
                                })
                            }
                        </select>

                        <input className='w-[80%]'
                            type="phone"
                            id="phone"
                            name="phone"
                            placeholder='Enter your phone'
                            {...register("phone", { required: true })}
                        />
                        {errors.phone && <p>This field is required</p>}
                    </div>
                </div>

                {/* message */}
                <div>
                    <label htmlFor="message">Message:</label>
                    <input
                        type="message"
                        id="message"
                        name="message"
                        placeholder='Enter your message'
                        {...register("message")}
                    />
                </div>
            </form>
        </div>
    )
}
