import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';
import { notFound } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function UsersAdminPage() {

    const { users, ok } = await getPaginatedUsers();
    if (!ok) return notFound();

    return (
        <>
            <Title title="Mantenimiento de Usuarios" />
            <div className="mb-10">
                <UsersTable users={users || []} />
            </div>
        </>
    );
}