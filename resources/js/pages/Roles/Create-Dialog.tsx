import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import route from 'ziggy-js';


export default function CreateDialog({ permissions }) {

    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        permissions: [] as string[],
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/roles');
    }

    return (
        <div className="space-y-6">
            <div className="m-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default" size="sm" className='bg-orange-400'>
                            <Plus/>
                            Create
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-3xl'>
                        <DialogTitle>
                            Create Role
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details to create a new role.
                        </DialogDescription>

                        <form onSubmit={submit}>
                            <div className="grid gap-3">

                                <Label htmlFor="name">
                                    Role Name:
                                </Label>    
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name' , e.target.value)}
                                    type="text"
                                    name="name"
                                    placeholder="eg. MNL"
                                />
                                <InputError message={errors.name} />
                                <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Permissions:
                                </label>
                                <div className="mt-2 grid grid-cols-4 gap-2">
                                    {permissions.map((permission) => (
                                        <div key={permission} className="flex items-center">
                                            <input
                                                id={`permission-${permission}`}
                                                name="permissions"
                                                type="checkbox"
                                                value={permission}
                                                checked={data.permissions.includes(permission)}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    let newPermissions = [...data.permissions];

                                                    if (isChecked) {
                                                        // Add permission if checked
                                                        newPermissions.push(permission);
                                                    } else {
                                                        // Remove permission if unchecked
                                                        newPermissions = newPermissions.filter((p) => p !== permission);
                                                    }

                                                    setData('permissions', newPermissions);
                                                }}
                                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                            <label 
                                                htmlFor={`permission-${permission}`} 
                                                className="ml-3 text-sm font-medium text-gray-700"
                                            >
                                                {permission}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {/* Assuming InputError is a component */}
                                <InputError message={errors.permissions} /> 
                            </div>
                            </div>
                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button
                                        className="mt-4 hover:bg-gray-200"
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>

                                
                                <Button
                                    className="mt-4 bg-orange-400 hover:bg-orange-600"
                                    variant="default"
                                    disabled={processing}
                                    asChild
                                >
                                    <button
                                        type="submit"
                                    >
                                        Create Role
                                    </button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}