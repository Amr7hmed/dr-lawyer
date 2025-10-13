import Logo from "@/assets/logo.png";
const LoginLogo = () => {
  return (
    <div className="bg-primary sticky top-0 flex h-dvh w-full flex-col items-center justify-center overflow-hidden">
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-b from-transparent to-[#00000080]"></div>
      <div className="absolute -top-5 left-full h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-white/25 shadow-2xl shadow-white blur-3xl" />
      <div className="flex h-[480px] w-[480px] items-center justify-center rounded-full bg-gradient-to-b from-white/5 to-white/0">
        <div className="flex h-[340px] w-[340px] items-center justify-center rounded-full bg-gradient-to-b from-white/10 to-white/0">
          <img src={Logo} alt="logo" className="h-[215px] w-[315px]" />
        </div>
      </div>
    </div>
  );
};

export default LoginLogo;
