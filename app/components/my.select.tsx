import type { ChangeEventHandler} from "react"
import type { Role } from "~/models"

type Props = {
    title: string
    value?: string
    readOnly?: boolean
    roles: Role[]

    change: (value: string) => void
}

export default function MySelect(props: Props) {
    return (
        <div className="div-input">
            <span>{props.title}:</span>
            <select 
            name={props.title} 
            id="roles" 
            multiple
            onChange={event => props.change(event.target.value)}>
                {props.roles.map(role => (
                    <option value={role.name} >{role.name}</option>
                ))}
            </select>
        </div>
    )
}