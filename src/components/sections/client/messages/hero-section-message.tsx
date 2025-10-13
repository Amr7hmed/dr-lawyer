import StartChat from "@/assets/start-chat.png";

export function HeroSectionMessage() {

  return (
    <section className="relative  h-48 w-full overflow-hidden  bg-red-900 rounded-xl py-[10px] px-[25px] flex justify-between items-center gap-5">

      <div className="flex flex-col justify-start items-start gap-3.5">
        <h4 className="justify-center text-white text-2xl font-bold font-['Manrope']">
          Let’s AI help you find
          <br />
          your perfect lawyer
        </h4>
        <button type="button" className="w-44 h-9 px-5 py-1.5 bg-white rounded-[40px] inline-flex justify-center items-center 
              gap-2.5 overflow-hidden cursor-pointer">
          <span className="justify-center text-red-900 text-base font-bold font-['Manrope']">Start Chat</span>
        </button>
      </div>
      <div className="w-44 h-44 relative">
        <img src={StartChat} className="w-full h-full"/>
      </div>
    </section>
  );
}
