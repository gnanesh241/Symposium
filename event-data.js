const eventsData = {
    'hack-attack': {
        title: 'Hack Attack',
        date: 'March 15, 2025',
        time: '9:00 AM - 9:00 AM (24 Hours)',
        venue: 'Main Auditorium',
        image: 'https://source.unsplash.com/1600x900/?coding',
        description: 'A 24-hour coding marathon where teams compete to build innovative solutions to real-world problems. Show off your coding skills, creativity, and problem-solving abilities in this exciting hackathon!',
        rules: [
            'Teams must consist of exactly 4 members',
            'All code must be written during the hackathon',
            'Use of open-source libraries is allowed',
            'Projects must be original work',
            'Final submission must include source code and documentation'
        ],
        requirements: [
            'Laptop with required development tools',
            'Valid college ID',
            'Power adapters',
            'Basic knowledge of programming'
        ],
        prizes: {
            first: '₹50,000',
            second: '₹30,000',
            third: '₹20,000'
        },
        coordinators: [
            {
                name: 'John Doe',
                phone: '9876543210',
                role: 'Technical Head'
            },
            {
                name: 'Jane Smith',
                phone: '9876543211',
                role: 'Event Coordinator'
            }
        ]
    },
    'robo-wars': {
        title: 'RoboWars',
        date: 'March 16, 2025',
        time: '10:00 AM - 6:00 PM',
        venue: 'College Ground',
        image: 'https://source.unsplash.com/1600x900/?robotics',
        description: 'Battle of robots! Design, build and compete in this exciting robotics competition. Show your engineering skills and strategic thinking as your robot fights for supremacy!',
        rules: [
            'Teams of 3 members maximum',
            'Robot must fit within size constraints',
            'No hazardous materials allowed',
            'Remote controlled robots only',
            'Weight limit: 5kg'
        ],
        requirements: [
            'Robot kit or custom-built robot',
            'Safety equipment',
            'Tools for repairs',
            'Spare parts and batteries'
        ],
        prizes: {
            first: '₹40,000',
            second: '₹25,000',
            third: '₹15,000'
        },
        coordinators: [
            {
                name: 'Mike Johnson',
                phone: '9876543212',
                role: 'Robotics Head'
            },
            {
                name: 'Sarah Williams',
                phone: '9876543213',
                role: 'Technical Coordinator'
            }
        ]
    },
    'debug-master': {
        title: 'Debug Master',
        date: 'March 17, 2025',
        time: '2:00 PM - 6:00 PM',
        venue: 'Computer Lab',
        image: 'https://source.unsplash.com/1600x900/?debugging',
        description: 'Put your debugging skills to the test! Find and fix bugs in increasingly complex code challenges. Race against time to solve programming puzzles.',
        rules: [
            'Individual participation only',
            'No external resources allowed',
            'Time limit strictly enforced',
            'Multiple programming languages supported',
            'Automated testing system'
        ],
        requirements: [
            'Laptop',
            'Knowledge of basic programming',
            'Valid college ID',
            'Pre-installed IDEs'
        ],
        prizes: {
            first: '₹30,000',
            second: '₹20,000',
            third: '₹10,000'
        },
        coordinators: [
            {
                name: 'Alex Chen',
                phone: '9876543214',
                role: 'Debug Challenge Head'
            },
            {
                name: 'Emily Brown',
                phone: '9876543215',
                role: 'Technical Support'
            }
        ]
    },
    'dance-mania': {
        title: 'Dance Mania',
        date: 'March 18, 2025',
        time: '5:00 PM - 7:00 PM',
        venue: 'College Auditorium',
        image: 'https://source.unsplash.com/1600x900/?dance',
        description: 'Show your moves in this epic dance battle! Solo and group performances welcome. All dance styles accepted - from classical to contemporary, hip-hop to freestyle.',
        rules: [
            'Solo or group (max 8 members)',
            'Time limit: 5-7 minutes',
            'Original choreography required',
            'Props allowed',
            'Music submission 2 days prior'
        ],
        requirements: [
            'Costume',
            'Props (if any)',
            'Music in MP3 format',
            'Performance release form'
        ],
        prizes: {
            first: '₹30,000',
            second: '₹20,000',
            third: '₹10,000'
        },
        coordinators: [
            {
                name: 'Lisa Dance',
                phone: '9876543216',
                role: 'Dance Coordinator'
            },
            {
                name: 'Mark Steps',
                phone: '9876543217',
                role: 'Event Manager'
            }
        ]
    },
    'battle-of-bands': {
        title: 'Battle of Bands',
        date: 'March 19, 2025',
        time: '6:00 PM - 9:00 PM',
        venue: 'Open Air Theatre',
        image: 'https://source.unsplash.com/1600x900/?music-band',
        description: 'Rock the stage with your band! Showcase your musical talent in this epic battle of bands. From rock to jazz, show us what you got!',
        rules: [
            'Minimum 3 members per band',
            'Original composition preferred',
            '15 minutes performance time',
            'Setup time: 10 minutes',
            'Own instruments required'
        ],
        requirements: [
            'Instruments',
            'Setlist submission',
            'Technical requirements list',
            'Band profile'
        ],
        prizes: {
            first: '₹45,000',
            second: '₹30,000',
            third: '₹15,000'
        },
        coordinators: [
            {
                name: 'Rock Star',
                phone: '9876543218',
                role: 'Music Coordinator'
            },
            {
                name: 'Jazz Cool',
                phone: '9876543219',
                role: 'Stage Manager'
            }
        ]
    },
    'art-attack': {
        title: 'Art Attack',
        date: 'March 20, 2025',
        time: '10:00 AM - 3:00 PM',
        venue: 'Art Studio',
        image: 'https://source.unsplash.com/1600x900/?art',
        description: 'Express your creativity through art! Whether it's painting, sketching, or digital art, show us your artistic vision in this creative competition.',
        rules: [
            'Individual participation only',
            'All art forms accepted',
            'Original work only',
            'Theme will be provided',
            'Maximum size: 24x36 inches'
        ],
        requirements: [
            'Own art supplies',
            'Easel (if needed)',
            'Digital tablet (for digital art)',
            'Portfolio (optional)'
        ],
        prizes: {
            first: '₹25,000',
            second: '₹15,000',
            third: '₹10,000'
        },
        coordinators: [
            {
                name: 'Art Master',
                phone: '9876543220',
                role: 'Art Coordinator'
            },
            {
                name: 'Creative Soul',
                phone: '9876543221',
                role: 'Event Organizer'
            }
        ]
    }
}; 