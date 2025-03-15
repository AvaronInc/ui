
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { ContactsFilter, ContactCategory, WarrantyStatus, ServiceType } from '@/types/contacts';

interface ContactFiltersProps {
  filters: ContactsFilter;
  onFilterChange: (filters: ContactsFilter) => void;
}

const ContactFilters = ({ filters, onFilterChange }: ContactFiltersProps) => {
  const categories: Array<{ value: ContactCategory; label: string }> = [
    { value: 'isp', label: 'ISP' },
    { value: 'tech-support', label: 'Tech Support' },
    { value: 'sales', label: 'Sales' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'internal', label: 'Internal Team' }
  ];

  const warrantyStatuses: Array<{ value: WarrantyStatus; label: string }> = [
    { value: 'Active', label: 'Active' },
    { value: 'Expired', label: 'Expired' },
    { value: 'Expiring Soon', label: 'Expiring Soon' }
  ];

  const serviceTypes: Array<{ value: ServiceType; label: string }> = [
    { value: 'Fiber', label: 'Fiber' },
    { value: 'Copper', label: 'Copper' },
    { value: 'Wireless', label: 'Wireless' },
    { value: 'Starlink', label: 'Starlink' },
    { value: 'Cable', label: 'Cable' },
    { value: 'Satellite', label: 'Satellite' },
    { value: 'Other', label: 'Other' }
  ];

  const departments = [
    'IT', 'Network Operations', 'Security', 'Infrastructure', 
    'Help Desk', 'Development', 'DevOps', 'Cloud'
  ];

  const toggleCategory = (category: ContactCategory) => {
    const currentCategories = filters.categories || [];
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter(cat => cat !== category)
      : [...currentCategories, category];
    
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const toggleWarrantyStatus = (status: WarrantyStatus) => {
    const currentStatuses = filters.warrantyStatus || [];
    const updatedStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    onFilterChange({ ...filters, warrantyStatus: updatedStatuses });
  };

  const toggleServiceType = (type: ServiceType) => {
    const currentTypes = filters.serviceTypes || [];
    const updatedTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    onFilterChange({ ...filters, serviceTypes: updatedTypes });
  };

  const toggleDepartment = (department: string) => {
    const currentDepartments = filters.departments || [];
    const updatedDepartments = currentDepartments.includes(department)
      ? currentDepartments.filter(d => d !== department)
      : [...currentDepartments, department];
    
    onFilterChange({ ...filters, departments: updatedDepartments });
  };

  const toggleFavorites = () => {
    onFilterChange({ ...filters, favorites: !filters.favorites });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="space-y-4 border p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Contact Category</h4>
          <div className="flex flex-col space-y-1.5">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category.value}`}
                  checked={(filters.categories || []).includes(category.value)}
                  onCheckedChange={() => toggleCategory(category.value)}
                />
                <label 
                  htmlFor={`category-${category.value}`}
                  className="text-sm cursor-pointer"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Warranty Status Filter */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Warranty Status</h4>
          <div className="flex flex-col space-y-1.5">
            {warrantyStatuses.map((status) => (
              <div key={status.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`warranty-${status.value}`}
                  checked={(filters.warrantyStatus || []).includes(status.value)}
                  onCheckedChange={() => toggleWarrantyStatus(status.value)}
                />
                <label 
                  htmlFor={`warranty-${status.value}`}
                  className="text-sm cursor-pointer"
                >
                  {status.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Departments Filter */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Department</h4>
          <div className="flex flex-col space-y-1.5">
            {departments.slice(0, 6).map((dept) => (
              <div key={dept} className="flex items-center space-x-2">
                <Checkbox 
                  id={`dept-${dept}`}
                  checked={(filters.departments || []).includes(dept)}
                  onCheckedChange={() => toggleDepartment(dept)}
                />
                <label 
                  htmlFor={`dept-${dept}`}
                  className="text-sm cursor-pointer"
                >
                  {dept}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Service Type Filter */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Service Type</h4>
          <div className="flex flex-col space-y-1.5">
            {serviceTypes.slice(0, 6).map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`type-${type.value}`}
                  checked={(filters.serviceTypes || []).includes(type.value)}
                  onCheckedChange={() => toggleServiceType(type.value)}
                />
                <label 
                  htmlFor={`type-${type.value}`}
                  className="text-sm cursor-pointer"
                >
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox 
          id="favorite-filter"
          checked={filters.favorites}
          onCheckedChange={toggleFavorites}
        />
        <label 
          htmlFor="favorite-filter"
          className="text-sm font-medium cursor-pointer"
        >
          Show Favorites Only
        </label>
      </div>

      {/* Active Filters Display */}
      {Object.keys(filters).length > 0 && filters.search === undefined && (
        <div className="flex flex-wrap gap-2 pt-4">
          {filters.favorites && (
            <Badge className="flex gap-1 items-center">
              Favorites Only
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={toggleFavorites}
              />
            </Badge>
          )}
          
          {(filters.categories || []).map(cat => (
            <Badge key={cat} className="flex gap-1 items-center">
              {categories.find(c => c.value === cat)?.label}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleCategory(cat)}
              />
            </Badge>
          ))}
          
          {(filters.warrantyStatus || []).map(status => (
            <Badge key={status} className="flex gap-1 items-center">
              {status}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleWarrantyStatus(status)}
              />
            </Badge>
          ))}
          
          {(filters.departments || []).map(dept => (
            <Badge key={dept} className="flex gap-1 items-center">
              {dept}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleDepartment(dept)}
              />
            </Badge>
          ))}
          
          {(filters.serviceTypes || []).map(type => (
            <Badge key={type} className="flex gap-1 items-center">
              {type}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => toggleServiceType(type)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactFilters;
