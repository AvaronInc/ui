
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';

export const EmptyTableState: React.FC = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
        No licenses found matching your filters
      </TableCell>
    </TableRow>
  );
};
