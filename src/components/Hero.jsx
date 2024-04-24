import { logo } from "../assets";
const Hero = () => {
  return (
    <header
      className="w-full flex 
    justify-center items-center flex-col"
    >
      <nav
        className="flex justify-between
        items-center w-full mb-10 pt-3
        "
      >
        <img className="w-28 object-contain " src={logo} alt="logo" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/HamzaBlala49")}
          className="black_btn"
        >
          GitHub
        </button>
      </nav>
      <div className="head_text">
        Summarize Article With <br className="max-md:hidden" />
        <span className="orange_gradient">OpneAI GPT-4</span>
      </div>
      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
