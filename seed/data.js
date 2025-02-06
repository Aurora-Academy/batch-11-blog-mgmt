const user = {
  name: "Raktim Admin",
  email: "rakimsth@gmail.com",
  password: "abcd",
  isEmailVerified: true,
  roles: ["admin"],
  isActive: true,
};

const blogs = [
  {
    title: "The Future of AI in Content Management",
    slug: "future-of-ai-content-management",
    content:
      "AI is revolutionizing content management by automating workflows, enhancing personalization, and improving efficiency. Learn how AI-powered tools are shaping the future of digital content.",
    status: "published",
  },
  {
    title: "How to Build a Web3 Platform for Humanitarian Aid",
    slug: "web3-humanitarian-aid-platform",
    content:
      "Web3 technology is transforming humanitarian aid with transparency and efficiency. Discover how blockchain, tokens, and zk technology can create a seamless donor-to-beneficiary platform.",
    status: "published",
  },
  {
    title: "Understanding Retrieval-Augmented Generation (RAG)",
    slug: "understanding-rag-ai",
    content:
      "Retrieval-Augmented Generation (RAG) combines knowledge retrieval with generative AI to improve responses. Explore how it works and its impact on AI-powered chatbots.",
    status: "published",
  },
  {
    title: "Building AI-Based FAQ Bots with Redis Cache",
    slug: "ai-faq-bot-redis-cache",
    content:
      "Discover how to create AI-powered FAQ bots that use Redis caching for faster response times and improved scalability.",
    status: "published",
  },
  {
    title: "Integrating Standard Chartered Open Banking API",
    slug: "standard-chartered-open-banking",
    content:
      "Learn how to integrate Standard Chartered’s Open Banking API into your platform to enable seamless financial transactions.",
    status: "published",
  },
  {
    title: "Optimizing AI Performance for Low-Bandwidth Environments",
    slug: "ai-low-bandwidth-optimization",
    content:
      "AI solutions must be adaptable for varying internet speeds. Explore techniques to optimize AI-powered applications for low-bandwidth regions.",
    status: "published",
  },
  {
    title: "The Role of Small Language Models in AI Development",
    slug: "small-language-models-ai",
    content:
      "Small language models are gaining popularity due to efficiency and adaptability. Understand their role and applications in AI development.",
    status: "published",
  },
  {
    title: "Exploring Llama 3.2: The Next-Gen AI Model",
    slug: "exploring-llama-3-2",
    content:
      "Llama 3.2 introduces enhanced performance and capabilities for AI applications. Learn about its features and potential use cases.",
    status: "published",
  },
  {
    title: "Building an AI Portal with Next.js and Supabase",
    slug: "ai-portal-nextjs-supabase",
    content:
      "Discover how to create an AI-powered portal using Next.js, Supabase, and ShadCN for seamless user management.",
    status: "published",
  },
  {
    title: "Creating an SQL Analyzer with FastAPI and Prisma",
    slug: "sql-analyzer-fastapi-prisma",
    content:
      "Build an SQL Analyzer using FastAPI and Prisma to generate and fetch SQL queries efficiently with AI integration.",
    status: "published",
  },
  {
    title: "How Blockchain is Revolutionizing Digital Identity",
    slug: "blockchain-digital-identity",
    content:
      "Blockchain technology is enabling secure and decentralized digital identities. Explore how it enhances security and accessibility.",
    status: "published",
  },
  {
    title: "AI-Powered Content Curation for Educational Platforms",
    slug: "ai-content-curation-education",
    content:
      "AI is transforming educational content curation by recommending personalized learning materials based on user preferences.",
    status: "published",
  },
  {
    title: "Enhancing Collaboration with AI in Remote Workspaces",
    slug: "ai-collaboration-remote-work",
    content:
      "AI-driven collaboration tools are improving productivity and teamwork in remote work environments.",
    status: "published",
  },
  {
    title: "The Role of zk-SNARKs in Privacy-Preserving Transactions",
    slug: "zk-snarks-privacy-transactions",
    content:
      "zk-SNARKs offer a new level of privacy in blockchain transactions. Learn how they work and their applications in secure finance.",
    status: "published",
  },
  {
    title: "Building a Mortgage Calculator Widget with React",
    slug: "mortgage-calculator-react",
    author: "admin",
    image: "https://source.unsplash.com/800x600/?finance,calculator",
    content:
      "Learn how to develop a mortgage calculator widget using React to help users estimate their monthly payments.",
    status: "published",
  },
  {
    title: "Automating Business Processes with AI",
    slug: "ai-business-automation",
    content:
      "AI-powered automation is streamlining business workflows. Discover how AI can improve efficiency and reduce operational costs.",
    status: "published",
  },
  {
    title: "Using FastAPI for High-Performance AI Applications",
    slug: "fastapi-ai-applications",
    content:
      "FastAPI is a modern framework for building high-performance AI applications. Learn how to leverage its features for scalability.",
    status: "published",
  },
  {
    title: "Decentralized Finance (DeFi): Opportunities and Challenges",
    slug: "defi-opportunities-challenges",
    content:
      "DeFi is reshaping the financial industry by providing decentralized financial services. Explore its benefits and challenges.",
    status: "published",
  },
  {
    title: "Scaling AI Chatbots for High User Engagement",
    slug: "scaling-ai-chatbots",
    content:
      "AI chatbots need to scale efficiently to handle high user engagement. Learn best practices for scaling AI chatbots effectively.",
    status: "published",
  },
  {
    title: "The Evolution of AI-Powered Search Engines",
    slug: "ai-powered-search-engines",
    content:
      "AI-powered search engines are transforming how we find information online. Explore the latest advancements in AI-driven search.",
    status: "published",
  },
];

module.exports = { user, blogs };
