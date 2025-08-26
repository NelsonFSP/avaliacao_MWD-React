import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react"

type Props = {
    title: string
    type?: HTMLInputTypeAttribute
    change: (value: string) => void
}

export default function MyInput(props: Props) {
    return (
        <div className="div-input">
            <span>{props.title}:</span>
            <input
                type={props.type || 'text'}
                onChange={event => props.change(event.target.value)}
            />
        </div>
    )
}