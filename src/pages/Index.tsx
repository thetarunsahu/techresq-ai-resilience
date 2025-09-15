import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Brain, Activity, Users, Award, MessageCircle, Target, ChevronDown, ChevronRight, Star, Heart, Zap, Eye, Smartphone, Globe, CheckCircle, Clock, TrendingUp, User, Mail, Phone, MapPin, Stethoscope, AlertCircle, ExternalLink, Newspaper } from 'lucide-react';
import confetti from 'canvas-confetti';

const TechResQWebsite = () => {
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{sender: 'user' | 'bot', message: string}>>([
    { sender: 'bot', message: 'Hello! I\'m ResQBot. How can I help you with disaster preparedness today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [riskInputs, setRiskInputs] = useState({ buildings: '', students: '' });
  const [riskScore, setRiskScore] = useState<'high' | 'medium' | 'low' | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // AI Doctor states
  const [symptoms, setSymptoms] = useState('');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);

  // News states
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  // Animated counters
  const [counters, setCounters] = useState({ schools: 0, students: 0, incidents: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCounters(prev => ({
        schools: prev.schools < 2500 ? prev.schools + 50 : 2500,
        students: prev.students < 150000 ? prev.students + 3000 : 150000,
        incidents: prev.incidents < 95 ? prev.incidents + 2 : 95
      }));
    }, 100);

    setTimeout(() => clearInterval(timer), 3000);
    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const quizQuestions = [
    {
      question: "What should you do first during an earthquake?",
      options: ["Run outside immediately", "Drop, Cover, and Hold On", "Stand in a doorway", "Call for help"],
      correct: 1
    },
    {
      question: "How many days of emergency supplies should you keep at home?",
      options: ["1 day", "3 days", "7 days", "14 days"],
      correct: 2
    },
    {
      question: "What is the best way to stay informed during a disaster?",
      options: ["Social media only", "Battery-powered radio", "Neighbor updates", "None needed"],
      correct: 1
    },
    {
      question: "Where should your family emergency meeting point be?",
      options: ["At home only", "Near your workplace", "Two places: one near home, one outside neighborhood", "School parking lot"],
      correct: 2
    }
  ];

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);

    if (newAnswers.length === quizQuestions.length && newAnswers.every(answer => answer !== undefined)) {
      const score = newAnswers.reduce((acc, answer, index) => 
        answer === quizQuestions[index].correct ? acc + 1 : acc, 0
      );
      setQuizScore(score);
      if (score === quizQuestions.length) {
        triggerConfetti();
      }
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, { sender: 'user', message: chatInput }]);
    
    // Simple bot responses
    setTimeout(() => {
      const responses = [
        "That's a great question! For immediate emergency guidance, I recommend following your local emergency protocols.",
        "Based on AI analysis, here are some personalized safety recommendations for your situation...",
        "I can help you create a family emergency plan. Would you like me to guide you through the steps?",
        "Emergency supplies are crucial. Let me provide you with a customized checklist based on your location and family size.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setChatMessages(prev => [...prev, { sender: 'bot', message: randomResponse }]);
    }, 1000);

    setChatInput('');
  };

  const generateRiskScore = () => {
    const buildings = parseInt(riskInputs.buildings) || 0;
    const students = parseInt(riskInputs.students) || 0;
    
    const riskValue = (buildings * 0.3) + (students * 0.0001);
    
    if (riskValue > 50) setRiskScore('high');
    else if (riskValue > 20) setRiskScore('medium');
    else setRiskScore('low');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  // AI Doctor Logic
  const getHealthAdvice = () => {
    if (!symptoms.trim()) {
      setAiAdvice("Please describe your symptoms first.");
      return;
    }

    const symptomLower = symptoms.toLowerCase();
    let advice = "";

    if (symptomLower.includes('fever') || symptomLower.includes('temperature')) {
      advice = "🌡️ For fever: Rest and drink plenty of fluids. Take acetaminophen or ibuprofen as directed. Monitor temperature regularly. Seek medical attention if fever exceeds 103°F (39.4°C) or persists for more than 3 days.";
    } else if (symptomLower.includes('stress') || symptomLower.includes('anxiety') || symptomLower.includes('worried')) {
      advice = "🧘‍♀️ For stress/anxiety: Try deep breathing exercises (4-7-8 technique). Practice mindfulness or meditation. Get regular exercise and adequate sleep. Consider talking to a counselor if symptoms persist.";
    } else if (symptomLower.includes('injury') || symptomLower.includes('wound') || symptomLower.includes('cut')) {
      advice = "🩹 For minor injuries: Clean wound with water, apply antiseptic, cover with bandage. For bleeding, apply direct pressure. For serious injuries, seek immediate medical attention.";
    } else if (symptomLower.includes('headache') || symptomLower.includes('head')) {
      advice = "💊 For headaches: Rest in a quiet, dark room. Apply cold or warm compress. Stay hydrated. Consider over-the-counter pain relievers. Seek medical help for severe or persistent headaches.";
    } else if (symptomLower.includes('chest pain') || symptomLower.includes('breathing')) {
      advice = "🚨 For chest pain or breathing difficulties: This could be serious. Sit upright, stay calm. If severe or accompanied by sweating, nausea, or arm pain, call emergency services immediately.";
    } else if (symptomLower.includes('stomach') || symptomLower.includes('nausea') || symptomLower.includes('vomit')) {
      advice = "🤢 For stomach issues: Rest and avoid solid foods initially. Drink clear fluids like water or ginger tea. Try small amounts of bland foods (BRAT diet). Seek medical attention if symptoms worsen.";
    } else {
      advice = "💡 General health advice: Monitor your symptoms closely. Stay hydrated, get adequate rest, and maintain good hygiene. If symptoms worsen or persist, consult a healthcare professional. For emergencies, call local emergency services.";
    }

    setAiAdvice(advice);
  };

  // News API Logic
  const fetchDisasterNews = async () => {
    setNewsLoading(true);
    setNewsError(null);
    
    try {
      // DEMO: Using JSONPlaceholder for demonstration
      // TO USE REAL NEWS: Replace with NewsAPI.org endpoint:
      // const response = await fetch(`https://newsapi.org/v2/everything?q=disaster+emergency+safety&sortBy=publishedAt&pageSize=6&apiKey=${API_KEY}`);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      
      // Transform placeholder data to look like news articles
      const transformedData = data.map((item: any, index: number) => ({
        id: item.id,
        title: `Disaster Alert: ${item.title.substring(0, 50)}...`,
        description: item.body.substring(0, 120) + '...',
        url: `#news-${item.id}`,
        source: index % 2 === 0 ? 'Emergency Alert System' : 'Disaster Response Network',
        publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString()
      }));
      
      setNewsArticles(transformedData);
    } catch (error) {
      setNewsError('Unable to fetch latest news. Please check your internet connection and try again.');
      console.error('News fetch error:', error);
    } finally {
      setNewsLoading(false);
    }
  };

  // Load news on component mount
  useEffect(() => {
    fetchDisasterNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">TechResQ</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['Solution', 'Demo', 'AI Doctor', 'News', 'Features'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 animated-bg"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black mb-6 gradient-text float-animation">
              TechResQ
            </h1>
            <p className="text-2xl md:text-3xl font-bold mb-4">
              A Proactive Approach to Safety
            </p>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Revolutionizing disaster management with AI-powered solutions, real-time monitoring, 
              and comprehensive psychological first-aid support for educational institutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button 
                onClick={() => {
                  triggerConfetti();
                  scrollToSection('solution');
                }}
                className="hero-btn"
              >
                Explore Solution
              </button>
              <button 
                onClick={() => {
                  triggerConfetti();
                  scrollToSection('demo');
                }}
                className="hero-btn-secondary"
              >
                Try Demo
              </button>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="tech-card">
                <div className="text-3xl font-bold text-primary">{counters.schools.toLocaleString()}+</div>
                <div className="text-muted-foreground">Schools Protected</div>
              </div>
              <div className="tech-card">
                <div className="text-3xl font-bold text-secondary">{counters.students.toLocaleString()}+</div>
                <div className="text-muted-foreground">Students Safeguarded</div>
              </div>
              <div className="tech-card">
                <div className="text-3xl font-bold text-accent">{counters.incidents}%</div>
                <div className="text-muted-foreground">Risk Reduction</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="solution" className="py-20 bg-surface">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Problem & Solution
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Problems */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-danger mb-6 flex items-center">
                <AlertTriangle className="w-8 h-8 mr-3" />
                Current Challenges
              </h3>
              
              {[
                "Reactive disaster response instead of proactive prevention",
                "Limited psychological support during crisis situations",
                "Lack of real-time monitoring and early warning systems",
                "Inadequate damage assessment and loss estimation tools",
                "Poor coordination between emergency responders"
              ].map((problem, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-danger rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">{problem}</p>
                </div>
              ))}
            </div>

            {/* Solutions */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center">
                <CheckCircle className="w-8 h-8 mr-3" />
                TechResQ Solutions
              </h3>
              
              {[
                { icon: Brain, text: "AI-powered Psychological First-Aid Library" },
                { icon: Activity, text: "Real-time Emotion & Stress Detection" },
                { icon: Eye, text: "Continuous monitoring dashboards" },
                { icon: TrendingUp, text: "Predictive damage & loss estimation" },
                { icon: Users, text: "Coordinated emergency response system" }
              ].map((solution, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <solution.icon className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                  <p className="text-lg">{solution.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Demo */}
      <section id="demo" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Live Dashboard Demo
          </h2>
          
          <div className="tech-card max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-danger/20 border border-danger rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-danger font-semibold">High Risk Schools</span>
                  <div className="w-3 h-3 bg-danger rounded-full animate-ping"></div>
                </div>
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">Immediate attention required</div>
              </div>
              
              <div className="bg-warning/20 border border-warning rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-warning font-semibold">Estimated Losses</span>
                  <TrendingUp className="w-4 h-4 text-warning" />
                </div>
                <div className="text-2xl font-bold">₹2.4Cr</div>
                <div className="text-sm text-muted-foreground">Potential infrastructure damage</div>
              </div>
              
              <div className="bg-secondary/20 border border-secondary rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary font-semibold">Active Responders</span>
                  <Users className="w-4 h-4 text-secondary" />
                </div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-muted-foreground">Emergency personnel deployed</div>
              </div>
            </div>

            <div className="bg-surface-dark rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Priority Actions
              </h4>
              <div className="space-y-3">
                {[
                  "Deploy additional mental health support to Zone A schools",
                  "Activate emergency communication protocols for affected areas",
                  "Initiate student relocation procedures for high-risk buildings"
                ].map((action, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Resilience Hub */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Digital Resilience Hub
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="tech-card">
              <h3 className="text-2xl font-bold mb-6 text-center">AI-Powered Risk Assessment</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Buildings</label>
                  <input
                    type="number"
                    value={riskInputs.buildings}
                    onChange={(e) => setRiskInputs(prev => ({ ...prev, buildings: e.target.value }))}
                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter building count"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Students</label>
                  <input
                    type="number"
                    value={riskInputs.students}
                    onChange={(e) => setRiskInputs(prev => ({ ...prev, students: e.target.value }))}
                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter student count"
                  />
                </div>
              </div>
              
              <div className="text-center mb-6">
                <button
                  onClick={generateRiskScore}
                  className="hero-btn"
                >
                  Generate Risk Score
                </button>
              </div>

              {riskScore && (
                <div className={`p-6 rounded-lg border-2 ${
                  riskScore === 'high' ? 'risk-high' : 
                  riskScore === 'medium' ? 'risk-medium' : 'risk-low'
                }`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">
                      Risk Level: <span className="uppercase">{riskScore}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {riskScore === 'high' ? 'Immediate action required' :
                       riskScore === 'medium' ? 'Moderate risk - monitor closely' :
                       'Low risk - standard protocols sufficient'}
                    </p>
                    
                    <div className="flex justify-center space-x-4 mt-4">
                      <button className="text-2xl hover:scale-125 transition-transform">😟</button>
                      <button className="text-2xl hover:scale-125 transition-transform">😐</button>
                      <button className="text-2xl hover:scale-125 transition-transform">😊</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PFA Library Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Psychological First-Aid Library
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Responder Training",
                description: "Comprehensive training modules for emergency responders and volunteers",
                features: ["Interactive simulations", "Certification programs", "Regular skill updates"]
              },
              {
                icon: Heart,
                title: "Digital Stress Relief",
                description: "Multi-modal support through storytelling, voice notes, and local languages",
                features: ["Story therapy sessions", "Voice-guided meditation", "Cultural sensitivity"]
              },
              {
                icon: Activity,
                title: "Emotion Detection",
                description: "AI-powered monitoring through facial expressions, voice, and text analysis",
                features: ["Real-time monitoring", "Privacy protection", "Bias mitigation"]
              }
            ].map((item, index) => (
              <div key={index} className="tech-card">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Innovation & Uniqueness
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: Brain,
                title: "AI Integration",
                points: ["Machine learning for risk prediction", "Natural language processing for communication", "Computer vision for damage assessment"]
              },
              {
                icon: Clock,
                title: "Real-time Monitoring",
                points: ["Live dashboard updates", "Instant alert systems", "Continuous data streams"]
              },
              {
                icon: Globe,
                title: "Learning Continuity",
                points: ["Emergency education protocols", "Remote learning activation", "Academic recovery planning"]
              },
              {
                icon: Zap,
                title: "Rapid Response",
                points: ["Automated emergency protocols", "Instant resource allocation", "Coordinated response teams"]
              }
            ].map((item, index) => (
              <div key={index} className="tech-card">
                <item.icon className="w-16 h-16 text-primary mb-6 pulse-glow" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <ul className="space-y-3">
                  {item.points.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-secondary mt-0.5 mr-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ResQBot Chatbot */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            ResQBot - AI Assistant
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="tech-card">
              <div className="h-96 overflow-y-auto mb-4 space-y-4 bg-surface-dark rounded-lg p-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-surface border border-border'
                    }`}>
                      <div className="flex items-center mb-1">
                        {msg.sender === 'bot' && <MessageCircle className="w-4 h-4 mr-2 text-primary" />}
                        <span className="text-xs font-medium">
                          {msg.sender === 'bot' ? 'ResQBot' : 'You'}
                        </span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleChatSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about emergency preparedness..."
                  className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-glow transition-colors">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* AI Doctor Section */}
      <section id="ai-doctor" className="py-20 bg-surface">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            AI Doctor – Your Virtual Health Assistant
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="tech-card">
              <div className="text-center mb-8">
                <Stethoscope className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                <p className="text-lg text-muted-foreground">
                  Describe your symptoms and get immediate first-aid guidance and stress-relief advice
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Describe your symptoms (fever, stress, injury, anxiety, etc.)
                  </label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Example: I have a headache and feeling stressed about the upcoming exam..."
                  />
                </div>

                <div className="text-center">
                  <button
                    onClick={getHealthAdvice}
                    className="hero-btn animate-fade-in"
                    disabled={!symptoms.trim()}
                  >
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Get Advice
                  </button>
                </div>

                {aiAdvice && (
                  <div className="tech-card bg-primary/10 border-primary/20 animate-scale-in">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-primary mb-2">AI Health Advice</h4>
                        <p className="text-foreground leading-relaxed">{aiAdvice}</p>
                        <div className="mt-4 p-3 bg-warning/20 border border-warning/50 rounded-lg">
                          <p className="text-sm text-warning-foreground">
                            ⚠️ <strong>Disclaimer:</strong> This is general guidance only. For serious conditions or emergencies, 
                            please contact emergency services or consult a healthcare professional immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Disaster & Safety News */}
      <section id="news" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Live Disaster & Safety News
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-2">
                <Newspaper className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold">Latest Updates</span>
              </div>
              <button
                onClick={fetchDisasterNews}
                disabled={newsLoading}
                className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-2"
              >
                <span>{newsLoading ? 'Refreshing...' : 'Refresh'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {newsError && (
              <div className="tech-card bg-danger/10 border-danger/20 mb-8">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-danger" />
                  <p className="text-danger">{newsError}</p>
                </div>
              </div>
            )}

            {newsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="tech-card animate-pulse">
                    <div className="h-4 bg-surface-dark rounded mb-3"></div>
                    <div className="h-3 bg-surface-dark rounded mb-2"></div>
                    <div className="h-3 bg-surface-dark rounded mb-4"></div>
                    <div className="h-8 bg-surface-dark rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsArticles.map((article) => (
                  <div key={article.id} className="tech-card hover-scale">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg leading-tight">{article.title}</h3>
                        <div className="w-2 h-2 bg-danger rounded-full animate-pulse flex-shrink-0 mt-2"></div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {article.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{article.source}</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                      
                      <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <span>Read More</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gamification & Badges */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Achievement Badges
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "🌊", title: "Flood Warrior", description: "Completed flood preparedness training", progress: 85 },
              { icon: "❤️", title: "First-Aid Hero", description: "Mastered emergency medical response", progress: 92 },
              { icon: "🛡️", title: "Safety Champion", description: "Achieved expert safety coordinator status", progress: 78 }
            ].map((badge, index) => (
              <div key={index} className="tech-card text-center">
                <div className="text-6xl mb-4 animate-bounce-subtle">{badge.icon}</div>
                <h3 className="text-xl font-bold mb-2">{badge.title}</h3>
                <p className="text-muted-foreground mb-4">{badge.description}</p>
                <div className="w-full bg-surface-dark rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${badge.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{badge.progress}% Complete</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Disaster Preparedness Quiz
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="tech-card">
              {quizQuestions.map((question, qIndex) => (
                <div key={qIndex} className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">
                    {qIndex + 1}. {question.question}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {question.options.map((option, oIndex) => (
                      <button
                        key={oIndex}
                        onClick={() => handleQuizAnswer(qIndex, oIndex)}
                        className={`p-3 text-left rounded-lg border transition-all ${
                          quizAnswers[qIndex] === oIndex
                            ? 'border-primary bg-primary/20'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {quizScore !== null && (
                <div className="text-center p-6 bg-gradient-primary rounded-lg">
                  <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                  <p className="text-xl mb-4">Your Score: {quizScore}/{quizQuestions.length}</p>
                  {quizScore === quizQuestions.length && (
                    <p className="text-lg font-semibold">🎉 Perfect Score! You're a disaster preparedness expert!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Contact Us
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="tech-card">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>contact@techresq.org</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Emergency Response Center, Tech Valley</span>
                </div>
              </div>
            </div>
            
            <div className="tech-card">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                ></textarea>
                <button type="submit" className="w-full hero-btn">
                  Send Message
                </button>
                
                {formSubmitted && (
                  <div className="text-center p-4 bg-secondary/20 border border-secondary rounded-lg">
                    <p className="text-secondary font-semibold">✅ Message sent successfully!</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-surface-dark border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">TechResQ</span>
            </div>
            
            <div className="mb-6 overflow-hidden">
              <div className="animate-[scroll_20s_linear_infinite] whitespace-nowrap">
                <span className="text-muted-foreground">
                  🚨 Proactive Safety Solutions • AI-Powered Emergency Response • 
                  Real-time Monitoring • Psychological First-Aid • Digital Resilience • 
                  Community Protection • Educational Safety • Disaster Preparedness • 
                </span>
              </div>
            </div>
            
            <div className="text-center text-muted-foreground">
              <p>&copy; 2024 TechResQ. All rights reserved. Building safer communities through technology.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechResQWebsite;