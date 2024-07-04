import './single.css';
import Rightbar from '../../components/rightbar/Rightbar';
import SinglePost from '../../components/singlePost/SinglePost';


export default function Single() {
  return (
    <div className='single'>
        <SinglePost/>
        <Rightbar/>
    </div>
  )
}
