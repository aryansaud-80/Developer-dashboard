const AboutPomodoro = () => {
  return (
    <div className='w-full px-4 sm:px-6 md:px-10 lg:px-20 py-10 flex justify-center'>
      <div className='relative max-w-full sm:max-w-xl md:max-w-3xl md:text-justify'>
        <h1 className=' text-xl sm:text-2xl md:text-3xl text-gray-900 font-bold mb-2'>
          What is Pomodoro Technique?
          <div className='h-1 w-15 bg-red-400 mx-auto sm:mx-0 mb-4 absolute left-1' />
        </h1>

        <p className='text-gray-700 leading-relaxed  text-sm md:text-lg '>
          The Pomodoro Technique is a time management method developed by
          Francesco Cirillo to help people work and study more efficiently. It
          breaks work into focused intervals—typically 25 minutes long—called
          “Pomodoros”, followed by short 5-minute breaks. After completing four
          Pomodoros, a longer break of 15 to 30 minutes is taken. The name
          Pomodoro comes from the Italian word for “tomato,” inspired by the
          tomato-shaped kitchen timer Cirillo used while developing the
          technique. This approach helps maintain deep focus while preventing
          burnout, making it ideal for improving productivity.
        </p>
      </div>
    </div>
  );
};

export default AboutPomodoro;
