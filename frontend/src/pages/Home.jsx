import MessageContainer from "./MessageContainer";
import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="lg:w-[60%] md:w-[90%] sm:w-[95%] h-[90%] flex rounded-lg
         bg-slate-700 lg:p-6 md:p-6 -mt-14
         sm:p-3 
         ">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </>
  );
}
