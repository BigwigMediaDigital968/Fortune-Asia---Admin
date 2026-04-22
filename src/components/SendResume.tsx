const SendResume = () => {
  return (
    <div className="w-full px-4 py-10 flex justify-center bg-white dark:bg-black text-black dark:text-white font-raleway transition-colors duration-300">
      <div className="w-full md:w-[90%] bg-gradient-to-r from-[var(--primary-color)] via-gray-900 to-[var(--primary-color)] p-[1px] bg-center">
        <div className="bg-white dark:bg-black px-8 py-10 sm:px-16 sm:py-14 transition-colors duration-300">
          <h2 className="text-center text-xl sm:text-2xl tracking-wide font-light mb-2">
            Join Our Team
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-10">
            Send us your resume and we'll connect with you soon.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-b border-gray-400 dark:border-gray-500 outline-none px-2 py-2"
            />
            <input
              type="text"
              placeholder="Your Phone"
              className="bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-b border-gray-400 dark:border-gray-500 outline-none px-2 py-2"
            />
            <input
              type="email"
              placeholder="Your E-Mail"
              className="bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-b border-gray-400 dark:border-gray-500 outline-none px-2 py-2"
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="file:bg-[var(--primary-color)] file:text-white file:border-0 file:rounded file:px-4 file:py-2 text-sm text-gray-600 dark:text-gray-300"
            />
          </form>

          <div className="flex justify-center">
            <button
              type="submit"
              className="border border-[var(--primary-color)] text-[var(--primary-color)] px-6 py-2 uppercase text-sm tracking-widest hover:bg-gradient-to-r from-[#C29579] via-[#e3c5b5] to-[#C29579] hover:text-black transition"
            >
              Submit Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendResume;
