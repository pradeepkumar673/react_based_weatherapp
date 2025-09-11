import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lightLogo from '../assets/light.svg';
import backgroundVideo from '../assets/324f53c8af273f72c36f5c0d35af7b30.mp4';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                navigate('/home');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="relative min-h-screen flex flex-row justify-center items-center">
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={backgroundVideo} type="video/mp4" />
            </video>
            {/*!isLogin && <div className="absolute top-0 left-0 w-full h-full bg-black/45 z-0"></div>*/}   
                <div className="relative z-10 flex flex-col justify-center items-center border rounded-md px-10 py-10 bg-black/40 border-none backdrop-blur-sm">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img src={lightLogo} alt="PradeepKumaeEmblem" className="mx-auto h-20 w-auto" />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-pink-500">Sign in to PradeepKumar</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-pink-500">Email address</label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-pink-500 outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-pink-500">Password</label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-pink-400 hover:text-pink-300">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-pink-500 outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-pink-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500">Sign in</button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-gray-400">
                            Not a member?
                            <a href="#" className="font-semibold pl-2 text-pink-400 hover:text-pink-300">Sign up then</a>
                        </p>
                    </div>
                </div>
            </div>
        
    )
}

export default Login