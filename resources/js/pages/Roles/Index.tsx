import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash } from 'lucide-react';
import CreateDialog from './Create-Dialog';
import { Badge } from '@/components/ui/badge';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function Index({ roles, permissions }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Role Create" />
      <CreateDialog permissions={permissions} />
      <div
        className="mx-4 bg-white border border-gray-200 
        dark:bg-primary-foreground px-4 py-2 rounded-lg"
      >
        <Table className="w-full">
          <TableCaption>List of Roles in the System.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map(({id, name, permissions}) =>
              <TableRow key={id}>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                  <div className="inline-flex flex-wrap gap-1 max-w-[800px] overflow-hidden">

                    {permissions.map((p) => {
                      let color = "secondary";

                      if (p.name.includes("create")) color = "bg-green-600";   // green
                      else if (p.name.includes("show")) color = "bg-purple-700"; // blue
                      else if (p.name.includes("administrator")) color = "bg-orange-400"; // blue
                      else if (p.name.includes("update") || p.name.includes("edit")) color = "bg-indigo-700"; // yellow
                      else if (p.name.includes("delete")) color = "bg-red-600"; // red

                      return (
                        <Badge 
                          key={p.id} 
                          variant="default"
                          className={color}
                        >
                          {p.name}
                        </Badge>
                      );
                    })}

                  </div>
                </TableCell>


                <TableCell>
                  <Link href={'users.edit'}>
                    <Button variant='default' size="sm" className='bg-blue-700'>
                      <Pencil/>
                    </Button>
                  </Link>
                  <Link href={'users.delete'}>
                    <Button variant='default' size="sm" className='ml-2 bg-red-600'>
                      <Trash/>
                    </Button>
                  </Link>
                </TableCell> 
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>
    </AppLayout>
  );
}

