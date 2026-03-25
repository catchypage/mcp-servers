/**
 * English placement test — 55 single-choice questions (A1 → C1).
 * Each question has a CEFR target level, section tag, and explanation.
 * Keep IDs stable: they are stored with user results.
 */

export interface PlacementQuestion {
  id: string
  section: 'grammar' | 'vocabulary' | 'reading' | 'use_of_english'
  cefr: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  stem: string
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  explanation: string
}

export const PLACEMENT_QUESTIONS_EN: PlacementQuestion[] = [
  // ─── GRAMMAR A1 (4) ───────────────────────────────────────────────
  {
    id: 'g-a1-01',
    section: 'grammar',
    cefr: 'A1',
    stem: 'She ___ a student.',
    options: ['am', 'is', 'are', 'be'],
    correctIndex: 1,
    explanation: '"She" requires "is" — third person singular of "to be".',
  },
  {
    id: 'g-a1-02',
    section: 'grammar',
    cefr: 'A1',
    stem: 'They ___ from Brazil.',
    options: ['is', 'am', 'are', 'be'],
    correctIndex: 2,
    explanation: '"They" requires "are".',
  },
  {
    id: 'g-a1-03',
    section: 'grammar',
    cefr: 'A1',
    stem: 'I have two ___.',
    options: ['childs', 'childrens', 'children', 'child'],
    correctIndex: 2,
    explanation: '"Children" is the irregular plural of "child".',
  },
  {
    id: 'g-a1-04',
    section: 'grammar',
    cefr: 'A1',
    stem: '___ you like coffee?',
    options: ['Are', 'Do', 'Is', 'Has'],
    correctIndex: 1,
    explanation: 'Questions with "like" use the auxiliary "do".',
  },

  {
    id: 'g-a1-05',
    section: 'grammar',
    cefr: 'A1',
    stem: 'He ___ a big house.',
    options: ['have', 'has', 'having', 'haves'],
    correctIndex: 1,
    explanation: 'Third person singular: "he has".',
  },
  {
    id: 'v-a1-04',
    section: 'vocabulary',
    cefr: 'A1',
    stem: 'What colour is the sky on a clear day?',
    options: ['green', 'blue', 'red', 'yellow'],
    correctIndex: 1,
    explanation: 'The sky is blue on a clear day.',
  },
  {
    id: 'v-a1-05',
    section: 'vocabulary',
    cefr: 'A1',
    stem: 'You sleep in a ___.',
    options: ['kitchen', 'garden', 'bedroom', 'bathroom'],
    correctIndex: 2,
    explanation: 'A bedroom is the room where you sleep.',
  },

  // ─── GRAMMAR A2 (4) ───────────────────────────────────────────────
  {
    id: 'g-a2-01',
    section: 'grammar',
    cefr: 'A2',
    stem: 'We ___ to the cinema last night.',
    options: ['go', 'goes', 'went', 'going'],
    correctIndex: 2,
    explanation: '"Last night" signals past simple → "went".',
  },
  {
    id: 'g-a2-02',
    section: 'grammar',
    cefr: 'A2',
    stem: 'There ___ a lot of people at the party.',
    options: ['was', 'were', 'is', 'has'],
    correctIndex: 1,
    explanation: '"People" is plural → "were".',
  },
  {
    id: 'g-a2-03',
    section: 'grammar',
    cefr: 'A2',
    stem: 'She is ___ than her sister.',
    options: ['tall', 'taller', 'tallest', 'more tall'],
    correctIndex: 1,
    explanation: 'Short adjective comparative → add "-er".',
  },
  {
    id: 'g-a2-04',
    section: 'grammar',
    cefr: 'A2',
    stem: 'I ___ my homework right now.',
    options: ['do', 'does', 'am doing', 'did'],
    correctIndex: 2,
    explanation: '"Right now" signals present continuous.',
  },

  // ─── GRAMMAR B1 (4) ───────────────────────────────────────────────
  {
    id: 'g-b1-01',
    section: 'grammar',
    cefr: 'B1',
    stem: 'If it ___ tomorrow, we will stay home.',
    options: ['rains', 'will rain', 'rained', 'rain'],
    correctIndex: 0,
    explanation: 'First conditional: if + present simple, will + infinitive.',
  },
  {
    id: 'g-b1-02',
    section: 'grammar',
    cefr: 'B1',
    stem: 'She has lived here ___ 2015.',
    options: ['for', 'since', 'from', 'during'],
    correctIndex: 1,
    explanation: '"Since" is used with a specific point in time.',
  },
  {
    id: 'g-b1-03',
    section: 'grammar',
    cefr: 'B1',
    stem: 'He told me that he ___ the movie.',
    options: [
      'already saw',
      'has already seen',
      'had already seen',
      'already sees',
    ],
    correctIndex: 2,
    explanation: 'Reported speech shifts present perfect to past perfect.',
  },
  {
    id: 'g-b1-04',
    section: 'grammar',
    cefr: 'B1',
    stem: "You ___ wear a seatbelt. It's the law.",
    options: ['should', 'must', 'can', 'might'],
    correctIndex: 1,
    explanation: '"Must" expresses obligation (legal requirement).',
  },

  // ─── GRAMMAR B2 (4) ───────────────────────────────────────────────
  {
    id: 'g-b2-01',
    section: 'grammar',
    cefr: 'B2',
    stem: 'If I ___ you, I would apply for that job.',
    options: ['am', 'was', 'were', 'be'],
    correctIndex: 2,
    explanation: 'Second conditional uses subjunctive "were" for all persons.',
  },
  {
    id: 'g-b2-02',
    section: 'grammar',
    cefr: 'B2',
    stem: 'The report ___ by the time you arrive.',
    options: [
      'will finish',
      'will be finished',
      'will have been finished',
      'is finishing',
    ],
    correctIndex: 2,
    explanation: 'Future perfect passive: "will have been + past participle".',
  },
  {
    id: 'g-b2-03',
    section: 'grammar',
    cefr: 'B2',
    stem: 'Not only ___ late, but he also forgot the documents.',
    options: ['he was', 'was he', 'he is', 'is he'],
    correctIndex: 1,
    explanation: '"Not only" at the start triggers subject-verb inversion.',
  },
  {
    id: 'g-b2-04',
    section: 'grammar',
    cefr: 'B2',
    stem: 'I wish I ___ more time to travel.',
    options: ['have', 'had', 'would have', 'having'],
    correctIndex: 1,
    explanation: '"I wish" + past simple expresses a present unreal wish.',
  },

  // ─── GRAMMAR C1 (4) ───────────────────────────────────────────────
  {
    id: 'g-c1-01',
    section: 'grammar',
    cefr: 'C1',
    stem: 'Had she known about the delay, she ___ an earlier flight.',
    options: ['would book', 'would have booked', 'had booked', 'booked'],
    correctIndex: 1,
    explanation:
      'Third conditional: had + past participle → would have + past participle.',
  },
  {
    id: 'g-c1-02',
    section: 'grammar',
    cefr: 'C1',
    stem: 'Under no circumstances ___ to leave the building during the drill.',
    options: [
      'employees are allowed',
      'are employees allowed',
      'employees allowed',
      'allowed employees',
    ],
    correctIndex: 1,
    explanation: 'Negative adverbial at the start triggers inversion.',
  },
  {
    id: 'g-c1-03',
    section: 'grammar',
    cefr: 'C1',
    stem: 'The results, ___ were published yesterday, confirm the hypothesis.',
    options: ['that', 'which', 'what', 'whom'],
    correctIndex: 1,
    explanation:
      'Non-restrictive (extra info) relative clause uses "which", not "that".',
  },
  {
    id: 'g-c1-04',
    section: 'grammar',
    cefr: 'C1',
    stem: "It's high time we ___ a decision.",
    options: ['make', 'made', 'will make', 'have made'],
    correctIndex: 1,
    explanation: '"It\'s high time" is followed by past simple (unreal past).',
  },

  // ─── VOCABULARY A1 (3) ─────────────────────────────────────────────
  {
    id: 'v-a1-01',
    section: 'vocabulary',
    cefr: 'A1',
    stem: 'What is the opposite of "hot"?',
    options: ['warm', 'cold', 'cool', 'wet'],
    correctIndex: 1,
    explanation: '"Cold" is the direct opposite of "hot".',
  },
  {
    id: 'v-a1-02',
    section: 'vocabulary',
    cefr: 'A1',
    stem: 'A place where you buy food is a ___.',
    options: ['library', 'hospital', 'supermarket', 'school'],
    correctIndex: 2,
    explanation: 'A supermarket is a store that sells food.',
  },
  {
    id: 'v-a1-03',
    section: 'vocabulary',
    cefr: 'A1',
    stem: "My mother's sister is my ___.",
    options: ['cousin', 'aunt', 'grandmother', 'niece'],
    correctIndex: 1,
    explanation: "Your parent's sister is your aunt.",
  },

  // ─── VOCABULARY A2 (3) ─────────────────────────────────────────────
  {
    id: 'v-a2-01',
    section: 'vocabulary',
    cefr: 'A2',
    stem: 'Can you ___ me the way to the station?',
    options: ['say', 'talk', 'tell', 'speak'],
    correctIndex: 2,
    explanation: '"Tell" is used with an indirect object: tell me, tell him.',
  },
  {
    id: 'v-a2-02',
    section: 'vocabulary',
    cefr: 'A2',
    stem: 'I need to ___ an appointment with the dentist.',
    options: ['do', 'make', 'take', 'get'],
    correctIndex: 1,
    explanation: 'Collocation: "make an appointment".',
  },
  {
    id: 'v-a2-03',
    section: 'vocabulary',
    cefr: 'A2',
    stem: "She ___ her keys and couldn't get into the house.",
    options: ['missed', 'lost', 'forgot', 'left'],
    correctIndex: 1,
    explanation:
      '"Lost" means she can\'t find them; "forgot" means didn\'t remember to bring.',
  },

  // ─── VOCABULARY B1 (3) ─────────────────────────────────────────────
  {
    id: 'v-b1-01',
    section: 'vocabulary',
    cefr: 'B1',
    stem: 'The company decided to ___ 200 new employees.',
    options: ['fire', 'hire', 'retire', 'resign'],
    correctIndex: 1,
    explanation: '"Hire" means to give someone a job.',
  },
  {
    id: 'v-b1-02',
    section: 'vocabulary',
    cefr: 'B1',
    stem: "I'm not sure, but I think the meeting has been ___ until Friday.",
    options: ['cancelled', 'postponed', 'refused', 'delayed'],
    correctIndex: 1,
    explanation: '"Postponed" means moved to a later date.',
  },
  {
    id: 'v-b1-03',
    section: 'vocabulary',
    cefr: 'B1',
    stem: 'He gave a very ___ speech and everyone applauded.',
    options: ['bored', 'boring', 'impressed', 'impressive'],
    correctIndex: 3,
    explanation: '"Impressive" describes something that causes admiration.',
  },

  // ─── VOCABULARY B2 (3) ─────────────────────────────────────────────
  {
    id: 'v-b2-01',
    section: 'vocabulary',
    cefr: 'B2',
    stem: 'The new policy will have far-___ consequences.',
    options: ['reaching', 'going', 'spreading', 'coming'],
    correctIndex: 0,
    explanation: '"Far-reaching" means having a wide impact.',
  },
  {
    id: 'v-b2-02',
    section: 'vocabulary',
    cefr: 'B2',
    stem: 'She managed to ___ her fear of public speaking.',
    options: ['overtake', 'overcome', 'overlook', 'overturn'],
    correctIndex: 1,
    explanation: '"Overcome" means to succeed in dealing with a problem.',
  },
  {
    id: 'v-b2-03',
    section: 'vocabulary',
    cefr: 'B2',
    stem: 'The evidence is purely ___ — there are no hard facts.',
    options: ['anecdotal', 'anonymous', 'analytical', 'annual'],
    correctIndex: 0,
    explanation:
      '"Anecdotal" means based on personal accounts, not verified data.',
  },

  // ─── VOCABULARY C1 (3) ─────────────────────────────────────────────
  {
    id: 'v-c1-01',
    section: 'vocabulary',
    cefr: 'C1',
    stem: "The artist's work ___ traditional boundaries between painting and sculpture.",
    options: ['transcends', 'transfers', 'translates', 'transmits'],
    correctIndex: 0,
    explanation: '"Transcends" means goes beyond limits.',
  },
  {
    id: 'v-c1-02',
    section: 'vocabulary',
    cefr: 'C1',
    stem: 'After months of negotiation, they reached a ___ agreement.',
    options: ['tentative', 'terminal', 'temporal', 'tangible'],
    correctIndex: 0,
    explanation:
      '"Tentative" means not certain or agreed upon yet, provisional.',
  },
  {
    id: 'v-c1-03',
    section: 'vocabulary',
    cefr: 'C1',
    stem: 'His remarks were so ___ that several colleagues left the room.',
    options: ['inflammatory', 'inflatable', 'influential', 'informative'],
    correctIndex: 0,
    explanation: '"Inflammatory" means intended to provoke anger.',
  },

  // ─── READING A2 (2) ───────────────────────────────────────────────
  {
    id: 'r-a2-01',
    section: 'reading',
    cefr: 'A2',
    stem: '"The shop closes at 6 pm on weekdays and 4 pm on Saturdays. It is closed on Sundays." When does the shop close on Saturday?',
    options: ['6 pm', '4 pm', "It doesn't open", '5 pm'],
    correctIndex: 1,
    explanation: 'The text states "4 pm on Saturdays".',
  },
  {
    id: 'r-a2-02',
    section: 'reading',
    cefr: 'A2',
    stem: '"Tom usually walks to work, but today he is taking the bus because it is raining." Why is Tom taking the bus?',
    options: [
      'He is late',
      'His car is broken',
      'It is raining',
      'He likes the bus',
    ],
    correctIndex: 2,
    explanation: 'The reason given is "because it is raining".',
  },

  // ─── READING B1 (3) ───────────────────────────────────────────────
  {
    id: 'r-b1-01',
    section: 'reading',
    cefr: 'B1',
    stem: '"Studies show that people who read regularly tend to have larger vocabularies and better critical thinking skills. However, the type of reading material also matters — fiction appears to boost empathy more than non-fiction." According to the text, what does fiction improve?',
    options: [
      'Vocabulary only',
      'Critical thinking',
      'Empathy',
      'Reading speed',
    ],
    correctIndex: 2,
    explanation: 'The text says fiction "appears to boost empathy".',
  },
  {
    id: 'r-b1-02',
    section: 'reading',
    cefr: 'B1',
    stem: '"The city council has proposed a new bike lane along Main Street. Supporters say it will reduce traffic and improve safety, while opponents worry about the loss of parking spaces." What is the opponents\' concern?',
    options: [
      'More traffic',
      'Higher costs',
      'Loss of parking',
      'Noise pollution',
    ],
    correctIndex: 2,
    explanation: 'Opponents "worry about the loss of parking spaces".',
  },
  {
    id: 'r-b1-03',
    section: 'reading',
    cefr: 'B1',
    stem: '"Remote work has grown significantly since 2020. While many employees appreciate the flexibility, some report feeling isolated and find it harder to collaborate." What is a disadvantage of remote work mentioned in the text?',
    options: [
      'Lower salaries',
      'Feeling isolated',
      'Longer hours',
      'Fewer holidays',
    ],
    correctIndex: 1,
    explanation: 'The text mentions "feeling isolated" as a downside.',
  },

  // ─── READING B2 (3) ───────────────────────────────────────────────
  {
    id: 'r-b2-01',
    section: 'reading',
    cefr: 'B2',
    stem: '"Although renewable energy sources are becoming cheaper, the transition away from fossil fuels is hampered by existing infrastructure and political inertia. Experts argue that without substantial government intervention, market forces alone will not drive change quickly enough." What does the author imply?',
    options: [
      'Renewable energy is too expensive',
      'Governments must act to speed up the transition',
      'Market forces are sufficient',
      'Fossil fuels will always dominate',
    ],
    correctIndex: 1,
    explanation:
      '"Without substantial government intervention, market forces alone will not…" implies government action is necessary.',
  },
  {
    id: 'r-b2-02',
    section: 'reading',
    cefr: 'B2',
    stem: '"The algorithm personalizes content based on user behavior, creating a feedback loop that reinforces existing preferences. Critics warn this leads to filter bubbles where users are rarely exposed to opposing viewpoints." What is a "filter bubble"?',
    options: [
      'A type of spam filter',
      'An environment with limited diverse perspectives',
      'A social media trend',
      'A way to protect privacy',
    ],
    correctIndex: 1,
    explanation:
      'A filter bubble means users "are rarely exposed to opposing viewpoints".',
  },

  {
    id: 'r-b2-03',
    section: 'reading',
    cefr: 'B2',
    stem: '"Microplastics have been found in the deepest ocean trenches and the most remote Arctic ice. While their long-term health effects on humans remain uncertain, animal studies suggest they can cause inflammation and disrupt endocrine function." What is known about the health effects on humans?',
    options: [
      'They are clearly harmful',
      'They are completely safe',
      'They remain uncertain',
      'They only affect children',
    ],
    correctIndex: 2,
    explanation:
      'The text states "long-term health effects on humans remain uncertain".',
  },

  // ─── READING C1 (2) ───────────────────────────────────────────────
  {
    id: 'r-c1-01',
    section: 'reading',
    cefr: 'C1',
    stem: '"While the correlation between sleep deprivation and cognitive decline is well-documented, establishing causation remains elusive. Longitudinal studies are confounded by variables such as pre-existing conditions, medication use, and socioeconomic factors." What challenge do researchers face?',
    options: [
      'Sleep deprivation is rare',
      'Proving that lack of sleep causes cognitive decline',
      'Finding enough participants',
      'Measuring sleep accurately',
    ],
    correctIndex: 1,
    explanation:
      '"Establishing causation remains elusive" — proving the cause-effect link is the challenge.',
  },
  {
    id: 'r-c1-02',
    section: 'reading',
    cefr: 'C1',
    stem: '"The author\'s prose oscillates between sardonic wit and genuine pathos, creating a tonal ambiguity that some reviewers found disorienting but others praised as a faithful mirror of contemporary experience." The word "oscillates" most nearly means:',
    options: ['deteriorates', 'alternates', 'accelerates', 'originates'],
    correctIndex: 1,
    explanation: '"Oscillates" means swings back and forth — alternates.',
  },

  // ─── USE OF ENGLISH B1 (2) ─────────────────────────────────────────
  {
    id: 'u-b1-01',
    section: 'use_of_english',
    cefr: 'B1',
    stem: "I'm really looking forward ___ you at the party.",
    options: ['to see', 'to seeing', 'seeing', 'see'],
    correctIndex: 1,
    explanation: '"Look forward to" is followed by a gerund (-ing form).',
  },
  {
    id: 'u-b1-02',
    section: 'use_of_english',
    cefr: 'B1',
    stem: "She's not used ___ in such cold weather.",
    options: ['to drive', 'to driving', 'drive', 'driving'],
    correctIndex: 1,
    explanation: '"Be used to" + gerund: accustomed to doing something.',
  },

  // ─── USE OF ENGLISH B2 (2) ─────────────────────────────────────────
  {
    id: 'u-b2-01',
    section: 'use_of_english',
    cefr: 'B2',
    stem: 'He denied ___ the confidential documents.',
    options: ['to leak', 'leaking', 'to have leak', 'leak'],
    correctIndex: 1,
    explanation: '"Deny" is followed by a gerund.',
  },
  {
    id: 'u-b2-02',
    section: 'use_of_english',
    cefr: 'B2',
    stem: 'The project was completed on time ___ the numerous setbacks.',
    options: ['although', 'despite', 'however', 'moreover'],
    correctIndex: 1,
    explanation: '"Despite" + noun phrase: in spite of the setbacks.',
  },

  // ─── USE OF ENGLISH C1 (3) ─────────────────────────────────────────
  {
    id: 'u-c1-01',
    section: 'use_of_english',
    cefr: 'C1',
    stem: 'Scarcely ___ the announcement when protests erupted.',
    options: ['they had made', 'had they made', 'they made', 'did they make'],
    correctIndex: 1,
    explanation:
      '"Scarcely" at the start triggers subject-auxiliary inversion with past perfect.',
  },
  {
    id: 'u-c1-02',
    section: 'use_of_english',
    cefr: 'C1',
    stem: 'So ___ was the storm that several trees were uprooted.',
    options: ['severe', 'severely', 'severity', 'severed'],
    correctIndex: 0,
    explanation: '"So + adjective" in an inverted structure: "So severe was…".',
  },
  {
    id: 'u-c1-03',
    section: 'use_of_english',
    cefr: 'C1',
    stem: 'The proposal, however well-___, failed to address the core issue.',
    options: ['intentioned', 'intended', 'intending', 'intent'],
    correctIndex: 0,
    explanation: '"Well-intentioned" means having good intentions.',
  },
]
