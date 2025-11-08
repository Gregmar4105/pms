import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash, BadgeCheckIcon, BadgeAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/components/Pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({ users }) {
    console.log(users);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />
      <div>
      {/* Use the correct Inertia link for creation */}
      <Link href={'users.create'} className='m-4 '><Button size="sm" className='bg-orange-400 mt-4'><Plus/>Create</Button></Link>
      </div>
      <div
        className="m-4 bg-white border border-black dark:border-white
        dark:bg-primary-foreground p-4 rounded-lg"
      >
        <Table className="w-full">
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Origin URL</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Handle the case where the 'users' array is empty */}
            {users && users.length === 0 ? (
                <TableRow>
                    {/* Use 6 for colSpan to match the 6 columns in the header */}
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-4">
                        No users found.
                    </TableCell>
                </TableRow>
            ) : (
                /* Iterate over users */
                users.data.map((user) => (
                    <TableRow key={user.id}> 
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.email_verified_at ? 
                            <Badge variant="secondary"
                            className="bg-blue-700 text-white dark:bg-blue-600">
                            <BadgeCheckIcon />
                            Verified
                            </Badge>:
                            <Badge variant="secondary"
                            className="bg-red-500 text-white dark:bg-red-600">
                            <BadgeAlert />
                            Unverified
                            </Badge> } 
                            </TableCell>
                        <TableCell>{user.origin_url}</TableCell>

                        {/* 🎯 THE FIXED ROLE LOGIC 🎯 */}
                        <TableCell>
                            {/* Assumes user.roles is an array of objects with a 'name' property. */}
                            {/* It maps to get just the names, then joins them with a comma. */}
                            {user.roles && Array.isArray(user.roles) && user.roles.length > 0
                                ? user.roles.map(role => role.name).join(', ')
                                : 'N/A'
                            }
                        </TableCell>
                        
                        <TableCell>
                            {/* Using dynamic URLs is better for Inertia routing */}
                            <Link href={`users.edit`} data={{ user: user.id }}><Button variant='default' size="sm" className='bg-blue-700'><Pencil/></Button></Link>
                            <Link href={`users.delete`} data={{ user: user.id }}><Button variant='default' size="sm" className='ml-2 bg-red-600'><Trash/></Button></Link>
                        </TableCell> 
                    </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <Pagination links={users.links} />
      </div>
    </AppLayout>
  );
}