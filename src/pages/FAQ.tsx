import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "Что такое lt.MAX?",
      answer: "lt.MAX — это современный мессенджер нового поколения с максимальными возможностями для общения и работы. Поддержка всех платформ, высокая скорость, безопасность и удобство."
    },
    {
      question: "На каких устройствах работает lt.MAX?",
      answer: "lt.MAX доступен на iOS, Android, Windows, macOS, Linux и в веб-версии. Все ваши сообщения синхронизируются между устройствами автоматически."
    },
    {
      question: "Безопасен ли lt.MAX?",
      answer: "Да! Мы используем end-to-end шифрование для секретных чатов, все сообщения защищены современными алгоритмами шифрования. Вы также можете настроить самоуничтожающиеся сообщения."
    },
    {
      question: "Какой максимальный размер файла можно отправить?",
      answer: "В lt.MAX вы можете отправлять файлы размером до 4 ГБ. Это позволяет делиться большими видео, презентациями и архивами без ограничений."
    },
    {
      question: "Сколько участников может быть в группе?",
      answer: "Группы lt.MAX поддерживают до 200 000 участников. Вы также можете создавать публичные каналы для неограниченного количества подписчиков."
    },
    {
      question: "Есть ли реклама в lt.MAX?",
      answer: "В lt.MAX нет навязчивой рекламы. Мы сфокусированы на создании лучшего пользовательского опыта без отвлекающих элементов."
    },
    {
      question: "Можно ли использовать lt.MAX для бизнеса?",
      answer: "Да! lt.MAX отлично подходит для бизнеса: чат-боты, мини-приложения, большие группы, каналы для клиентов, безопасная отправка документов и многое другое."
    },
    {
      question: "Что такое чат-боты в lt.MAX?",
      answer: "Чат-боты — это автоматизированные помощники, которые интегрируются прямо в мессенджер. Они помогают заказывать еду, вызывать такси, получать новости и решать другие задачи без выхода из приложения."
    },
    {
      question: "Как работают звонки в lt.MAX?",
      answer: "Звонки в lt.MAX используют современные технологии сжатия аудио, обеспечивая высокое качество связи даже при слабом интернет-соединении. Доступны как голосовые, так и видеозвонки."
    },
    {
      question: "lt.MAX бесплатный?",
      answer: "Да, lt.MAX полностью бесплатен для всех пользователей. Все основные функции доступны без подписки или платежей."
    }
  ];

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

          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Частые вопросы
            </h1>
            <p className="text-xl text-white/90">
              Ответы на самые популярные вопросы о lt.MAX
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-white/20 bg-white/5 rounded-xl px-6"
                >
                  <AccordionTrigger className="text-white hover:text-white/80 text-lg font-semibold py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-white/80 mb-6">
              Свяжитесь с нами через форму обратной связи, и мы поможем!
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-white text-[#8B5CF6] hover:bg-white/90"
            >
              <Icon name="MessageSquare" size={18} className="mr-2" />
              Написать нам
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
