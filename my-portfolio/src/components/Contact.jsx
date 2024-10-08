/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Implementation of contact me feature using email.js library, to send free emails from the website

import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
// import dotenv from 'dotenv';
// dotenv.config();


const ContactMe = ({ onClose }) => {
    const [notification, setNotification] = useState(null);
    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();

        const { user_name, user_email, message } = form.current;

        // Check if any field is empty
        if (!user_name.value || !user_email.value || !message.value) {
            setNotification({ type: 'error', message: 'Please fill out all fields.' });
            return;
        }

        emailjs.sendForm(
            import.meta.env.VITE_SERVICE_ID,
            import.meta.env.VITE_TEMPLATE_ID,
            form.current,
            import.meta.env.VITE_PUBLIC_KEY,
            )
            
            .then((result) => {
                setNotification({ type: 'success', message: 'Message sent successfully!' });
                // onClose();
                e.target.reset();
            }, (error) => {
                console.log(error.text);
                setNotification({ type: 'error', message: 'Failed to send message. Please try again later.' });
            });
    };

  return (
    <div className='pt-28 px-10 max-sm:px-3 flex flex-col items-center pb-20 w-full shadow-lg' id='contact_me'>
    <p className='font-extrabold text-5xl max-lg:text-4xl max-sm:text-3xl text-center text-gold ' data-aos="zoom-in">Contact <span className="text-[black]">Me</span></p>

    <div className=' w-[800px] max-sm:w-full bg-white shadow-lg rounded-3xl p-10'>

        {notification && (
            <div className={`font-bold ${notification && notification.type === 'success' ? ' text-gold' : 'text-black'}`}>
                {notification && notification.message}
            </div>
        )}

        <form ref={form} onSubmit={sendEmail} className="w-full max-sm:w-[100%]">
            <label className="mt-4 font-bold text-gold">Name</label>
            <input type="text" name="user_name" className="w-full h-10 px-3 mt-1 outline-none rounded-md border-2 border-gold hover:border-[black] bg-purple" />
            <label className="mt-4 font-bold text-[black]">Email</label>
            <input type="email" name="user_email" className="w-full h-10 px-3 mt-1 outline-none rounded-md border-2 border-[black] hover:border-gold bg-purple" />
            <label className="mt-4 font-bold text-gold">Message</label>
            <textarea name="message" className="w-full px-3 py-2 mt-1 outline-none rounded-md border-2 border-gold hover:border-[black] bg-purple"></textarea>
            <input type="submit" value="Send" className="mt-8 w-full text-base text-center py-2 px-4 bg-gold rounded-md border-2 border-gold flex justify-center items-center gap-2 text-purple hover:text-gold hover:bg-purple shadow transition-all duration-200" />
        </form>
    </div>
</div>

  );
};

export default ContactMe;
