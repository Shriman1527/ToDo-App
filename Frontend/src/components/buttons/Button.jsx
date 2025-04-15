import Todo from '../todo/Todo'

export const Button= ({onClick, children})=>{

    return <>
        <button className='border border-black p-3 m-2 rounded-md ' onClick={onClick} >{children}</button>
    </>
}

