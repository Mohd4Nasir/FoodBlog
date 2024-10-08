
import appwriteService from "../appWrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id,title,featuredimage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full   bg-slate-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilepreview(featuredimage).href.replace("width" , "mode")} style={{height : "250px", width:"300px"}} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard