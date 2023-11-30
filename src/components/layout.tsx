import Titulo from "./titulo";

interface LayoutProps {
    titulo: string
    children: any
}

export default function Layout(props: LayoutProps) {
    return(
        <div className={`flex flex-col w-2/3
        bg-gradient-to-r from-black via-blue-950 to-black text-white-100 rounded-md`}>
            <Titulo>{ props.titulo }</Titulo>
            <div className="p-7">
                {props.children}
            </div>
        </div>
    )
}