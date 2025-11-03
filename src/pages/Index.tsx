import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const Index = () => {
  const [downloadCount, setDownloadCount] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ltmax-downloads");
    if (saved) {
      setDownloadCount(parseInt(saved));
    }
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      const content = "Ха ха ты серьёзно, это же МАХ плюс бро ты отстой";
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "lt.MAX.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      const newCount = downloadCount + 1;
      setDownloadCount(newCount);
      localStorage.setItem("ltmax-downloads", newCount.toString());
      
      setTimeout(() => {
        setIsDownloading(false);
      }, 500);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#0EA5E9]" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-2xl animate-fade-in">
          <div className="flex justify-center mb-8">
            <img 
              src="https://cdn.poehali.dev/files/85e89891-09cb-4214-8e3e-1af012211665.png" 
              alt="lt.MAX" 
              className="w-64 h-64 object-contain drop-shadow-2xl hover-scale"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">
              lt.MAX
            </h1>
            <p className="text-xl text-white/90 font-medium">
              Новое поколение мессенджера
            </p>
          </div>

          <div className="pt-8 space-y-4">
            <Button 
              onClick={handleDownload}
              disabled={isDownloading}
              size="lg"
              className="bg-white text-[#8B5CF6] hover:bg-white/90 text-xl px-12 py-6 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <Icon name="Loader2" size={24} className="mr-2 animate-spin" />
                  Скачивание...
                </>
              ) : (
                <>
                  <Icon name="Download" size={24} className="mr-2" />
                  Скачать lt.MAX
                </>
              )}
            </Button>

            {downloadCount > 0 && (
              <div className="flex items-center justify-center gap-2 text-white/80 animate-fade-in">
                <Icon name="Users" size={18} />
                <span className="text-sm">
                  Скачали {downloadCount} {downloadCount === 1 ? 'раз' : 'раза'}
                </span>
              </div>
            )}
          </div>

          <div className="pt-12">
            <div className="mb-8">
              <img 
                src="https://cdn.poehali.dev/files/9ee7b027-d650-4c1e-a0f7-f5fa8ec7fefe.png" 
                alt="lt.MAX Интерфейс" 
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl border-4 border-white/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <Icon name="Zap" size={28} className="text-yellow-300" />
                  <h3 className="text-2xl font-semibold text-white">Быстро</h3>
                </div>
                <p className="text-white/80">Мгновенная доставка сообщений</p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <Icon name="Lock" size={28} className="text-green-300" />
                  <h3 className="text-2xl font-semibold text-white">Безопасно</h3>
                </div>
                <p className="text-white/80">Шифрование всех данных</p>
              </div>
            </div>
          </div>

          <div className="pt-8 opacity-60">
            <p className="text-white text-sm">
              © 2025 lt.MAX. Все права защищены
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
