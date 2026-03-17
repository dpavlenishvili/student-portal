import { User, MobilityProgram, MobilityApplication, MinisterQuestion, Survey, IssueReport, Offer } from './models';

export const MOCK_STUDENTS: User[] = [
  { id: 's001', firstName: 'გიორგი', lastName: 'მამულაშვილი', personalId: '01234567890', status: 'active', university: 'თბილისის სახელმწიფო უნივერსიტეტი', faculty: 'ზუსტ და საბუნებისმეტყველო მეცნიერებათა', program: 'კომპიუტერული მეცნიერება', enrollmentDate: '2021-09-01', gpa: 3.8, credits: 120, photoUrl: 'https://i.pravatar.cc/150?img=1', email: 'g.mamulasvili@student.tsu.ge' },
  { id: 's002', firstName: 'ნინო', lastName: 'კვარაცხელია', personalId: '01234567891', status: 'active', university: 'ილიას სახელმწიფო უნივერსიტეტი', faculty: 'მეცნიერებათა და ხელოვნების', program: 'ბიზნესის ადმინისტრირება', enrollmentDate: '2020-09-01', gpa: 3.9, credits: 180, photoUrl: 'https://i.pravatar.cc/150?img=2', email: 'n.kvaratskhelia@student.iliauni.edu.ge' },
  { id: 's003', firstName: 'დავით', lastName: 'ბერიძე', personalId: '01234567892', status: 'suspended', university: 'საქართველოს ტექნიკური უნივერსიტეტი', faculty: 'ინფორმატიკისა და მართვის სისტემების', program: 'ინფორმაციული ტექნოლოგიები', enrollmentDate: '2022-09-01', gpa: 2.9, credits: 60, photoUrl: 'https://i.pravatar.cc/150?img=3', email: 'd.beridze@student.gtu.ge', statusChangeDate: '2024-01-15' },
  { id: 's004', firstName: 'მარიამ', lastName: 'გიორგაძე', personalId: '01234567893', status: 'active', university: 'თბილისის სახელმწიფო უნივერსიტეტი', faculty: 'ჰუმანიტარულ მეცნიერებათა', program: 'ისტორია', enrollmentDate: '2021-09-01', gpa: 3.5, credits: 100, photoUrl: 'https://i.pravatar.cc/150?img=4', email: 'm.giorgadze@student.tsu.ge' },
  { id: 's005', firstName: 'ლუკა', lastName: 'ჩხეიძე', personalId: '01234567894', status: 'terminated', university: 'ილიას სახელმწიფო უნივერსიტეტი', faculty: 'ბიზნეს სკოლა', program: 'ფინანსები', enrollmentDate: '2019-09-01', gpa: 2.1, credits: 200, photoUrl: 'https://i.pravatar.cc/150?img=5', email: 'l.chkheidze@student.iliauni.edu.ge', statusChangeDate: '2025-06-01' },
  { id: 's006', firstName: 'ანა', lastName: 'ხვედელიძე', personalId: '01234567895', status: 'active', university: 'საქართველოს ტექნიკური უნივერსიტეტი', faculty: 'სამოქალაქო მშენებლობისა', program: 'არქიტექტურა', enrollmentDate: '2022-09-01', gpa: 3.7, credits: 80, photoUrl: 'https://i.pravatar.cc/150?img=6', email: 'a.khvedelidze@student.gtu.ge' },
  { id: 's007', firstName: 'სანდრო', lastName: 'ნაცვლიშვილი', personalId: '01234567896', status: 'active', university: 'თბილისის სახელმწიფო უნივერსიტეტი', faculty: 'ეკონომიკისა და ბიზნესის', program: 'ეკონომიკა', enrollmentDate: '2020-09-01', gpa: 3.2, credits: 160, photoUrl: 'https://i.pravatar.cc/150?img=7', email: 's.natsvlishvili@student.tsu.ge' },
  { id: 's008', firstName: 'თამარ', lastName: 'მიქელაძე', personalId: '01234567897', status: 'active', university: 'ილიას სახელმწიფო უნივერსიტეტი', faculty: 'სამართლის', program: 'სამართალი', enrollmentDate: '2021-09-01', gpa: 3.6, credits: 110, photoUrl: 'https://i.pravatar.cc/150?img=8', email: 't.mikeladze@student.iliauni.edu.ge' },
  { id: 's009', firstName: 'ეკა', lastName: 'სანიკიძე', personalId: '01234567898', status: 'suspended', university: 'საქართველოს ტექნიკური უნივერსიტეტი', faculty: 'ენერგეტიკის', program: 'ელექტრული ინჟინერია', enrollmentDate: '2022-09-01', gpa: 2.7, credits: 50, photoUrl: 'https://i.pravatar.cc/150?img=9', email: 'e.sanikidze@student.gtu.ge', statusChangeDate: '2025-01-10' },
  { id: 's010', firstName: 'ბაჩო', lastName: 'ქობულაძე', personalId: '01234567899', status: 'active', university: 'თბილისის სახელმწიფო უნივერსიტეტი', faculty: 'სოციალურ და პოლიტიკურ მეცნიერებათა', program: 'ჟურნალისტიკა', enrollmentDate: '2021-09-01', gpa: 3.4, credits: 115, photoUrl: 'https://i.pravatar.cc/150?img=10', email: 'b.kobuladze@student.tsu.ge' },
  { id: 's011', firstName: 'ნატა', lastName: 'ღვინიაშვილი', personalId: '01234568800', status: 'active', university: 'ილიას სახელმწიფო უნივერსიტეტი', faculty: 'ხელოვნებათა', program: 'ფოტოგრაფია', enrollmentDate: '2023-09-01', gpa: 3.9, credits: 40, photoUrl: 'https://i.pravatar.cc/150?img=11', email: 'n.ghviniashvili@student.iliauni.edu.ge' },
  { id: 's012', firstName: 'ზაქარია', lastName: 'ქობახიძე', personalId: '01234568801', status: 'active', university: 'საქართველოს ტექნიკური უნივერსიტეტი', faculty: 'ქიმიური ტექნოლოგიისა', program: 'ქიმიური ინჟინერია', enrollmentDate: '2020-09-01', gpa: 3.1, credits: 170, photoUrl: 'https://i.pravatar.cc/150?img=12', email: 'z.kobakhidze@student.gtu.ge' },
  { id: 's013', firstName: 'სალომე', lastName: 'ჯაფარიძე', personalId: '01234568802', status: 'active', university: 'თბილისის სახელმწიფო უნივერსიტეტი', faculty: 'ფიზიკისა', program: 'ფიზიკა', enrollmentDate: '2022-09-01', gpa: 3.8, credits: 75, photoUrl: 'https://i.pravatar.cc/150?img=13', email: 's.japaridze@student.tsu.ge' },
  { id: 's014', firstName: 'ლევან', lastName: 'ხარაიშვილი', personalId: '01234568803', status: 'active', university: 'ილიას სახელმწიფო უნივერსიტეტი', faculty: 'ბუნებისმეტყველების', program: 'ბიოლოგია', enrollmentDate: '2021-09-01', gpa: 3.3, credits: 125, photoUrl: 'https://i.pravatar.cc/150?img=14', email: 'l.kharaishvili@student.iliauni.edu.ge' },
  { id: 's015', firstName: 'ირინე', lastName: 'მამარდაშვილი', personalId: '01234568804', status: 'terminated', university: 'საქართველოს ტექნიკური უნივერსიტეტი', faculty: 'სამთო-გეოლოგიური', program: 'გეოლოგია', enrollmentDate: '2018-09-01', gpa: 1.8, credits: 210, photoUrl: 'https://i.pravatar.cc/150?img=15', email: 'i.mamardashvili@student.gtu.ge', statusChangeDate: '2023-05-20' },
  { id: 's016', firstName: 'გიგა', lastName: 'კვირიკაშვილი', personalId: '01234568805', status: 'active', university: 'თბილისის სახელმწიფო უნივერსიტეტი', faculty: 'მათემატიკისა', program: 'მათემატიკა', enrollmentDate: '2022-09-01', gpa: 4.0, credits: 80, photoUrl: 'https://i.pravatar.cc/150?img=16', email: 'g.kvirikashvili@student.tsu.ge' },
  { id: 's017', firstName: 'ქეთი', lastName: 'ბლიაძე', personalId: '01234568806', status: 'active', university: 'ილიას სახელმწიფო უნივერსიტეტი', faculty: 'ფსიქოლოგიის', program: 'ფსიქოლოგია', enrollmentDate: '2020-09-01', gpa: 3.7, credits: 155, photoUrl: 'https://i.pravatar.cc/150?img=17', email: 'k.bliadze@student.iliauni.edu.ge' },
  { id: 's018', firstName: 'ვახო', lastName: 'ხაჩიძე', personalId: '01234568807', status: 'suspended', university: 'საქართველოს ტექნიკური უნივერსიტეტი', faculty: 'ინფორმატიკისა', program: 'პროგრამული ინჟინერია', enrollmentDate: '2021-09-01', gpa: 2.5, credits: 90, photoUrl: 'https://i.pravatar.cc/150?img=18', email: 'v.khachidze@student.gtu.ge', statusChangeDate: '2024-11-01' },
  { id: 's019', firstName: 'მარი', lastName: 'ხოფერია', personalId: '01234568808', status: 'active', university: 'თბილისის სახელმწიფო უნივერსიტეტი', faculty: 'ხელოვნებათა', program: 'მუსიკოლოგია', enrollmentDate: '2023-09-01', gpa: 3.6, credits: 35, photoUrl: 'https://i.pravatar.cc/150?img=19', email: 'm.khoperia@student.tsu.ge' },
  { id: 's020', firstName: 'ნიკა', lastName: 'ბოჭორიშვილი', personalId: '01234568809', status: 'active', university: 'ილიას სახელმწიფო უნივერსიტეტი', faculty: 'ინფორმაციული ტექნოლოგიების', program: 'კომპიუტერული მეცნიერება', enrollmentDate: '2021-09-01', gpa: 3.5, credits: 130, photoUrl: 'https://i.pravatar.cc/150?img=20', email: 'n.bochorishvili@student.iliauni.edu.ge' },
];

export const MOCK_CURRENT_STUDENT: User = MOCK_STUDENTS[0];

export const MOCK_MOBILITY_PROGRAMS: MobilityProgram[] = [
  { id: 1, university: 'University of Helsinki', country: 'ფინეთი', programName: 'Computer Science Exchange', vacancies: 3, city: 'ჰელსინკი', duration: '1 სემესტრი', language: 'ინგლისური', deadline: '2026-04-01' },
  { id: 2, university: 'Vilnius University', country: 'ლიტვა', programName: 'Business Administration', vacancies: 2, city: 'ვილნიუსი', duration: '2 სემესტრი', language: 'ინგლისური', deadline: '2026-03-15' },
  { id: 3, university: 'University of Tartu', country: 'ესტონეთი', programName: 'Information Technology', vacancies: 5, city: 'ტარტუ', duration: '1 სემესტრი', language: 'ინგლისური', deadline: '2026-04-15' },
  { id: 4, university: 'Riga Technical University', country: 'ლატვია', programName: 'Engineering Sciences', vacancies: 4, city: 'რიგა', duration: '1 სემესტრი', language: 'ინგლისური', deadline: '2026-03-20' },
  { id: 5, university: 'University of Warsaw', country: 'პოლონეთი', programName: 'Economics and Management', vacancies: 6, city: 'ვარშავა', duration: '2 სემესტრი', language: 'ინგლისური', deadline: '2026-03-01' },
  { id: 6, university: 'Charles University', country: 'ჩეხეთი', programName: 'Law and Political Science', vacancies: 3, city: 'პრაღა', duration: '1 სემესტრი', language: 'ინგლისური', deadline: '2026-04-20' },
  { id: 7, university: 'Budapest University of Technology', country: 'უნგრეთი', programName: 'Electrical Engineering', vacancies: 2, city: 'ბუდაპეშტი', duration: '1 სემესტრი', language: 'ინგლისური', deadline: '2026-04-10' },
  { id: 8, university: 'University of Ljubljana', country: 'სლოვენია', programName: 'Architecture and Design', vacancies: 3, city: 'ლიუბლიანა', duration: '1 სემესტრი', language: 'ინგლისური', deadline: '2026-03-25' },
  { id: 9, university: 'Masaryk University', country: 'ჩეხეთი', programName: 'Natural Sciences', vacancies: 4, city: 'ბრნო', duration: '2 სემესტრი', language: 'ინგლისური', deadline: '2026-03-10' },
  { id: 10, university: 'University of Gdansk', country: 'პოლონეთი', programName: 'Marine Biology', vacancies: 2, city: 'გდანსკი', duration: '1 სემესტრი', language: 'ინგლისური', deadline: '2026-04-25' },
  { id: 11, university: 'Kaunas University of Technology', country: 'ლიტვა', programName: 'Mechanical Engineering', vacancies: 5, city: 'კაუნასი', duration: '1 სემესტრი', language: 'ინგლისური', deadline: '2026-03-30' },
  { id: 12, university: 'University of Wroclaw', country: 'პოლონეთი', programName: 'Physics and Astronomy', vacancies: 3, city: 'ვროცლავი', duration: '2 სემესტრი', language: 'ინგლისური', deadline: '2026-02-28' },
];

export const MOCK_MOBILITY_APPLICATIONS: MobilityApplication[] = [
  { id: 1, studentName: 'გიორგი მამულაშვილი', studentId: 's001', personalId: '01234567890', university: 'University of Helsinki', programName: 'Computer Science Exchange', status: 'submitted', paymentStatus: 'pending', priority: 1, date: '2026-01-10', programId: 1 },
  { id: 2, studentName: 'ნინო კვარაცხელია', studentId: 's002', personalId: '01234567891', university: 'Vilnius University', programName: 'Business Administration', status: 'approved', paymentStatus: 'paid', priority: 1, date: '2026-01-05', programId: 2 },
  { id: 3, studentName: 'მარიამ გიორგაძე', studentId: 's004', personalId: '01234567893', university: 'University of Tartu', programName: 'Information Technology', status: 'submitted', paymentStatus: 'pending', priority: 2, date: '2026-01-15', programId: 3 },
  { id: 4, studentName: 'სანდრო ნაცვლიშვილი', studentId: 's007', personalId: '01234567896', university: 'University of Warsaw', programName: 'Economics and Management', status: 'rejected', paymentStatus: 'pending', priority: 1, date: '2025-12-20', programId: 5 },
  { id: 5, studentName: 'თამარ მიქელაძე', studentId: 's008', personalId: '01234567897', university: 'Charles University', programName: 'Law and Political Science', status: 'approved', paymentStatus: 'pending', priority: 1, date: '2026-01-08', programId: 6 },
  { id: 6, studentName: 'ანა ხვედელიძე', studentId: 's006', personalId: '01234567895', university: 'University of Ljubljana', programName: 'Architecture and Design', status: 'submitted', paymentStatus: 'paid', priority: 1, date: '2026-01-20', programId: 8 },
  { id: 7, studentName: 'ბაჩო ქობულაძე', studentId: 's010', personalId: '01234567899', university: 'University of Helsinki', programName: 'Computer Science Exchange', status: 'submitted', paymentStatus: 'pending', priority: 2, date: '2026-01-22', programId: 1 },
  { id: 8, studentName: 'ნიკა ბოჭორიშვილი', studentId: 's020', personalId: '01234568809', university: 'Riga Technical University', programName: 'Engineering Sciences', status: 'submitted', paymentStatus: 'paid', priority: 1, date: '2026-01-25', programId: 4 },
];

export const MOCK_SURVEYS: Survey[] = [
  {
    id: 1, title: 'სასწავლო პროცესის შეფასება', description: 'შეაფასეთ მიმდინარე სასწავლო სემესტრის ხარისხი', status: 'active', dueDate: '2026-04-01', target: 'global', responsesCount: 245, averageTime: '8 წუთი', durationDays: 30,
    questions: [
      { id: 1, type: 'radio', text: 'როგორ შეაფასებდით სასწავლო პროცესის ხარისხს?', options: ['ძალიან კარგი', 'კარგი', 'დამაკმაყოფილებელი', 'არადამაკმაყოფილებელი'], responses: [80, 100, 45, 20] },
      { id: 2, type: 'radio', text: 'მასწავლებლების კვალიფიკაციის შეფასება:', options: ['ძალიან მაღალი', 'მაღალი', 'საშუალო', 'დაბალი'], responses: [120, 95, 25, 5] },
      { id: 3, type: 'checkbox', text: 'რომელი სასწავლო რესურსები გამოიყენეთ?', options: ['ელექტრონული სახელმძღვანელოები', 'ბიბლიოთეკა', 'ონლაინ პლატფორმები', 'კონსულტაციები', 'ლექციების ჩანაწერები'], responses: [200, 150, 180, 90, 220] },
      { id: 4, type: 'text', text: 'რა გაუმჯობესება გჭირდება სასწავლო პროცესს?' },
    ]
  },
  {
    id: 2, title: 'საუნივერსიტეტო ინფრასტრუქტურა', description: 'გამოხატეთ თქვენი მოსაზრება კამპუსის ინფრასტრუქტურის შესახებ', status: 'active', dueDate: '2026-03-25', target: 'university', responsesCount: 112, averageTime: '6 წუთი', durationDays: 20,
    questions: [
      { id: 1, type: 'radio', text: 'დააფასეთ საბიბლიოთეკო სივრცე:', options: ['შესანიშნავი', 'კარგი', 'საშუალო', 'ცუდი'], responses: [30, 50, 25, 7] },
      { id: 2, type: 'radio', text: 'ინტერნეტ კავშირის ხარისხი კამპუსზე:', options: ['ძალიან სწრაფი', 'სწრაფი', 'ნორმალური', 'ნელი'], responses: [15, 40, 45, 12] },
      { id: 3, type: 'checkbox', text: 'რომელი ობიექტი საჭიროებს გაუმჯობესებას?', options: ['სასადილო', 'ბიბლიოთეკა', 'სპორტული დარბაზი', 'ლექციების დარბაზები', 'სტუდენტური სივრცე'], responses: [60, 40, 80, 30, 70] },
      { id: 4, type: 'text', text: 'სხვა წინადადება ინფრასტრუქტურის გაუმჯობესებისთვის:' },
    ]
  },
  {
    id: 3, title: 'მობილობის პროგრამის შეფასება', description: 'შეაფასეთ Erasmus+ მობილობის პროგრამის ეფექტიანობა', status: 'completed', dueDate: '2026-01-31', target: 'global', responsesCount: 78, averageTime: '12 წუთი', durationDays: 45, completedByCurrentUser: true,
    questions: [
      { id: 1, type: 'radio', text: 'მობილობის პროგრამით კმაყოფილების ხარისხი:', options: ['ძალიან კმაყოფილი', 'კმაყოფილი', 'ნეიტრალური', 'უკმაყოფილო'], responses: [40, 30, 5, 3] },
      { id: 2, type: 'checkbox', text: 'რა შეძელით მობილობის ფარგლებში?', options: ['ახალი კვლევა', 'ენის შესწავლა', 'ახალი მეგობრები', 'კარიერული კავშირები', 'კულტურული გამოცდილება'], responses: [35, 60, 70, 45, 78] },
      { id: 3, type: 'text', text: 'გაუზიარეთ თქვენი გამოცდილება:' },
    ]
  },
  {
    id: 4, title: 'სტუდენტური სერვისების შეფასება', description: 'რამდენად კმაყოფილი ხართ სტუდენტური სერვისების ხარისხით?', status: 'active', dueDate: '2026-04-10', target: 'global', responsesCount: 189, averageTime: '5 წუთი', durationDays: 25,
    questions: [
      { id: 1, type: 'radio', text: 'ადმინისტრაციის სამსახურის ხარისხი:', options: ['შესანიშნავი', 'კარგი', 'დამაკმაყოფილებელი', 'ცუდი'], responses: [50, 80, 45, 14] },
      { id: 2, type: 'radio', text: 'ონლაინ სისტემების გამოყენების სიმარტივე:', options: ['ძალიან მარტივი', 'მარტივი', 'საშუალო', 'რთული'], responses: [60, 90, 30, 9] },
      { id: 3, type: 'text', text: 'სხვა კომენტარი:' },
    ]
  },
  {
    id: 5, title: 'ციფრული სწავლების პლატფორმა', description: 'შეაფასეთ ე-სწავლების სისტემის ეფექტიანობა', status: 'active', dueDate: '2026-03-30', target: 'faculty', responsesCount: 67, averageTime: '7 წუთი', durationDays: 15,
    questions: [
      { id: 1, type: 'radio', text: 'ელ-სწავლების პლატფორმის ხარისხი:', options: ['შესანიშნავი', 'კარგი', 'საშუალო', 'ცუდი'], responses: [20, 30, 12, 5] },
      { id: 2, type: 'checkbox', text: 'რომელი ფუნქცია ყველაზე სასარგებლოა?', options: ['ვიდეო ლექციები', 'ტესტები', 'ფორუმები', 'ფაილები', 'შეტყობინებები'], responses: [60, 50, 30, 65, 40] },
      { id: 3, type: 'text', text: 'რა ფუნქციის დამატება გსურთ?' },
    ]
  },
  {
    id: 6, title: 'კვების ობიექტის ხარისხი', description: 'სტუდენტური კვების ობიექტის სერვისის შეფასება', status: 'active', dueDate: '2026-04-05', target: 'university', responsesCount: 203, averageTime: '4 წუთი', durationDays: 14,
    questions: [
      { id: 1, type: 'radio', text: 'საკვების ხარისხი:', options: ['შესანიშნავი', 'კარგი', 'საშუალო', 'ცუდი'], responses: [40, 90, 60, 13] },
      { id: 2, type: 'radio', text: 'ფასების სამართლიანობა:', options: ['ძალიან სამართლიანი', 'სამართლიანი', 'ძვირი', 'ძალიან ძვირი'], responses: [20, 100, 70, 13] },
      { id: 3, type: 'checkbox', text: 'რომელი კერძის დამატება გსურთ?', options: ['ვეგეტარიანული', 'ვეგანური', 'ჰალალ', 'გლუტენ-ფრი', 'ეთნიკური'], responses: [80, 50, 40, 30, 70] },
      { id: 4, type: 'text', text: 'სხვა შენიშვნა:' },
    ]
  },
];

export const MOCK_MINISTER_QUESTIONS: MinisterQuestion[] = [
  { id: 1, studentName: 'გიორგი მამულაშვილი', personalId: '01234567890', subject: 'სტიპენდიის პრობლემა', body: 'გაუმარჯოს, ბატონო მინისტრო. ვსარგებლობ შესაძლებლობით და გეკითხებით, ხომ არ არის გათვალისწინებული სტიპენდიების გაზრდა მომავალ სასწავლო წელს? სტუდენტებს დიდი ფინანსური სირთულეები გვაქვს.', status: 'answered', answer: 'გამარჯობა. სტიპენდიების საკითხი განხილვის პროცესშია. 2026 სასწავლო წლიდან 15%-ით გაზრდის გეგმა გვაქვს. დეტალები მალე გამოქვეყნდება.', answeredAt: '2026-02-15', date: '2026-02-10' },
  { id: 2, studentName: 'ნინო კვარაცხელია', personalId: '01234567891', subject: 'მობილობის პროგრამის გაფართოება', body: 'ბატონო მინისტრო, გთხოვთ გაზარდოთ Erasmus+ პარტნიორი უნივერსიტეტების რაოდენობა. ბევრი სტუდენტი ვარ დაინტერესებული გაცვლით სტუდენტობით.', status: 'answered', answer: 'დიდი მადლობა წინადადებისთვის. 2026 წელს 8 ახალ პარტნიორ უნივერსიტეტს ვამატებთ ევროპაში. სრული სია გამოქვეყნდება მარტის ბოლოს.', answeredAt: '2026-02-20', date: '2026-02-12' },
  { id: 3, studentName: 'მარიამ გიორგაძე', personalId: '01234567893', subject: 'სტუდენტური ბარათის განახლება', body: 'როდის მოხდება სტუდენტური ID ბარათის სისტემის განახლება? ამჟამინდელი ბარათი ხშირად ვერ მუშაობს ბიბლიოთეკის კარიბჭეებთან.', status: 'pending', date: '2026-03-01' },
  { id: 4, studentName: 'სანდრო ნაცვლიშვილი', personalId: '01234567896', subject: 'სწავლების ხარისხი', body: 'ბატონო მინისტრო, გვაწუხებს პედაგოგების კვალიფიკაციის საკითხი. ბევრ ფაკულტეტზე ლექტორები არ ასწავლიან სათანადოდ. გთხოვთ გაზარდოთ კვალიფიკაციის ამაღლების ბიუჯეტი.', status: 'pending', date: '2026-03-05' },
  { id: 5, studentName: 'ანა ხვედელიძე', personalId: '01234567895', subject: 'სტუდენტური კოოპერატივი', body: 'შესაძლებელია სტუდენტური კოოპერატივის შექმნა, სადაც სტუდენტები შეძლებენ საკუთარი პროდუქციის გაყიდვას? ეს ბიზნეს-პრაქტიკისთვის ძალიან კარგი იქნებოდა.', status: 'answered', answer: 'კარგი იდეაა! ჩვენ ვმუშაობთ სტუდენტური მეწარმეობის პროგრამაზე, რომელიც 2026 შემოდგომაზე გაეშვება. თქვენ გაქვთ შანსი გახდეთ პირველი მონაწილე.', answeredAt: '2026-03-08', date: '2026-03-06' },
  { id: 6, studentName: 'ბაჩო ქობულაძე', personalId: '01234567899', subject: 'ჟურნალისტიკის სპეციალობის განვითარება', body: 'გთხოვთ გაგვიზიაროთ, რა გეგმები გაქვთ ჟურნალისტიკის სპეციალობის მოდერნიზაციასთან დაკავშირებით? განსაკუთრებით ციფრული მედიის კუთხით.', status: 'pending', date: '2026-03-10' },
  { id: 7, studentName: 'თამარ მიქელაძე', personalId: '01234567897', subject: 'სამართლის ფაკულტეტის პრაქტიკა', body: 'ბატონო მინისტრო, სამართლის სტუდენტებს სჭირდებათ პრაქტიკული გამოცდილება. გთხოვთ ხელი შეუწყოთ სასამართლო პრაქტიკის პროგრამებს სახელმწიფო დაწესებულებებში.', status: 'answered', answer: 'სასამართლო სისტემასთან თანამშრომლობა გვაქვს. 2026 წლიდან 100 სტუდენტს ვთავაზობთ ანაზღაურებად სტაჟირებას სხვადასხვა სასამართლოში.', answeredAt: '2026-03-12', date: '2026-03-11' },
  { id: 8, studentName: 'გიგა კვირიკაშვილი', personalId: '01234568805', subject: 'მათემატიკის ოლიმპიადა', body: 'ბატონო მინისტრო, გთხოვთ მხარი დაუჭიროთ სტუდენტური მათემატიკის ოლიმპიადის ორგანიზებას. ეს ახალგაზრდა ნიჭიერ მათემატიკოსებს გამოავლენს.', status: 'pending', date: '2026-03-14' },
];

export const MOCK_ISSUES: IssueReport[] = [
  { id: 1, studentName: 'გიორგი მამულაშვილი', personalId: '01234567890', category: 'ინფრასტრუქტურა', description: 'მე-3 კორპუსში ლიფტი გაფუჭებულია უკვე 2 კვირაა. ეს სტუდენტებს, განსაკუთრებით შეზღუდული შესაძლებლობის მქონე პირებს, დიდ პრობლემებს უქმნის.', status: 'review', adminFeedback: 'ტექნიკური სამსახური მუშაობს. 3-5 სამუშაო დღეში გამოსწორდება.', date: '2026-02-20', studentId: 's001' },
  { id: 2, studentName: 'ნინო კვარაცხელია', personalId: '01234567891', category: 'აკადემიური', description: 'კალკულუსის კურსის ლექტორი ლექციებს სისტემატურად 15-20 წუთით აგვიანებს. ეს ჩვენ გვაგვიანებს შემდეგ ლექციებში.', status: 'resolved', adminFeedback: 'ლექტორთან ჩატარდა საუბარი. სიტუაცია გამოსწორდა. მომავალში პუნქტუალობას დავიცავთ.', date: '2026-01-15', studentId: 's002' },
  { id: 3, studentName: 'მარიამ გიორგაძე', personalId: '01234567893', category: 'ადმინისტრაცია', description: 'სტიპენდიის ბარათი 3 თვეა არ მიმისვლია. ადმინისტრაცია ამბობს "ველოდებითო" მაგრამ ახსნა-განმარტება არ გვეძლევა. გთხოვთ გამოხმაურებას.', status: 'new', date: '2026-03-01', studentId: 's004' },
  { id: 4, studentName: 'სანდრო ნაცვლიშვილი', personalId: '01234567896', category: 'ინფრასტრუქტურა', description: 'ბიბლიოთეკაში Wi-Fi სიგნალი ძალიან სუსტია, განსაკუთრებით მე-2 სართულზე. სტუდენტები ვერ ვიყენებთ ელექტრონულ რესურსებს.', status: 'review', adminFeedback: 'IT სამსახური ამოწმებს ინფრასტრუქტურას. გამაძლიერებლების დამატება იგეგმება.', date: '2026-02-25', studentId: 's007' },
  { id: 5, studentName: 'თამარ მიქელაძე', personalId: '01234567897', category: 'სხვა', description: 'სტუდენტური კვების სივრცე ვერ იტევს ყველა სტუდენტს. სადილის დროს 30-40 წუთი უწევს ლოდინი. სპეციალური კოორდინაცია სჭირდება.', status: 'new', date: '2026-03-05', studentId: 's008' },
  { id: 6, studentName: 'ანა ხვედელიძე', personalId: '01234567895', category: 'ადმინისტრაცია', description: 'წლიური ატესტაციის შედეგები გამოქვეყნდა შეცდომებით. ჩემი GPA 3.5-ის მაგივრად 2.8-ია ნაჩვენები. გთხოვთ სასწრაფოდ გამოასწოროთ.', status: 'resolved', adminFeedback: 'შეცდომა გამოსწორდა სისტემაში. ახლა სწორი მონაცემებია ნაჩვენები. ბოდიშს გიხდით.', date: '2026-01-20', studentId: 's006' },
  { id: 7, studentName: 'ბაჩო ქობულაძე', personalId: '01234567899', category: 'ინფრასტრუქტურა', description: 'სტუდენტების დასვენების დარბაზში გათბობის სისტემა ცუდად მუშაობს. ზამთარში ძალიან ცივაა, +12 გრადუსია.', status: 'new', date: '2026-03-08', studentId: 's010' },
  { id: 8, studentName: 'ლევან ხარაიშვილი', personalId: '01234568803', category: 'აკადემიური', description: 'ზოოლოგიის ლაბორატორიის სამუშაო წიგნები მოძველებულია - 2015 წლის გამოცემაა. ახალი კვლევები სახელმძღვანელოებში ვერ ჩანს.', status: 'review', adminFeedback: 'ახალი სახელმძღვანელოების შეძენა განიხილება. 2026 შემოდგომისთვის განახლდება.', date: '2026-02-28', studentId: 's014' },
  { id: 9, studentName: 'ნიკა ბოჭორიშვილი', personalId: '01234568809', category: 'ინფრასტრუქტურა', description: '4-B კომპიუტერულ ლაბორატორიაში 8 კომპიუტერიდან 3 გაფუჭებულია. სტუდენტები ვერ ვასრულებთ პრაქტიკულ სამუშაოებს.', status: 'new', date: '2026-03-12', studentId: 's020' },
  { id: 10, studentName: 'გიგა კვირიკაშვილი', personalId: '01234568805', category: 'სხვა', description: 'მე-2 კორპუსის კორიდორებში განათება ძალიან სუსტია. საღამოს 5 საათის შემდეგ ძნელი გახდა სიარული.', status: 'resolved', adminFeedback: 'ახალი LED განათება დამონტაჟდა. ყველა კორიდორში ახლა სათანადო განათებაა.', date: '2026-02-01', studentId: 's016' },
];

export const MOCK_OFFERS: Offer[] = [
  { id: 1, title: 'Erasmus+ მობილობა', subtitle: 'გაცვლითი პროგრამები ევროპაში', icon: 'fa-right-left', color: '#3b82f6', route: '/mobility' },
  { id: 2, title: 'სტიპენდიები', subtitle: 'განაცხადი საგრანტო სტიპენდიაზე', icon: 'fa-graduation-cap', color: '#10b981', route: '/services' },
  { id: 3, title: 'კარიერის ცენტრი', subtitle: 'დასაქმება და სტაჟირება', icon: 'fa-briefcase', color: '#f59e0b', route: '/services' },
  { id: 4, title: 'სტუდენტური ჯანდაცვა', subtitle: 'სამედიცინო დახმარება', icon: 'fa-heart-pulse', color: '#ef4444', route: '/services' },
  { id: 5, title: 'სპორტი და კულტურა', subtitle: 'სტუდენტური კლუბები', icon: 'fa-futbol', color: '#8b5cf6', route: '/services' },
  { id: 6, title: 'ფსიქოლოგიური დახმარება', subtitle: 'უფასო კონსულტაცია', icon: 'fa-brain', color: '#06b6d4', route: '/services' },
];
