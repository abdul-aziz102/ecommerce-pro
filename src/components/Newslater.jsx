import React, { useState } from 'react';

const Newslater = () => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault(); // Fixed typo
    console.log('Subscribed Email:', email);
    setEmail('');
  };

  return (
    <div className="text-center py-10 bg-gray-900 text-white">
      <p className="text-3xl font-bold text-teal-300">
        Subscribe Now & Get 20% Off
      </p>
      <p className="text-gray-400 mt-3">
        Get exclusive deals & updates right in your inbox!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 mx-auto flex items-center gap-3 mt-5"
      >
        <input
          className="w-full flex-1 outline-none p-3 border border-gray-600 rounded-md bg-gray-800 text-white placeholder-gray-400"
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-teal-500 text-white text-sm px-6 py-3 rounded-md hover:bg-teal-400 transition duration-300"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Newslater;
