
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, BookOpen, Filter, Hash, ChevronRight } from 'lucide-react';
import { useGlossaryData } from './hooks/useGlossaryData';

const TerminologyGlossary = () => {
  const { glossaryTerms, categories } = useGlossaryData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [activeTermId, setActiveTermId] = useState<string | null>(null);
  
  const letterSections = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  // Get all unique first letters from the glossary terms
  const alphabet = [...new Set(glossaryTerms.map(term => term.term[0].toUpperCase()))].sort();
  
  // Filter the glossary terms based on search term, category, and letter
  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = !searchTerm || 
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || term.categories.includes(selectedCategory);
    const matchesLetter = !selectedLetter || term.term[0].toUpperCase() === selectedLetter;
    
    return matchesSearch && matchesCategory && matchesLetter;
  });
  
  // Group the filtered terms by first letter
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as {[key: string]: typeof glossaryTerms});
  
  // Sort the keys
  const sortedLetters = Object.keys(groupedTerms).sort();
  
  const scrollToLetter = (letter: string) => {
    setSelectedLetter(letter);
    if (letterSections.current[letter]) {
      letterSections.current[letter]?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedLetter(null);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search glossary terms..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="h-10 px-3 flex items-center gap-1.5 shrink-0"
            onClick={handleReset}
          >
            <Filter className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-3">Categories</div>
              <ScrollArea className="h-[200px] pr-3">
                <div className="space-y-1">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    >
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      <Badge variant="outline" className="ml-auto">
                        {glossaryTerms.filter(term => term.categories.includes(category.id)).length}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-3">Alphabetical Index</div>
              <div className="flex flex-wrap gap-1">
                {alphabet.map(letter => (
                  <Button
                    key={letter}
                    variant={selectedLetter === letter ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => scrollToLetter(letter)}
                  >
                    {letter}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-2">Glossary Stats</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Total Terms</span>
                  <span>{glossaryTerms.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Categories</span>
                  <span>{categories.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Last Updated</span>
                  <span>Mar 15, 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-9">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-medium">
                  Glossary Terms ({filteredTerms.length})
                </div>
                <div className="flex gap-2">
                  {selectedCategory && (
                    <Badge variant="outline" className="bg-primary/10 flex items-center gap-1">
                      {categories.find(c => c.id === selectedCategory)?.icon}
                      {categories.find(c => c.id === selectedCategory)?.name}
                    </Badge>
                  )}
                  {selectedLetter && (
                    <Badge variant="outline" className="bg-primary/10 flex items-center gap-1">
                      <Hash className="h-3 w-3" />
                      {selectedLetter}
                    </Badge>
                  )}
                </div>
              </div>
              
              <ScrollArea className="h-[500px] pr-3">
                {filteredTerms.length > 0 ? (
                  <div className="space-y-6">
                    {sortedLetters.map(letter => (
                      <div key={letter} ref={el => letterSections.current[letter] = el}>
                        <div className="sticky top-0 bg-background z-10 py-1 flex items-center">
                          <div className="text-lg font-semibold flex items-center">
                            <Badge className="h-7 w-7 rounded-full flex items-center justify-center text-sm mr-2">
                              {letter}
                            </Badge>
                            <span>Terms</span>
                          </div>
                          <div className="ml-3 h-px flex-grow bg-border"></div>
                        </div>
                        
                        <div className="mt-3 space-y-3">
                          {groupedTerms[letter].map(term => (
                            <Card 
                              key={term.id} 
                              className={`border transition-colors ${activeTermId === term.id ? 'border-primary' : 'border-accent'}`}
                            >
                              <CardContent className="p-3">
                                <div 
                                  className="grid grid-cols-1 cursor-pointer"
                                  onClick={() => setActiveTermId(activeTermId === term.id ? null : term.id)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <BookOpen className="h-4 w-4 text-primary" />
                                      <div className="text-sm font-medium">{term.term}</div>
                                    </div>
                                    <ChevronRight 
                                      className={`h-4 w-4 transition-transform ${activeTermId === term.id ? 'rotate-90' : ''}`} 
                                    />
                                  </div>
                                  
                                  {activeTermId === term.id && (
                                    <div className="mt-3 border-t pt-3">
                                      <div className="text-xs text-muted-foreground mb-2">Definition</div>
                                      <div className="text-sm">{term.definition}</div>
                                      
                                      {term.examples && term.examples.length > 0 && (
                                        <div className="mt-3">
                                          <div className="text-xs text-muted-foreground mb-2">Examples</div>
                                          <ul className="list-disc list-inside text-sm space-y-1">
                                            {term.examples.map((example, index) => (
                                              <li key={index}>{example}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      
                                      <div className="mt-3">
                                        <div className="text-xs text-muted-foreground mb-2">Categories</div>
                                        <div className="flex flex-wrap gap-1">
                                          {term.categories.map((categoryId, index) => {
                                            const category = categories.find(c => c.id === categoryId);
                                            return category ? (
                                              <Badge key={index} variant="outline" className="bg-muted flex items-center gap-1">
                                                {category.icon}
                                                {category.name}
                                              </Badge>
                                            ) : null;
                                          })}
                                        </div>
                                      </div>
                                      
                                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                                        <div className="mt-3">
                                          <div className="text-xs text-muted-foreground mb-2">Related Terms</div>
                                          <div className="flex flex-wrap gap-1">
                                            {term.relatedTerms.map((relatedTermId, index) => {
                                              const relatedTerm = glossaryTerms.find(t => t.id === relatedTermId);
                                              return relatedTerm ? (
                                                <Button 
                                                  key={index} 
                                                  variant="ghost" 
                                                  size="sm"
                                                  className="h-7 px-2 text-xs"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveTermId(relatedTermId);
                                                    
                                                    // Scroll to the related term
                                                    const letter = relatedTerm.term[0].toUpperCase();
                                                    scrollToLetter(letter);
                                                  }}
                                                >
                                                  {relatedTerm.term}
                                                </Button>
                                              ) : null;
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No glossary terms found matching your search criteria.
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TerminologyGlossary;
