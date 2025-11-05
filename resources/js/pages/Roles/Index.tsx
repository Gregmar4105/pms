import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({ roles }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />
      <div>
      <Link href={'users.create'} className='m-4'><Button size="sm" className='bg-orange-400 mt-4'><Plus />Create</Button></Link>
      </div>
      <div
        className="m-4 bg-white border border-gray-200 
        dark:bg-primary-foreground p-4 rounded-lg"
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
            {roles.map(({id,name,permissions})=>
            <TableRow>
              <TableCell className="font-medium">{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{permissions}</TableCell>
              <TableCell>
              <Link href={'users.edit'}><Button variant='default' size="sm" className='bg-blue-700'><Pencil/></Button></Link>
              <Link href={'users.delete'}><Button variant='default' size="sm" className='ml-2 bg-red-600'><Trash/></Button></Link>
              </TableCell> 
            </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}

