import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Kitten {
  id: number;
  name: string;
  age: string;
  gender: string;
  color: string;
  price: string;
  image: string;
  available: boolean;
  description: string;
  parents: string;
  vaccinations: string[];
  documents: string[];
}

interface Breeder {
  id: number;
  name: string;
  title: string;
  achievements: string;
  image: string;
}

function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedKitten, setSelectedKitten] = useState<Kitten | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const kittens: Kitten[] = [
    {
      id: 1,
      name: 'Аполлон',
      age: '3 месяца',
      gender: 'Мальчик',
      color: 'Голубой',
      price: '80 000 ₽',
      image: 'https://cdn.poehali.dev/files/56ca3432-7512-4b73-8ac8-47a6f6f69f67.jpg',
      available: true,
      description: 'Активный и игривый котёнок с отличным характером. Очень ласковый, любит внимание и общение с людьми. Идеально подойдёт для семьи с детьми.',
      parents: 'Мать: Ch. Афродита Блю / Отец: GrCh. Зевс Импириал',
      vaccinations: ['Первая комплексная вакцинация', 'Обработка от паразитов', 'Ветеринарный паспорт'],
      documents: ['Родословная WCF', 'Ветеринарный паспорт', 'Договор купли-продажи', 'Метрика котёнка']
    },
    {
      id: 2,
      name: 'Афина',
      age: '2.5 месяца',
      gender: 'Девочка',
      color: 'Кремовый',
      price: '90 000 ₽',
      image: 'https://cdn.poehali.dev/files/56ca3432-7512-4b73-8ac8-47a6f6f69f67.jpg',
      available: true,
      description: 'Элегантная девочка с королевскими манерами. Спокойная, но любознательная. Отличный экстерьер, подходит для выставок и разведения.',
      parents: 'Мать: Ch. Королева Клеопатра / Отец: GrCh. Граф Дракула',
      vaccinations: ['Первая комплексная вакцинация', 'Ревакцинация через 21 день', 'Обработка от паразитов'],
      documents: ['Родословная WCF', 'Ветеринарный паспорт', 'Договор купли-продажи', 'Гарантия здоровья']
    },
    {
      id: 3,
      name: 'Зевс',
      age: '4 месяца',
      gender: 'Мальчик',
      color: 'Черный',
      price: '85 000 ₽',
      image: 'https://cdn.poehali.dev/files/56ca3432-7512-4b73-8ac8-47a6f6f69f67.jpg',
      available: false,
      description: 'Уверенный в себе котёнок с выставочным потенциалом. Уже забронирован любящей семьей.',
      parents: 'Мать: Ch. Нефертити / Отец: GrCh. Рамзес II',
      vaccinations: ['Полная вакцинация', 'Прививка от бешенства', 'Обработка от паразитов'],
      documents: ['Родословная TICA', 'Ветеринарный паспорт', 'Договор купли-продажи']
    }
  ];

  const breeders: Breeder[] = [
    {
      id: 1,
      name: 'Королева Клеопатра',
      title: 'Чемпион WCF',
      achievements: 'Многократная победительница международных выставок, лучшая производительница 2023',
      image: 'https://cdn.poehali.dev/projects/20a04798-865f-48e1-9edb-4a0b9194bd6b/files/675812bf-89eb-4bf2-9643-a5567d898692.jpg'
    },
    {
      id: 2,
      name: 'Граф Дракула',
      title: 'Гранд Чемпион TICA',
      achievements: 'Потомок чемпионов, идеальная линия разведения, отец 15 чемпионов',
      image: 'https://cdn.poehali.dev/projects/20a04798-865f-48e1-9edb-4a0b9194bd6b/files/675812bf-89eb-4bf2-9643-a5567d898692.jpg'
    }
  ];

  const galleryImages = [
    'https://cdn.poehali.dev/projects/20a04798-865f-48e1-9edb-4a0b9194bd6b/files/675812bf-89eb-4bf2-9643-a5567d898692.jpg',
    'https://cdn.poehali.dev/projects/20a04798-865f-48e1-9edb-4a0b9194bd6b/files/51a59bca-92f4-4831-98a0-fb9da4c30d47.jpg',
    'https://cdn.poehali.dev/projects/20a04798-865f-48e1-9edb-4a0b9194bd6b/files/6158d9f2-7406-4902-a23f-6297bbdc0dde.jpg',
    'https://cdn.poehali.dev/projects/20a04798-865f-48e1-9edb-4a0b9194bd6b/files/675812bf-89eb-4bf2-9643-a5567d898692.jpg',
    'https://cdn.poehali.dev/projects/20a04798-865f-48e1-9edb-4a0b9194bd6b/files/51a59bca-92f4-4831-98a0-fb9da4c30d47.jpg',
    'https://cdn.poehali.dev/projects/20a04798-865f-48e1-9edb-4a0b9194bd6b/files/6158d9f2-7406-4902-a23f-6297bbdc0dde.jpg'
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">ROYAL SPHYNX</div>
            <div className="hidden md:flex gap-8">
              {['home', 'kittens', 'breeders', 'gallery', 'about', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'kittens' && 'Котята'}
                  {section === 'breeders' && 'Производители'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'about' && 'О питомнике'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button size="lg" className="hidden md:flex">
              <Icon name="Phone" size={18} className="mr-2" />
              Позвонить
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 text-sm px-4 py-2 bg-secondary">Премиум питомник</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Канадские сфинксы <span className="text-primary">элитного разведения</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Более 10 лет мы разводим канадских сфинксов чемпионских линий. 
                Наши котята здоровы, социализированы и имеют все необходимые документы.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('kittens')}>
                  Выбрать котёнка
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('contacts')}>
                  Связаться
                </Button>
              </div>
            </div>
            <div className="animate-scale-in">
              <img
                src="https://cdn.poehali.dev/files/56ca3432-7512-4b73-8ac8-47a6f6f69f67.jpg"
                alt="Канадские сфинксы"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="kittens" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Доступные котята</h2>
            <p className="text-muted-foreground text-lg">
              Наши малыши готовы переехать в любящие семьи
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {kittens.map((kitten, idx) => (
              <Card
                key={kitten.id}
                className="overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={kitten.image}
                    alt={kitten.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {kitten.available ? (
                    <Badge className="absolute top-4 right-4 bg-secondary">Доступен</Badge>
                  ) : (
                    <Badge className="absolute top-4 right-4 bg-muted">Забронирован</Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{kitten.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Calendar" size={16} />
                      <span>{kitten.age}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="User" size={16} />
                      <span>{kitten.gender}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Palette" size={16} />
                      <span>{kitten.color}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{kitten.price}</span>
                    <Button 
                      disabled={!kitten.available}
                      onClick={() => {
                        setSelectedKitten(kitten);
                        setIsDialogOpen(true);
                      }}
                    >
                      {kitten.available ? 'Узнать больше' : 'Забронирован'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="breeders" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Наши производители</h2>
            <p className="text-muted-foreground text-lg">
              Чемпионы с безупречной родословной
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {breeders.map((breeder) => (
              <Card key={breeder.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="grid md:grid-cols-2">
                  <img
                    src={breeder.image}
                    alt={breeder.name}
                    className="w-full h-full object-cover"
                  />
                  <CardContent className="p-6 flex flex-col justify-center">
                    <Badge className="mb-3 w-fit bg-primary">{breeder.title}</Badge>
                    <h3 className="text-2xl font-bold mb-3">{breeder.name}</h3>
                    <p className="text-muted-foreground">{breeder.achievements}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Галерея</h2>
            <p className="text-muted-foreground text-lg">
              Наши любимцы во всей красе
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl aspect-square hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={image}
                  alt={`Галерея ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://cdn.poehali.dev/projects/20a04798-865f-48e1-9edb-4a0b9194bd6b/files/6158d9f2-7406-4902-a23f-6297bbdc0dde.jpg"
                alt="О питомнике"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">О питомнике</h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  Питомник <span className="text-primary font-semibold">ROYAL SPHYNX</span> специализируется 
                  на разведении канадских сфинксов премиум-класса с 2013 года.
                </p>
                <p>
                  Мы работаем только с лучшими чемпионскими линиями из Европы и США, 
                  что гарантирует здоровье, характер и экстерьер наших котят.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-6 bg-card rounded-xl">
                    <div className="text-4xl font-bold text-primary mb-2">10+</div>
                    <div className="text-sm text-muted-foreground">Лет опыта</div>
                  </div>
                  <div className="text-center p-6 bg-card rounded-xl">
                    <div className="text-4xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Счастливых семей</div>
                  </div>
                  <div className="text-center p-6 bg-card rounded-xl">
                    <div className="text-4xl font-bold text-primary mb-2">15</div>
                    <div className="text-sm text-muted-foreground">Чемпионов</div>
                  </div>
                  <div className="text-center p-6 bg-card rounded-xl">
                    <div className="text-4xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Здоровье</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-muted-foreground text-lg">
              Ответим на все вопросы о наших котятах
            </p>
          </div>
          <Card className="p-8">
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ваше имя</label>
                  <Input placeholder="Введите имя" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Телефон</label>
                  <Input placeholder="+7 (___) ___-__-__" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="example@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Сообщение</label>
                <Textarea placeholder="Расскажите, что вас интересует..." rows={5} />
              </div>
              <Button size="lg" className="w-full">
                Отправить заявку
                <Icon name="Send" size={18} className="ml-2" />
              </Button>
              <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Телефон</div>
                    <div className="font-semibold">+7 (999) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-semibold">info@royalsphynx.ru</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Город</div>
                    <div className="font-semibold">Москва</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold text-primary">ROYAL SPHYNX</div>
            <div className="text-muted-foreground">
              © 2024 Royal Sphynx. Все права защищены.
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedKitten && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">{selectedKitten.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img
                  src={selectedKitten.image}
                  alt={selectedKitten.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name="Calendar" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Возраст</div>
                      <div className="font-semibold">{selectedKitten.age}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Пол</div>
                      <div className="font-semibold">{selectedKitten.gender}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name="Palette" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Окрас</div>
                      <div className="font-semibold">{selectedKitten.color}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <Icon name="DollarSign" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Цена</div>
                      <div className="font-semibold text-primary">{selectedKitten.price}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Icon name="FileText" size={20} />
                    Описание
                  </h3>
                  <p className="text-muted-foreground">{selectedKitten.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Icon name="Users" size={20} />
                    Родители
                  </h3>
                  <p className="text-muted-foreground">{selectedKitten.parents}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Icon name="Shield" size={20} />
                    Здоровье
                  </h3>
                  <div className="space-y-2">
                    {selectedKitten.vaccinations.map((vaccination, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-secondary" />
                        <span className="text-muted-foreground">{vaccination}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <Icon name="FileCheck" size={20} />
                    Документы
                  </h3>
                  <div className="space-y-2">
                    {selectedKitten.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-secondary" />
                        <span className="text-muted-foreground">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button size="lg" className="flex-1">
                    <Icon name="Phone" size={18} className="mr-2" />
                    Позвонить
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Написать
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Index;