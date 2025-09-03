import type { Role } from "~/models"

type Props = {
    role: Role
    update: (role: Role) => void
    remove: (role: Role) => void
}

export default function RoleItem({ role, update, remove }: Props) {
    return (
        <div style={container}>
            <div>{role.id}</div>
            <div>{role.name}</div>
            <div>{role.description}</div>
            <div>
                <button style={removeButton} onClick={() => remove(role)}>Remover</button>
            </div>
        </div>
    )
}

const container: React.CSSProperties = {
    height: 60,
    fontSize: 20,
    width: '100%',
    display: 'flex',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-between",
}

const editButton: React.CSSProperties = {
    color: 'cyan',
    fontSize: 16,
    marginRight: 10,
    borderRadius: 4,
    cursor: 'pointer',
    padding: '5px 10px',
    border: '1px solid cyan',
}

const removeButton: React.CSSProperties = {
    color: 'red',
    fontSize: 16,
    borderRadius: 4,
    cursor: 'pointer',
    padding: '5px 10px',
    border: '1px solid red',
}