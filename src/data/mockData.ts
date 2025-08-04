import { Article, Comment } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence: Trends and Predictions for 2025',
    slug: 'future-artificial-intelligence-trends-2025',
    excerpt: 'Exploring the cutting-edge developments in AI technology and their potential impact on various industries.',
    content: `
      <p>Artificial Intelligence continues to reshape our world at an unprecedented pace. As we look ahead to 2025, several key trends are emerging that will define the next chapter of AI development.</p>
      
      <h2>1. Generative AI Goes Mainstream</h2>
      <p>Generative AI tools are becoming increasingly sophisticated, moving beyond simple text generation to create complex multimedia content. From automated video production to personalized marketing campaigns, the applications are limitless.</p>
      
      <h2>2. AI in Healthcare Revolution</h2>
      <p>The healthcare industry is experiencing a transformation driven by AI-powered diagnostics, drug discovery, and personalized treatment plans. Machine learning algorithms are now capable of detecting diseases earlier and more accurately than traditional methods.</p>
      
      <h2>3. Autonomous Systems Integration</h2>
      <p>Self-driving vehicles, autonomous drones, and robotic assistants are becoming more reliable and accessible. The integration of these systems into everyday life is accelerating rapidly.</p>
      
      <h2>Key Challenges Ahead</h2>
      <p>Despite the exciting possibilities, significant challenges remain:</p>
      <ul>
        <li>Ethical considerations and bias mitigation</li>
        <li>Data privacy and security concerns</li>
        <li>Regulatory frameworks and compliance</li>
        <li>Job displacement and reskilling needs</li>
      </ul>
      
      <p>As we navigate these developments, it's crucial to maintain a balance between innovation and responsible implementation.</p>
    `,
    author: 'Dr. Sarah Chen',
    publishedAt: '2024-12-20T10:30:00Z',
    readTime: 7,
    tags: ['AI', 'Technology', 'Future', 'Innovation'],
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    meta: {
      title: 'The Future of AI: 2025 Trends & Predictions | TrendWise',
      description: 'Discover the latest AI trends and predictions for 2025. Learn about generative AI, healthcare revolution, and autonomous systems.',
      keywords: ['artificial intelligence', 'AI trends 2025', 'technology predictions', 'machine learning']
    },
    likes: 234,
    trending: true
  },
  {
    id: '2',
    title: 'Sustainable Technology: Building a Greener Digital Future',
    slug: 'sustainable-technology-greener-digital-future',
    excerpt: 'How green technology initiatives are transforming the tech industry and reducing environmental impact.',
    content: `
      <p>The technology sector is undergoing a significant transformation as companies prioritize sustainability and environmental responsibility.</p>
      
      <h2>Green Data Centers</h2>
      <p>Major tech companies are investing billions in renewable energy to power their data centers. Google, Microsoft, and Amazon have committed to carbon neutrality within the next decade.</p>
      
      <h2>Circular Economy in Tech</h2>
      <p>Device manufacturers are embracing circular economy principles, focusing on repairability, recyclability, and sustainable materials.</p>
      
      <h2>Energy-Efficient Computing</h2>
      <p>New processor architectures and computing paradigms are dramatically reducing energy consumption while maintaining performance.</p>
    `,
    author: 'Michael Green',
    publishedAt: '2024-12-19T14:15:00Z',
    readTime: 5,
    tags: ['Sustainability', 'Green Tech', 'Environment', 'Innovation'],
    imageUrl: 'https://images.pexels.com/photos/9875409/pexels-photo-9875409.jpeg?auto=compress&cs=tinysrgb&w=1200',
    meta: {
      title: 'Sustainable Technology: Building a Greener Future | TrendWise',
      description: 'Explore how sustainable technology is transforming the digital landscape and reducing environmental impact.',
      keywords: ['sustainable technology', 'green tech', 'environmental technology', 'clean energy']
    },
    likes: 189,
    trending: true
  },
  {
    id: '3',
    title: 'The Rise of Web3: Decentralized Internet and Its Implications',
    slug: 'rise-web3-decentralized-internet-implications',
    excerpt: 'Understanding the shift towards a decentralized web and its potential to reshape digital interactions.',
    content: `
      <p>Web3 represents a paradigm shift towards a more decentralized, user-owned internet built on blockchain technology.</p>
      
      <h2>Core Principles of Web3</h2>
      <p>Web3 is built on three fundamental principles: decentralization, trustlessness, and permissionlessness.</p>
      
      <h2>Real-World Applications</h2>
      <p>From decentralized finance (DeFi) to non-fungible tokens (NFTs), Web3 applications are gaining mainstream adoption.</p>
      
      <h2>Challenges and Opportunities</h2>
      <p>While Web3 offers exciting possibilities, it also faces challenges in scalability, user experience, and regulatory clarity.</p>
    `,
    author: 'Alex Rivera',
    publishedAt: '2024-12-18T09:20:00Z',
    readTime: 6,
    tags: ['Web3', 'Blockchain', 'DeFi', 'Cryptocurrency'],
    imageUrl: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=1200',
    meta: {
      title: 'The Rise of Web3: Decentralized Internet Revolution | TrendWise',
      description: 'Discover how Web3 is reshaping the internet with decentralized applications, blockchain technology, and user ownership.',
      keywords: ['web3', 'blockchain', 'decentralized internet', 'cryptocurrency', 'DeFi']
    },
    likes: 156,
    trending: false
  },
  {
    id: '4',
    title: 'Quantum Computing Breakthrough: What It Means for the Future',
    slug: 'quantum-computing-breakthrough-future-implications',
    excerpt: 'Recent advances in quantum computing technology and their potential impact on cryptography, medicine, and beyond.',
    content: `
      <p>Quantum computing has reached several significant milestones this year, bringing us closer to practical applications.</p>
      
      <h2>Recent Breakthroughs</h2>
      <p>Major tech companies have announced new quantum processors with increased qubit counts and improved error rates.</p>
      
      <h2>Potential Applications</h2>
      <p>Quantum computing promises to revolutionize drug discovery, financial modeling, and cryptography.</p>
      
      <h2>Timeline to Commercialization</h2>
      <p>While full-scale quantum computers are still years away, cloud-based quantum services are already available.</p>
    `,
    author: 'Dr. Lisa Wang',
    publishedAt: '2024-12-17T16:45:00Z',
    readTime: 8,
    tags: ['Quantum Computing', 'Technology', 'Science', 'Innovation'],
    imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
    meta: {
      title: 'Quantum Computing Breakthrough: Future Implications | TrendWise',
      description: 'Explore the latest quantum computing breakthroughs and their potential impact on technology and society.',
      keywords: ['quantum computing', 'quantum technology', 'quantum breakthrough', 'quantum applications']
    },
    likes: 298,
    trending: true
  },
  {
    id: '5',
    title: 'Remote Work Evolution: The Future of Digital Workspaces',
    slug: 'remote-work-evolution-digital-workspaces-future',
    excerpt: 'How remote work technologies are evolving to create more immersive and productive digital work environments.',
    content: `
      <p>The remote work revolution has accelerated the development of sophisticated digital workspace technologies.</p>
      
      <h2>Virtual Reality Meetings</h2>
      <p>VR technology is making remote meetings more immersive and engaging than traditional video calls.</p>
      
      <h2>AI-Powered Productivity Tools</h2>
      <p>Artificial intelligence is being integrated into productivity software to automate routine tasks and enhance collaboration.</p>
      
      <h2>The Hybrid Work Model</h2>
      <p>Companies are adopting flexible hybrid models that combine remote and in-office work.</p>
    `,
    author: 'Jennifer Martinez',
    publishedAt: '2024-12-16T11:30:00Z',
    readTime: 4,
    tags: ['Remote Work', 'Digital Workspace', 'Productivity', 'Future of Work'],
    imageUrl: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1200',
    meta: {
      title: 'Remote Work Evolution: Digital Workspaces Future | TrendWise',
      description: 'Discover how remote work technologies are creating more immersive and productive digital work environments.',
      keywords: ['remote work', 'digital workspace', 'virtual meetings', 'hybrid work']
    },
    likes: 127,
    trending: false
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    articleSlug: 'future-artificial-intelligence-trends-2025',
    user: {
      id: '2',
      name: 'Emma Johnson',
      email: 'emma@example.com',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      role: 'user'
    },
    content: 'Excellent article! The points about healthcare AI are particularly insightful. I work in the medical field and we\'re already seeing some of these changes.',
    createdAt: '2024-12-20T12:15:00Z',
    likes: 8
  },
  {
    id: '2',
    articleSlug: 'future-artificial-intelligence-trends-2025',
    user: {
      id: '3',
      name: 'David Chen',
      email: 'david@example.com',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      role: 'user'
    },
    content: 'The ethical considerations section is crucial. We need to ensure AI development is responsible and inclusive.',
    createdAt: '2024-12-20T14:30:00Z',
    likes: 12
  },
  {
    id: '3',
    articleSlug: 'sustainable-technology-greener-digital-future',
    user: {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      role: 'user'
    },
    content: 'It\'s encouraging to see tech giants taking sustainability seriously. The circular economy approach is the way forward.',
    createdAt: '2024-12-19T16:45:00Z',
    likes: 5
  }
];