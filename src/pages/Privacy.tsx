import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#0EA5E9]" />
      
      <div className="relative z-10 min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="mb-8 text-white hover:bg-white/10"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Политика конфиденциальности
            </h1>

            <div className="space-y-6 text-white/90">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  1. Общие положения
                </h2>
                <p className="leading-relaxed">
                  Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации о пользователях сервиса lt.MAX (далее — Сервис).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  2. Сбор информации
                </h2>
                <p className="leading-relaxed mb-3">
                  При использовании Сервиса мы можем собирать следующую информацию:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Статистика скачиваний (хранится локально в браузере)</li>
                  <li>Технические данные о браузере и устройстве</li>
                  <li>IP-адрес для обеспечения безопасности</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  3. Использование информации
                </h2>
                <p className="leading-relaxed mb-3">
                  Собранная информация используется для:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Улучшения качества Сервиса</li>
                  <li>Обеспечения безопасности пользователей</li>
                  <li>Статистического анализа</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  4. Защита данных
                </h2>
                <p className="leading-relaxed">
                  Мы применяем современные технологии шифрования для защиты ваших данных. Вся информация передается по защищенным каналам связи.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  5. Cookies
                </h2>
                <p className="leading-relaxed">
                  Сервис использует localStorage для хранения счетчика скачиваний локально на вашем устройстве. Эти данные не передаются третьим лицам.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  6. Права пользователей
                </h2>
                <p className="leading-relaxed mb-3">
                  Вы имеете право:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Получать информацию о собранных данных</li>
                  <li>Требовать удаления ваших данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  7. Изменения в политике
                </h2>
                <p className="leading-relaxed">
                  Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на этой странице.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">
                  8. Контакты
                </h2>
                <p className="leading-relaxed">
                  Если у вас есть вопросы относительно Политики конфиденциальности, свяжитесь с нами по адресу: privacy@ltmax.com
                </p>
              </section>

              <div className="pt-6 border-t border-white/20 mt-8">
                <p className="text-white/70 text-sm">
                  Последнее обновление: 3 ноября 2025 г.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
