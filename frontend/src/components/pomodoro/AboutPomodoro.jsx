const AboutPomodoro = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-10 flex justify-center">
      <div className="max-w-full sm:max-w-xl md:max-w-3xl md:text-justify">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          What is Pomodoro Technique?
        </h1>
        <div className="h-1 w-16 rounded-full mb-4" style={{ backgroundColor: "var(--primary)" }} />
        <p className="leading-relaxed text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
          The Pomodoro Technique is a time management method developed by
          Francesco Cirillo. It breaks work into focused intervals - typically
          25 minutes long - called "Pomodoros", followed by short 5-minute
          breaks. After completing four Pomodoros, a longer break of 15 to 30
          minutes is taken. This approach helps maintain deep focus while
          preventing burnout, making it ideal for improving productivity.
        </p>
      </div>
    </div>
  );
};

export default AboutPomodoro;
