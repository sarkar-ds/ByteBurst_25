export const formalEvents = [
  {
    id: 'debate',
    name: 'Debate',
    category: 'formal',
    description: 'Engage in intellectual discourse on contemporary tech and social issues',
    date: '2024-03-15',
    time: '10:00 AM',
    venue: 'Auditorium Hall',
    maxParticipants: 50,
    currentParticipants: 23,
    isTeamEvent: false,
    registrationDeadline: '2024-03-12',
    prizes: ['₹5000', '₹3000', '₹2000'],
    rules: [
      'Maximum 5 minutes per speaker',
      'Topics will be announced 30 minutes before',
      'No electronic devices allowed',
      'Dress code: Formal'
    ],
    coordinator: {
      name: 'Dr. Priya Sharma',
      contact: '+91-9876543210'
    }
  },
  {
    id: 'tech-presentation',
    name: 'Technical Presentation',
    category: 'formal',
    description: 'Present your innovative ideas and technical solutions',
    date: '2024-03-15',
    time: '2:00 PM',
    venue: 'Conference Room A',
    maxParticipants: 30,
    currentParticipants: 18,
    isTeamEvent: true,
    teamSize: 3,
    registrationDeadline: '2024-03-12',
    prizes: ['₹8000', '₹5000', '₹3000'],
    rules: [
      'Presentation time: 10 minutes + 5 minutes Q&A',
      'Team size: 2-3 members',
      'PowerPoint presentation required',
      'Focus on innovation and feasibility'
    ],
    coordinator: {
      name: 'Prof. Rajesh Kumar',
      contact: '+91-9876543211'
    }
  },
  {
    id: 'creative-writing',
    name: 'Creative Writing',
    category: 'formal',
    description: 'Express your creativity through the power of words',
    date: '2024-03-16',
    time: '11:00 AM',
    venue: 'Library Hall',
    maxParticipants: 40,
    currentParticipants: 15,
    isTeamEvent: false,
    registrationDeadline: '2024-03-13',
    prizes: ['₹4000', '₹2500', '₹1500'],
    rules: [
      'Time limit: 90 minutes',
      'Topic will be provided on the spot',
      'Handwritten entries only',
      'Word limit: 500-800 words'
    ],
    coordinator: {
      name: 'Dr. Anjali Verma',
      contact: '+91-9876543212'
    }
  },
  {
    id: 'bug-buster',
    name: 'Bug Buster',
    category: 'formal',
    description: 'Test your debugging skills and code optimization abilities',
    date: '2024-03-16',
    time: '3:00 PM',
    venue: 'Computer Lab 1',
    maxParticipants: 60,
    currentParticipants: 45,
    isTeamEvent: false,
    registrationDeadline: '2024-03-13',
    prizes: ['₹6000', '₹4000', '₹2500'],
    rules: [
      'Duration: 2 hours',
      'Languages: C/C++, Java, Python',
      'Individual participation only',
      'Debugging tools allowed'
    ],
    coordinator: {
      name: 'Prof. Amit Singh',
      contact: '+91-9876543213'
    }
  },
  {
    id: 'byte-burst',
    name: 'Byte Burst (Hackathon)',
    category: 'formal',
    description: '24-hour hackathon to build innovative tech solutions',
    date: '2024-03-17',
    time: '6:00 PM',
    venue: 'Innovation Lab',
    maxParticipants: 80,
    currentParticipants: 67,
    isTeamEvent: true,
    teamSize: 4,
    registrationDeadline: '2024-03-14',
    prizes: ['₹15000', '₹10000', '₹7000'],
    rules: [
      'Duration: 24 hours',
      'Team size: 2-4 members',
      'All tech stacks allowed',
      'Internet access provided'
    ],
    coordinator: {
      name: 'Dr. Vikash Yadav',
      contact: '+91-9876543214'
    }
  }
];

export const informalEvents = [
  {
    id: 'gaming',
    name: 'Gaming Championship',
    category: 'informal',
    description: 'Battle it out in popular gaming tournaments',
    date: '2024-03-15',
    time: '5:00 PM',
    venue: 'Gaming Arena',
    maxParticipants: 100,
    currentParticipants: 78,
    isTeamEvent: true,
    teamSize: 5,
    registrationDeadline: '2024-03-12',
    prizes: ['₹8000', '₹5000', '₹3000'],
    rules: [
      'Games: PUBG Mobile, Valorant, FIFA',
      'Team tournaments and solo battles',
      'Own devices required for mobile games',
      'Fair play policy strictly enforced'
    ],
    coordinator: {
      name: 'Arjun Patel',
      contact: '+91-9876543215'
    }
  },
  {
    id: 'treasure-hunt',
    name: 'Tech Treasure Hunt',
    category: 'informal',
    description: 'Solve tech puzzles and find hidden treasures across campus',
    date: '2024-03-16',
    time: '9:00 AM',
    venue: 'Campus Wide',
    maxParticipants: 60,
    currentParticipants: 32,
    isTeamEvent: true,
    teamSize: 3,
    registrationDeadline: '2024-03-13',
    prizes: ['₹6000', '₹4000', '₹2000'],
    rules: [
      'Team size: 2-3 members',
      'Duration: 3 hours',
      'Smartphones allowed for QR scanning',
      'All clues are tech-related'
    ],
    coordinator: {
      name: 'Priya Gupta',
      contact: '+91-9876543216'
    }
  },
  {
    id: 'meme-contest',
    name: 'Tech Meme Contest',
    category: 'informal',
    description: 'Create hilarious tech memes and win amazing prizes',
    date: '2024-03-16',
    time: '1:00 PM',
    venue: 'Online Submission',
    maxParticipants: 200,
    currentParticipants: 145,
    isTeamEvent: false,
    registrationDeadline: '2024-03-14',
    prizes: ['₹3000', '₹2000', '₹1000'],
    rules: [
      'Original content only',
      'Tech-related themes',
      'Submit via event portal',
      'Public voting + jury evaluation'
    ],
    coordinator: {
      name: 'Rohit Sharma',
      contact: '+91-9876543217'
    }
  },
  {
    id: 'lan-battle',
    name: 'LAN Battle Arena',
    category: 'informal',
    description: 'Classic LAN gaming with retro and modern games',
    date: '2024-03-17',
    time: '2:00 PM',
    venue: 'Computer Lab 2',
    maxParticipants: 40,
    currentParticipants: 28,
    isTeamEvent: false,
    registrationDeadline: '2024-03-14',
    prizes: ['₹4000', '₹2500', '₹1500'],
    rules: [
      'Counter-Strike, Age of Empires, etc.',
      'All equipment provided',
      'Tournament format',
      'No external software allowed'
    ],
    coordinator: {
      name: 'Karan Singh',
      contact: '+91-9876543218'
    }
  }
]; 