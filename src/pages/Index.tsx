import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [downloadCount, setDownloadCount] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

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

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Попробуй новый мессенджер lt.MAX!";
    
    let shareUrl = "";
    switch (platform) {
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case "vk":
        shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast({
          title: "Скопировано!",
          description: "Ссылка скопирована в буфер обмена",
        });
        setShowShareMenu(false);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank");
      setShowShareMenu(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/28e526cf-9c66-457b-b378-4904d9330264', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: feedbackName,
          email: feedbackEmail,
          message: feedbackMessage
        })
      });

      if (response.ok) {
        toast({
          title: "Спасибо за обратную связь!",
          description: "Мы получили ваше сообщение и скоро ответим",
        });
        
        setFeedbackName("");
        setFeedbackEmail("");
        setFeedbackMessage("");
        setIsDialogOpen(false);
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить сообщение. Попробуйте позже",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Проверьте подключение",
        variant: "destructive"
      });
    }
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

              <div className="relative">
                <Button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full backdrop-blur-lg"
                >
                  <Icon name="Share2" size={20} className="mr-2" />
                  Поделиться
                </Button>

                {showShareMenu && (
                  <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl p-3 min-w-[200px] animate-fade-in z-50">
                    <button
                      onClick={() => handleShare("telegram")}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-700"
                    >
                      <Icon name="Send" size={20} className="text-[#0EA5E9]" />
                      <span>Telegram</span>
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-700"
                    >
                      <Icon name="MessageCircle" size={20} className="text-green-500" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleShare("vk")}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-700"
                    >
                      <Icon name="Share" size={20} className="text-[#0077FF]" />
                      <span>ВКонтакте</span>
                    </button>
                    <button
                      onClick={() => handleShare("copy")}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-700"
                    >
                      <Icon name="Copy" size={20} className="text-gray-600" />
                      <span>Копировать</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

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

          <div className="pt-8">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-lg"
                >
                  <Icon name="MessageSquare" size={18} className="mr-2" />
                  Обратная связь
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Обратная связь</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Ваше имя"
                      value={feedbackName}
                      onChange={(e) => setFeedbackName(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={feedbackEmail}
                      onChange={(e) => setFeedbackEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Ваше сообщение"
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      required
                      className="w-full min-h-[120px]"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                  >
                    Отправить
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="pt-8 opacity-60 space-y-2">
            <p className="text-white text-sm">
              © 2025 lt.MAX. Все права защищены
            </p>
            <a 
              href="/privacy" 
              className="text-white/80 text-sm hover:text-white transition-colors inline-flex items-center gap-1 hover:underline"
            >
              <Icon name="Shield" size={14} />
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;