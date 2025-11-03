import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "Smartphone",
      title: "Скачайте lt.MAX на любое устройство",
      description: "Доступно на iOS, Android, Windows, macOS и в веб-версии. Синхронизация между всеми вашими устройствами"
    },
    {
      icon: "Bot",
      title: "Чат-боты и мини-приложения",
      description: "Прямой доступ к партнерским сервисам для быстрого решения ежедневных задач прямо в мессенджере"
    },
    {
      icon: "MessageCircle",
      title: "Общение на максимум",
      description: "Анимированные стикеры, реакции в чатах, возможность отправки файлов до 4 ГБ – всё для обмена настроением и важной информацией"
    },
    {
      icon: "Phone",
      title: "Высокое качество звонков",
      description: "Высокое качество связи и быстрое соединение даже в сетях со слабым сигналом"
    },
    {
      icon: "Briefcase",
      title: "Максимум возможностей для важных дел",
      description: "Быстрое и лёгкое приложение для общения и решения повседневных задач"
    },
    {
      icon: "Shield",
      title: "Безопасность прежде всего",
      description: "End-to-end шифрование секретных чатов, самоуничтожающиеся сообщения и защита от скриншотов"
    },
    {
      icon: "Users",
      title: "Группы и каналы",
      description: "Создавайте группы до 200 000 участников и публичные каналы для своей аудитории"
    },
    {
      icon: "Cloud",
      title: "Облачное хранилище",
      description: "Все ваши сообщения, файлы и медиа хранятся в облаке и доступны с любого устройства"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#0EA5E9]" />
      
      <div className="relative z-10 min-h-screen px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="mb-8 text-white hover:bg-white/10"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>

          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Возможности lt.MAX
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Всё необходимое для комфортного общения и продуктивной работы
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-xl p-3 flex-shrink-0">
                    <Icon name={feature.icon as any} size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/")}
              size="lg"
              className="bg-white text-[#8B5CF6] hover:bg-white/90 text-xl px-12 py-6 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 font-semibold"
            >
              <Icon name="Download" size={24} className="mr-2" />
              Скачать lt.MAX
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
