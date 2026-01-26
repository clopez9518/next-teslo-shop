'use client';

import { setUserRole } from "@/actions";
import { User } from "@/interfaces";

interface Props {
    users: User[];
}

export const UsersTable = ({ users }: Props) => {

    const onRoleChange = async (userId: string, role: 'admin' | 'user') => {
        const resp = await setUserRole(userId, role);

        if (!resp.ok) {
            console.log(resp.message);
        }
    }

    return (
        <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
                <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        #ID
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Nombre completo
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Email
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Rol
                    </th>
                </tr>
            </thead>
            <tbody>

                {
                    users.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center py-10">
                                No hay ordenes
                            </td>
                        </tr>
                    )
                }

                {
                    users.map((user) => (
                        <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {user.name}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {user.email}
                            </td>
                            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <select
                                    value={user.role}
                                    onChange={(e) => onRoleChange(user.id, e.target.value as 'admin' | 'user')}
                                    className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
