
import React, { useState, useEffect } from 'react';
import { CardTitle, CardDescription, CardContent, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Newspaper, RefreshCw, Filter, Info, Link, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SafeTooltipWrapper } from '@/components/ui/tooltip';

// News categories
const CATEGORIES = [
  { id: 'all', name: 'All News' },
  { id: 'cybersecurity', name: 'Cybersecurity' },
  { id: 'cve', name: 'CVEs' },
  { id: 'networking', name: 'Networking' },
  { id: 'sdwan', name: 'SD-WAN' },
  { id: 'cloud', name: 'Cloud' },
  { id: 'compliance', name: 'Compliance' },
  { id: 'hipaa', name: 'HIPAA' },
  { id: 'ai', name: 'AI in IT' },
];

// Mock data (would be replaced with actual API calls)
const MOCK_NEWS = [
  {
    id: '1',
    title: 'Critical Vulnerability in OpenSSL Affects Millions of Devices',
    summary: 'A new critical vulnerability in OpenSSL has been discovered that affects millions of devices worldwide. Security experts recommend immediate patching.',
    source: 'Security Weekly',
    sourceUrl: '#',
    category: 'cybersecurity',
    date: '2023-10-15',
    insights: 'This vulnerability has a CVSS score of 9.8 and affects any system using OpenSSL versions prior to 3.0.7. Your organization should prioritize patching internet-facing servers first.'
  },
  {
    id: '2',
    title: 'New HIPAA Compliance Guidelines Released',
    summary: 'The HHS has released updated HIPAA compliance guidelines that include new requirements for telehealth and cloud-based healthcare services.',
    source: 'Healthcare IT News',
    sourceUrl: '#',
    category: 'compliance',
    date: '2023-10-14',
    insights: 'These updated guidelines require additional documentation for third-party cloud providers and mandate quarterly risk assessments for telehealth services.'
  },
  {
    id: '3',
    title: 'Cisco Announces New SD-WAN Features',
    summary: 'Cisco has announced new SD-WAN features that improve security and performance for remote workers and branch offices.',
    source: 'Network World',
    sourceUrl: '#',
    category: 'sdwan',
    date: '2023-10-13',
    insights: 'The new features include improved application-aware routing and additional zero-trust security controls that could benefit distributed enterprises.'
  },
  {
    id: '4',
    title: 'CVE-2023-45832: Critical RCE Vulnerability Identified in Popular Database System',
    summary: 'A critical remote code execution vulnerability has been identified in a widely used database system. The vulnerability allows attackers to execute arbitrary code with system privileges.',
    source: 'CVE Details',
    sourceUrl: '#',
    category: 'cve',
    date: '2023-10-12',
    insights: 'This vulnerability affects all organizations using MongoDB older than version 6.0.8. Immediate patching is recommended as exploit code is already available in the wild.'
  },
  {
    id: '5',
    title: 'AWS Introduces New AI-Powered Cloud Security Tools',
    summary: 'AWS has introduced new AI-powered security tools designed to detect anomalies and potential security threats in cloud environments.',
    source: 'Cloud Computing News',
    sourceUrl: '#',
    category: 'cloud',
    date: '2023-10-11',
    insights: 'These tools leverage machine learning to establish behavioral baselines and can significantly reduce false positives compared to traditional rule-based approaches.'
  },
  {
    id: '6',
    title: 'Microsoft Releases Patches for 56 Security Issues',
    summary: 'Microsoft's latest Patch Tuesday addresses 56 security vulnerabilities, including four zero-day flaws being actively exploited.',
    source: 'Microsoft Security',
    sourceUrl: '#',
    category: 'cybersecurity',
    date: '2023-10-10',
    insights: 'The most critical issues are in Exchange Server and Windows Print Spooler. Organizations should prioritize these patches as exploitation attempts have increased 400% in the last week.'
  },
  {
    id: '7',
    title: 'AI-Powered Network Automation Leads to 70% Reduction in Outages',
    summary: 'A new study shows that organizations implementing AI-powered network automation have seen a 70% reduction in network outages.',
    source: 'IT Operations Weekly',
    sourceUrl: '#',
    category: 'ai',
    date: '2023-10-09',
    insights: 'The study demonstrates that predictive maintenance and automated remediation provide the most significant benefits when implementing AI for network operations.'
  },
  {
    id: '8',
    title: 'Latest HIPAA Enforcement Action Results in $6.8M Settlement',
    summary: 'A large healthcare provider has agreed to pay $6.8M to settle potential HIPAA violations related to improper disclosure of patient information.',
    source: 'HHS.gov',
    sourceUrl: '#',
    category: 'hipaa',
    date: '2023-10-08',
    insights: 'This settlement highlights the importance of regular access reviews and the need for comprehensive audit logging of all PHI access events.'
  }
];

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  category: string;
  date: string;
  insights?: string;
}

const DailyNewsWidget = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch news (simulated with mock data)
  useEffect(() => {
    const loadNews = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        setNews(MOCK_NEWS);
        setLoading(false);
      }, 1000);
    };
    
    loadNews();
  }, []);

  const filteredNews = activeCategory === 'all' 
    ? news 
    : news.filter(article => article.category === activeCategory);

  const handleRefresh = () => {
    setLoading(true);
    
    toast.info("Refreshing news feed...");
    
    // Simulate API delay
    setTimeout(() => {
      // For demonstration, just shuffle the mock data to simulate new content
      setNews([...MOCK_NEWS].sort(() => Math.random() - 0.5));
      setLoading(false);
      toast.success("News feed updated");
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Newspaper className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg">Daily AI News Feed</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <SafeTooltipWrapper>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={loading}>
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh news feed</TooltipContent>
            </Tooltip>
          </SafeTooltipWrapper>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-2">
                <h4 className="font-medium">Filter News</h4>
                <p className="text-sm text-muted-foreground">
                  Select categories to focus on specific news topics.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {CATEGORIES.map((category) => (
                    <Badge 
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <CardDescription className="text-sm mb-4">
        AI-curated news for IT professionals. {activeCategory !== 'all' && `Showing: ${CATEGORIES.find(c => c.id === activeCategory)?.name}`}
      </CardDescription>
      
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border rounded-lg">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mb-3" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <Newspaper className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="font-medium mb-1">No News Found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              No articles found for this category. Try another category or check back later.
            </p>
            <Button variant="outline" size="sm" onClick={() => setActiveCategory('all')}>
              View All News
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNews.map((article) => (
              <Card key={article.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="mb-2">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium">{article.title}</h3>
                    {article.insights && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1">
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80" align="end">
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <Info className="h-4 w-4 text-primary" />
                              Why This Matters
                            </h4>
                            <p className="text-sm">{article.insights}</p>
                            <p className="text-xs text-muted-foreground italic">
                              Analysis powered by Mixtral AI
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                  <p className="text-sm">{article.summary}</p>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{article.source} · {article.date}</span>
                  <a 
                    href={article.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary"
                  >
                    <span className="mr-1">Read More</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyNewsWidget;
