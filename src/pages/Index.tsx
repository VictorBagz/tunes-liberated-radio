
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { MainContent } from "@/components/MainContent";
import { NowPlaying } from "@/components/NowPlaying";

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <TopBar />
          <MainContent />
        </div>
      </div>
      <NowPlaying />
    </div>
  );
};

export default Index;
