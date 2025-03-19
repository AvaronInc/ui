
import React, { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PageTransition from '@/components/transitions/PageTransition';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Calendar } from 'lucide-react';
import GanttChartView from '@/components/projects/GanttChartView';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectStatCards from '@/components/projects/ProjectStatCards';
import ProjectViewToggle from '@/components/projects/ProjectViewToggle';
import ProjectActions from '@/components/projects/ProjectActions';
import ProjectListContent from '@/components/projects/ProjectListContent';
import ProjectDetailPanels from '@/components/projects/ProjectDetailPanels';
import { useProjectsData } from '@/hooks/useProjectsData';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Projects = () => {
  const { toast } = useToast();
  const {
    selectedProject,
    filteredProjects,
    projects,
    filter,
    viewMode,
    teams,
    projectStatistics,
    aiSuggestions,
    setViewMode,
    handleProjectSelect,
    handleClosePanel,
    handleFilterChange,
    handleTaskToggle,
    handleNewProject,
    handleArchiveCompleted,
    handleAISuggestionAction
  } = useProjectsData();

  // Show the at-risk project toast when component mounts
  useEffect(() => {
    const atRiskProject = projects.find(p => p.isAtRisk);
    if (atRiskProject) {
      const atRiskSuggestion = aiSuggestions.find(s => s.projectId === atRiskProject.id && s.severity === 'high');
      
      if (atRiskSuggestion) {
        toast({
          title: atRiskSuggestion.title,
          description: atRiskSuggestion.description,
          variant: "destructive",
        });
      }
    }
  }, []);

  return (
    <PageTransition>
      <DashboardLayout className="p-6">
        <div className="flex flex-col h-full space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Projects</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="text-2xl font-bold mt-2">Projects</h1>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <ProjectViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              <ProjectActions onArchiveCompleted={handleArchiveCompleted} />
            </div>
          </div>
          
          <ProjectStatCards 
            statistics={projectStatistics}
            aiSuggestions={aiSuggestions} 
          />
          
          <ProjectFilters 
            filter={filter} 
            onFilterChange={handleFilterChange} 
            teams={teams} 
            onNewProject={handleNewProject}
          />
          
          <Tabs defaultValue="projects" className="flex-1">
            <TabsList className="mb-4">
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                All Projects
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Timeline
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="flex-1 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                <ProjectListContent 
                  viewMode={viewMode}
                  filteredProjects={filteredProjects}
                  selectedProject={selectedProject}
                  onProjectSelect={handleProjectSelect}
                />
                
                {selectedProject && (
                  <ProjectDetailPanels 
                    selectedProject={selectedProject}
                    onClose={handleClosePanel}
                    onTaskToggle={handleTaskToggle}
                    aiSuggestions={aiSuggestions}
                    onAISuggestionAction={handleAISuggestionAction}
                  />
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="timeline">
              <div className="border rounded-lg bg-card h-full">
                <GanttChartView projects={projects} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default Projects;
